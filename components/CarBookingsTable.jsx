import { Search, SlidersHorizontal, ChevronDown, Calendar, Building2, Car } from "lucide-react";

const CarBookingsTable = ({
  carQuery,
  setCarQuery,
  carFiltersOpen,
  setCarFiltersOpen,
  activeCarFilterCount,
  carYearsAvailable,
  carSelectedYear,
  setCarSelectedYear,
  carMonthsAvailable,
  carSelectedMonth,
  setCarSelectedMonth,
  carSuppliersAvailable,
  carSelectedSupplier,
  setCarSelectedSupplier,
  monthLabel,
  clearAllCarFilters,
  filteredCarBookings,
  visibleCarBookings,
  MultiSelectDropdown,
  AppliedFilters,
  multiFilterGroup,
  ThFilter,
  rankByServiceDate,
  isYearLocked,
  setViewingFileContext,
  setViewingCarBooking,
  carNetTotal,
  carSoldTotal,
  carProfitTotal,
  formatDisplayDate,
  fmt,
}) => (
  <>
    {/* Search and filters — same unified card style as the other sections, adapted
        to the fields transfer bookings actually have (no Employee filter — these
        bookings don't track which employee created them). */}
    <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 mb-3">
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            placeholder="Search by customer, route, car type, supplier, or flight number"
            value={carQuery}
            onChange={(e) => setCarQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => setCarFiltersOpen(!carFiltersOpen)}
          className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
            carFiltersOpen ? "border-teal-700 text-teal-800 bg-teal-50" : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white"
          }`}
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Filters</span>
          {activeCarFilterCount > 0 && (
            <span className="bg-teal-700 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
              {activeCarFilterCount}
            </span>
          )}
          <ChevronDown size={14} className={`transition-transform ${carFiltersOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {carFiltersOpen && (
        <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-stone-100">
          <div>
            <label className="text-xs text-stone-500 block mb-1">Year</label>
            <MultiSelectDropdown
              label="years"
              icon={Calendar}
              options={carYearsAvailable}
              selected={carSelectedYear}
              onChange={setCarSelectedYear}
              placeholder="All years"
            />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">Month</label>
            <MultiSelectDropdown
              label="months"
              icon={Calendar}
              options={carMonthsAvailable.map((key) => ({ value: key, label: monthLabel(key) }))}
              selected={carSelectedMonth}
              onChange={setCarSelectedMonth}
              placeholder="All months"
            />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">Supplier</label>
            <MultiSelectDropdown
              label="suppliers"
              icon={Building2}
              options={carSuppliersAvailable}
              selected={carSelectedSupplier}
              onChange={setCarSelectedSupplier}
              placeholder="All suppliers"
            />
          </div>
        </div>
      )}

      <AppliedFilters
        groups={[
          multiFilterGroup("Year", "year", carSelectedYear, setCarSelectedYear),
          multiFilterGroup("Month", "month", carSelectedMonth, setCarSelectedMonth, monthLabel),
          multiFilterGroup("Supplier", "supplier", carSelectedSupplier, setCarSelectedSupplier),
          { label: "Search", values: carQuery.trim() ? [{ key: "search", text: `"${carQuery.trim()}"`, onRemove: () => setCarQuery("") }] : [] },
        ]}
        onClearAll={clearAllCarFilters}
      />
    </div>

    {/* Transfer bookings list */}
    {filteredCarBookings.length === 0 ? (
      <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-400">
        <Car size={40} className="mx-auto mb-3 text-stone-300" />
        <p className="text-sm">{visibleCarBookings.length === 0 ? "No transfer bookings yet." : "No transfer bookings match the current search/filters."}</p>
      </div>
    ) : (
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
          <table className="w-full min-w-max text-sm">
            <thead className="bg-stone-50 text-stone-500 text-xs">
              <tr>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">RN</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Entry date</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Customer</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Phone</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Route</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Car type</th>
                <ThFilter label="Supplier" options={carSuppliersAvailable} selected={carSelectedSupplier} onChange={setCarSelectedSupplier} padding="px-1.5 py-0.5" />
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Trip</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Waiting</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Flight #</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Date &amp; time</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Return</th>
                <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Collection</th>
                <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Driver tip</th>
                <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Net</th>
                <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Sold</th>
                <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {(() => {
                const { sorted, rnByRowId } = rankByServiceDate(filteredCarBookings, "entryDate");
                return sorted.map((c) => {
                const net = carNetTotal(c);
                const sold = carSoldTotal(c);
                const profit = carProfitTotal(c);
                return (
                  <tr
                    key={c.id}
                    className={`leading-tight cursor-pointer ${isYearLocked("cars", c.bookingDate) ? "bg-stone-200/70 grayscale hover:bg-stone-200" : "hover:bg-stone-50"}`}
                    onClick={() => { setViewingFileContext(null); setViewingCarBooking(c); }}
                  >
                    <td className="px-1.5 py-0.5 text-stone-400 whitespace-nowrap">{rnByRowId[c.id]}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                      {c.entryDate ? formatDisplayDate(c.entryDate) : "-"}
                    </td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{c.customerName}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{c.phone || "-"}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{c.routeFrom} → {c.routeTo}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{c.carType}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{c.supplier}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{c.isRoundTrip ? "Round trip" : "One way"}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                      {c.hasWaiting ? `${c.waitingHours || 0} h` : "-"}
                    </td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                      {c.startsAtAirport ? (c.flightNumber || "-") : "-"}
                    </td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                      {c.bookingDate ? formatDisplayDate(c.bookingDate) : "-"}
                      {c.bookingTime ? ` · ${c.bookingTime}` : ""}
                    </td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                      {c.isRoundTrip
                        ? `${c.returnDate ? formatDisplayDate(c.returnDate) : "-"}${c.returnTime ? ` · ${c.returnTime}` : ""}`
                        : "-"}
                    </td>
                    <td className="px-1.5 py-0.5 text-right text-stone-700 whitespace-nowrap">
                      {c.collection ? `${fmt(parseFloat(c.collection) || 0)} ${c.currency}` : "-"}
                    </td>
                    <td className="px-1.5 py-0.5 text-right text-stone-700 whitespace-nowrap">
                      {c.driverTip ? `${fmt(parseFloat(c.driverTip) || 0)} ${c.currency}` : "-"}
                    </td>
                    <td className="px-1.5 py-0.5 text-right text-stone-700 whitespace-nowrap">{fmt(net)} {c.netCurrency}</td>
                    <td className="px-1.5 py-0.5 text-right text-stone-700 whitespace-nowrap">{fmt(sold)} {c.soldCurrency}</td>
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

export default CarBookingsTable;