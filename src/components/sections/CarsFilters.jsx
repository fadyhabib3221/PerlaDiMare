import React from "react";
import { Building2, Calendar, ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import AppliedFilters, { multiFilterGroup } from "../AppliedFilters";
import MultiSelectDropdown from "../MultiSelectDropdown";

const CarsFilters = ({
  carQuery,
  setCarQuery,
  carFiltersOpen,
  setCarFiltersOpen,
  carSelectedYear,
  setCarSelectedYear,
  carSelectedMonth,
  setCarSelectedMonth,
  carSelectedSupplier,
  setCarSelectedSupplier,
  carYearsAvailable,
  carMonthsAvailable,
  carSuppliersAvailable,
  activeCarFilterCount,
  monthLabel,
  clearAllCarFilters,
}) => (
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
);

export default CarsFilters;
