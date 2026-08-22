import React from "react";
import { ArrowDownCircle, ArrowUpCircle, Banknote, Landmark, Pencil, Plus, Trash2 } from "lucide-react";

const AccountsTreasury = ({
	translateAccountText,
	treasuryAccounts,
	treasuryAccountTypeLabel,
	treasuryBalance,
	acctCurrency,
	fmt,
	setTreasuryForm,
	getEmptyTreasuryAccountForm,
	setTreasuryAccountEditingId,
	setShowTreasuryAccountForm,
	handleEditTreasuryAccountClick,
	handleDeleteTreasuryAccount,
	treasuryFilterAccountId,
	setTreasuryFilterAccountId,
	setTreasuryEntryForm,
	getEmptyTreasuryEntryForm,
	setShowTreasuryEntryForm,
	filteredTreasuryTransactions,
	formatDisplayDate,
	handleDeleteTreasuryEntry,
	handleDeleteSupplierPayment,
	handleDeleteCustomerPayment,
	handleDeleteExpense,
}) => (
	<div>
		<div className="flex items-center justify-between mb-3">
			<h3 className="text-sm font-bold text-stone-700">{translateAccountText("accountsAndTreasuries")}</h3>
			<button
				onClick={() => { setTreasuryForm(getEmptyTreasuryAccountForm()); setTreasuryAccountEditingId(null); setShowTreasuryAccountForm(true); }}
				className="flex items-center gap-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg px-3 py-1.5"
			>
				<Plus size={14} /> {translateAccountText("addAccount")}
			</button>
		</div>
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
			{treasuryAccounts.length === 0 && (
				<p className="text-sm text-stone-400 col-span-full">{translateAccountText("noAccountsYet")}</p>
			)}
			{treasuryAccounts.map((account) => (
				<div key={account.id} className="bg-white rounded-2xl border border-stone-200 p-4">
					<div className="flex items-center justify-between mb-1">
						<div className="flex items-center gap-1.5 text-stone-800 font-semibold text-sm">
							{account.type === "bank" ? <Landmark size={16} /> : <Banknote size={16} />}
							{account.name}
						</div>
						<div className="flex items-center gap-1">
							<button onClick={() => handleEditTreasuryAccountClick(account)} className="text-stone-400 hover:text-teal-700"><Pencil size={14} /></button>
							<button title="Delete account" onClick={() => handleDeleteTreasuryAccount(account.id)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
						</div>
					</div>
					<p className="text-xs text-stone-400 mb-2">{treasuryAccountTypeLabel(account.type)}</p>
					<p className={`text-lg font-bold ${treasuryBalance(account.id) >= 0 ? "text-emerald-700" : "text-red-600"}`}>
						{fmt(treasuryBalance(account.id))} {acctCurrency}
					</p>
				</div>
			))}
		</div>

		<div className="flex items-center justify-between mb-3 flex-wrap gap-2">
			<h3 className="text-sm font-bold text-stone-700">{translateAccountText("treasuryMovement")}</h3>
			<div className="flex items-center gap-2">
				<select
					value={treasuryFilterAccountId}
					onChange={(e) => setTreasuryFilterAccountId(e.target.value)}
					className="border border-stone-300 rounded-lg px-2 py-1.5 text-xs"
				>
					<option value="">{translateAccountText("allAccounts")}</option>
					{treasuryAccounts.map((account) => (
						<option key={account.id} value={account.id}>{account.name}</option>
					))}
				</select>
				<button
					onClick={() => { setTreasuryEntryForm(getEmptyTreasuryEntryForm()); setShowTreasuryEntryForm(true); }}
					className="flex items-center gap-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg px-3 py-1.5"
				>
					<Plus size={14} /> {translateAccountText("manualEntry")}
				</button>
			</div>
		</div>
		<div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
			<table className="w-full min-w-max text-sm">
				<thead className="bg-stone-50 text-stone-500 text-xs">
					<tr>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colDate")}</th>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colAccount")}</th>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colStatement")}</th>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colAmount")}</th>
						<th className="px-3 py-2"></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-stone-100">
					{filteredTreasuryTransactions.length === 0 ? (
						<tr><td colSpan={5} className="text-center text-stone-400 py-6">{translateAccountText("noTransactions")}</td></tr>
					) : (
						filteredTreasuryTransactions.map((transaction) => {
							const [prefix, rawId] = transaction.id.split(/-(.+)/);
							return (
								<tr key={transaction.id}>
									<td className="px-3 py-2 text-stone-500 text-xs whitespace-nowrap">{transaction.date ? formatDisplayDate(transaction.date) : "-"}</td>
									<td className="px-3 py-2 text-stone-600 text-xs whitespace-nowrap">{treasuryAccounts.find((account) => account.id === transaction.accountId)?.name || "-"}</td>
									<td className="px-3 py-2 text-stone-800 flex items-center gap-1.5 whitespace-nowrap">
										{transaction.direction === "in" ? <ArrowDownCircle size={14} className="text-emerald-600 shrink-0" /> : <ArrowUpCircle size={14} className="text-red-500 shrink-0" />}
										{transaction.label}
									</td>
									<td className={`px-3 py-2 font-semibold whitespace-nowrap ${transaction.direction === "in" ? "text-emerald-700" : "text-red-600"}`}>
										{transaction.direction === "in" ? "+" : "-"}{fmt(transaction.amount)}
									</td>
									<td className="px-3 py-2">
										{prefix === "te" && (
											<button title="Delete entry" onClick={() => handleDeleteTreasuryEntry(rawId)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
										)}
										{prefix === "sp" && (
											<button title="Delete payment" onClick={() => handleDeleteSupplierPayment(rawId)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
										)}
										{prefix === "cp" && (
											<button title="Delete payment" onClick={() => handleDeleteCustomerPayment(rawId)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
										)}
										{prefix === "ex" && (
											<button title="Delete expense" onClick={() => handleDeleteExpense(rawId)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
										)}
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	</div>
);

export default AccountsTreasury;
