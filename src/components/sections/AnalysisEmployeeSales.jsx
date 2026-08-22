import React from "react";

const AnalysisEmployeeSales = ({
  empSalesRange,
  setEmpSalesRange,
  empSalesFrom,
  setEmpSalesFrom,
  empSalesTo,
  setEmpSalesTo,
  totalEmpRevenue,
  pieGradient,
  pieSlices,
  fmt,
}) => (
  <div className="bg-white rounded-2xl border border-stone-200 p-4">
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div>
        <h3 className="text-sm font-bold text-stone-700">Employee Sales</h3>
        <p className="text-[11px] text-stone-400 mt-0.5">Share of total sales per employee — based on Flights &amp; Hotels bookings</p>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {[
          { key: "all", label: "All Time" },
          { key: "month", label: "This Month" },
          { key: "30d", label: "Last 30 Days" },
          { key: "custom", label: "Custom" },
        ].map((opt) => (
          <button
            key={opt.key}
            onClick={() => setEmpSalesRange(opt.key)}
            className={`text-[11px] font-semibold rounded-lg px-2.5 py-1.5 border transition-colors ${
              empSalesRange === opt.key
                ? "bg-teal-800 text-white border-teal-800"
                : "bg-white text-stone-500 border-stone-200 hover:border-teal-300 hover:text-teal-800"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>

    {empSalesRange === "custom" && (
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input
          type="date"
          value={empSalesFrom}
          onChange={(e) => setEmpSalesFrom(e.target.value)}
          className="border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
        />
        <span className="text-xs text-stone-400">to</span>
        <input
          type="date"
          value={empSalesTo}
          onChange={(e) => setEmpSalesTo(e.target.value)}
          className="border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
        />
      </div>
    )}

    {!totalEmpRevenue ? (
      <p className="text-xs text-stone-400">No employee sales in this period.</p>
    ) : (
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div
          className="w-40 h-40 rounded-full shrink-0 ring-1 ring-stone-200 shadow-inner"
          style={{ background: pieGradient }}
          title="Share of total sales per employee"
        />
        <div className="flex-1 w-full space-y-2">
          {pieSlices.map((s) => (
            <div key={s.name} className="flex items-center justify-between text-xs gap-2">
              <span className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="font-semibold text-stone-700 truncate">{s.name}</span>
              </span>
              <span className="text-stone-500 shrink-0">{fmt(s.revenue)} EGP · {fmt(s.pct)}%</span>
            </div>
          ))}
          <div className="flex items-center justify-between text-xs pt-2 mt-1 border-t border-stone-100">
            <span className="font-bold text-stone-700">Total</span>
            <span className="font-bold text-stone-700">{fmt(totalEmpRevenue)} EGP</span>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default AnalysisEmployeeSales;
