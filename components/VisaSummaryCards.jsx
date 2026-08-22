import React from "react";
import { TrendingUp, Wallet } from "lucide-react";

function PassportIcon({ size = 22, className = "" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="10" r="3.2" /><path d="M12 6.8v6.4M8.8 10h6.4M9 17.5h6" /></svg>;
}

export default function VisaSummaryCards({ hasActiveFilter, filteredTotals, currentMonthTotals, formatNumber }) {
  const totals = hasActiveFilter ? filteredTotals : currentMonthTotals;
  return <div className="flex overflow-x-auto gap-2 sm:gap-3 mb-6 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none">
    <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 shrink-0 snap-start basis-[42%] sm:basis-0 sm:flex-1"><div className="bg-stone-100 rounded-xl p-1.5 sm:p-2 text-stone-600 shrink-0"><PassportIcon size={18} className="sm:hidden" /><PassportIcon size={20} className="hidden sm:block" /></div><div className="min-w-0"><p className="text-xs text-stone-500 whitespace-nowrap">Applicants</p><p className="text-sm sm:text-lg font-bold whitespace-nowrap">{totals.count}</p></div></div>
    <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 shrink-0 snap-start basis-[42%] sm:basis-0 sm:flex-1"><div className="bg-teal-50 rounded-xl p-1.5 sm:p-2 text-teal-900 shrink-0"><Wallet size={18} className="sm:hidden" /><Wallet size={20} className="hidden sm:block" /></div><div className="min-w-0"><p className="text-xs text-stone-500 whitespace-nowrap">Total sales (EGP)</p><p className="text-sm sm:text-lg font-bold whitespace-nowrap">{formatNumber(totals.sold)}</p></div></div>
    <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 shrink-0 snap-start basis-[42%] sm:basis-0 sm:flex-1"><div className="bg-emerald-50 rounded-xl p-1.5 sm:p-2 text-emerald-700 shrink-0"><TrendingUp size={18} className="sm:hidden" /><TrendingUp size={20} className="hidden sm:block" /></div><div className="min-w-0"><p className="text-xs text-stone-500 whitespace-nowrap">Total profit (EGP)</p><p className="text-sm sm:text-lg font-bold text-emerald-700 whitespace-nowrap">{formatNumber(totals.profit)}</p></div></div>
  </div>;
}
