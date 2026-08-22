import React from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

const AccountsExpenses = ({
	translateAccountText,
	expenseCategoryFilter,
	setExpenseCategoryFilter,
	EXPENSE_CATEGORIES,
	expenseCategoryLabel,
	setExpenseForm,
	getEmptyExpenseForm,
	setExpenseEditingId,
	setShowExpenseForm,
	filteredExpenses,
	treasuryAccounts,
	fmt,
	formatDisplayDate,
	handleEditExpenseClick,
	handleDeleteExpense,
}) => (
	<div>
		<div className="flex items-center justify-between mb-3 flex-wrap gap-2">
			<select
				value={expenseCategoryFilter}
				onChange={(e) => setExpenseCategoryFilter(e.target.value)}
				className="border border-stone-300 rounded-lg px-2 py-1.5 text-xs"
			>
				<option value="">{translateAccountText("allCategories")}</option>
				{EXPENSE_CATEGORIES.map((category) => (
					<option key={category} value={category}>{expenseCategoryLabel(category)}</option>
				))}
			</select>
			<button
				onClick={() => { setExpenseForm(getEmptyExpenseForm()); setExpenseEditingId(null); setShowExpenseForm(true); }}
				className="flex items-center gap-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg px-3 py-1.5"
			>
				<Plus size={14} /> {translateAccountText("addExpense")}
			</button>
		</div>
		<div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
			<table className="w-full min-w-max text-sm">
				<thead className="bg-stone-50 text-stone-500 text-xs">
					<tr>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colDate")}</th>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colCategory")}</th>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colDescription")}</th>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colAccount")}</th>
						<th className="text-right px-3 py-2 font-medium whitespace-nowrap">{translateAccountText("colAmount")}</th>
						<th className="px-3 py-2"></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-stone-100">
					{filteredExpenses.length === 0 ? (
						<tr><td colSpan={6} className="text-center text-stone-400 py-6">{translateAccountText("noExpenses")}</td></tr>
					) : (
						filteredExpenses.map((expense) => (
							<tr key={expense.id}>
								<td className="px-3 py-2 text-stone-500 text-xs whitespace-nowrap">{expense.date ? formatDisplayDate(expense.date) : "-"}</td>
								<td className="px-3 py-2 text-stone-700 whitespace-nowrap">{expenseCategoryLabel(expense.category)}</td>
								<td className="px-3 py-2 text-stone-500 text-xs whitespace-nowrap">{expense.description || "-"}</td>
								<td className="px-3 py-2 text-stone-500 text-xs whitespace-nowrap">{treasuryAccounts.find((account) => account.id === expense.accountId)?.name || "-"}</td>
								<td className="px-3 py-2 font-semibold text-red-600 whitespace-nowrap">{fmt(parseFloat(expense.amount) || 0)}</td>
								<td className="px-3 py-2">
									<div className="flex items-center gap-1.5 justify-end">
										<button onClick={() => handleEditExpenseClick(expense)} className="text-stone-400 hover:text-teal-700"><Pencil size={14} /></button>
										<button title="Delete expense" onClick={() => handleDeleteExpense(expense.id)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	</div>
);

export default AccountsExpenses;
