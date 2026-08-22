import React from "react";
import { X } from "lucide-react";

const AccountsExpenseForm = ({
	translateAccountText,
	expenseForm,
	setExpenseForm,
	expenseEditingId,
	setShowExpenseForm,
	EXPENSE_CATEGORIES,
	expenseCategoryLabel,
	treasuryAccounts,
	handleSaveExpense,
	addCentsOnBlur,
}) => (
	<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowExpenseForm(false)}>
		<div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(event) => event.stopPropagation()}>
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-sm font-bold text-stone-800">{expenseEditingId ? translateAccountText("editExpense") : translateAccountText("addExpense")}</h3>
				<button title="Close" onClick={() => setShowExpenseForm(false)} className="text-stone-400 hover:text-stone-700"><X size={18} /></button>
			</div>
			<div className="space-y-3">
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("colDate")}</label>
					<input type="date" value={expenseForm.date} onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
				</div>
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("colCategory")}</label>
					<select value={expenseForm.category} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm">
						{EXPENSE_CATEGORIES.map((category) => <option key={category} value={category}>{expenseCategoryLabel(category)}</option>)}
					</select>
				</div>
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("descriptionOptional")}</label>
					<input value={expenseForm.description} onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
				</div>
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("amountEgp")}</label>
					<input type="number" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} onBlur={(e) => setExpenseForm({ ...expenseForm, amount: addCentsOnBlur(e.target.value) })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
				</div>
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("payFromAccount")}</label>
					<select value={expenseForm.accountId} onChange={(e) => setExpenseForm({ ...expenseForm, accountId: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm">
						<option value="">{translateAccountText("selectAccount")}</option>
						{treasuryAccounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
					</select>
				</div>
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("notes")}</label>
					<textarea value={expenseForm.note} onChange={(e) => setExpenseForm({ ...expenseForm, note: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" rows={2} />
				</div>
			</div>
			<button onClick={handleSaveExpense} className="w-full mt-4 bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl py-2.5">
				{expenseEditingId ? translateAccountText("saveChanges") : translateAccountText("addExpense")}
			</button>
		</div>
	</div>
);

export default AccountsExpenseForm;
