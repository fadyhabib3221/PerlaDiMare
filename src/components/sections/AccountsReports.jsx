import React from "react";
import { Download } from "lucide-react";

const AccountsReports = ({
	translateAccountText,
	reportsRange,
	setReportsRange,
	reportsFrom,
	setReportsFrom,
	reportsTo,
	setReportsTo,
	handleExportAccountsReport,
	reportRevenueBySection,
	reportBookingsCount,
	reportTotalRevenue,
	reportTotalExpenses,
	reportNetProfit,
	reportExpensesByCategory,
	sectionLabel,
	expenseCategoryLabel,
	fmt,
	acctCurrency,
}) => (
	<div>
		<div className="flex items-center gap-2 mb-4 flex-wrap">
			{[
				{ key: "today", label: translateAccountText("rangeToday") },
				{ key: "month", label: translateAccountText("rangeMonth") },
				{ key: "custom", label: translateAccountText("rangeCustom") },
			].map((range) => (
				<button
					key={range.key}
					onClick={() => setReportsRange(range.key)}
					className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
						reportsRange === range.key ? "bg-teal-800 text-white border-teal-800" : "bg-white text-stone-500 border-stone-200"
					}`}
				>
					{range.label}
				</button>
			))}
			{reportsRange === "custom" && (
				<>
					<input type="date" value={reportsFrom} onChange={(e) => setReportsFrom(e.target.value)} className="border border-stone-300 rounded-lg px-2 py-1.5 text-xs" />
					<span className="text-xs text-stone-400">{translateAccountText("to")}</span>
					<input type="date" value={reportsTo} onChange={(e) => setReportsTo(e.target.value)} className="border border-stone-300 rounded-lg px-2 py-1.5 text-xs" />
				</>
			)}
			<button
				onClick={handleExportAccountsReport}
				className="mr-auto flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-b from-teal-700 to-teal-900 rounded-lg px-3 py-1.5"
			>
				<Download size={14} /> {translateAccountText("exportExcel")}
			</button>
		</div>

		<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
			{["flights", "hotels", "visa", "cars"].map((section) => (
				<div key={section} className="bg-white rounded-2xl border border-stone-200 p-4">
					<p className="text-xs text-stone-500 mb-1">{translateAccountText("revenueOf")(sectionLabel(section))}</p>
					<p className="text-base font-bold text-emerald-700">{fmt(reportRevenueBySection[section])} {acctCurrency}</p>
					<p className="text-[11px] text-stone-400 mt-0.5">{reportBookingsCount[section]} {translateAccountText("bookingsCount")}</p>
				</div>
			))}
		</div>

		<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
			<div className="bg-white rounded-2xl border border-stone-200 p-4">
				<p className="text-xs text-stone-500 mb-1">{translateAccountText("totalRevenue")}</p>
				<p className="text-lg font-bold text-emerald-700">{fmt(reportTotalRevenue)} {acctCurrency}</p>
			</div>
			<div className="bg-white rounded-2xl border border-stone-200 p-4">
				<p className="text-xs text-stone-500 mb-1">{translateAccountText("totalExpenses")}</p>
				<p className="text-lg font-bold text-red-600">{fmt(reportTotalExpenses)} {acctCurrency}</p>
			</div>
			<div className="bg-white rounded-2xl border border-stone-200 p-4">
				<p className="text-xs text-stone-500 mb-1">{translateAccountText("netProfit")}</p>
				<p className={`text-lg font-bold ${reportNetProfit >= 0 ? "text-emerald-700" : "text-red-600"}`}>{fmt(reportNetProfit)} {acctCurrency}</p>
			</div>
		</div>

		<h3 className="text-sm font-bold text-stone-700 mb-2">{translateAccountText("expensesByCategory")}</h3>
		<div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
			<table className="w-full min-w-max text-sm">
				<thead className="bg-stone-50 text-stone-500 text-xs">
					<tr>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colCategory")}</th>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colAmount")}</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-stone-100">
					{Object.keys(reportExpensesByCategory).length === 0 ? (
						<tr><td colSpan={2} className="text-center text-stone-400 py-6">{translateAccountText("noExpensesInPeriod")}</td></tr>
					) : (
						Object.entries(reportExpensesByCategory).map(([category, amount]) => (
							<tr key={category}>
								<td className="px-3 py-2 text-stone-700 whitespace-nowrap">{expenseCategoryLabel(category)}</td>
								<td className="px-3 py-2 font-semibold text-red-600 whitespace-nowrap">{fmt(amount)}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	</div>
);

export default AccountsReports;
