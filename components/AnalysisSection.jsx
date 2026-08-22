import React from "react";
import { BarChart3 } from "lucide-react";

const SECTION_META = {
  flights: { label: "Flights", color: "bg-teal-700" },
  hotels: { label: "Hotels", color: "bg-amber-600" },
  visa: { label: "Visa", color: "bg-indigo-600" },
  cars: { label: "Transportation", color: "bg-rose-600" },
};
const PIE_COLORS = ["#0f766e", "#d97706", "#4f46e5", "#e11d48", "#059669", "#7c3aed", "#0891b2", "#78716c"];

export default function AnalysisSection({
  tickets, hotelBookings, visaBookings, carBookings, fmt, todayDateStr,
  soldAfterRefund, netAfterRefund, profitAfterRefund, hotelSoldTotal,
  hotelNetTotal, hotelProfitTotal, hotelInEgp, visaSoldTotal, visaNetTotal,
  visaProfitTotal, carSoldTotal, carNetTotal, carProfitTotal,
}) {
  const allDeals = [
    ...tickets.filter((ticket) => !ticket.voided).map((ticket) => ({
      section: "flights", date: ticket.date, supplier: (ticket.supplier || "").trim(), employee: (ticket.employee || "").trim(),
      revenue: soldAfterRefund(ticket), cost: netAfterRefund(ticket), profit: profitAfterRefund(ticket),
    })),
    ...hotelBookings.map((booking) => ({
      section: "hotels", date: booking.bookingDate, supplier: (booking.supplier || "").trim(), employee: (booking.employee || "").trim(),
      revenue: hotelSoldTotal(booking), cost: hotelNetTotal(booking), profit: hotelProfitTotal(booking),
    })),
    ...visaBookings.map((booking) => ({
      section: "visa", date: booking.bookingDate, supplier: (booking.supplier || "").trim(), employee: "",
      revenue: hotelInEgp(visaSoldTotal(booking), booking.soldCurrency, booking.usdRate), cost: hotelInEgp(visaNetTotal(booking), booking.netCurrency, booking.usdRate), profit: visaProfitTotal(booking),
    })),
    ...carBookings.map((booking) => ({
      section: "cars", date: booking.bookingDate, supplier: (booking.supplier || "").trim(), employee: "",
      revenue: hotelInEgp(carSoldTotal(booking), booking.soldCurrency, booking.usdRate), cost: hotelInEgp(carNetTotal(booking), booking.netCurrency, booking.usdRate), profit: carProfitTotal(booking),
    })),
  ];
  const totalRevenue = allDeals.reduce((sum, deal) => sum + deal.revenue, 0);
  const totalCost = allDeals.reduce((sum, deal) => sum + deal.cost, 0);
  const totalProfit = allDeals.reduce((sum, deal) => sum + deal.profit, 0);
  const totalBookings = allDeals.length;
  const avgProfit = totalBookings ? totalProfit / totalBookings : 0;
  const marginPct = totalRevenue ? (totalProfit / totalRevenue) * 100 : 0;
  const bySection = Object.keys(SECTION_META).map((key) => {
    const deals = allDeals.filter((deal) => deal.section === key);
    return { key, ...SECTION_META[key], count: deals.length, revenue: deals.reduce((sum, deal) => sum + deal.revenue, 0), cost: deals.reduce((sum, deal) => sum + deal.cost, 0), profit: deals.reduce((sum, deal) => sum + deal.profit, 0) };
  });
  const maxSectionRevenue = Math.max(1, ...bySection.map((section) => section.revenue));
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  });
  const monthlyTrend = months.map((month) => ({
    month,
    label: new Date(`${month}-01T00:00:00`).toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
    revenue: allDeals.filter((deal) => (deal.date || "").slice(0, 7) === month).reduce((sum, deal) => sum + deal.revenue, 0),
    profit: allDeals.filter((deal) => (deal.date || "").slice(0, 7) === month).reduce((sum, deal) => sum + deal.profit, 0),
  }));
  const maxMonthlyRevenue = Math.max(1, ...monthlyTrend.map((month) => month.revenue));
  const supplierMap = {};
  allDeals.forEach((deal) => {
    if (!deal.supplier) return;
    if (!supplierMap[deal.supplier]) supplierMap[deal.supplier] = { name: deal.supplier, profit: 0 };
    supplierMap[deal.supplier].profit += deal.profit;
  });
  const topSuppliers = Object.values(supplierMap).sort((a, b) => b.profit - a.profit).slice(0, 5);
  const maxSupplierProfit = Math.max(1, ...topSuppliers.map((supplier) => Math.abs(supplier.profit)));
  const today = todayDateStr();
  const from30d = new Date();
  from30d.setDate(from30d.getDate() - 29);
  const thirtyDaysAgo = `${from30d.getFullYear()}-${String(from30d.getMonth() + 1).padStart(2, "0")}-${String(from30d.getDate()).padStart(2, "0")}`;
  const [employeeSalesRange, setEmployeeSalesRange] = React.useState("month");
  const [employeeSalesFrom, setEmployeeSalesFrom] = React.useState("");
  const [employeeSalesTo, setEmployeeSalesTo] = React.useState("");
  const inRange = (date) => {
    if (!date) return false;
    if (employeeSalesRange === "month") return date.slice(0, 7) === today.slice(0, 7);
    if (employeeSalesRange === "30d") return date >= thirtyDaysAgo && date <= today;
    if (employeeSalesRange === "custom") return (!employeeSalesFrom || date >= employeeSalesFrom) && (!employeeSalesTo || date <= employeeSalesTo);
    return true;
  };
  const employeeMap = {};
  allDeals.filter((deal) => deal.employee && inRange(deal.date)).forEach((deal) => {
    if (!employeeMap[deal.employee]) employeeMap[deal.employee] = { name: deal.employee, revenue: 0 };
    employeeMap[deal.employee].revenue += deal.revenue;
  });
  let employeeSales = Object.values(employeeMap).sort((a, b) => b.revenue - a.revenue);
  if (employeeSales.length > 8) {
    const rest = employeeSales.slice(7);
    employeeSales = [...employeeSales.slice(0, 7), { name: "Other", revenue: rest.reduce((sum, employee) => sum + employee.revenue, 0) }];
  }
  const totalEmployeeRevenue = employeeSales.reduce((sum, employee) => sum + employee.revenue, 0);
  let cumulative = 0;
  const pieSlices = employeeSales.map((employee, index) => {
    const pct = totalEmployeeRevenue ? (employee.revenue / totalEmployeeRevenue) * 100 : 0;
    const slice = { ...employee, pct, start: cumulative, end: cumulative + pct, color: PIE_COLORS[index % PIE_COLORS.length] };
    cumulative += pct;
    return slice;
  });
  const pieGradient = totalEmployeeRevenue ? `conic-gradient(${pieSlices.map((slice) => `${slice.color} ${slice.start}% ${slice.end}%`).join(", ")})` : null;

  return (
    <div>
      <div className="mb-5"><h2 className="text-base font-bold text-stone-800 flex items-center gap-2"><BarChart3 size={18} className="text-teal-800" /> Business Analytics</h2><p className="text-xs text-stone-500 mt-0.5">All-time performance across Flights, Hotels, Visa &amp; Transportation — figures in EGP.</p></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {[["Total Revenue", totalRevenue, "text-stone-800"], ["Total Cost", totalCost, "text-stone-800"], ["Total Profit", totalProfit, totalProfit >= 0 ? "text-emerald-700" : "text-red-600"], ["Profit Margin", `${fmt(marginPct)}%`, marginPct >= 0 ? "text-teal-800" : "text-red-600"], ["Total Bookings", totalBookings, "text-stone-800"], ["Avg. Profit / Booking", avgProfit, "text-stone-800"]].map(([label, value, color]) => <div key={label} className="bg-white rounded-2xl border border-stone-200 p-4"><p className="text-xs text-stone-500 mb-1">{label}</p><p className={`text-lg font-bold ${color}`}>{typeof value === "number" ? fmt(value) : value}{label !== "Profit Margin" && label !== "Total Bookings" ? " EGP" : ""}</p></div>)}
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6"><h3 className="text-sm font-bold text-stone-700 mb-4">Performance by Section</h3>{!totalBookings ? <p className="text-xs text-stone-400">No bookings yet.</p> : <div className="space-y-3">{bySection.map((section) => <div key={section.key}><div className="flex items-center justify-between text-xs mb-1"><span className="font-semibold text-stone-700">{section.label}</span><span className="text-stone-500">{section.count} bookings · Revenue {fmt(section.revenue)} EGP · <span className={section.profit >= 0 ? "text-emerald-700" : "text-red-600"}>Profit {fmt(section.profit)} EGP</span></span></div><div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${section.color}`} style={{ width: `${Math.max(2, (section.revenue / maxSectionRevenue) * 100)}%` }} /></div></div>)}</div>}</div>
      <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6"><h3 className="text-sm font-bold text-stone-700 mb-4">Revenue &amp; Profit — Last 6 Months</h3><div className="flex items-end justify-between gap-2 h-36">{monthlyTrend.map((month) => <div key={month.month} className="flex-1 flex flex-col items-center justify-end h-full gap-1"><div className="w-full flex items-end justify-center gap-1 h-full"><div className="w-1/2 max-w-[18px] rounded-t-md bg-teal-200" style={{ height: `${Math.max(2, (month.revenue / maxMonthlyRevenue) * 100)}%` }} /><div className={`w-1/2 max-w-[18px] rounded-t-md ${month.profit >= 0 ? "bg-teal-700" : "bg-red-400"}`} style={{ height: `${Math.max(2, (Math.abs(month.profit) / maxMonthlyRevenue) * 100)}%` }} /></div><span className="text-[10px] text-stone-500 font-semibold">{month.label}</span></div>)}</div><div className="flex items-center gap-4 mt-3 text-[11px] text-stone-500"><span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-teal-200" /> Revenue</span><span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-teal-700" /> Profit</span></div></div>
      <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6"><h3 className="text-sm font-bold text-stone-700 mb-4">Top 5 Suppliers by Profit</h3>{!topSuppliers.length ? <p className="text-xs text-stone-400">No supplier data yet.</p> : <div className="space-y-3">{topSuppliers.map((supplier) => <div key={supplier.name}><div className="flex items-center justify-between text-xs mb-1"><span className="font-semibold text-stone-700 truncate">{supplier.name}</span><span className="text-stone-500 shrink-0 ml-2">{fmt(supplier.profit)} EGP</span></div><div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-amber-600" style={{ width: `${Math.max(2, (Math.abs(supplier.profit) / maxSupplierProfit) * 100)}%` }} /></div></div>)}</div>}</div>
      <div className="bg-white rounded-2xl border border-stone-200 p-4"><div className="flex flex-wrap items-center justify-between gap-3 mb-4"><div><h3 className="text-sm font-bold text-stone-700">Employee Sales</h3><p className="text-[11px] text-stone-400 mt-0.5">Share of total sales per employee — based on Flights &amp; Hotels bookings</p></div><div className="flex flex-wrap items-center gap-1.5">{[["all", "All Time"], ["month", "This Month"], ["30d", "Last 30 Days"], ["custom", "Custom"]].map(([key, label]) => <button key={key} onClick={() => setEmployeeSalesRange(key)} className={`text-[11px] font-semibold rounded-lg px-2.5 py-1.5 border transition-colors ${employeeSalesRange === key ? "bg-teal-800 text-white border-teal-800" : "bg-white text-stone-500 border-stone-200 hover:border-teal-300 hover:text-teal-800"}`}>{label}</button>)}</div></div>{employeeSalesRange === "custom" && <div className="flex flex-wrap items-center gap-2 mb-4"><input type="date" value={employeeSalesFrom} onChange={(event) => setEmployeeSalesFrom(event.target.value)} className="border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700" /><span className="text-xs text-stone-400">to</span><input type="date" value={employeeSalesTo} onChange={(event) => setEmployeeSalesTo(event.target.value)} className="border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700" /></div>}{!totalEmployeeRevenue ? <p className="text-xs text-stone-400">No employee sales in this period.</p> : <div className="flex flex-col sm:flex-row items-center gap-6"><div className="w-40 h-40 rounded-full shrink-0 ring-1 ring-stone-200 shadow-inner" style={{ background: pieGradient }} title="Share of total sales per employee" /><div className="flex-1 w-full space-y-2">{pieSlices.map((slice) => <div key={slice.name} className="flex items-center justify-between text-xs gap-2"><span className="flex items-center gap-2 min-w-0"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }} /><span className="font-semibold text-stone-700 truncate">{slice.name}</span></span><span className="text-stone-500 shrink-0">{fmt(slice.revenue)} EGP · {fmt(slice.pct)}%</span></div>)}<div className="flex items-center justify-between text-xs pt-2 mt-1 border-t border-stone-100"><span className="font-bold text-stone-700">Total</span><span className="font-bold text-stone-700">{fmt(totalEmployeeRevenue)} EGP</span></div></div></div>}</div>
    </div>
  );
}
