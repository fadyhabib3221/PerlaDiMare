import React from "react";
import { BarChart3 } from "lucide-react";
import AnalysisSummaryCards from "./AnalysisSummaryCards";
import AnalysisSectionPerformance from "./AnalysisSectionPerformance";
import AnalysisRevenueTrend from "./AnalysisRevenueTrend";
import AnalysisSupplierPerformance from "./AnalysisSupplierPerformance";
import AnalysisEmployeeSales from "./AnalysisEmployeeSales";

const AnalysisDashboard = ({
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
  fmt,
  empSalesRange,
  setEmpSalesRange,
  empSalesFrom,
  setEmpSalesFrom,
  empSalesTo,
  setEmpSalesTo,
}) => {
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
  const sectionMeta = {
    flights: { label: "Flights", color: "bg-teal-700" },
    hotels: { label: "Hotels", color: "bg-amber-600" },
    visa: { label: "Visa", color: "bg-indigo-600" },
    cars: { label: "Transportation", color: "bg-rose-600" },
  };
  const bySection = Object.keys(sectionMeta).map((key) => {
    const deals = allDeals.filter((d) => d.section === key);
    return { key, ...sectionMeta[key], count: deals.length, revenue: deals.reduce((s, d) => s + d.revenue, 0), cost: deals.reduce((s, d) => s + d.cost, 0), profit: deals.reduce((s, d) => s + d.profit, 0) };
  });
  const maxSectionRevenue = Math.max(1, ...bySection.map((s) => s.revenue));
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
    }
    return true;
  };
  const empMap = {};
  allDeals.filter((d) => d.employee && inEmpSalesRange(d.date)).forEach((d) => {
    if (!empMap[d.employee]) empMap[d.employee] = { name: d.employee, revenue: 0, count: 0 };
    empMap[d.employee].revenue += d.revenue;
    empMap[d.employee].count += 1;
  });
  let employeeSales = Object.values(empMap).sort((a, b) => b.revenue - a.revenue);
  if (employeeSales.length > 8) {
    const top = employeeSales.slice(0, 7);
    const rest = employeeSales.slice(7);
    employeeSales = [...top, { name: "Other", revenue: rest.reduce((s, e) => s + e.revenue, 0), count: rest.reduce((s, e) => s + e.count, 0) }];
  }
  const totalEmpRevenue = employeeSales.reduce((s, e) => s + e.revenue, 0);
  const pieColors = ["#0f766e", "#d97706", "#4f46e5", "#e11d48", "#059669", "#7c3aed", "#0891b2", "#78716c"];
  let cum = 0;
  const pieSlices = employeeSales.map((e, i) => {
    const pct = totalEmpRevenue ? (e.revenue / totalEmpRevenue) * 100 : 0;
    const start = cum;
    cum += pct;
    return { ...e, pct, start, end: cum, color: pieColors[i % pieColors.length] };
  });
  const pieGradient = totalEmpRevenue ? `conic-gradient(${pieSlices.map((s) => `${s.color} ${s.start}% ${s.end}%`).join(", ")})` : null;

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-base font-bold text-stone-800 flex items-center gap-2"><BarChart3 size={18} className="text-teal-800" />Business Analytics</h2>
        <p className="text-xs text-stone-500 mt-0.5">All-time performance across Flights, Hotels, Visa &amp; Transportation — figures in EGP.</p>
      </div>
      <AnalysisSummaryCards totalRevenue={totalRevenue} totalCost={totalCost} totalProfit={totalProfit} marginPct={marginPct} totalBookings={totalBookings} avgProfit={avgProfit} fmt={fmt} />
      <AnalysisSectionPerformance bySection={bySection} totalBookings={totalBookings} maxSectionRevenue={maxSectionRevenue} fmt={fmt} />
      <AnalysisRevenueTrend monthlyTrend={monthlyTrend} maxMonthlyRevenue={maxMonthlyRevenue} fmt={fmt} />
      <AnalysisSupplierPerformance topSuppliers={topSuppliers} maxSupplierProfit={maxSupplierProfit} fmt={fmt} />
      <AnalysisEmployeeSales empSalesRange={empSalesRange} setEmpSalesRange={setEmpSalesRange} empSalesFrom={empSalesFrom} setEmpSalesFrom={setEmpSalesFrom} empSalesTo={empSalesTo} setEmpSalesTo={setEmpSalesTo} totalEmpRevenue={totalEmpRevenue} pieGradient={pieGradient} pieSlices={pieSlices} fmt={fmt} />
    </div>
  );
};

export default AnalysisDashboard;
