import React from "react";

const AnalysisSection = ({
  tickets,
  hotelBookings,
  visaBookings,
  carBookings,
  soldAfterRefund,
  netAfterRefund,
  profitAfterRefund,
  hotelSoldTotal,
  hotelNetTotal,
  hotelProfitTotal,
  hotelInEgp,
  visaSoldTotal,
  visaNetTotal,
  visaProfitTotal,
  carSoldTotal,
  carNetTotal,
  carProfitTotal,
  todayDateStr,
  empSalesRange,
  setEmpSalesRange,
  empSalesFrom,
  setEmpSalesFrom,
  empSalesTo,
  setEmpSalesTo,
  fmt,
  BarChart3,
}) => (
  <>
    {(() => {
      // Everything below is derived, not stored — a single normalized array built
      // from the four booking lists using the same net/sold/profit helpers the rest
      // of the app already uses (refund-adjusted for flights, EGP-converted for
      // everything), so these numbers always agree with Accounts/Reports.
      const allDeals = [
        ...tickets.filter((t) => !t.voided).map((t) => ({
          section: "flights", date: t.date, supplier: (t.supplier || "").trim(), employee: (t.employee || "").trim(),
          revenue: soldAfterRefund(t), cost: netAfterRefund(t), profit: profitAfterRefund(t),
        })),
        ...hotelBookings.map((h) => ({
          section: "hotels", date: h.bookingDate, supplier: (h.supplier || "").trim(), employee: (h.employee || "").trim(),
          revenue: hotelSoldTotal(h), cost: hotelNetTotal(h), profit: hotelProfitTotal(h),
        })),
        ...visaBookings.map((v) => ({
          section: "visa", date: v.bookingDate, supplier: (v.supplier || "").trim(), employee: "",
          revenue: hotelInEgp(visaSoldTotal(v), v.soldCurrency, v.usdRate), cost: hotelInEgp(visaNetTotal(v), v.netCurrency, v.usdRate), profit: visaProfitTotal(v),
        })),
        ...carBookings.map((c) => ({
          section: "cars", date: c.bookingDate, supplier: (c.supplier || "").trim(), employee: "",
          revenue: hotelInEgp(carSoldTotal(c), c.soldCurrency, c.usdRate), cost: hotelInEgp(carNetTotal(c), c.netCurrency, c.usdRate), profit: carProfitTotal(c),
        })),
      ];

      const totalRevenue = allDeals.reduce((s, d) => s + d.revenue, 0);
      const totalCost = allDeals.reduce((s, d) => s + d.cost, 0);
      const totalProfit = allDeals.reduce((s, d) => s + d.profit, 0);
      const totalBookings = allDeals.length;
      const avgProfit = totalBookings ? totalProfit / totalBookings : 0;
      const marginPct = totalRevenue ? (totalProfit / totalRevenue) * 100 : 0;

      const SECTION_META = {
        flights: { label: "Flights", color: "bg-teal-700" },
        hotels: { label: "Hotels", color: "bg-amber-600" },
        visa: { label: "Visa", color: "bg-indigo-600" },
        cars: { label: "Transportation", color: "bg-rose-600" },
      };
      const bySection = Object.keys(SECTION_META).map((key) => {
        const deals = allDeals.filter((d) => d.section === key);
        return {
          key, ...SECTION_META[key],
          count: deals.length,
          revenue: deals.reduce((s, d) => s + d.revenue, 0),
          cost: deals.reduce((s, d) => s + d.cost, 0),
          profit: deals.reduce((s, d) => s + d.profit, 0),
        };
      });
      const maxSectionRevenue = Math.max(1, ...bySection.map((s) => s.revenue));

      // Last 6 months (including the current one), profit + revenue per month.
      const now = new Date();
      const months = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      });
      const monthlyTrend = months.map((m) => ({
        month: m,
        label: new Date(`${m}-01T00:00:00`).toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
        revenue: allDeals.filter((d) => (d.date || "").slice(0, 7) === m).reduce((s, d) => s + d.revenue, 0),
        profit: allDeals.filter((d) => (d.date || "").slice(0, 7) === m).reduce((s, d) => s + d.profit, 0),
      }));
      const maxMonthlyRevenue = Math.max(1, ...monthlyTrend.map((m) => m.revenue));

      // Top 5 suppliers and top 5 employees by profit generated.
      const rollUp = (rows, keyFn) => {
        const map = {};
        rows.forEach((d) => {
          const key = keyFn(d);
          if (!key) return;
          if (!map[key]) map[key] = { name: key, count: 0, revenue: 0, profit: 0 };
          map[key].count += 1;
          map[key].revenue += d.revenue;
          map[key].profit += d.profit;
        });
        return Object.values(map).sort((a, b) => b.profit - a.profit).slice(0, 5);
      };
      const topSuppliers = rollUp(allDeals, (d) => d.supplier);
      const maxSupplierProfit = Math.max(1, ...topSuppliers.map((s) => Math.abs(s.profit)));

      // ---- Employee Sales pie chart (date-range filterable) ----
      // Employees are only tracked on Flights and Hotels bookings, so this is
      // based on those two sections only. "Sales" here means revenue (sold price),
      // which is what the pie chart shows a share of.
      const todayStr = todayDateStr();
      const thirtyDaysAgoStr = (() => {
        const d = new Date();
        d.setDate(d.getDate() - 29);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      })();
      const inEmpSalesRange = (dateStr) => {
        if (!dateStr) return false;
        if (empSalesRange === "month") return dateStr.slice(0, 7) === todayStr.slice(0, 7);
        if (empSalesRange === "30d") return dateStr >= thirtyDaysAgoStr && dateStr <= todayStr;
        if (empSalesRange === "custom") {
          if (empSalesFrom && dateStr < empSalesFrom) return false;
          if (empSalesTo && dateStr > empSalesTo) return false;
          return true;
        }
        return true; // "all"
      };
      const empMap = {};
      allDeals
        .filter((d) => d.employee && inEmpSalesRange(d.date))
        .forEach((d) => {
          if (!empMap[d.employee]) empMap[d.employee] = { name: d.employee, revenue: 0, count: 0 };
          empMap[d.employee].revenue += d.revenue;
          empMap[d.employee].count += 1;
        });
      let employeeSales = Object.values(empMap).sort((a, b) => b.revenue - a.revenue);
      // Cap the pie at 7 named slices + an "Other" slice so it stays readable when
      // there are many employees.
      if (employeeSales.length > 8) {
        const top = employeeSales.slice(0, 7);
        const rest = employeeSales.slice(7);
        employeeSales = [
          ...top,
          { name: "Other", revenue: rest.reduce((s, e) => s + e.revenue, 0), count: rest.reduce((s, e) => s + e.count, 0) },
        ];
      }
      const totalEmpRevenue = employeeSales.reduce((s, e) => s + e.revenue, 0);
      const PIE_COLORS = ["#0f766e", "#d97706", "#4f46e5", "#e11d48", "#059669", "#7c3aed", "#0891b2", "#78716c"];
      let cum = 0;
      const pieSlices = employeeSales.map((e, i) => {
        const pct = totalEmpRevenue ? (e.revenue / totalEmpRevenue) * 100 : 0;
        const start = cum;
        cum += pct;
        return { ...e, pct, start, end: cum, color: PIE_COLORS[i % PIE_COLORS.length] };
      });
      const pieGradient = totalEmpRevenue
        ? `conic-gradient(${pieSlices.map((s) => `${s.color} ${s.start}% ${s.end}%`).join(", ")})`
        : null;

      return (
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-stone-800 flex items-center gap-2">
              <BarChart3 size={18} className="text-teal-800" />
              Business Analytics
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              All-time performance across Flights, Hotels, Visa &amp; Transportation — figures in EGP.
            </p>
          </div>

          {/* KPI cards */}
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

          {/* Performance by section */}
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

          {/* 6-month trend */}
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

          {/* Top suppliers */}
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

          {/* Employee sales — pie chart, filterable by period */}
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
        </div>
      );
    })()}
  </>
);

export default AnalysisSection;