import React from "react";
import {
  Search, SlidersHorizontal, ChevronDown, Download,
  Calendar, Building2, User, Plane,
} from "lucide-react";
import MultiSelectDropdown from "../MultiSelectDropdown";
import AppliedFilters, { multiFilterGroup } from "../AppliedFilters";

const FlightsFilters = ({
  // Search state
  query,
  setQuery,

  // Filter toggle
  filtersOpen,
  setFiltersOpen,

  // Year filter
  selectedYear,
  setSelectedYear,

  // Month filter
  selectedMonth,
  setSelectedMonth,

  // Company filter
  selectedCompany,
  setSelectedCompany,

  // Employee filter
  selectedEmployee,
  setSelectedEmployee,

  // Supplier filter
  selectedSupplier,
  setSelectedSupplier,

  // Airline filter
  selectedAirline,
  setSelectedAirline,

  // Filter status
  activeFilterCount,
  hasActiveFilter,

  // Available options
  yearsAvailable,
  monthsAvailable,
  companiesAvailable,
  employeesAvailable,
  suppliersAvailable,
  suggestions,
  AIRLINE_CODES,

  // Handler functions
  exportFiltered,
  clearAllFilters,
  monthLabel,
  getAirlineIata,
}) => {
  return (
    <>
      {/* Search and filters — one unified card: search + a "Filters" toggle with a
          count badge, an optional expanded panel with the dropdowns, and a row of
          removable chips for whatever is currently active. */}
      <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 mb-3">
        <div className="flex items-stretch gap-2">
          {/* Search input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              placeholder="Search by employee, company, ticket number, customer, destination, or airline"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Filters toggle button */}
          <button
            type="button"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
              filtersOpen
                ? "border-teal-700 text-teal-800 bg-teal-50"
                : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white"
            }`}
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-teal-700 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown
              size={14}
              className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Export button */}
          <button
            type="button"
            onClick={() => {
              if (hasActiveFilter) exportFiltered();
            }}
            disabled={!hasActiveFilter}
            title={
              hasActiveFilter
                ? ""
                : "Select at least one filter (year, month, company, employee, supplier, or search) before exporting"
            }
            className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
              hasActiveFilter
                ? "text-teal-800 border-teal-800 hover:bg-teal-50 bg-white"
                : "text-stone-400 border-stone-200 cursor-not-allowed bg-white"
            }`}
          >
            <Download size={16} />
            <span className="hidden sm:inline">
              {hasActiveFilter ? "Export to Excel" : "Select a filter to export"}
            </span>
          </button>
        </div>

        {/* Expanded filters panel */}
        {filtersOpen && (
          <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-stone-100">
            <div>
              <label className="text-xs text-stone-500 block mb-1">Year</label>
              <MultiSelectDropdown
                label="years"
                icon={Calendar}
                options={yearsAvailable}
                selected={selectedYear}
                onChange={setSelectedYear}
                placeholder="All years"
              />
            </div>
            <div>
              <label className="text-xs text-stone-500 block mb-1">Month</label>
              <MultiSelectDropdown
                label="months"
                icon={Calendar}
                options={monthsAvailable.map((key) => ({
                  value: key,
                  label: monthLabel(key),
                }))}
                selected={selectedMonth}
                onChange={setSelectedMonth}
                placeholder="All months"
              />
            </div>
            <div>
              <label className="text-xs text-stone-500 block mb-1">Company</label>
              <MultiSelectDropdown
                label="companies"
                icon={Building2}
                options={companiesAvailable}
                selected={selectedCompany}
                onChange={setSelectedCompany}
                placeholder="All companies"
              />
            </div>
            <div>
              <label className="text-xs text-stone-500 block mb-1">By</label>
              <MultiSelectDropdown
                label="employees"
                icon={User}
                options={employeesAvailable}
                selected={selectedEmployee}
                onChange={setSelectedEmployee}
                placeholder="All employees"
              />
            </div>
            <div>
              <label className="text-xs text-stone-500 block mb-1">Supplier</label>
              <MultiSelectDropdown
                label="suppliers"
                icon={Plane}
                options={suppliersAvailable}
                selected={selectedSupplier}
                onChange={setSelectedSupplier}
                placeholder="All suppliers"
              />
            </div>
          </div>
        )}

        {/* Applied filters - removable chips */}
        <AppliedFilters
          groups={[
            multiFilterGroup("Year", "year", selectedYear, setSelectedYear),
            multiFilterGroup("Month", "month", selectedMonth, setSelectedMonth, monthLabel),
            multiFilterGroup("Company", "company", selectedCompany, setSelectedCompany),
            multiFilterGroup("By", "employee", selectedEmployee, setSelectedEmployee),
            multiFilterGroup(
              "Supplier",
              "supplier",
              selectedSupplier,
              setSelectedSupplier
            ),
            multiFilterGroup(
              "Airline",
              "airline",
              selectedAirline,
              setSelectedAirline,
              (a) => getAirlineIata(a) || a
            ),
            {
              label: "Search",
              values: query.trim()
                ? [
                    {
                      key: "search",
                      text: `"${query.trim()}"`,
                      onRemove: () => setQuery(""),
                    },
                  ]
                : [],
            },
          ]}
          onClearAll={clearAllFilters}
        />
      </div>

      {/* Datalists for autocomplete suggestions */}
      <datalist id="airline-suggestions">
        {suggestions.airlines.map((code) => (
          <option key={`u-${code}`} value={code} />
        ))}
        {AIRLINE_CODES.map((a) => (
          <option
            key={`a-${a.iata}`}
            value={a.iata}
            label={`${a.iata} — ${a.name}`}
          />
        ))}
      </datalist>
      <datalist id="city-suggestions">
        {suggestions.cities.map((name) => (
          <option key={`u-${name}`} value={name} />
        ))}
      </datalist>
    </>
  );
};

export default FlightsFilters;
