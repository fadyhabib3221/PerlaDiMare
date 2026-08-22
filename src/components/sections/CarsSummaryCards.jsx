import React from "react";
import { Car, TrendingUp, Wallet } from "lucide-react";

const CarsSummaryCards = ({
  hasActiveCarFilter,
  carSelectedYear,
  carSelectedMonth,
  carSelectedSupplier,
  monthLabel,
  currentMonthKey,
  carTotals,
  carCurrentMonthTotals,
  fmt,
}) => (
  <>
    <p className="text-sm text-stone-500 mb-2">
      Totals for: <span className="font-semibold text-stone-700">
        {hasActiveCarFilter ? (
          <>
            {carSelectedYear.length ? carSelectedYear.join(", ") : ""}
            {carSelectedMonth.length ? ` · ${carSelectedMonth.map(monthLabel).join(", ")}` : ""}
            {carSelectedSupplier.length ? ` · ${carSelectedSupplier.join(", ")}` : ""}
          </>
        ) : (
          monthLabel(currentMonthKey)
        )}
      </span>
    </p>
    <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-6">
      <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="bg-stone-100 rounded-xl p-1.5 sm:p-2 text-stone-600 shrink-0"><Car size={18} className="sm:hidden" /><Car size={20} className="hidden sm:block" /></div>
        <div className="min-w-0">
          <p className="text-xs text-stone-500">Bookings</p>
          <p className="text-sm sm:text-lg font-bold truncate">{(hasActiveCarFilter ? carTotals : carCurrentMonthTotals).count}</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="bg-teal-50 rounded-xl p-1.5 sm:p-2 text-teal-900 shrink-0"><Wallet size={18} className="sm:hidden" /><Wallet size={20} className="hidden sm:block" /></div>
        <div className="min-w-0">
          <p className="text-xs text-stone-500">Total sales (EGP)</p>
          <p className="text-sm sm:text-lg font-bold truncate">{fmt((hasActiveCarFilter ? carTotals : carCurrentMonthTotals).sold)}</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="bg-emerald-50 rounded-xl p-1.5 sm:p-2 text-emerald-700 shrink-0"><TrendingUp size={18} className="sm:hidden" /><TrendingUp size={20} className="hidden sm:block" /></div>
        <div className="min-w-0">
          <p className="text-xs text-stone-500">Total profit (EGP)</p>
          <p className="text-sm sm:text-lg font-bold text-emerald-700 truncate">{fmt((hasActiveCarFilter ? carTotals : carCurrentMonthTotals).profit)}</p>
        </div>
      </div>
    </div>
  </>
);

export default CarsSummaryCards;
