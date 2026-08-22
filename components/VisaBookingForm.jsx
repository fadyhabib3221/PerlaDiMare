import React from "react";

export default function VisaBookingForm({
  canAddTickets,
  visaEditingId,
  visaForm,
  setVisaForm,
  suggestions,
  companyName,
  handleVisaCustomersCountChange,
  visaSupplierOther,
  setVisaSupplierOther,
  handleVisaCustomerNameChange,
  HOTEL_CURRENCIES,
  usdHint,
  addCentsOnBlur,
  visaNetTotal,
  visaSoldTotal,
  visaProfitTotal,
  fmt,
  handleSaveVisa,
  resetVisaForm,
}) {
  return canAddTickets && (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 md:p-5 mb-6">
      <h2 className="font-semibold text-stone-900 mb-4">
        {visaEditingId ? "Edit visa booking" : "New visa booking"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="text-xs text-stone-500 block mb-1">
            Corporates
          </label>
          <select
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
            value={visaForm.customer}
            onChange={(e) => setVisaForm({ ...visaForm, customer: e.target.value })}
          >
            <option value="">— No corporate (Individual) —</option>
            {visaForm.customer && !suggestions.companies.some((c) => companyName(c) === visaForm.customer) && (
              // Booking already has a company value that isn't (or is no longer) a
              // registered corporate — e.g. saved before Corporate Management existed,
              // or the corporate was later renamed/deleted. Keep it selectable/visible
              // instead of silently blanking the field.
              <option value={visaForm.customer}>{visaForm.customer} (not registered)</option>
            )}
            {[...suggestions.companies]
              .sort((a, b) => companyName(a).localeCompare(companyName(b)))
              .map((c) => {
                const name = companyName(c);
                return (
                  <option key={name} value={name}>{name}</option>
                );
              })}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Number of customers</label>
          <input
            type="number"
            min={1}
            max={50}
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            value={visaForm.customersCount}
            onChange={(e) => handleVisaCustomersCountChange(e.target.value)}
            onBlur={(e) => {
              if (e.target.value === "" || parseInt(e.target.value, 10) < 1) {
                handleVisaCustomersCountChange(1);
              }
            }}
            placeholder="1"
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Visa</label>
          <input
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            value={visaForm.visaType}
            onChange={(e) => setVisaForm({ ...visaForm, visaType: e.target.value })}
            placeholder="e.g. Schengen, UK, Dubai"
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Booking date</label>
          <input
            type="date"
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            value={visaForm.bookingDate}
            onChange={(e) => setVisaForm({ ...visaForm, bookingDate: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Supplier</label>
          {visaSupplierOther ? (
            <div className="flex gap-2">
              <input
                className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 ${visaForm.supplier.trim() ? "border-blue-400 text-blue-700 font-medium bg-blue-50" : "border-stone-300"}`}
                value={visaForm.supplier}
                onChange={(e) => setVisaForm({ ...visaForm, supplier: e.target.value })}
                placeholder="Enter supplier name"
                autoFocus
              />
              <button
                type="button"
                onClick={() => { setVisaSupplierOther(false); setVisaForm({ ...visaForm, supplier: "" }); }}
                className="shrink-0 text-xs text-stone-500 hover:text-teal-800 border border-stone-300 rounded-xl px-2"
              >
                List
              </button>
            </div>
          ) : (
            <select
              className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 ${visaForm.supplier ? "border-blue-400 text-blue-700 font-medium bg-blue-50" : "border-stone-300 bg-white"}`}
              value={visaForm.supplier}
              onChange={(e) => {
                if (e.target.value === "__other__") {
                  setVisaSupplierOther(true);
                  setVisaForm({ ...visaForm, supplier: "" });
                } else {
                  setVisaForm({ ...visaForm, supplier: e.target.value });
                }
              }}
            >
              <option value="">Select supplier</option>
              {(suggestions.visaSuppliers || []).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
              <option value="__other__">Other</option>
            </select>
          )}
        </div>
      </div>

      {/* Dynamic customer name cells, one row per customer */}
      <div className="mb-4">
        <label className="text-xs text-stone-500 block mb-2">
          Customers ({visaForm.customers.length})
        </label>
        <div className="space-y-2">
          {visaForm.customers.map((c, i) => (
            <input
              key={i}
              className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              value={c.name}
              onChange={(e) => handleVisaCustomerNameChange(i, e.target.value)}
              placeholder={i === 0 ? `Customer ${i + 1} name (required)` : `Customer ${i + 1} name`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="text-xs text-stone-500 block mb-1">Net currency</label>
          <select
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
            value={visaForm.netCurrency}
            onChange={(e) => setVisaForm({ ...visaForm, netCurrency: e.target.value })}
          >
            {HOTEL_CURRENCIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Price net (per person)</label>
          <div className="relative">
            <input
              type="number"
              className="w-28 border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
              value={visaForm.netPrice}
              onChange={(e) => setVisaForm({ ...visaForm, netPrice: e.target.value })}
              onBlur={(e) => setVisaForm({ ...visaForm, netPrice: addCentsOnBlur(e.target.value) })}
              placeholder="0"
            />
            {usdHint(visaForm.netPrice, visaForm.netCurrency, visaForm.usdRate) && (
              <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none truncate max-w-[70px]">
                {usdHint(visaForm.netPrice, visaForm.netCurrency, visaForm.usdRate)}
              </span>
            )}
          </div>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Sold currency</label>
          <select
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
            value={visaForm.soldCurrency}
            onChange={(e) => setVisaForm({ ...visaForm, soldCurrency: e.target.value })}
          >
            {HOTEL_CURRENCIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Sold (per person)</label>
          <div className="relative">
            <input
              type="number"
              className="w-28 border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
              value={visaForm.soldPrice}
              onChange={(e) => setVisaForm({ ...visaForm, soldPrice: e.target.value })}
              onBlur={(e) => setVisaForm({ ...visaForm, soldPrice: addCentsOnBlur(e.target.value) })}
              placeholder="0"
            />
            {usdHint(visaForm.soldPrice, visaForm.soldCurrency, visaForm.usdRate) && (
              <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none truncate max-w-[70px]">
                {usdHint(visaForm.soldPrice, visaForm.soldCurrency, visaForm.usdRate)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Live total preview: per-person prices above multiplied by the number of
          customers entered, same style as the Hotels form's totals box. Profit
          converts both currencies to EGP since net/sold can now differ. */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1 mb-4">
        <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center">
          <p className="text-[11px] text-stone-500">Net total (× {visaForm.customers.length || 1})</p>
          <p className="text-sm font-bold text-stone-800">{fmt(visaNetTotal(visaForm))} {visaForm.netCurrency}</p>
        </div>
        <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center">
          <p className="text-[11px] text-stone-500">Sold total (× {visaForm.customers.length || 1})</p>
          <p className="text-sm font-bold text-stone-800">{fmt(visaSoldTotal(visaForm))} {visaForm.soldCurrency}</p>
        </div>
        <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center">
          <p className="text-[11px] text-stone-500">Profit (auto)</p>
          <p className="text-sm font-bold text-emerald-700">{fmt(visaProfitTotal(visaForm))} EGP</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleSaveVisa}
          className="bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl px-4 py-2 hover:brightness-110"
        >
          {visaEditingId ? "Save changes" : "Add visa booking"}
        </button>
        {visaEditingId && (
          <button
            onClick={resetVisaForm}
            className="text-sm text-stone-500 hover:text-stone-700 border border-stone-300 rounded-xl px-4 py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}