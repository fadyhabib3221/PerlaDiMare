import React from "react";

const FlightsFormPricing = ({
  form,
  setForm,
  refundBoxOpen,
  HOTEL_CURRENCIES,
  NET_PAYMENT_METHODS,
  usdHint,
  addCentsOnBlur,
  ticketProfitEgp,
  ticketPaxCounts,
  ticketNetTotal,
  ticketSoldTotal,
  fmt,
}) => {
  if (refundBoxOpen) return null;

  const paxCounts = ticketPaxCounts(form);

  return (
    <>
      <div className="sm:hidden grid grid-cols-2 gap-2 mt-3">
        <div>
          <label className="text-xs text-stone-500 block mb-1">Net currency</label>
          <select
            className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
            value={form.netCurrency}
            onChange={(e) => setForm({ ...form, netCurrency: e.target.value })}
          >
            {HOTEL_CURRENCIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Net price</label>
          <div className="relative">
            <input
              type="number"
              className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
              value={form.netPrice}
              onChange={(e) => setForm({ ...form, netPrice: e.target.value })}
              onBlur={(e) => setForm({ ...form, netPrice: addCentsOnBlur(e.target.value) })}
              placeholder="0"
            />
            {usdHint(form.netPrice, form.netCurrency, form.usdRate) && (
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none">
                {usdHint(form.netPrice, form.netCurrency, form.usdRate)}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-2">
          <label className="text-xs text-stone-500 block mb-1">Net paid via</label>
          <select
            className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
            value={form.netPaymentMethod || "cash"}
            onChange={(e) => setForm({ ...form, netPaymentMethod: e.target.value })}
          >
            {NET_PAYMENT_METHODS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="sm:hidden grid grid-cols-2 gap-2 mt-2">
        <div>
          <label className="text-xs text-stone-500 block mb-1">Sold currency</label>
          <select
            className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
            value={form.soldCurrency}
            onChange={(e) => setForm({ ...form, soldCurrency: e.target.value })}
          >
            {HOTEL_CURRENCIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Sold price</label>
          <div className="relative">
            <input
              type="number"
              className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
              value={form.soldPrice}
              onChange={(e) => setForm({ ...form, soldPrice: e.target.value })}
              onBlur={(e) => setForm({ ...form, soldPrice: addCentsOnBlur(e.target.value) })}
              placeholder="0"
            />
            {usdHint(form.soldPrice, form.soldCurrency, form.usdRate) && (
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none">
                {usdHint(form.soldPrice, form.soldCurrency, form.usdRate)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="sm:hidden mt-2">
        <label className="text-xs text-stone-500 block mb-1">Profit (auto, EGP)</label>
        <div className="w-full border border-stone-200 bg-stone-50 rounded-xl px-2 py-2 text-sm text-emerald-700 font-semibold truncate">
          {fmt(ticketProfitEgp(form))} EGP
        </div>
      </div>

      {/* Desktop/tablet layout: date on its own row, then net/sold — each with its
          own currency — plus the EGP profit preview. */}
      <div className="hidden sm:grid sm:grid-cols-6 sm:gap-3 sm:mt-3">
        <div>
          <label className="text-xs text-stone-500 block mb-1">Net currency</label>
          <select
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
            value={form.netCurrency}
            onChange={(e) => setForm({ ...form, netCurrency: e.target.value })}
          >
            {HOTEL_CURRENCIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Net price</label>
          <div className="relative">
            <input
              type="number"
              className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
              value={form.netPrice}
              onChange={(e) => setForm({ ...form, netPrice: e.target.value })}
              onBlur={(e) => setForm({ ...form, netPrice: addCentsOnBlur(e.target.value) })}
              placeholder="0"
            />
            {usdHint(form.netPrice, form.netCurrency, form.usdRate) && (
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none">
                {usdHint(form.netPrice, form.netCurrency, form.usdRate)}
              </span>
            )}
          </div>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Net paid via</label>
          <select
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
            value={form.netPaymentMethod || "cash"}
            onChange={(e) => setForm({ ...form, netPaymentMethod: e.target.value })}
          >
            {NET_PAYMENT_METHODS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Sold currency</label>
          <select
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
            value={form.soldCurrency}
            onChange={(e) => setForm({ ...form, soldCurrency: e.target.value })}
          >
            {HOTEL_CURRENCIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Sold price</label>
          <div className="relative">
            <input
              type="number"
              className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
              value={form.soldPrice}
              onChange={(e) => setForm({ ...form, soldPrice: e.target.value })}
              onBlur={(e) => setForm({ ...form, soldPrice: addCentsOnBlur(e.target.value) })}
              placeholder="0"
            />
            {usdHint(form.soldPrice, form.soldCurrency, form.usdRate) && (
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none">
                {usdHint(form.soldPrice, form.soldCurrency, form.usdRate)}
              </span>
            )}
          </div>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Profit (auto, EGP)</label>
          <div className="w-full border border-stone-200 bg-stone-50 rounded-xl px-3 py-2 text-sm text-emerald-700 font-semibold">
            {fmt(ticketProfitEgp(form))} EGP
          </div>
        </div>
      </div>

      {paxCounts.child > 0 || paxCounts.infant > 0 ? (
        <div className="mt-3 border border-blue-100 bg-blue-50/60 rounded-xl p-3">
          <p className="text-xs font-semibold text-blue-800 mb-2">
            Child/Infant fares — {paxCounts.child > 0 ? `${paxCounts.child} child` : ""}
            {paxCounts.child > 0 && paxCounts.infant > 0 ? ", " : ""}
            {paxCounts.infant > 0 ? `${paxCounts.infant} infant` : ""}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {paxCounts.child > 0 && (
              <>
                <div>
                  <label className="text-xs text-stone-500 block mb-1">Child net price (each)</label>
                  <input
                    type="number"
                    className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input bg-white"
                    value={form.childNetPrice}
                    onChange={(e) => setForm({ ...form, childNetPrice: e.target.value })}
                    onBlur={(e) => setForm({ ...form, childNetPrice: addCentsOnBlur(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-500 block mb-1">Child sold price (each)</label>
                  <input
                    type="number"
                    className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input bg-white"
                    value={form.childSoldPrice}
                    onChange={(e) => setForm({ ...form, childSoldPrice: e.target.value })}
                    onBlur={(e) => setForm({ ...form, childSoldPrice: addCentsOnBlur(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </>
            )}
            {paxCounts.infant > 0 && (
              <>
                <div>
                  <label className="text-xs text-stone-500 block mb-1">Infant net price (each)</label>
                  <input
                    type="number"
                    className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input bg-white"
                    value={form.infantNetPrice}
                    onChange={(e) => setForm({ ...form, infantNetPrice: e.target.value })}
                    onBlur={(e) => setForm({ ...form, infantNetPrice: addCentsOnBlur(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-500 block mb-1">Infant sold price (each)</label>
                  <input
                    type="number"
                    className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input bg-white"
                    value={form.infantSoldPrice}
                    onChange={(e) => setForm({ ...form, infantSoldPrice: e.target.value })}
                    onBlur={(e) => setForm({ ...form, infantSoldPrice: addCentsOnBlur(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </>
            )}
          </div>
          <div className="mt-2 flex gap-4 text-xs text-stone-600">
            <span>Total net: <span className="font-semibold text-stone-800">{fmt(ticketNetTotal(form))} {form.netCurrency}</span></span>
            <span>Total sold: <span className="font-semibold text-stone-800">{fmt(ticketSoldTotal(form))} {form.soldCurrency}</span></span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FlightsFormPricing;
