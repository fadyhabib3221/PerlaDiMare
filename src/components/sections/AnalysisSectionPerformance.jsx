import React from "react";

const AnalysisSectionPerformance = ({ bySection, totalBookings, maxSectionRevenue, fmt }) => (
  <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6">
    <h3 className="text-sm font-bold text-stone-700 mb-4">Performance by Section</h3>
    {totalBookings === 0 ? (
      <p className="text-xs text-stone-400">No bookings yet.</p>
    ) : (
      <div className="space-y-3">
        {bySection.map((s) => (
          <div key={s.key}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-stone-700">{s.label}</span>
              <span className="text-stone-500">
                {s.count} bookings · Revenue {fmt(s.revenue)} EGP ·{" "}
                <span className={s.profit >= 0 ? "text-emerald-700" : "text-red-600"}>
                  Profit {fmt(s.profit)} EGP
                </span>
              </span>
            </div>
            <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${s.color}`}
                style={{ width: `${Math.max(2, (s.revenue / maxSectionRevenue) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default AnalysisSectionPerformance;
