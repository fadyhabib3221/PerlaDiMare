import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Building2, Calendar, ChevronDown, Search, SlidersHorizontal, TrendingUp, User, Wallet } from 'lucide-react';

function PassportIcon({ size = 22, className = "" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="10" r="3.2" /><path d="M12 6.8v6.4M8.8 10h6.4M9 17.5h6" /></svg>;
}

function VisaSummaryCards({ hasActiveFilter, filteredTotals, currentMonthTotals, formatNumber }) {
  const totals = hasActiveFilter ? filteredTotals : currentMonthTotals;
  return <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-6">
    <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0"><div className="bg-stone-100 rounded-xl p-1.5 sm:p-2 text-stone-600 shrink-0"><PassportIcon size={18} className="sm:hidden" /><PassportIcon size={20} className="hidden sm:block" /></div><div className="min-w-0"><p className="text-xs text-stone-500">Applicants</p><p className="text-sm sm:text-lg font-bold truncate">{totals.count}</p></div></div>
    <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0"><div className="bg-teal-50 rounded-xl p-1.5 sm:p-2 text-teal-900 shrink-0"><Wallet size={18} className="sm:hidden" /><Wallet size={20} className="hidden sm:block" /></div><div className="min-w-0"><p className="text-xs text-stone-500">Total sales (EGP)</p><p className="text-sm sm:text-lg font-bold truncate">{formatNumber(totals.sold)}</p></div></div>
    <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0"><div className="bg-emerald-50 rounded-xl p-1.5 sm:p-2 text-emerald-700 shrink-0"><TrendingUp size={18} className="sm:hidden" /><TrendingUp size={20} className="hidden sm:block" /></div><div className="min-w-0"><p className="text-xs text-stone-500">Total profit (EGP)</p><p className="text-sm sm:text-lg font-bold text-emerald-700 truncate">{formatNumber(totals.profit)}</p></div></div>
  </div>;
}

function VisaBookingForm({
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
    <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-6">
      <h3 className="text-sm font-bold text-stone-700 mb-4">
        {visaEditingId ? "Edit visa booking" : "New visa booking"}
      </h3>
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
            <option value="">â€” No corporate (Individual) â€”</option>
            {visaForm.customer && !suggestions.companies.some((c) => companyName(c) === visaForm.customer) && (
              // Booking already has a company value that isn't (or is no longer) a
              // registered corporate â€” e.g. saved before Corporate Management existed,
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
          <p className="text-[11px] text-stone-500">Net total (Ã— {visaForm.customers.length || 1})</p>
          <p className="text-sm font-bold text-stone-800">{fmt(visaNetTotal(visaForm))} {visaForm.netCurrency}</p>
        </div>
        <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center">
          <p className="text-[11px] text-stone-500">Sold total (Ã— {visaForm.customers.length || 1})</p>
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

const VisaBookingsTable = ({
  visaQuery,
  setVisaQuery,
  visaFiltersOpen,
  setVisaFiltersOpen,
  activeVisaFilterCount,
  visaYearsAvailable,
  visaSelectedYear,
  setVisaSelectedYear,
  visaMonthsAvailable,
  visaSelectedMonth,
  setVisaSelectedMonth,
  visaEmployeesAvailable,
  visaSelectedEmployee,
  setVisaSelectedEmployee,
  visaSuppliersAvailable,
  visaSelectedSupplier,
  setVisaSelectedSupplier,
  monthLabel,
  clearAllVisaFilters,
  filteredVisaBookings,
  visibleVisaBookings,
  rankByServiceDate,
  isYearLocked,
  setViewingFileContext,
  setViewingVisaBooking,
  employeeInitials,
  formatDisplayDate,
  fmt,
  visaNetTotal,
  visaSoldTotal,
  visaProfitTotal,
  MultiSelectDropdown,
  AppliedFilters,
  ThFilter,
  multiFilterGroup,
}) => (
  <>
    <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 mb-3">
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            placeholder="Search by customer name, visa type, or supplier"
            value={visaQuery}
            onChange={(e) => setVisaQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => setVisaFiltersOpen(!visaFiltersOpen)}
          className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
            visaFiltersOpen ? "border-teal-700 text-teal-800 bg-teal-50" : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white"
          }`}
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Filters</span>
          {activeVisaFilterCount > 0 && (
            <span className="bg-teal-700 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
              {activeVisaFilterCount}
            </span>
          )}
          <ChevronDown size={14} className={`transition-transform ${visaFiltersOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {visaFiltersOpen && (
        <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-stone-100">
          <div>
            <label className="text-xs text-stone-500 block mb-1">Year</label>
            <MultiSelectDropdown label="years" icon={Calendar} options={visaYearsAvailable} selected={visaSelectedYear} onChange={setVisaSelectedYear} placeholder="All years" />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">Month</label>
            <MultiSelectDropdown label="months" icon={Calendar} options={visaMonthsAvailable.map((key) => ({ value: key, label: monthLabel(key) }))} selected={visaSelectedMonth} onChange={setVisaSelectedMonth} placeholder="All months" />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">By</label>
            <MultiSelectDropdown label="employees" icon={User} options={visaEmployeesAvailable} selected={visaSelectedEmployee} onChange={setVisaSelectedEmployee} placeholder="All employees" />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">Supplier</label>
            <MultiSelectDropdown label="suppliers" icon={Building2} options={visaSuppliersAvailable} selected={visaSelectedSupplier} onChange={setVisaSelectedSupplier} placeholder="All suppliers" />
          </div>
        </div>
      )}

      <AppliedFilters
        groups={[
          multiFilterGroup("Year", "year", visaSelectedYear, setVisaSelectedYear),
          multiFilterGroup("Month", "month", visaSelectedMonth, setVisaSelectedMonth, monthLabel),
          multiFilterGroup("By", "employee", visaSelectedEmployee, setVisaSelectedEmployee),
          multiFilterGroup("Supplier", "supplier", visaSelectedSupplier, setVisaSelectedSupplier),
          { label: "Search", values: visaQuery.trim() ? [{ key: "search", text: `"${visaQuery.trim()}"`, onRemove: () => setVisaQuery("") }] : [] },
        ]}
        onClearAll={clearAllVisaFilters}
      />
    </div>

    {filteredVisaBookings.length === 0 ? (
      <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-400">
        <PassportIcon size={40} className="mx-auto mb-3 text-stone-300" />
        <p className="text-sm">{visibleVisaBookings.length === 0 ? "No visa bookings yet." : "No visa bookings match the current search/filters."}</p>
      </div>
    ) : (
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
          <table className="w-full min-w-max text-sm">
            <thead className="bg-stone-50 text-stone-500 text-xs">
              <tr>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">RN</th>
                <ThFilter label="By" options={visaEmployeesAvailable} selected={visaSelectedEmployee} onChange={setVisaSelectedEmployee} padding="px-1.5 py-0.5" />
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap"># Customers</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Names</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Visa</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Booking date</th>
                <ThFilter label="Supplier" options={visaSuppliersAvailable} selected={visaSelectedSupplier} onChange={setVisaSelectedSupplier} padding="px-1.5 py-0.5" />
                <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Net</th>
                <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Sold</th>
                <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {(() => {
                const { sorted, rnByRowId } = rankByServiceDate(filteredVisaBookings, "bookingDate");
                return sorted.map((v) => {
                  const net = visaNetTotal(v);
                  const sold = visaSoldTotal(v);
                  const profit = visaProfitTotal(v);
                  return (
                    <tr
                      key={v.id}
                      className={`cursor-pointer ${isYearLocked("visa", v.bookingDate) ? "bg-stone-200/70 grayscale hover:bg-stone-200" : "hover:bg-stone-50"}`}
                      onClick={() => { setViewingFileContext(null); setViewingVisaBooking(v); }}
                    >
                      <td className="px-1.5 py-0.5 text-stone-400 whitespace-nowrap">{rnByRowId[v.id]}</td>
                      <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap" title={v.employee || ""}>{employeeInitials(v.employee)}</td>
                      <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{(v.customers || []).length}</td>
                      <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                        {(v.customers || []).map((c) => c.name || "-").join(", ")}
                      </td>
                      <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{v.visaType}</td>
                      <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                        {v.bookingDate ? formatDisplayDate(v.bookingDate) : "-"}
                      </td>
                      <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{v.supplier}</td>
                      <td className="px-1.5 py-0.5 text-right text-stone-700 whitespace-nowrap">{fmt(net)} {v.netCurrency}</td>
                      <td className="px-1.5 py-0.5 text-right text-stone-700 whitespace-nowrap">{fmt(sold)} {v.soldCurrency}</td>
                      <td className="px-1.5 py-0.5 text-right font-semibold text-emerald-700 whitespace-nowrap">{fmt(profit)} EGP</td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </>
);

export { VisaSummaryCards, VisaBookingForm, VisaBookingsTable };

