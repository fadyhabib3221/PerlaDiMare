import { Search, Trash2, X } from "lucide-react";

export default function AccountsSuppliers({
  activeTab,
  at,
  supplierQuery,
  setSupplierQuery,
  filteredSupplierLedger,
  sectionLabel,
  accountsLang,
  fmt,
  viewingSupplier,
  setViewingSupplier,
  supplierLedger,
  acctBookings,
  supplierPayments,
  supplierPaymentForm,
  setSupplierPaymentForm,
  treasuryAccounts,
  addCentsOnBlur,
  handleSaveSupplierPayment,
  handleDeleteSupplierPayment,
  acctCurrency,
  formatDisplayDate,
}) {
  return (
    <>
      {activeTab === "suppliers" && (
        <div>
          <div className="relative mb-4">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={supplierQuery}
              onChange={(e) => setSupplierQuery(e.target.value)}
              placeholder={at("searchSupplier")}
              className="w-full border border-stone-300 rounded-xl pr-9 pl-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            />
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
            <table className="w-full min-w-max text-sm">
              <thead className="bg-stone-50 text-stone-500 text-xs">
                <tr>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colSupplier")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colSections")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colTotalOwed")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colPaid")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colRemaining")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredSupplierLedger.length === 0 ? (
                  <tr><td colSpan={5} className="text-center text-stone-400 py-6">{at("noSuppliers")}</td></tr>
                ) : (
                  filteredSupplierLedger.map((s) => (
                    <tr key={s.supplier} onClick={() => setViewingSupplier(s.supplier)} className="hover:bg-teal-50 cursor-pointer">
                      <td className="px-3 py-2 font-semibold text-stone-800 whitespace-nowrap">{s.supplier}</td>
                      <td className="px-3 py-2 text-stone-500 text-xs whitespace-nowrap">{s.sections.map((x) => sectionLabel(x)).join(accountsLang === "en" ? ", " : "، ") || "-"}</td>
                      <td className="px-3 py-2 text-stone-700 whitespace-nowrap">{fmt(s.totalOwed)}</td>
                      <td className="px-3 py-2 text-emerald-700 whitespace-nowrap">{fmt(s.paid)}</td>
                      <td className={`px-3 py-2 font-bold whitespace-nowrap ${s.balance > 0 ? "text-red-600" : "text-stone-400"}`}>{fmt(s.balance)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewingSupplier && (
        <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-lg md:text-xl font-bold text-stone-900" style={{ fontFamily: "'Fraunces', serif" }}>{viewingSupplier}</h1>
              <button title="Close" onClick={() => setViewingSupplier(null)} className="text-stone-400 hover:text-stone-700 p-1.5"><X size={18} /></button>
            </div>
            {(() => {
              const s = supplierLedger.find((x) => x.supplier === viewingSupplier) || { totalOwed: 0, paid: 0, balance: 0 };
              const bookings = acctBookings.filter((b) => b.supplier === viewingSupplier).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
              const payments = supplierPayments.filter((p) => p.supplier === viewingSupplier).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
              return (
                <>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-stone-50 rounded-xl p-3 text-center"><p className="text-[11px] text-stone-500 mb-1">{at("colTotalOwed")}</p><p className="font-bold text-stone-800">{fmt(s.totalOwed)}</p></div>
                    <div className="bg-stone-50 rounded-xl p-3 text-center"><p className="text-[11px] text-stone-500 mb-1">{at("colPaid")}</p><p className="font-bold text-emerald-700">{fmt(s.paid)}</p></div>
                    <div className="bg-stone-50 rounded-xl p-3 text-center"><p className="text-[11px] text-stone-500 mb-1">{at("colRemaining")}</p><p className={`font-bold ${s.balance > 0 ? "text-red-600" : "text-stone-500"}`}>{fmt(s.balance)}</p></div>
                  </div>
                  <div className="bg-teal-50/60 border border-teal-100 rounded-2xl p-4 mb-6">
                    <h3 className="text-xs font-bold text-teal-900 mb-3">{at("recordNewPayment")}</h3>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input type="date" value={supplierPaymentForm.date} onChange={(e) => setSupplierPaymentForm({ ...supplierPaymentForm, supplier: viewingSupplier, date: e.target.value })} className="border border-stone-300 rounded-lg px-2.5 py-2 text-sm" />
                      <input type="number" placeholder={at("colAmount")} value={supplierPaymentForm.amount} onChange={(e) => setSupplierPaymentForm({ ...supplierPaymentForm, supplier: viewingSupplier, amount: e.target.value })} onBlur={(e) => setSupplierPaymentForm({ ...supplierPaymentForm, supplier: viewingSupplier, amount: addCentsOnBlur(e.target.value) })} className="border border-stone-300 rounded-lg px-2.5 py-2 text-sm" />
                      <select value={supplierPaymentForm.accountId} onChange={(e) => setSupplierPaymentForm({ ...supplierPaymentForm, supplier: viewingSupplier, accountId: e.target.value })} className="border border-stone-300 rounded-lg px-2.5 py-2 text-sm col-span-2"><option value="">{at("payFrom")}</option>{treasuryAccounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}</select>
                      <input placeholder={at("notesOptional")} value={supplierPaymentForm.note} onChange={(e) => setSupplierPaymentForm({ ...supplierPaymentForm, supplier: viewingSupplier, note: e.target.value })} className="border border-stone-300 rounded-lg px-2.5 py-2 text-sm col-span-2" />
                    </div>
                    <button onClick={handleSaveSupplierPayment} className="w-full bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-lg py-2">{at("recordPayment")}</button>
                  </div>
                  <h3 className="text-xs font-bold text-stone-600 mb-2">{at("paymentHistory")}</h3>
                  <div className="space-y-2 mb-6">
                    {payments.length === 0 ? <p className="text-xs text-stone-400">{at("noPaymentsRecorded")}</p> : payments.map((p) => (
                      <div key={p.id} className="flex items-center justify-between bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm">
                        <div><p className="font-semibold text-stone-800">{fmt(parseFloat(p.amount) || 0)} {acctCurrency}</p><p className="text-[11px] text-stone-400">{p.date ? formatDisplayDate(p.date) : "-"} · {treasuryAccounts.find((a) => a.id === p.accountId)?.name || "-"}{p.note ? ` · ${p.note}` : ""}</p></div>
                        <button title="Delete payment" onClick={() => handleDeleteSupplierPayment(p.id)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-xs font-bold text-stone-600 mb-2">{at("relatedBookings")}</h3>
                  <div className="space-y-2">
                    {bookings.length === 0 ? <p className="text-xs text-stone-400">{at("noBookings")}</p> : bookings.map((b) => (
                      <div key={b.key} className="flex items-center justify-between bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm">
                        <div><p className="font-semibold text-stone-800">{sectionLabel(b.section)} · {b.customers.join(", ") || "-"}</p><p className="text-[11px] text-stone-400">{b.date ? formatDisplayDate(b.date) : "-"}</p></div>
                        <p className="font-semibold text-stone-700">{fmt(b.net)} {acctCurrency}</p>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}