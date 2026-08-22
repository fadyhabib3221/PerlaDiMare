import React from "react";
import { TrendingUp, Wallet } from "lucide-react";
import PassportIcon from "../PassportIcon";

const VisaSummaryCards = ({
  hasActiveVisaFilter,
  visaSelectedYear,
  visaSelectedMonth,
  visaSelectedEmployee,
  visaSelectedSupplier,
  monthLabel,
  currentMonthKey,
  visaTotals,
  visaCurrentMonthTotals,
  fmt,
}) => (
  <>
    <p className="text-sm text-stone-500 mb-2">
      Totals for: <span className="font-semibold text-stone-700">
        {hasActiveVisaFilter ? (
          <>
            {visaSelectedYear.length ? visaSelectedYear.join(", ") : ""}
            {visaSelectedMonth.length ? ` · ${visaSelectedMonth.map(monthLabel).join(", ")}` : ""}
            {visaSelectedEmployee.length ? ` · ${visaSelectedEmployee.join(", ")}` : ""}
            {visaSelectedSupplier.length ? ` · ${visaSelectedSupplier.join(", ")}` : ""}
          </>
        ) : (
          monthLabel(currentMonthKey)
        )}
      </span>
    </p>
    <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-6">
      <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="bg-stone-100 rounded-xl p-1.5 sm:p-2 text-stone-600 shrink-0"><PassportIcon size={18} className="sm:hidden" /><PassportIcon size={20} className="hidden sm:block" /></div>
        <div className="min-w-0">
          <p className="text-xs text-stone-500">Applicants</p>
          <p className="text-sm sm:text-lg font-bold truncate">{(hasActiveVisaFilter ? visaTotals : visaCurrentMonthTotals).count}</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="bg-teal-50 rounded-xl p-1.5 sm:p-2 text-teal-900 shrink-0"><Wallet size={18} className="sm:hidden" /><Wallet size={20} className="hidden sm:block" /></div>
        <div className="min-w-0">
          <p className="text-xs text-stone-500">Total sales (EGP)</p>
          <p className="text-sm sm:text-lg font-bold truncate">{fmt((hasActiveVisaFilter ? visaTotals : visaCurrentMonthTotals).sold)}</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="bg-emerald-50 rounded-xl p-1.5 sm:p-2 text-emerald-700 shrink-0"><TrendingUp size={18} className="sm:hidden" /><TrendingUp size={20} className="hidden sm:block" /></div>
        <div className="min-w-0">
          <p className="text-xs text-stone-500">Total profit (EGP)</p>
          <p className="text-sm sm:text-lg font-bold text-emerald-700 truncate">{fmt((hasActiveVisaFilter ? visaTotals : visaCurrentMonthTotals).profit)}</p>
        </div>
      </div>
    </div>
  </>
);

export default VisaSummaryCards;
