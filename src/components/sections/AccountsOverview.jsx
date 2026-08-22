import React from "react";

const AccountsOverview = ({
  translateAccountText,
  monthRevenue,
  monthExpenses,
  totalTreasuryBalance,
  totalSupplierBalance,
  totalCustomerBalance,
  fmt,
  acctCurrency,
  tickets,
  hotelBookings,
  visaBookings,
  carBookings,
  thisMonthPrefix,
  profitAfterRefund,
  hotelProfitTotal,
  visaProfitTotal,
  carProfitTotal,
  sectionLabel,
}) => (
  <div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <p className="text-xs text-stone-500 mb-1">{translateAccountText("monthRevenue")}</p>
        <p className="text-lg font-bold text-emerald-700">{fmt(monthRevenue)} {acctCurrency}</p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <p className="text-xs text-stone-500 mb-1">{translateAccountText("monthExpenses")}</p>
        <p className="text-lg font-bold text-red-600">{fmt(monthExpenses)} {acctCurrency}</p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <p className="text-xs text-stone-500 mb-1">{translateAccountText("monthNetProfit")}</p>
        <p className={`text-lg font-bold ${monthRevenue - monthExpenses >= 0 ? "text-emerald-700" : "text-red-600"}`}>
          {fmt(monthRevenue - monthExpenses)} {acctCurrency}
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <p className="text-xs text-stone-500 mb-1">{translateAccountText("totalTreasuryBalance")}</p>
        <p className="text-lg font-bold text-teal-800">{fmt(totalTreasuryBalance)} {acctCurrency}</p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <p className="text-xs text-stone-500 mb-1">{translateAccountText("totalOwedSuppliers")}</p>
        <p className="text-lg font-bold text-amber-700">{fmt(totalSupplierBalance)} {acctCurrency}</p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <p className="text-xs text-stone-500 mb-1">{translateAccountText("totalOwedCustomers")}</p>
        <p className="text-lg font-bold text-amber-700">{fmt(totalCustomerBalance)} {acctCurrency}</p>
      </div>
    </div>

    <h3 className="text-sm font-bold text-stone-700 mb-2">{translateAccountText("profitBySection")}</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {["flights", "hotels", "visa", "cars"].map((sec) => {
        const val =
          sec === "flights"
            ? tickets.filter((t) => (t.date || "").slice(0, 7) === thisMonthPrefix).reduce((s, t) => s + profitAfterRefund(t), 0)
            : sec === "hotels"
            ? hotelBookings.filter((h) => (h.bookingDate || "").slice(0, 7) === thisMonthPrefix).reduce((s, h) => s + hotelProfitTotal(h), 0)
            : sec === "visa"
            ? visaBookings.filter((v) => (v.bookingDate || "").slice(0, 7) === thisMonthPrefix).reduce((s, v) => s + visaProfitTotal(v), 0)
            : carBookings.filter((c) => (c.bookingDate || "").slice(0, 7) === thisMonthPrefix).reduce((s, c) => s + carProfitTotal(c), 0);
        return (
          <div key={sec} className="bg-white rounded-2xl border border-stone-200 p-4">
            <p className="text-xs text-stone-500 mb-1">{sectionLabel(sec)}</p>
            <p className="text-base font-bold text-emerald-700">{fmt(val)} {acctCurrency}</p>
          </div>
        );
      })}
    </div>
  </div>
);

export default AccountsOverview;
