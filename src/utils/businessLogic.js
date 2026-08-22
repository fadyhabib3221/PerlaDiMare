export const emptyCustomerRow = () => ({ name: "", ticketNumber: "", conjunction: false, ticketNumber2: "", pnrReference: "", type: "adult" });

export const ticketPaxCounts = (t) => {
  const customers = Array.isArray(t.customers) && t.customers.length > 0 ? t.customers : [{}];
  return customers.reduce(
    (acc, c) => {
      const type = c.type || "adult";
      if (type === "child") acc.child += 1;
      else if (type === "infant") acc.infant += 1;
      else acc.adult += 1;
      return acc;
    },
    { adult: 0, child: 0, infant: 0 }
  );
};

export const ticketNetTotal = (t) => {
  const counts = ticketPaxCounts(t);
  return (
    (parseFloat(t.netPrice) || 0) +
    counts.child * (parseFloat(t.childNetPrice) || 0) +
    counts.infant * (parseFloat(t.infantNetPrice) || 0) +
    (t.isReissued ? parseFloat(t.emdAmount) || 0 : 0)
  );
};

export const ticketSoldTotal = (t) => {
  const counts = ticketPaxCounts(t);
  return (
    (parseFloat(t.soldPrice) || 0) +
    counts.child * (parseFloat(t.childSoldPrice) || 0) +
    counts.infant * (parseFloat(t.infantSoldPrice) || 0)
  );
};

export const legsFromPairs = (pairs) => {
  const arr = Array.isArray(pairs) ? pairs : [];
  const legs = [];
  for (let i = 0; i + 1 < arr.length; i += 2) legs.push([arr[i] || "", arr[i + 1] || ""]);
  return legs;
};

export const chainToLegPairs = (points) => {
  const pts = (Array.isArray(points) ? points : []).map((p) => (p || "").trim()).filter(Boolean);
  if (pts.length < 2) return ["", ""];
  const pairs = [];
  for (let i = 0; i < pts.length - 1; i++) pairs.push(pts[i], pts[i + 1]);
  return pairs;
};

export const routeLabel = (t) => {
  if (t.multiDestination && Array.isArray(t.destinations) && t.destinations.length >= 2) {
    const pairs = t.routeFormat === "legs" ? t.destinations : chainToLegPairs(t.destinations);
    const legs = legsFromPairs(pairs).filter(([a, b]) => a || b);
    if (legs.length) return legs.map(([a, b]) => `${a || "-"} - ${b || "-"}`).join(" / ");
  }
  const base = `${t.from || "-"} - ${t.to || "-"}`;
  if (t.tripType === "roundTrip" && t.returnAirport) return `${base} - ${t.returnAirport}`;
  return base;
};

export const nextTicketNumber = (ticketNumber) => {
  if (!ticketNumber) return "";
  const match = ticketNumber.match(/^([A-Z0-9]{3})-(\d+)$/);
  if (!match) return "";
  const [, prefix, digits] = match;
  if (digits.length <= 3) {
    const wrapped = ((parseInt(digits, 10) + 1) % (10 ** digits.length)).toString().padStart(digits.length, "0");
    return `${prefix}-${wrapped}`;
  }
  const head = digits.slice(0, -3);
  const tail = digits.slice(-3);
  const nextTail = ((parseInt(tail, 10) + 1) % 1000).toString().padStart(3, "0");
  return `${prefix}-${head}${nextTail}`;
};

export const conjunctionTicketSuffix = (ticketNumber) => {
  const digits = (ticketNumber || "").replace(/[^0-9]/g, "");
  if (digits.length < 3) return "";
  const tail = digits.slice(-3);
  const nextTail = ((parseInt(tail, 10) + 1) % 1000).toString().padStart(3, "0");
  return `-${nextTail}`;
};

export const lastIssuedTicketNumber = (customer) => {
  if (!customer) return "";
  if (customer.conjunction && customer.ticketNumber2) {
    const match = (customer.ticketNumber || "").match(/^([A-Z0-9]{3})-(\d+)$/);
    const tailDigits = customer.ticketNumber2.replace(/[^0-9]/g, "");
    if (match && tailDigits) {
      const [, prefix, num] = match;
      const head = num.length > 3 ? num.slice(0, -3) : "";
      return `${prefix}-${head}${tailDigits.padStart(3, "0")}`;
    }
  }
  return customer.ticketNumber;
};

export const resizeCustomers = (customers, count) => {
  const n = Math.max(1, Math.min(50, parseInt(count, 10) || 1));
  const next = [...customers];
  while (next.length < n) next.push(emptyCustomerRow());
  next.length = n;
  return next;
};