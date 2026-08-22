import React from "react";

const AnalysisSummaryCards = ({
  totalRevenue,
  totalCost,
  totalProfit,
  marginPct,
  totalBookings,
  avgProfit,
  fmt,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
    <div className="bg-white rounded-2xl border border-stone-200 p-4">
      <p className="text-xs text-stone-500 mb-1">Total Revenue</p>
      <p className="text-lg font-bold text-stone-800">{fmt(totalRevenue)} EGP</p>
    </div>
    <div className="bg-white rounded-2xl border border-stone-200 p-4">
      <p className="text-xs text-stone-500 mb-1">Total Cost</p>
      <p className="text-lg font-bold text-stone-800">{fmt(totalCost)} EGP</p>
    </div>
    <div className="bg-white rounded-2xl border border-stone-200 p-4">
      <p className="text-xs text-stone-500 mb-1">Total Profit</p>
      <p className={`text-lg font-bold ${totalProfit >= 0 ? "text-emerald-700" : "text-red-600"}`}>
        {fmt(totalProfit)} EGP
      </p>
    </div>
    <div className="bg-white rounded-2xl border border-stone-200 p-4">
      <p className="text-xs text-stone-500 mb-1">Profit Margin</p>
      <p className={`text-lg font-bold ${marginPct >= 0 ? "text-teal-800" : "text-red-600"}`}>
        {fmt(marginPct)}%
      </p>
    </div>
    <div className="bg-white rounded-2xl border border-stone-200 p-4">
      <p className="text-xs text-stone-500 mb-1">Total Bookings</p>
      <p className="text-lg font-bold text-stone-800">{fmt(totalBookings)}</p>
    </div>
    <div className="bg-white rounded-2xl border border-stone-200 p-4">
      <p className="text-xs text-stone-500 mb-1">Avg. Profit / Booking</p>
      <p className="text-lg font-bold text-stone-800">{fmt(avgProfit)} EGP</p>
    </div>
  </div>
);

export default AnalysisSummaryCards;
