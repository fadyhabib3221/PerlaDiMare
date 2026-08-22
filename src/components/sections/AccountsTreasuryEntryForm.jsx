import React from "react";
import { X } from "lucide-react";

const AccountsTreasuryEntryForm = ({
	translateAccountText,
	treasuryEntryForm,
	setTreasuryEntryForm,
	setShowTreasuryEntryForm,
	TREASURY_ENTRY_CATEGORIES_IN,
	TREASURY_ENTRY_CATEGORIES_OUT,
	treasuryEntryCategoryLabel,
	treasuryAccounts,
	handleSaveTreasuryEntry,
	addCentsOnBlur,
}) => (
	<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowTreasuryEntryForm(false)}>
		<div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(event) => event.stopPropagation()}>
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-sm font-bold text-stone-800">{translateAccountText("manualEntryTitle")}</h3>
				<button title="Close" onClick={() => setShowTreasuryEntryForm(false)} className="text-stone-400 hover:text-stone-700"><X size={18} /></button>
			</div>
			<div className="space-y-3">
				<div className="flex gap-2">
					<button onClick={() => setTreasuryEntryForm({ ...treasuryEntryForm, direction: "in", category: TREASURY_ENTRY_CATEGORIES_IN[0] })} className={`flex-1 rounded-xl py-2 text-xs font-semibold border ${treasuryEntryForm.direction === "in" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white border-stone-300 text-stone-500"}`}>{translateAccountText("directionIn")}</button>
					<button onClick={() => setTreasuryEntryForm({ ...treasuryEntryForm, direction: "out", category: TREASURY_ENTRY_CATEGORIES_OUT[0] })} className={`flex-1 rounded-xl py-2 text-xs font-semibold border ${treasuryEntryForm.direction === "out" ? "bg-red-600 text-white border-red-600" : "bg-white border-stone-300 text-stone-500"}`}>{translateAccountText("directionOut")}</button>
				</div>
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("colDate")}</label>
					<input type="date" value={treasuryEntryForm.date} onChange={(e) => setTreasuryEntryForm({ ...treasuryEntryForm, date: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
				</div>
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("colAccount")}</label>
					<select value={treasuryEntryForm.accountId} onChange={(e) => setTreasuryEntryForm({ ...treasuryEntryForm, accountId: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"><option value="">{translateAccountText("selectAccount")}</option>{treasuryAccounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}</select>
				</div>
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("item")}</label>
					<select value={treasuryEntryForm.category} onChange={(e) => setTreasuryEntryForm({ ...treasuryEntryForm, category: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm">{(treasuryEntryForm.direction === "in" ? TREASURY_ENTRY_CATEGORIES_IN : TREASURY_ENTRY_CATEGORIES_OUT).map((category) => <option key={category} value={category}>{treasuryEntryCategoryLabel(category)}</option>)}</select>
				</div>
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("amountEgp")}</label>
					<input type="number" value={treasuryEntryForm.amount} onChange={(e) => setTreasuryEntryForm({ ...treasuryEntryForm, amount: e.target.value })} onBlur={(e) => setTreasuryEntryForm({ ...treasuryEntryForm, amount: addCentsOnBlur(e.target.value) })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
				</div>
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("notes")}</label>
					<input value={treasuryEntryForm.note} onChange={(e) => setTreasuryEntryForm({ ...treasuryEntryForm, note: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
				</div>
			</div>
			<button onClick={handleSaveTreasuryEntry} className="w-full mt-4 bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl py-2.5">{translateAccountText("saveEntry")}</button>
		</div>
	</div>
);

export default AccountsTreasuryEntryForm;
