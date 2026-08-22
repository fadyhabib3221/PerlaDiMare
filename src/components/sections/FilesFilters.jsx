import React from "react";
import { Building2, Calendar, ChevronDown, Search, SlidersHorizontal, User } from "lucide-react";
import AppliedFilters, { multiFilterGroup } from "../AppliedFilters";
import MultiSelectDropdown from "../MultiSelectDropdown";

const FilesFilters = ({
  fileQuery,
  setFileQuery,
  fileFiltersOpen,
  setFileFiltersOpen,
  fileSelectedYear,
  setFileSelectedYear,
  fileSelectedCompany,
  setFileSelectedCompany,
  fileSelectedEmployee,
  setFileSelectedEmployee,
  fileYearsAvailable,
  fileCompaniesAvailable,
  fileEmployeesAvailable,
  activeFileFilterCount,
  clearAllFileFilters,
}) => (
  <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 mb-4">
    <div className="flex items-stretch gap-2">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
          placeholder="Search by serial, company, notes, or employee"
          value={fileQuery}
          onChange={(e) => setFileQuery(e.target.value)}
        />
      </div>
      <button
        type="button"
        onClick={() => setFileFiltersOpen(!fileFiltersOpen)}
        className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
          fileFiltersOpen ? "border-teal-700 text-teal-800 bg-teal-50" : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white"
        }`}
      >
        <SlidersHorizontal size={16} />
        <span className="hidden sm:inline">Filters</span>
        {activeFileFilterCount > 0 && (
          <span className="bg-teal-700 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
            {activeFileFilterCount}
          </span>
        )}
        <ChevronDown size={14} className={`transition-transform ${fileFiltersOpen ? "rotate-180" : ""}`} />
      </button>
    </div>

    {fileFiltersOpen && (
      <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-stone-100">
        <div>
          <label className="text-xs text-stone-500 block mb-1">Year</label>
          <MultiSelectDropdown
            label="years"
            icon={Calendar}
            options={fileYearsAvailable}
            selected={fileSelectedYear}
            onChange={setFileSelectedYear}
            placeholder="All years"
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Company</label>
          <MultiSelectDropdown
            label="companies"
            icon={Building2}
            options={fileCompaniesAvailable}
            selected={fileSelectedCompany}
            onChange={setFileSelectedCompany}
            placeholder="All companies"
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">By</label>
          <MultiSelectDropdown
            label="employees"
            icon={User}
            options={fileEmployeesAvailable}
            selected={fileSelectedEmployee}
            onChange={setFileSelectedEmployee}
            placeholder="All employees"
          />
        </div>
      </div>
    )}

    <AppliedFilters
      groups={[
        multiFilterGroup("Year", "year", fileSelectedYear, setFileSelectedYear),
        multiFilterGroup("Company", "company", fileSelectedCompany, setFileSelectedCompany),
        multiFilterGroup("By", "employee", fileSelectedEmployee, setFileSelectedEmployee),
        { label: "Search", values: fileQuery.trim() ? [{ key: "search", text: `"${fileQuery.trim()}"`, onRemove: () => setFileQuery("") }] : [] },
      ]}
      onClearAll={clearAllFileFilters}
    />
  </div>
);

export default FilesFilters;
