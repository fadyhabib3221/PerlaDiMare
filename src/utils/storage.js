import {
  b64FromBuf, bufFromB64, encryptForStorage, decryptFromStorage, ENC_MARKER,
} from "./crypto";

const LOCAL_SESSION_KEY = "pdm:localSession:v1";
export const LOCK_FLAG_KEY = "pdm:locked:v1";

export const saveLocalSession = async (user, workspaceKeyObj, startedAt) => {
  try {
    let rawKeyB64 = null;
    if (workspaceKeyObj) {
      const raw = await crypto.subtle.exportKey("raw", workspaceKeyObj);
      rawKeyB64 = b64FromBuf(raw);
    }
    sessionStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ user, rawKeyB64, startedAt: startedAt || Date.now() }));
  } catch (e) {}
};

export const loadLocalSession = async () => {
  try {
    const raw = sessionStorage.getItem(LOCAL_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.user || !parsed.user.username) return null;
    let workspaceKeyObj = null;
    if (parsed.rawKeyB64) {
      workspaceKeyObj = await crypto.subtle.importKey(
        "raw", bufFromB64(parsed.rawKeyB64), { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]
      );
    }
    return { user: parsed.user, workspaceKey: workspaceKeyObj, startedAt: parsed.startedAt || Date.now() };
  } catch (e) {
    return null;
  }
};

export const clearLocalSession = () => {
  try { sessionStorage.removeItem(LOCAL_SESSION_KEY); } catch (e) {}
};

const storageWriteQueues = new Map();
export const storageSet = (key, value, shared = true) => {
  const previous = storageWriteQueues.get(key) || Promise.resolve();
  const next = previous
    .catch(() => {})
    .then(() => window.storage.set(key, value, shared));
  storageWriteQueues.set(key, next.finally(() => {
    if (storageWriteQueues.get(key) === next) storageWriteQueues.delete(key);
  }));
  return next;
};

export const storageDelete = (key, shared = true) => {
  const previous = storageWriteQueues.get(key) || Promise.resolve();
  const next = previous
    .catch(() => {})
    .then(() => window.storage.delete(key, shared));
  storageWriteQueues.set(key, next.finally(() => {
    if (storageWriteQueues.get(key) === next) storageWriteQueues.delete(key);
  }));
  return next;
};

export const secureLoad = async (storageKey, workspaceKey, fallback, options = {}) => {
  const withMeta = options.withMeta === true;
  const asPlain = (value) => (withMeta ? { value, updatedAt: null, updatedBy: null } : value);
  const res = await window.storage.get(storageKey, true).catch(() => null);
  if (!res || res.value === undefined || res.value === null || res.value === "") return asPlain(fallback);
  let parsed;
  try { parsed = JSON.parse(res.value); } catch (e) { return asPlain(fallback); }
  if (parsed && parsed.__enc === ENC_MARKER) {
    if (!workspaceKey) return asPlain(fallback);
    const decrypted = await decryptFromStorage(workspaceKey, parsed);
    const value = decrypted === undefined ? fallback : decrypted;
    return withMeta ? { value, updatedAt: parsed.updatedAt || null, updatedBy: parsed.updatedBy || null } : value;
  }
  if (workspaceKey) {
    encryptForStorage(workspaceKey, parsed).then((envelope) => {
      storageSet(storageKey, JSON.stringify(envelope), true).catch(() => {});
    });
  }
  return asPlain(parsed);
};

export const secureSave = async (storageKey, workspaceKey, value, options = {}) => {
  const requireKey = options.requireKey === true;
  if (requireKey && !workspaceKey) {
    throw new Error(`Encrypted storage is locked: ${storageKey}`);
  }
  if (workspaceKey) {
    const envelope = await encryptForStorage(workspaceKey, value, {
      updatedAt: options.updatedAt,
      updatedBy: options.updatedBy,
    });
    return storageSet(storageKey, JSON.stringify(envelope), true);
  }
  return storageSet(storageKey, JSON.stringify(value), true);
};

export const peekStorageVersion = async (storageKey) => {
  try {
    const res = await window.storage.get(storageKey, true);
    if (!res || !res.value) return null;
    const parsed = JSON.parse(res.value);
    return parsed && parsed.__enc === ENC_MARKER && typeof parsed.updatedAt === "number" ? parsed.updatedAt : null;
  } catch (e) {
    return null;
  }
};

export const safeJsonParse = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  try { return JSON.parse(value); } catch (e) { return fallback; }
};