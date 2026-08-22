import React from "react";
import { X } from "lucide-react";

const AccountsTreasuryAccountForm = ({
	translateAccountText,
	treasuryForm,
	setTreasuryForm,
	treasuryAccountEditingId,
	setShowTreasuryAccountForm,
	TREASURY_ACCOUNT_TYPES,
	treasuryAccountTypeLabel,
	handleSaveTreasuryAccount,
	addCentsOnBlur,
}) => (
	<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowTreasuryAccountForm(false)}>
		<div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(event) => event.stopPropagation()}>
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-sm font-bold text-stone-800">{treasuryAccountEditingId ? translateAccountText("editAccount") : translateAccountText("addAccountTreasury")}</h3>
				<button title="Close" onClick={() => setShowTreasuryAccountForm(false)} className="text-stone-400 hover:text-stone-700"><X size={18} /></button>
			</div>
			<div className="space-y-3">
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("accountName")}</label>
					<input value={treasuryForm.name} onChange={(e) => setTreasuryForm({ ...treasuryForm, name: e.target.value })} placeholder={translateAccountText("accountNamePlaceholder")} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
				</div>
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("type")}</label>
					<select value={treasuryForm.type} onChange={(e) => setTreasuryForm({ ...treasuryForm, type: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm">
						{TREASURY_ACCOUNT_TYPES.map((accountType) => <option key={accountType.value} value={accountType.value}>{treasuryAccountTypeLabel(accountType.value)}</option>)}
					</select>
				</div>
				<div>
					<label className="text-xs text-stone-500 block mb-1">{translateAccountText("openingBalance")}</label>
					<input type="number" value={treasuryForm.openingBalance} onChange={(e) => setTreasuryForm({ ...treasuryForm, openingBalance: e.target.value })} onBlur={(e) => setTreasuryForm({ ...treasuryForm, openingBalance: addCentsOnBlur(e.target.value) })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
				</div>
			</div>
			<button onClick={handleSaveTreasuryAccount} className="w-full mt-4 bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl py-2.5">
				{treasuryAccountEditingId ? translateAccountText("saveChanges") : translateAccountText("addAccount")}
			</button>
		</div>
	</div>
);

export default AccountsTreasuryAccountForm;
