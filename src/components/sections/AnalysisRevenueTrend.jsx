import React from "react";

const AnalysisRevenueTrend = ({ monthlyTrend, maxMonthlyRevenue, fmt }) => (
  <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6">
    <h3 className="text-sm font-bold text-stone-700 mb-4">Revenue &amp; Profit — Last 6 Months</h3>
    <div className="flex items-end justify-between gap-2 h-36">
      {monthlyTrend.map((m) => (
        <div key={m.month} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
          <div className="w-full flex items-end justify-center gap-1 h-full">
            <div
              className="w-1/2 max-w-[18px] rounded-t-md bg-teal-200"
              style={{ height: `${Math.max(2, (m.revenue / maxMonthlyRevenue) * 100)}%` }}
              title={`Revenue: ${fmt(m.revenue)} EGP`}
            />
            <div
              className={`w-1/2 max-w-[18px] rounded-t-md ${m.profit >= 0 ? "bg-teal-700" : "bg-red-400"}`}
              style={{ height: `${Math.max(2, (Math.abs(m.profit) / maxMonthlyRevenue) * 100)}%` }}
              title={`Profit: ${fmt(m.profit)} EGP`}
            />
          </div>
          <span className="text-[10px] text-stone-500 font-semibold">{m.label}</span>
        </div>
      ))}
    </div>
    <div className="flex items-center gap-4 mt-3 text-[11px] text-stone-500">
      <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-teal-200" /> Revenue</span>
      <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-teal-700" /> Profit</span>
    </div>
  </div>
);

export default AnalysisRevenueTrend;
