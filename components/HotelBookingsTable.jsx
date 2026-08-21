import { Search, SlidersHorizontal, ChevronDown, Calendar, User, Building2 } from "lucide-react";

const HotelBookingsTable = ({
  hotelQuery,
  setHotelQuery,
  hotelFiltersOpen,
  setHotelFiltersOpen,
  activeHotelFilterCount,
  hotelYearsAvailable,
  hotelSelectedYear,
  setHotelSelectedYear,
  hotelMonthsAvailable,
  hotelSelectedMonth,
  setHotelSelectedMonth,
  hotelEmployeesAvailable,
  hotelSelectedEmployee,
  setHotelSelectedEmployee,
  hotelSuppliersAvailable,
  hotelSelectedSupplier,
  setHotelSelectedSupplier,
  hotelNamesAvailable,
  hotelSelectedHotelName,
  setHotelSelectedHotelName,
  monthLabel,
  clearAllHotelFilters,
  filteredHotelBookings,
  visibleHotelBookings,
  rankByServiceDate,
  isYearLocked,
  setViewingFileContext,
  setViewingHotelBooking,
  hotelLinesSummary,
  hotelRoomCount,
  formatDisplayDate,
  hotelDateRange,
  fmt,
  hotelNetTotal,
  hotelSoldTotal,
  hotelProfitTotal,
  MultiSelectDropdown,
  AppliedFilters,
  ThFilter,
  multiFilterGroup,
}) => (
  <>
    {/* Search and filters — same unified card style as Flights, adapted to the
        fields hotel bookings actually have (no month/year select stub — those
        come from each booking's own booking date). */}
    <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 mb-3">
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            placeholder="Search by employee, customer, hotel, or supplier"
            value={hotelQuery}
            onChange={(e) => setHotelQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => setHotelFiltersOpen(!hotelFiltersOpen)}
          className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
            hotelFiltersOpen ? "border-teal-700 text-teal-800 bg-teal-50" : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white"
          }`}
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Filters</span>
          {activeHotelFilterCount > 0 && (
            <span className="bg-teal-700 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
              {activeHotelFilterCount}
            </span>
          )}
          <ChevronDown size={14} className={`transition-transform ${hotelFiltersOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {hotelFiltersOpen && (
        <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-stone-100">
          <div>
            <label className="text-xs text-stone-500 block mb-1">Year</label>
            <MultiSelectDropdown label="years" icon={Calendar} options={hotelYearsAvailable} selected={hotelSelectedYear} onChange={setHotelSelectedYear} placeholder="All years" />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">Month</label>
            <MultiSelectDropdown label="months" icon={Calendar} options={hotelMonthsAvailable.map((key) => ({ value: key, label: monthLabel(key) }))} selected={hotelSelectedMonth} onChange={setHotelSelectedMonth} placeholder="All months" />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">By</label>
            <MultiSelectDropdown label="employees" icon={User} options={hotelEmployeesAvailable} selected={hotelSelectedEmployee} onChange={setHotelSelectedEmployee} placeholder="All employees" />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">Supplier</label>
            <MultiSelectDropdown label="suppliers" icon={Building2} options={hotelSuppliersAvailable} selected={hotelSelectedSupplier} onChange={setHotelSelectedSupplier} placeholder="All suppliers" />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">Hotel</label>
            <MultiSelectDropdown label="hotels" icon={Building2} options={hotelNamesAvailable} selected={hotelSelectedHotelName} onChange={setHotelSelectedHotelName} placeholder="All hotels" />
          </div>
        </div>
      )}

      <AppliedFilters
        groups={[
          multiFilterGroup("Year", "year", hotelSelectedYear, setHotelSelectedYear),
          multiFilterGroup("Month", "month", hotelSelectedMonth, setHotelSelectedMonth, monthLabel),
          multiFilterGroup("By", "employee", hotelSelectedEmployee, setHotelSelectedEmployee),
          multiFilterGroup("Supplier", "supplier", hotelSelectedSupplier, setHotelSelectedSupplier),
          multiFilterGroup("Hotel", "hotel", hotelSelectedHotelName, setHotelSelectedHotelName),
          { label: "Search", values: hotelQuery.trim() ? [{ key: "search", text: `"${hotelQuery.trim()}"`, onRemove: () => setHotelQuery("") }] : [] },
        ]}
        onClearAll={clearAllHotelFilters}
      />
    </div>

    <div className="bg-white border border-stone-200 rounded-2xl overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
      <table className="w-full min-w-max text-xs border-collapse">
        <thead>
          <tr className="bg-stone-50 border-b border-stone-200 text-stone-500">
            <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">RN</th>
            <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Company</th>
            <ThFilter label="Hotel" options={hotelNamesAvailable} selected={hotelSelectedHotelName} onChange={setHotelSelectedHotelName} padding="px-1.5 py-0.5" />
            <ThFilter label="Supplier" options={hotelSuppliersAvailable} selected={hotelSelectedSupplier} onChange={setHotelSelectedSupplier} padding="px-1.5 py-0.5" />
            <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Rooms</th>
            <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap"># rooms</th>
            <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Booking date</th>
            <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Dates</th>
            <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Net total (EGP)</th>
            <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Sold total (EGP)</th>
            <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Profit (EGP)</th>
          </tr>
        </thead>
        <tbody>
          {filteredHotelBookings.length === 0 && (
            <tr>
              <td colSpan={11} className="text-center text-stone-400 px-2.5 py-6">
                {visibleHotelBookings.length === 0 ? "No hotel bookings yet." : "No hotel bookings match the current search/filters."}
              </td>
            </tr>
          )}
          {(() => {
            const { sorted, rnByRowId } = rankByServiceDate(filteredHotelBookings, "bookingDate");
            return sorted.map((h) => (
            <tr
              key={h.id}
              className={`border-b border-stone-100 cursor-pointer ${isYearLocked("hotels", h.bookingDate) ? "bg-stone-200/70 grayscale hover:bg-stone-200" : "hover:bg-stone-50"}`}
              onClick={() => { setViewingFileContext(null); setViewingHotelBooking(h); }}
            >
              <td className="px-1.5 py-0.5 text-stone-400 whitespace-nowrap">{rnByRowId[h.id]}</td>
              <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                {h.customer && h.customer.trim() ? h.customer : <span className="text-stone-400 italic">Individual</span>}
              </td>
              <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{h.hotel}</td>
              <td className="px-1.5 py-0.5 text-stone-600 whitespace-nowrap">{h.supplier}</td>
              <td className="px-1.5 py-0.5 text-stone-600 whitespace-nowrap">{hotelLinesSummary(h)}</td>
              <td className="px-1.5 py-0.5 text-stone-600 text-right whitespace-nowrap">{hotelRoomCount(h)}</td>
              <td className="px-1.5 py-0.5 text-stone-600 whitespace-nowrap">{h.bookingDate ? formatDisplayDate(h.bookingDate) : "-"}</td>
              <td className="px-1.5 py-0.5 text-stone-600 whitespace-nowrap">
                {hotelDateRange(h).start && hotelDateRange(h).end
                  ? `${formatDisplayDate(hotelDateRange(h).start)} → ${formatDisplayDate(hotelDateRange(h).end)}`
                  : "-"}
              </td>
              <td className="px-1.5 py-0.5 text-stone-600 text-right whitespace-nowrap">{fmt(hotelNetTotal(h))}</td>
              <td className="px-1.5 py-0.5 text-stone-600 text-right whitespace-nowrap">{fmt(hotelSoldTotal(h))}</td>
              <td className="px-1.5 py-0.5 font-semibold text-emerald-700 text-right whitespace-nowrap">{fmt(hotelProfitTotal(h))}</td>
            </tr>
            ));
          })()}
        </tbody>
      </table>
    </div>
  </>
);

export default HotelBookingsTable;