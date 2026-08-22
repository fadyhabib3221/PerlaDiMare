const PBKDF2_PREFIX = "pbkdf2:";
const PBKDF2_ITERATIONS = 100000;
const LEGACY_SHA256_PREFIX = "sha256:";

const bufToHex = (buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
const hexToBuf = (hex) => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  return bytes;
};
const derivePbkdf2Hex = async (plain, saltBytes, iterations) => {
  const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(plain), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: saltBytes, iterations, hash: "SHA-256" }, keyMaterial, 256);
  return bufToHex(bits);
};

export const hashPassword = async (plain) => {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const hashHex = await derivePbkdf2Hex(plain, saltBytes, PBKDF2_ITERATIONS);
  return `${PBKDF2_PREFIX}${PBKDF2_ITERATIONS}:${bufToHex(saltBytes)}:${hashHex}`;
};

export const verifyPassword = async (storedValue, plainAttempt) => {
  if (typeof storedValue !== "string") return false;
  if (storedValue.startsWith(PBKDF2_PREFIX)) {
    const [, iterationsStr, saltHex, hashHex] = storedValue.split(":");
    const iterations = parseInt(iterationsStr, 10);
    if (!saltHex || !hashHex || !iterations) return false;
    return (await derivePbkdf2Hex(plainAttempt, hexToBuf(saltHex), iterations)) === hashHex;
  }
  if (storedValue.startsWith(LEGACY_SHA256_PREFIX)) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(plainAttempt));
    return LEGACY_SHA256_PREFIX + bufToHex(digest) === storedValue;
  }
  return storedValue === plainAttempt;
};

export const needsRehash = (storedValue) => typeof storedValue !== "string" || !storedValue.startsWith(PBKDF2_PREFIX);

const TOTP_STEP_SECONDS = 30;
const TOTP_DIGITS = 6;
const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

const base32Encode = (bytes) => {
  let bits = "";
  for (const b of bytes) bits += b.toString(2).padStart(8, "0");
  let output = "";
  for (let i = 0; i + 5 <= bits.length; i += 5) output += BASE32_ALPHABET[parseInt(bits.substr(i, 5), 2)];
  const remainder = bits.length % 5;
  if (remainder) output += BASE32_ALPHABET[parseInt(bits.substr(bits.length - remainder).padEnd(5, "0"), 2)];
  return output;
};

const base32Decode = (str) => {
  const clean = (str || "").toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = "";
  for (const c of clean) {
    const idx = BASE32_ALPHABET.indexOf(c);
    if (idx === -1) continue;
    bits += idx.toString(2).padStart(5, "0");
  }
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.substr(i, 8), 2));
  return new Uint8Array(bytes);
};

export const generateTotpSecret = () => base32Encode(crypto.getRandomValues(new Uint8Array(20)));
export const buildTotpUri = (secretBase32, accountLabel, issuer = "Travel Agency Management") =>
  `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountLabel)}?secret=${secretBase32}&issuer=${encodeURIComponent(issuer)}&digits=${TOTP_DIGITS}&period=${TOTP_STEP_SECONDS}`;

const totpCodeForCounter = async (secretBase32, counter) => {
  const keyBytes = base32Decode(secretBase32);
  if (!keyBytes.length) return null;
  const counterBytes = new Uint8Array(8);
  let c = BigInt(Math.max(0, counter));
  for (let i = 7; i >= 0; i--) {
    counterBytes[i] = Number(c & 0xffn);
    c >>= 8n;
  }
  const key = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const hmac = new Uint8Array(await crypto.subtle.sign("HMAC", key, counterBytes));
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binCode = ((hmac[offset] & 0x7f) << 24) | ((hmac[offset + 1] & 0xff) << 16) | ((hmac[offset + 2] & 0xff) << 8) | (hmac[offset + 3] & 0xff);
  return String(binCode % 10 ** TOTP_DIGITS).padStart(TOTP_DIGITS, "0");
};

export const verifyTotpCode = async (secretBase32, codeAttempt) => {
  const clean = (codeAttempt || "").replace(/\D/g, "");
  if (clean.length !== TOTP_DIGITS || !secretBase32) return false;
  const counter = Math.floor(Date.now() / 1000 / TOTP_STEP_SECONDS);
  for (const delta of [0, -1, 1]) {
    const expected = await totpCodeForCounter(secretBase32, counter + delta);
    if (expected === clean) return true;
  }
  return false;
};

export const ENC_MARKER = "wenc1";
export const b64FromBuf = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
export const bufFromB64 = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

export const deriveAesKeyFromPassword = async (plain, saltBytes) => {
  const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(plain), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: saltBytes, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial, { name: "AES-GCM", length: 256 }, false, ["wrapKey", "unwrapKey"]
  );
};

export const generateWorkspaceKey = () => crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
export const wrapWorkspaceKey = async (workspaceKey, plainPassword) => {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const ivBytes = crypto.getRandomValues(new Uint8Array(12));
  const wrappingKey = await deriveAesKeyFromPassword(plainPassword, saltBytes);
  const wrapped = await crypto.subtle.wrapKey("raw", workspaceKey, wrappingKey, { name: "AES-GCM", iv: ivBytes });
  return { salt: b64FromBuf(saltBytes), iv: b64FromBuf(ivBytes), data: b64FromBuf(wrapped) };
};

export const unwrapWorkspaceKey = async (keyWrap, plainPassword) => {
  if (!keyWrap || !keyWrap.salt || !keyWrap.iv || !keyWrap.data) return null;
  try {
    const wrappingKey = await deriveAesKeyFromPassword(plainPassword, bufFromB64(keyWrap.salt));
    return await crypto.subtle.unwrapKey("raw", bufFromB64(keyWrap.data), wrappingKey, { name: "AES-GCM", iv: bufFromB64(keyWrap.iv) }, { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  } catch (e) {
    return null;
  }
};

export const encryptForStorage = async (workspaceKey, value, meta = {}) => {
  const ivBytes = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify(value));
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv: ivBytes }, workspaceKey, plaintext);
  return { __enc: ENC_MARKER, iv: b64FromBuf(ivBytes), data: b64FromBuf(ciphertext), updatedAt: meta.updatedAt || Date.now(), updatedBy: meta.updatedBy || null };
};

export const decryptFromStorage = async (workspaceKey, envelope) => {
  if (!workspaceKey || !envelope || envelope.__enc !== ENC_MARKER) return undefined;
  try {
    const plaintextBuf = await crypto.subtle.decrypt({ name: "AES-GCM", iv: bufFromB64(envelope.iv) }, workspaceKey, bufFromB64(envelope.data));
    return JSON.parse(new TextDecoder().decode(plaintextBuf));
  } catch (e) {
    return undefined;
  }
};