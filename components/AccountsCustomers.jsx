import { Search, Trash2, X } from "lucide-react";

export default function AccountsCustomers({
  activeTab,
  at,
  customerQuery,
  setCustomerQuery,
  filteredCustomerLedger,
  setViewingCustomer,
  accountsLang,
  sectionLabel,
  fmt,
  viewingCustomer,
  customerLedger,
  acctBookings,
  customerPayments,
  customerPaymentForm,
  setCustomerPaymentForm,
  treasuryAccounts,
  addCentsOnBlur,
  handleSaveCustomerPayment,
  handleDeleteCustomerPayment,
  acctCurrency,
  formatDisplayDate,
}) {
  return (
    <>
      {activeTab === "customers" && (
        <div>
          <div className="relative mb-4">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={customerQuery}
              onChange={(e) => setCustomerQuery(e.target.value)}
              placeholder={at("searchCustomer")}
              className="w-full border border-stone-300 rounded-xl pr-9 pl-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            />
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
            <table className="w-full min-w-max text-sm">
              <thead className="bg-stone-50 text-stone-500 text-xs">
                <tr>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colCustomer")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colSections")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colTotalDue")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colCollected")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colRemaining")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredCustomerLedger.length === 0 ? (
                  <tr><td colSpan={5} className="text-center text-stone-400 py-6">{at("noCustomers")}</td></tr>
                ) : (
                  filteredCustomerLedger.map((c) => (
                    <tr
                      key={c.customer}
                      onClick={() => setViewingCustomer(c.customer)}
                      className="hover:bg-teal-50 cursor-pointer"
                    >
                      <td className="px-3 py-2 font-semibold text-stone-800 whitespace-nowrap">{c.customer}</td>
                      <td className="px-3 py-2 text-stone-500 text-xs whitespace-nowrap">{c.sections.map((x) => sectionLabel(x)).join(accountsLang === "en" ? ", " : "، ") || "-"}</td>
                      <td className="px-3 py-2 text-stone-700 whitespace-nowrap">{fmt(c.totalDue)}</td>
                      <td className="px-3 py-2 text-emerald-700 whitespace-nowrap">{fmt(c.paid)}</td>
                      <td className={`px-3 py-2 font-bold whitespace-nowrap ${c.balance > 0 ? "text-red-600" : "text-stone-400"}`}>{fmt(c.balance)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewingCustomer && (
        <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-lg md:text-xl font-bold text-stone-900" style={{ fontFamily: "'Fraunces', serif" }}>{viewingCustomer}</h1>
              <button title="Close" onClick={() => setViewingCustomer(null)} className="text-stone-400 hover:text-stone-700 p-1.5"><X size={18} /></button>
            </div>
            {(() => {
              const c = customerLedger.find((x) => x.customer === viewingCustomer) || { totalDue: 0, paid: 0, balance: 0 };
              const bookings = acctBookings.filter((b) => b.customers.includes(viewingCustomer)).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
              const payments = customerPayments.filter((p) => p.customer === viewingCustomer).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
              return (
                <>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-stone-50 rounded-xl p-3 text-center">
                      <p className="text-[11px] text-stone-500 mb-1">{at("colTotalDue")}</p>
                      <p className="font-bold text-stone-800">{fmt(c.totalDue)}</p>
                    </div>
                    <div className="bg-stone-50 rounded-xl p-3 text-center">
                      <p className="text-[11px] text-stone-500 mb-1">{at("colCollected")}</p>
                      <p className="font-bold text-emerald-700">{fmt(c.paid)}</p>
                    </div>
                    <div className="bg-stone-50 rounded-xl p-3 text-center">
                      <p className="text-[11px] text-stone-500 mb-1">{at("colRemaining")}</p>
                      <p className={`font-bold ${c.balance > 0 ? "text-red-600" : "text-stone-500"}`}>{fmt(c.balance)}</p>
                    </div>
                  </div>

                  <div className="bg-teal-50/60 border border-teal-100 rounded-2xl p-4 mb-6">
                    <h3 className="text-xs font-bold text-teal-900 mb-3">{at("recordNewCollection")}</h3>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input type="date" value={customerPaymentForm.date} onChange={(e) => setCustomerPaymentForm({ ...customerPaymentForm, customer: viewingCustomer, date: e.target.value })} className="border border-stone-300 rounded-lg px-2.5 py-2 text-sm" />
                      <input type="number" placeholder={at("colAmount")} value={customerPaymentForm.amount} onChange={(e) => setCustomerPaymentForm({ ...customerPaymentForm, customer: viewingCustomer, amount: e.target.value })} onBlur={(e) => setCustomerPaymentForm({ ...customerPaymentForm, customer: viewingCustomer, amount: addCentsOnBlur(e.target.value) })} className="border border-stone-300 rounded-lg px-2.5 py-2 text-sm" />
                      <select value={customerPaymentForm.accountId} onChange={(e) => setCustomerPaymentForm({ ...customerPaymentForm, customer: viewingCustomer, accountId: e.target.value })} className="border border-stone-300 rounded-lg px-2.5 py-2 text-sm col-span-2">
                        <option value="">{at("collectInto")}</option>
                        {treasuryAccounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                      </select>
                      <input placeholder={at("notesOptional")} value={customerPaymentForm.note} onChange={(e) => setCustomerPaymentForm({ ...customerPaymentForm, customer: viewingCustomer, note: e.target.value })} className="border border-stone-300 rounded-lg px-2.5 py-2 text-sm col-span-2" />
                    </div>
                    <button onClick={handleSaveCustomerPayment} className="w-full bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-lg py-2">{at("recordCollection")}</button>
                  </div>

                  <h3 className="text-xs font-bold text-stone-600 mb-2">{at("collectionHistory")}</h3>
                  <div className="space-y-2 mb-6">
                    {payments.length === 0 ? (
                      <p className="text-xs text-stone-400">{at("noCollectionsRecorded")}</p>
                    ) : (
                      payments.map((p) => (
                        <div key={p.id} className="flex items-center justify-between bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm">
                          <div>
                            <p className="font-semibold text-stone-800">{fmt(parseFloat(p.amount) || 0)} {acctCurrency}</p>
                            <p className="text-[11px] text-stone-400">{p.date ? formatDisplayDate(p.date) : "-"} · {treasuryAccounts.find((a) => a.id === p.accountId)?.name || "-"}{p.note ? ` · ${p.note}` : ""}</p>
                          </div>
                          <button title="Delete payment" onClick={() => handleDeleteCustomerPayment(p.id)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
                        </div>
                      ))
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-stone-600 mb-2">{at("relatedBookings")}</h3>
                  <div className="space-y-2">
                    {bookings.length === 0 ? (
                      <p className="text-xs text-stone-400">{at("noBookings")}</p>
                    ) : (
                      bookings.map((b) => (
                        <div key={b.key} className="flex items-center justify-between bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm">
                          <div>
                            <p className="font-semibold text-stone-800">{sectionLabel(b.section)}</p>
                            <p className="text-[11px] text-stone-400">{b.date ? formatDisplayDate(b.date) : "-"}</p>
                          </div>
                          <p className="font-semibold text-stone-700">{fmt(b.sold / (b.customers.length || 1))} {acctCurrency}</p>
                        </div>
                      ))
                    )}
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