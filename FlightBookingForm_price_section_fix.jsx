{/* Ticket issue date + Net/Sold price + Profit — ONE unified responsive block
    (previously this was split into two separate blocks, one hidden below the
    "sm" breakpoint and one hidden above it, which could both fail to render
    on some devices/browsers and make these fields disappear entirely). */}
<div className="mt-3">
  <label className="text-xs text-stone-500 block mb-1">Ticket issue date</label>
  <input
    type="date"
    lang="en-GB"
    max={todayDateStr()}
    className="block w-full max-w-full min-w-0 sm:max-w-xs box-border border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
    style={{ WebkitAppearance: "none" }}
    value={form.date}
    onChange={(e) => {
      const v = e.target.value;
      setForm({ ...form, date: v > todayDateStr() ? todayDateStr() : v });
    }}
  />
</div>

<div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mt-3">
  <div>
    <label className="text-xs text-stone-500 block mb-1">Net currency</label>
    <select
      className="w-full border border-stone-300 rounded-xl px-2 sm:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
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
        className="w-full border border-stone-300 rounded-xl px-2 sm:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
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
      className="w-full border border-stone-300 rounded-xl px-2 sm:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
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
      className="w-full border border-stone-300 rounded-xl px-2 sm:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
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
        className="w-full border border-stone-300 rounded-xl px-2 sm:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
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
  <div className="col-span-2 sm:col-span-1">
    <label className="text-xs text-stone-500 block mb-1">Profit (auto, EGP)</label>
    <div className="w-full border border-stone-200 bg-stone-50 rounded-xl px-2 sm:px-3 py-2 text-sm text-emerald-700 font-semibold truncate">
      {fmt(ticketProfitEgp(form))} EGP
    </div>
  </div>
</div>
