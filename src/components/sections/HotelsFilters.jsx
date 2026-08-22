import React from "react";
import {
  Search, SlidersHorizontal, ChevronDown,
  Calendar, Building2, User,
} from "lucide-react";
import MultiSelectDropdown from "../MultiSelectDropdown";
import AppliedFilters, { multiFilterGroup } from "../AppliedFilters";

const HotelsFilters = ({
  hotelQuery,
  setHotelQuery,
  hotelFiltersOpen,
  setHotelFiltersOpen,
  hotelSelectedYear,
  setHotelSelectedYear,
  hotelSelectedMonth,
  setHotelSelectedMonth,
  hotelSelectedEmployee,
  setHotelSelectedEmployee,
  hotelSelectedSupplier,
  setHotelSelectedSupplier,
  hotelSelectedHotelName,
  setHotelSelectedHotelName,
  hotelYearsAvailable,
  hotelMonthsAvailable,
  hotelEmployeesAvailable,
  hotelSuppliersAvailable,
  hotelNamesAvailable,
  activeHotelFilterCount,
  monthLabel,
  clearAllHotelFilters,
}) => (
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
          <MultiSelectDropdown
            label="years"
            icon={Calendar}
            options={hotelYearsAvailable}
            selected={hotelSelectedYear}
            onChange={setHotelSelectedYear}
            placeholder="All years"
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Month</label>
          <MultiSelectDropdown
            label="months"
            icon={Calendar}
            options={hotelMonthsAvailable.map((key) => ({ value: key, label: monthLabel(key) }))}
            selected={hotelSelectedMonth}
            onChange={setHotelSelectedMonth}
            placeholder="All months"
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">By</label>
          <MultiSelectDropdown
            label="employees"
            icon={User}
            options={hotelEmployeesAvailable}
            selected={hotelSelectedEmployee}
            onChange={setHotelSelectedEmployee}
            placeholder="All employees"
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Supplier</label>
          <MultiSelectDropdown
            label="suppliers"
            icon={Building2}
            options={hotelSuppliersAvailable}
            selected={hotelSelectedSupplier}
            onChange={setHotelSelectedSupplier}
            placeholder="All suppliers"
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Hotel</label>
          <MultiSelectDropdown
            label="hotels"
            icon={Building2}
            options={hotelNamesAvailable}
            selected={hotelSelectedHotelName}
            onChange={setHotelSelectedHotelName}
            placeholder="All hotels"
          />
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
);

export default HotelsFilters;
