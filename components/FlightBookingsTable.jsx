import { Building2, Calendar, ChevronDown, Download, Plane, Search, SlidersHorizontal, User } from "lucide-react";

export default function FlightBookingsTable({
  query, setQuery, filtersOpen, setFiltersOpen, activeFilterCount, hasActiveFilter, exportFiltered,
  yearsAvailable, selectedYear, setSelectedYear, monthsAvailable, selectedMonth, setSelectedMonth,
  monthLabel, companiesAvailable, selectedCompany, setSelectedCompany, employeesAvailable,
  selectedEmployee, setSelectedEmployee, suppliersAvailable, selectedSupplier, setSelectedSupplier,
  airlinesAvailable, selectedAirline, setSelectedAirline, suggestions, AIRLINE_CODES, AIRPORTS,
  MultiSelectDropdown, AppliedFilters, ThFilter, multiFilterGroup,
  getAirlineIata, clearAllFilters, filtered, visibleTickets, sortedFiltered, buildTicketRows,
}) {
  return (
    <>
      {/* Search and filters — one unified card: search + a "Filters" toggle with a
          count badge, an optional expanded panel with the dropdowns, and a row of
          removable chips for whatever is currently active. */}
      <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 mb-3">
        <div className="flex items-stretch gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              placeholder="Search by employee, company, ticket number, customer, destination, or airline"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="button" onClick={() => setFiltersOpen(!filtersOpen)} className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${filtersOpen ? "border-teal-700 text-teal-800 bg-teal-50" : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white"}`}>
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && <span className="bg-teal-700 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">{activeFilterCount}</span>}
            <ChevronDown size={14} className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
          </button>
          <button type="button" onClick={() => { if (hasActiveFilter) exportFiltered(); }} disabled={!hasActiveFilter} title={hasActiveFilter ? "" : "Select at least one filter (year, month, company, employee, supplier, or search) before exporting"} className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${hasActiveFilter ? "text-teal-800 border-teal-800 hover:bg-teal-50 bg-white" : "text-stone-400 border-stone-200 cursor-not-allowed bg-white"}`}>
            <Download size={16} />
            <span className="hidden sm:inline">{hasActiveFilter ? "Export to Excel" : "Select a filter to export"}</span>
          </button>
        </div>

        {filtersOpen && <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-stone-100">
          <div><label className="text-xs text-stone-500 block mb-1">Year</label><MultiSelectDropdown label="years" icon={Calendar} options={yearsAvailable} selected={selectedYear} onChange={setSelectedYear} placeholder="All years" /></div>
          <div><label className="text-xs text-stone-500 block mb-1">Month</label><MultiSelectDropdown label="months" icon={Calendar} options={monthsAvailable.map((key) => ({ value: key, label: monthLabel(key) }))} selected={selectedMonth} onChange={setSelectedMonth} placeholder="All months" /></div>
          <div><label className="text-xs text-stone-500 block mb-1">Company</label><MultiSelectDropdown label="companies" icon={Building2} options={companiesAvailable} selected={selectedCompany} onChange={setSelectedCompany} placeholder="All companies" /></div>
          <div><label className="text-xs text-stone-500 block mb-1">By</label><MultiSelectDropdown label="employees" icon={User} options={employeesAvailable} selected={selectedEmployee} onChange={setSelectedEmployee} placeholder="All employees" /></div>
          <div><label className="text-xs text-stone-500 block mb-1">Supplier</label><MultiSelectDropdown label="suppliers" icon={Plane} options={suppliersAvailable} selected={selectedSupplier} onChange={setSelectedSupplier} placeholder="All suppliers" /></div>
        </div>}

        <AppliedFilters groups={[
          multiFilterGroup("Year", "year", selectedYear, setSelectedYear),
          multiFilterGroup("Month", "month", selectedMonth, setSelectedMonth, monthLabel),
          multiFilterGroup("Company", "company", selectedCompany, setSelectedCompany),
          multiFilterGroup("By", "employee", selectedEmployee, setSelectedEmployee),
          multiFilterGroup("Supplier", "supplier", selectedSupplier, setSelectedSupplier),
          multiFilterGroup("Airline", "airline", selectedAirline, setSelectedAirline, (a) => getAirlineIata(a) || a),
          { label: "Search", values: query.trim() ? [{ key: "search", text: `"${query.trim()}"`, onRemove: () => setQuery("") }] : [] },
        ]} onClearAll={clearAllFilters} />
      </div>

      <datalist id="airline-suggestions">
        {suggestions.airlines.map((code) => <option key={`u-${code}`} value={code} />)}
        {AIRLINE_CODES.map((a) => <option key={`a-${a.iata}`} value={a.iata} label={`${a.iata} — ${a.name}`} />)}
      </datalist>
      <datalist id="city-suggestions">
        {suggestions.cities.map((name) => <option key={`u-${name}`} value={name} />)}
        {AIRPORTS.map((entry) => <option key={`p-${entry}`} value={entry} />)}
      </datalist>

      {/* Ticket list */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        {filtered.length === 0 ? <p className="text-center text-stone-400 text-sm py-10">{visibleTickets.length === 0 ? "No tickets recorded yet" : "No results match your search"}</p> : (
          <div className="overflow-x-auto rounded-xl border border-stone-200" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
            <table className="w-full min-w-max text-xs border-collapse">
              <thead><tr className="bg-teal-50/60 text-teal-800 text-[11px] uppercase tracking-wide border-b-2 border-teal-200">
                <th className="text-left px-1 py-0.5 font-semibold whitespace-nowrap">RN</th>
                <ThFilter label="By" options={employeesAvailable} selected={selectedEmployee} onChange={setSelectedEmployee} />
                <th className="text-left px-1 py-0.5 font-semibold whitespace-nowrap">Date</th><th className="text-left px-1 py-0.5 font-semibold whitespace-nowrap">Customer</th><th className="text-left px-1 py-0.5 font-semibold whitespace-nowrap">Ticket #</th>
                <ThFilter label="Airline" options={airlinesAvailable} selected={selectedAirline} onChange={setSelectedAirline} />
                <th className="text-left px-1 py-0.5 font-semibold whitespace-nowrap">Route</th><th className="text-right px-1 py-0.5 font-semibold whitespace-nowrap">Sold price</th><th className="text-right px-1 py-0.5 font-semibold whitespace-nowrap">Net price</th><th className="text-right px-1 py-0.5 font-semibold whitespace-nowrap">Profit</th>
                <ThFilter label="Company" options={companiesAvailable} selected={selectedCompany} onChange={setSelectedCompany} /><ThFilter label="Supplier" options={suppliersAvailable} selected={selectedSupplier} onChange={setSelectedSupplier} />
              </tr></thead>
              <tbody>{(() => {
                const allRows = sortedFiltered.flatMap((t) => buildTicketRows(t));
                const byDateAsc = [...allRows].sort((a, b) => {
                  if (!a.sortDate && !b.sortDate) return 0; if (!a.sortDate) return 1; if (!b.sortDate) return -1;
                  if (a.sortDate !== b.sortDate) return a.sortDate.localeCompare(b.sortDate);
                  if (a.bookingId === b.bookingId) return a.orderIndex - b.orderIndex;
                  return (a.ticketNumber || "").localeCompare(b.ticketNumber || "", undefined, { numeric: true, sensitivity: "base" });
                });
                const rnByRid = {}; let ticketCount = 0; let refundCount = 0;
                byDateAsc.forEach((row) => { if (row.type === "refund") { refundCount += 1; rnByRid[row.rid] = `R${refundCount}`; } else { ticketCount += 1; rnByRid[row.rid] = ticketCount; } });
                return allRows.sort((a, b) => {
                  if (!a.sortDate && !b.sortDate) return 0; if (!a.sortDate) return 1; if (!b.sortDate) return -1;
                  if (a.sortDate !== b.sortDate) return b.sortDate.localeCompare(a.sortDate);
                  if (a.bookingId === b.bookingId) return b.orderIndex - a.orderIndex;
                  return (b.ticketNumber || "").localeCompare(a.ticketNumber || "", undefined, { numeric: true, sensitivity: "base" });
                }).map((row) => row.render(rnByRid[row.rid]));
              })()}</tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}