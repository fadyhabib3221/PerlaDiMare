import React from "react";

const AnalysisSupplierPerformance = ({ topSuppliers, maxSupplierProfit, fmt }) => (
  <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6">
    <h3 className="text-sm font-bold text-stone-700 mb-4">Top 5 Suppliers by Profit</h3>
    {topSuppliers.length === 0 ? (
      <p className="text-xs text-stone-400">No supplier data yet.</p>
    ) : (
      <div className="space-y-3">
        {topSuppliers.map((s) => (
          <div key={s.name}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-stone-700 truncate">{s.name}</span>
              <span className="text-stone-500 shrink-0 ml-2">{fmt(s.profit)} EGP</span>
            </div>
            <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-600"
                style={{ width: `${Math.max(2, (Math.abs(s.profit) / maxSupplierProfit) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default AnalysisSupplierPerformance;
