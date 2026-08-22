import React from "react";
import { Building2, TrendingUp, Wallet } from "lucide-react";

export default function HotelSummaryCards({ hasActiveFilter, filteredTotals, currentMonthTotals, formatNumber }) {
  const totals = hasActiveFilter ? filteredTotals : currentMonthTotals;
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-6">
      <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="bg-stone-100 rounded-xl p-1.5 sm:p-2 text-stone-600 shrink-0"><Building2 size={18} className="sm:hidden" /><Building2 size={20} className="hidden sm:block" /></div>
        <div className="min-w-0"><p className="text-xs text-stone-500">Bookings</p><p className="text-sm sm:text-lg font-bold truncate">{totals.count}</p></div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="bg-teal-50 rounded-xl p-1.5 sm:p-2 text-teal-900 shrink-0"><Wallet size={18} className="sm:hidden" /><Wallet size={20} className="hidden sm:block" /></div>
        <div className="min-w-0"><p className="text-xs text-stone-500">Total sales (EGP)</p><p className="text-sm sm:text-lg font-bold truncate">{formatNumber(totals.sold)}</p></div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="bg-emerald-50 rounded-xl p-1.5 sm:p-2 text-emerald-700 shrink-0"><TrendingUp size={18} className="sm:hidden" /><TrendingUp size={20} className="hidden sm:block" /></div>
        <div className="min-w-0"><p className="text-xs text-stone-500">Total profit (EGP)</p><p className="text-sm sm:text-lg font-bold text-emerald-700 truncate">{formatNumber(totals.profit)}</p></div>
      </div>
    </div>
  );
}
