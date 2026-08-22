import React from "react";
import { Ticket, Wallet, Receipt, TrendingUp } from "lucide-react";

const FlightsSummaryCards = ({
  // Context & Status
  currentUser,
  restoreError,
  restoreSuccess,
  
  // Computed values
  monthlyBreakdown,
  currentMonthKey,
  hasActiveFilter,
  totals,
  
  // Filter labels for display
  selectedYear,
  selectedMonth,
  selectedCompany,
  selectedEmployee,
  selectedSupplier,
  
  // Utility functions
  fmt,
  monthLabel,
}) => {
  const currentMonthTotals =
    monthlyBreakdown.find((m) => m.key === currentMonthKey) ||
    { count: 0, total: 0, net: 0, profit: 0 };
  const shown = hasActiveFilter ? totals : currentMonthTotals;

  return (
    <>
      {/* Restore message (if admin and message exists) */}
      {currentUser.isAdmin && (restoreError || restoreSuccess) && (
        <div
          className={`text-sm rounded-xl px-3 py-2 mb-4 ${
            restoreError
              ? "bg-red-50 text-red-700"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {restoreError || restoreSuccess}
        </div>
      )}

      {/* Filter label - shows current filter selection */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-stone-500">
          Totals for:{" "}
          <span className="font-semibold text-stone-700">
            {hasActiveFilter ? (
              <>
                {selectedYear.length ? selectedYear.join(", ") : ""}
                {selectedMonth.length
                  ? ` · ${selectedMonth.map(monthLabel).join(", ")}`
                  : ""}
                {selectedCompany.length ? ` · ${selectedCompany.join(", ")}` : ""}
                {selectedEmployee.length
                  ? ` · ${selectedEmployee.join(", ")}`
                  : ""}
                {selectedSupplier.length
                  ? ` · ${selectedSupplier.join(", ")}`
                  : ""}
              </>
            ) : (
              monthLabel(currentMonthKey)
            )}
          </span>
        </p>
      </div>

      {/* Summary cards */}
      <div className="flex overflow-x-auto gap-2 sm:gap-3 mb-6 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none">
        {/* Tickets count card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 shrink-0 snap-start basis-[42%] sm:basis-0 sm:flex-1">
          <div className="bg-stone-100 rounded-xl p-1.5 sm:p-2 text-stone-600 shrink-0">
            <Ticket size={18} className="sm:hidden" />
            <Ticket size={20} className="hidden sm:block" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-stone-500 whitespace-nowrap">Tickets</p>
            <p className="text-sm sm:text-lg font-bold whitespace-nowrap">
              {shown.count}
            </p>
          </div>
        </div>

        {/* Total sales card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 shrink-0 snap-start basis-[42%] sm:basis-0 sm:flex-1">
          <div className="bg-teal-50 rounded-xl p-1.5 sm:p-2 text-teal-900 shrink-0">
            <Wallet size={18} className="sm:hidden" />
            <Wallet size={20} className="hidden sm:block" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-stone-500 whitespace-nowrap">
              Total sales (EGP)
            </p>
            <p className="text-sm sm:text-lg font-bold whitespace-nowrap">
              {fmt(shown.total)}
            </p>
          </div>
        </div>

        {/* Total net card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 shrink-0 snap-start basis-[42%] sm:basis-0 sm:flex-1">
          <div className="bg-amber-50 rounded-xl p-1.5 sm:p-2 text-amber-700 shrink-0">
            <Receipt size={18} className="sm:hidden" />
            <Receipt size={20} className="hidden sm:block" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-stone-500 whitespace-nowrap">
              Total net (EGP)
            </p>
            <p className="text-sm sm:text-lg font-bold whitespace-nowrap">
              {fmt(shown.net)}
            </p>
          </div>
        </div>

        {/* Total profit card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 shrink-0 snap-start basis-[42%] sm:basis-0 sm:flex-1">
          <div className="bg-emerald-50 rounded-xl p-1.5 sm:p-2 text-emerald-700 shrink-0">
            <TrendingUp size={18} className="sm:hidden" />
            <TrendingUp size={20} className="hidden sm:block" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-stone-500 whitespace-nowrap">
              Total profit (EGP)
            </p>
            <p className="text-sm sm:text-lg font-bold text-emerald-700 whitespace-nowrap">
              {fmt(shown.profit)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightsSummaryCards;
