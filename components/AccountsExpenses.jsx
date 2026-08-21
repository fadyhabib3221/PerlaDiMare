import { Pencil, Plus, Trash2, X } from "lucide-react";

export default function AccountsExpenses({
  activeTab,
  at,
  expenseCategoryFilter,
  setExpenseCategoryFilter,
  EXPENSE_CATEGORIES,
  expenseCategoryLabel,
  setExpenseForm,
  getEmptyExpenseForm,
  setExpenseEditingId,
  setShowExpenseForm,
  filteredExpenses,
  formatDisplayDate,
  treasuryAccounts,
  fmt,
  handleEditExpenseClick,
  handleDeleteExpense,
  showExpenseForm,
  expenseEditingId,
  expenseForm,
  addCentsOnBlur,
  handleSaveExpense,
}) {
  return (
    <>
      {activeTab === "expenses" && (
        <div>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <select value={expenseCategoryFilter} onChange={(e) => setExpenseCategoryFilter(e.target.value)} className="border border-stone-300 rounded-lg px-2 py-1.5 text-xs">
              <option value="">{at("allCategories")}</option>
              {EXPENSE_CATEGORIES.map((c) => <option key={c} value={c}>{expenseCategoryLabel(c)}</option>)}
            </select>
            <button onClick={() => { setExpenseForm(getEmptyExpenseForm()); setExpenseEditingId(null); setShowExpenseForm(true); }} className="flex items-center gap-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg px-3 py-1.5">
              <Plus size={14} /> {at("addExpense")}
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
            <table className="w-full min-w-max text-sm">
              <thead className="bg-stone-50 text-stone-500 text-xs">
                <tr>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colDate")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colCategory")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colDescription")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colAccount")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colAmount")}</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredExpenses.length === 0 ? (
                  <tr><td colSpan={6} className="text-center text-stone-400 py-6">{at("noExpenses")}</td></tr>
                ) : (
                  filteredExpenses.map((e) => (
                    <tr key={e.id}>
                      <td className="px-3 py-2 text-stone-500 text-xs whitespace-nowrap">{e.date ? formatDisplayDate(e.date) : "-"}</td>
                      <td className="px-3 py-2 text-stone-700 whitespace-nowrap">{expenseCategoryLabel(e.category)}</td>
                      <td className="px-3 py-2 text-stone-500 text-xs whitespace-nowrap">{e.description || "-"}</td>
                      <td className="px-3 py-2 text-stone-500 text-xs whitespace-nowrap">{treasuryAccounts.find((a) => a.id === e.accountId)?.name || "-"}</td>
                      <td className="px-3 py-2 font-semibold text-red-600 whitespace-nowrap">{fmt(parseFloat(e.amount) || 0)}</td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-1.5 justify-end">
                          <button onClick={() => handleEditExpenseClick(e)} className="text-stone-400 hover:text-teal-700"><Pencil size={14} /></button>
                          <button title="Delete expense" onClick={() => handleDeleteExpense(e.id)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showExpenseForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowExpenseForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(ev) => ev.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-stone-800">{expenseEditingId ? at("editExpense") : at("addExpense")}</h3>
              <button title="Close" onClick={() => setShowExpenseForm(false)} className="text-stone-400 hover:text-stone-700"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("colDate")}</label>
                <input type="date" value={expenseForm.date} onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("colCategory")}</label>
                <select value={expenseForm.category} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm">
                  {EXPENSE_CATEGORIES.map((c) => <option key={c} value={c}>{expenseCategoryLabel(c)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("descriptionOptional")}</label>
                <input value={expenseForm.description} onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("amountEgp")}</label>
                <input type="number" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} onBlur={(e) => setExpenseForm({ ...expenseForm, amount: addCentsOnBlur(e.target.value) })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("payFromAccount")}</label>
                <select value={expenseForm.accountId} onChange={(e) => setExpenseForm({ ...expenseForm, accountId: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm">
                  <option value="">{at("selectAccount")}</option>
                  {treasuryAccounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">{at("notes")}</label>
                <textarea value={expenseForm.note} onChange={(e) => setExpenseForm({ ...expenseForm, note: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" rows={2} />
              </div>
            </div>
            <button onClick={handleSaveExpense} className="w-full mt-4 bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl py-2.5">
              {expenseEditingId ? at("saveChanges") : at("addExpense")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}