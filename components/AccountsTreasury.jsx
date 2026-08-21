import React from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Banknote,
  Landmark,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

export default function AccountsTreasury({
  activeTab,
  at,
  acctCurrency,
  treasuryAccounts,
  treasuryAccountTypeLabel,
  treasuryBalance,
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
  showTreasuryAccountForm,
  treasuryForm,
  treasuryAccountEditingId,
  addCentsOnBlur,
  TREASURY_ACCOUNT_TYPES,
  handleSaveTreasuryAccount,
  showTreasuryEntryForm,
  treasuryEntryForm,
  TREASURY_ENTRY_CATEGORIES_IN,
  TREASURY_ENTRY_CATEGORIES_OUT,
  treasuryEntryCategoryLabel,
  handleSaveTreasuryEntry,
}) {
  return (
    <>
      {activeTab === "treasury" && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-stone-700">{at("accountsAndTreasuries")}</h3>
            <button
              onClick={() => { setTreasuryForm(getEmptyTreasuryAccountForm()); setTreasuryAccountEditingId(null); setShowTreasuryAccountForm(true); }}
              className="flex items-center gap-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg px-3 py-1.5"
            >
              <Plus size={14} /> {at("addAccount")}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {treasuryAccounts.length === 0 && (
              <p className="text-sm text-stone-400 col-span-full">{at("noAccountsYet")}</p>
            )}
            {treasuryAccounts.map((a) => (
              <div key={a.id} className="bg-white rounded-2xl border border-stone-200 p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-stone-800 font-semibold text-sm">
                    {a.type === "bank" ? <Landmark size={16} /> : <Banknote size={16} />}
                    {a.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleEditTreasuryAccountClick(a)} className="text-stone-400 hover:text-teal-700"><Pencil size={14} /></button>
                    <button title="Delete account" onClick={() => handleDeleteTreasuryAccount(a.id)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                </div>
                <p className="text-xs text-stone-400 mb-2">{treasuryAccountTypeLabel(a.type)}</p>
                <p className={`text-lg font-bold ${treasuryBalance(a.id) >= 0 ? "text-emerald-700" : "text-red-600"}`}>
                  {fmt(treasuryBalance(a.id))} {acctCurrency}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h3 className="text-sm font-bold text-stone-700">{at("treasuryMovement")}</h3>
            <div className="flex items-center gap-2">
              <select
                value={treasuryFilterAccountId}
                onChange={(e) => setTreasuryFilterAccountId(e.target.value)}
                className="border border-stone-300 rounded-lg px-2 py-1.5 text-xs"
              >
                <option value="">{at("allAccounts")}</option>
                {treasuryAccounts.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
              <button
                onClick={() => { setTreasuryEntryForm(getEmptyTreasuryEntryForm()); setShowTreasuryEntryForm(true); }}
                className="flex items-center gap-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg px-3 py-1.5"
              >
                <Plus size={14} /> {at("manualEntry")}
              </button>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
            <table className="w-full min-w-max text-sm">
              <thead className="bg-stone-50 text-stone-500 text-xs">
                <tr>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colDate")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colAccount")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colStatement")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colAmount")}</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredTreasuryTransactions.length === 0 ? (
                  <tr><td colSpan={5} className="text-center text-stone-400 py-6">{at("noTransactions")}</td></tr>
                ) : (
                  filteredTreasuryTransactions.map((tx) => {
                    const [prefix, rawId] = tx.id.split(/-(.+)/);
                    return (
                      <tr key={tx.id}>
                        <td className="px-3 py-2 text-stone-500 text-xs whitespace-nowrap">{tx.date ? formatDisplayDate(tx.date) : "-"}</td>
                        <td className="px-3 py-2 text-stone-600 text-xs whitespace-nowrap">{treasuryAccounts.find((a) => a.id === tx.accountId)?.name || "-"}</td>
                        <td className="px-3 py-2 text-stone-800 flex items-center gap-1.5 whitespace-nowrap">
                          {tx.direction === "in" ? <ArrowDownCircle size={14} className="text-emerald-600 shrink-0" /> : <ArrowUpCircle size={14} className="text-red-500 shrink-0" />}
                          {tx.label}
                        </td>
                        <td className={`px-3 py-2 font-semibold whitespace-nowrap ${tx.direction === "in" ? "text-emerald-700" : "text-red-600"}`}>
                          {tx.direction === "in" ? "+" : "-"}{fmt(tx.amount)}
                        </td>
                        <td className="px-3 py-2">
                          {prefix === "te" && <button title="Delete entry" onClick={() => handleDeleteTreasuryEntry(rawId)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>}
                          {prefix === "sp" && <button title="Delete payment" onClick={() => handleDeleteSupplierPayment(rawId)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>}
                          {prefix === "cp" && <button title="Delete payment" onClick={() => handleDeleteCustomerPayment(rawId)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>}
                          {prefix === "ex" && <button title="Delete expense" onClick={() => handleDeleteExpense(rawId)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showTreasuryAccountForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowTreasuryAccountForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(ev) => ev.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-stone-800">{treasuryAccountEditingId ? at("editAccount") : at("addAccountTreasury")}</h3>
              <button title="Close" onClick={() => setShowTreasuryAccountForm(false)} className="text-stone-400 hover:text-stone-700"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("accountName")}</label>
                <input value={treasuryForm.name} onChange={(e) => setTreasuryForm({ ...treasuryForm, name: e.target.value })} placeholder={at("accountNamePlaceholder")} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("type")}</label>
                <select value={treasuryForm.type} onChange={(e) => setTreasuryForm({ ...treasuryForm, type: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm">
                  {TREASURY_ACCOUNT_TYPES.map((t) => <option key={t.value} value={t.value}>{treasuryAccountTypeLabel(t.value)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("openingBalance")}</label>
                <input type="number" value={treasuryForm.openingBalance} onChange={(e) => setTreasuryForm({ ...treasuryForm, openingBalance: e.target.value })} onBlur={(e) => setTreasuryForm({ ...treasuryForm, openingBalance: addCentsOnBlur(e.target.value) })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
              </div>
            </div>
            <button onClick={handleSaveTreasuryAccount} className="w-full mt-4 bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl py-2.5">
              {treasuryAccountEditingId ? at("saveChanges") : at("addAccount")}
            </button>
          </div>
        </div>
      )}

      {showTreasuryEntryForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowTreasuryEntryForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(ev) => ev.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-stone-800">{at("manualEntryTitle")}</h3>
              <button title="Close" onClick={() => setShowTreasuryEntryForm(false)} className="text-stone-400 hover:text-stone-700"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <button onClick={() => setTreasuryEntryForm({ ...treasuryEntryForm, direction: "in", category: TREASURY_ENTRY_CATEGORIES_IN[0] })} className={`flex-1 rounded-xl py-2 text-xs font-semibold border ${treasuryEntryForm.direction === "in" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white border-stone-300 text-stone-500"}`}>{at("directionIn")}</button>
                <button onClick={() => setTreasuryEntryForm({ ...treasuryEntryForm, direction: "out", category: TREASURY_ENTRY_CATEGORIES_OUT[0] })} className={`flex-1 rounded-xl py-2 text-xs font-semibold border ${treasuryEntryForm.direction === "out" ? "bg-red-600 text-white border-red-600" : "bg-white border-stone-300 text-stone-500"}`}>{at("directionOut")}</button>
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("colDate")}</label>
                <input type="date" value={treasuryEntryForm.date} onChange={(e) => setTreasuryEntryForm({ ...treasuryEntryForm, date: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("colAccount")}</label>
                <select value={treasuryEntryForm.accountId} onChange={(e) => setTreasuryEntryForm({ ...treasuryEntryForm, accountId: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm">
                  <option value="">{at("selectAccount")}</option>
                  {treasuryAccounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("item")}</label>
                <select value={treasuryEntryForm.category} onChange={(e) => setTreasuryEntryForm({ ...treasuryEntryForm, category: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm">
                  {(treasuryEntryForm.direction === "in" ? TREASURY_ENTRY_CATEGORIES_IN : TREASURY_ENTRY_CATEGORIES_OUT).map((c) => <option key={c} value={c}>{treasuryEntryCategoryLabel(c)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("amountEgp")}</label>
                <input type="number" value={treasuryEntryForm.amount} onChange={(e) => setTreasuryEntryForm({ ...treasuryEntryForm, amount: e.target.value })} onBlur={(e) => setTreasuryEntryForm({ ...treasuryEntryForm, amount: addCentsOnBlur(e.target.value) })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("notes")}</label>
                <input value={treasuryEntryForm.note} onChange={(e) => setTreasuryEntryForm({ ...treasuryEntryForm, note: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
              </div>
            </div>
            <button onClick={handleSaveTreasuryEntry} className="w-full mt-4 bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl py-2.5">{at("saveEntry")}</button>
          </div>
        </div>
      )}
    </>
  );
}