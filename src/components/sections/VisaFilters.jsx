import React from "react";
import { Building2, Calendar, ChevronDown, Search, SlidersHorizontal, User } from "lucide-react";
import AppliedFilters, { multiFilterGroup } from "../AppliedFilters";
import MultiSelectDropdown from "../MultiSelectDropdown";

const VisaFilters = ({
  visaQuery,
  setVisaQuery,
  visaFiltersOpen,
  setVisaFiltersOpen,
  visaSelectedYear,
  setVisaSelectedYear,
  visaSelectedMonth,
  setVisaSelectedMonth,
  visaSelectedEmployee,
  setVisaSelectedEmployee,
  visaSelectedSupplier,
  setVisaSelectedSupplier,
  visaYearsAvailable,
  visaMonthsAvailable,
  visaEmployeesAvailable,
  visaSuppliersAvailable,
  activeVisaFilterCount,
  monthLabel,
  clearAllVisaFilters,
}) => (
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
          <MultiSelectDropdown
            label="years"
            icon={Calendar}
            options={visaYearsAvailable}
            selected={visaSelectedYear}
            onChange={setVisaSelectedYear}
            placeholder="All years"
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Month</label>
          <MultiSelectDropdown
            label="months"
            icon={Calendar}
            options={visaMonthsAvailable.map((key) => ({ value: key, label: monthLabel(key) }))}
            selected={visaSelectedMonth}
            onChange={setVisaSelectedMonth}
            placeholder="All months"
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">By</label>
          <MultiSelectDropdown
            label="employees"
            icon={User}
            options={visaEmployeesAvailable}
            selected={visaSelectedEmployee}
            onChange={setVisaSelectedEmployee}
            placeholder="All employees"
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Supplier</label>
          <MultiSelectDropdown
            label="suppliers"
            icon={Building2}
            options={visaSuppliersAvailable}
            selected={visaSelectedSupplier}
            onChange={setVisaSelectedSupplier}
            placeholder="All suppliers"
          />
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
);

export default VisaFilters;
