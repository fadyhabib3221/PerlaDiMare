import React from "react";
import { Search } from "lucide-react";

const AccountsCustomers = ({
	translateAccountText,
	customerQuery,
	setCustomerQuery,
	filteredCustomerLedger,
	setViewingCustomer,
	accountsLang,
	sectionLabel,
	fmt,
}) => (
	<div>
		<div className="relative mb-4">
			<Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
			<input
				value={customerQuery}
				onChange={(e) => setCustomerQuery(e.target.value)}
				placeholder={translateAccountText("searchCustomer")}
				className="w-full border border-stone-300 rounded-xl pr-9 pl-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
			/>
		</div>
		<div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
			<table className="w-full min-w-max text-sm">
				<thead className="bg-stone-50 text-stone-500 text-xs">
					<tr>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colCustomer")}</th>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colSections")}</th>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colTotalDue")}</th>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colCollected")}</th>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colRemaining")}</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-stone-100">
					{filteredCustomerLedger.length === 0 ? (
						<tr><td colSpan={5} className="text-center text-stone-400 py-6">{translateAccountText("noCustomers")}</td></tr>
					) : (
						filteredCustomerLedger.map((customer) => (
							<tr
								key={customer.customer}
								onClick={() => setViewingCustomer(customer.customer)}
								className="hover:bg-teal-50 cursor-pointer"
							>
								<td className="px-3 py-2 font-semibold text-stone-800 whitespace-nowrap">{customer.customer}</td>
								<td className="px-3 py-2 text-stone-500 text-xs whitespace-nowrap">{customer.sections.map((section) => sectionLabel(section)).join(accountsLang === "en" ? ", " : "، ") || "-"}</td>
								<td className="px-3 py-2 text-stone-700 whitespace-nowrap">{fmt(customer.totalDue)}</td>
								<td className="px-3 py-2 text-emerald-700 whitespace-nowrap">{fmt(customer.paid)}</td>
								<td className={`px-3 py-2 font-bold whitespace-nowrap ${customer.balance > 0 ? "text-red-600" : "text-stone-400"}`}>{fmt(customer.balance)}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	</div>
);

export default AccountsCustomers;
