import { Search, SlidersHorizontal, ChevronDown, Calendar, User, Building2 } from "lucide-react";

const PassportIcon = ({ size = 22, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <circle cx="12" cy="10" r="3.2" />
    <path d="M12 6.8v6.4M8.8 10h6.4" />
    <path d="M9 17.5h6" />
  </svg>
);

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

export default VisaBookingsTable;