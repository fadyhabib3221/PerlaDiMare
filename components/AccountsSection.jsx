import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle, Banknote, Building2, Car, CheckCircle2, ClipboardList, Download, FileText, Hotel, Landmark, Pencil, PieChart, Plane, Plus, Printer, Receipt, Search, Trash2, TrendingUp, Users, X } from 'lucide-react';

const SECTION_ICONS = { flights: Plane, hotels: Hotel, visa: Users, cars: Car };

function AccountsOverview({ labels, currency, metrics, sectionProfits, formatNumber }) {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {metrics.map((metric) => (
          <div key={metric.key} className="bg-white rounded-2xl border border-stone-200 p-4">
            <p className="text-xs text-stone-500 mb-1">{metric.label}</p>
            <p className={`text-lg font-bold ${metric.color}`}>{formatNumber(metric.value)} {currency}</p>
          </div>
        ))}
      </div>
      <h3 className="text-sm font-bold text-stone-700 mb-2">{labels.profitBySection}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sectionProfits.map((item) => {
          const Icon = SECTION_ICONS[item.section] || Building2;
          return (
            <div key={item.section} className="bg-white rounded-2xl border border-stone-200 p-4">
              <div className="flex items-center gap-2 mb-1"><Icon size={14} className="text-stone-400" /><p className="text-xs text-stone-500">{item.label}</p></div>
              <p className="text-base font-bold text-emerald-700">{formatNumber(item.value)} {currency}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TABS = [
  { key: "overview", label: "Overview", icon: PieChart },
  { key: "suppliers", label: "Suppliers", icon: Building2 },
  { key: "customers", label: "Customers", icon: Users },
  { key: "invoices", label: "Invoices", icon: FileText },
  { key: "treasury", label: "Treasury & Banks", icon: Landmark },
  { key: "expenses", label: "Expenses", icon: Receipt },
  { key: "reports", label: "Financial Reports", icon: ClipboardList },
];

function AccountsTabs({ activeTab, onChange, labels }) {
  return (
    <div className="flex items-center gap-2 mb-5 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        return <button key={tab.key} onClick={() => onChange(tab.key)} className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors ${activeTab === tab.key ? "bg-teal-800 text-white border-teal-800" : "bg-white text-stone-500 border-stone-200 hover:border-teal-300 hover:text-teal-800"}`}><Icon size={15} />{labels[tab.key]}</button>;
      })}
    </div>
  );
}

function AccountsSuppliers({
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
                      <td className="px-3 py-2 text-stone-500 text-xs whitespace-nowrap">{s.sections.map((x) => sectionLabel(x)).join(accountsLang === "en" ? ", " : "ØŒ ") || "-"}</td>
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
                        <div><p className="font-semibold text-stone-800">{fmt(parseFloat(p.amount) || 0)} {acctCurrency}</p><p className="text-[11px] text-stone-400">{p.date ? formatDisplayDate(p.date) : "-"} Â· {treasuryAccounts.find((a) => a.id === p.accountId)?.name || "-"}{p.note ? ` Â· ${p.note}` : ""}</p></div>
                        <button title="Delete payment" onClick={() => handleDeleteSupplierPayment(p.id)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-xs font-bold text-stone-600 mb-2">{at("relatedBookings")}</h3>
                  <div className="space-y-2">
                    {bookings.length === 0 ? <p className="text-xs text-stone-400">{at("noBookings")}</p> : bookings.map((b) => (
                      <div key={b.key} className="flex items-center justify-between bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm">
                        <div><p className="font-semibold text-stone-800">{sectionLabel(b.section)} Â· {b.customers.join(", ") || "-"}</p><p className="text-[11px] text-stone-400">{b.date ? formatDisplayDate(b.date) : "-"}</p></div>
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

function AccountsCustomers({
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
                      <td className="px-3 py-2 text-stone-500 text-xs whitespace-nowrap">{c.sections.map((x) => sectionLabel(x)).join(accountsLang === "en" ? ", " : "ØŒ ") || "-"}</td>
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
                            <p className="text-[11px] text-stone-400">{p.date ? formatDisplayDate(p.date) : "-"} Â· {treasuryAccounts.find((a) => a.id === p.accountId)?.name || "-"}{p.note ? ` Â· ${p.note}` : ""}</p>
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

function AccountsTreasury({
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

function AccountsExpenses({
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

function AccountsReports({
  activeTab,
  at,
  setReportsRange,
  reportsRange,
  setReportsFrom,
  reportsFrom,
  setReportsTo,
  reportsTo,
  handleExportAccountsReport,
  sectionLabel,
  reportRevenueBySection,
  fmt,
  acctCurrency,
  reportBookingsCount,
  reportTotalRevenue,
  reportTotalExpenses,
  reportNetProfit,
  reportExpensesByCategory,
  expenseCategoryLabel,
}) {
  return (
    <>
      {activeTab === "reports" && (
        <div>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {[
              { key: "today", label: at("rangeToday") },
              { key: "month", label: at("rangeMonth") },
              { key: "custom", label: at("rangeCustom") },
            ].map((r) => (
              <button
                key={r.key}
                onClick={() => setReportsRange(r.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                  reportsRange === r.key ? "bg-teal-800 text-white border-teal-800" : "bg-white text-stone-500 border-stone-200"
                }`}
              >
                {r.label}
              </button>
            ))}
            {reportsRange === "custom" && (
              <>
                <input type="date" value={reportsFrom} onChange={(e) => setReportsFrom(e.target.value)} className="border border-stone-300 rounded-lg px-2 py-1.5 text-xs" />
                <span className="text-xs text-stone-400">{at("to")}</span>
                <input type="date" value={reportsTo} onChange={(e) => setReportsTo(e.target.value)} className="border border-stone-300 rounded-lg px-2 py-1.5 text-xs" />
              </>
            )}
            <button
              onClick={handleExportAccountsReport}
              className="mr-auto flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-b from-teal-700 to-teal-900 rounded-lg px-3 py-1.5"
            >
              <Download size={14} /> {at("exportExcel")}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {["flights", "hotels", "visa", "cars"].map((sec) => (
              <div key={sec} className="bg-white rounded-2xl border border-stone-200 p-4">
                <p className="text-xs text-stone-500 mb-1">{at("revenueOf")(sectionLabel(sec))}</p>
                <p className="text-base font-bold text-emerald-700">{fmt(reportRevenueBySection[sec])} {acctCurrency}</p>
                <p className="text-[11px] text-stone-400 mt-0.5">{reportBookingsCount[sec]} {at("bookingsCount")}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-4">
              <p className="text-xs text-stone-500 mb-1">{at("totalRevenue")}</p>
              <p className="text-lg font-bold text-emerald-700">{fmt(reportTotalRevenue)} {acctCurrency}</p>
            </div>
            <div className="bg-white rounded-2xl border border-stone-200 p-4">
              <p className="text-xs text-stone-500 mb-1">{at("totalExpenses")}</p>
              <p className="text-lg font-bold text-red-600">{fmt(reportTotalExpenses)} {acctCurrency}</p>
            </div>
            <div className="bg-white rounded-2xl border border-stone-200 p-4">
              <p className="text-xs text-stone-500 mb-1">{at("netProfit")}</p>
              <p className={`text-lg font-bold ${reportNetProfit >= 0 ? "text-emerald-700" : "text-red-600"}`}>{fmt(reportNetProfit)} {acctCurrency}</p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-stone-700 mb-2">{at("expensesByCategory")}</h3>
          <div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
            <table className="w-full min-w-max text-sm">
              <thead className="bg-stone-50 text-stone-500 text-xs">
                <tr>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colCategory")}</th>
                  <th className="text-right px-3 py-2 font-medium whitespace-nowrap">{at("colAmount")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {Object.keys(reportExpensesByCategory).length === 0 ? (
                  <tr><td colSpan={2} className="text-center text-stone-400 py-6">{at("noExpensesInPeriod")}</td></tr>
                ) : (
                  Object.entries(reportExpensesByCategory).map(([cat, amt]) => (
                    <tr key={cat}>
                      <td className="px-3 py-2 text-stone-700 whitespace-nowrap">{expenseCategoryLabel(cat)}</td>
                      <td className="px-3 py-2 font-semibold text-red-600 whitespace-nowrap">{fmt(amt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

const emptyInvoice = () => ({
  customer: "",
  issueDate: new Date().toISOString().slice(0, 10),
  dueDate: new Date().toISOString().slice(0, 10),
  description: "",
  amount: "",
  note: "",
});

function AccountsInvoices({
  activeTab,
  invoices,
  customerNames,
  treasuryAccounts,
  fmt,
  acctCurrency,
  formatDisplayDate,
  onSave,
  onDelete,
  onRecordPayment,
  at,
}) {
  const [form, setForm] = useState(emptyInvoice);
  const [showForm, setShowForm] = useState(false);
  const [payment, setPayment] = useState(null);
  const [paymentForm, setPaymentForm] = useState({ date: new Date().toISOString().slice(0, 10), amount: "", accountId: "", note: "" });

  if (activeTab !== "invoices") return null;

  const closeForm = () => { setShowForm(false); setForm(emptyInvoice()); };
  const invoiceStatus = (invoice) => {
    if ((parseFloat(invoice.paidAmount) || 0) >= (parseFloat(invoice.amount) || 0)) return "Paid";
    if (invoice.status === "Draft") return "Draft";
    return invoice.dueDate && invoice.dueDate < new Date().toISOString().slice(0, 10) ? "Overdue" : "Sent";
  };
  const save = () => {
    if (!form.customer || !form.description || form.amount === "") return;
    onSave(form);
    closeForm();
  };
  const openPayment = (invoice) => {
    setPayment(invoice);
    setPaymentForm({ date: new Date().toISOString().slice(0, 10), amount: Math.max(0, (parseFloat(invoice.amount) || 0) - (parseFloat(invoice.paidAmount) || 0)), accountId: "", note: "" });
  };
  const printInvoice = (invoice) => {
    const printWindow = window.open("", "_blank", "width=800,height=700");
    if (!printWindow) return;
    printWindow.document.write(`<html><head><title>${invoice.number}</title><style>body{font-family:Arial;padding:40px;color:#292524}h1{color:#115e59}table{width:100%;border-collapse:collapse;margin-top:30px}td{padding:12px;border-bottom:1px solid #ddd}.label{color:#78716c;width:35%}</style></head><body><h1>Perla Di Mare Tours Agency</h1><h2>Invoice ${invoice.number}</h2><table><tr><td class="label">Customer</td><td>${invoice.customer}</td></tr><tr><td class="label">Issue date</td><td>${invoice.issueDate}</td></tr><tr><td class="label">Due date</td><td>${invoice.dueDate}</td></tr><tr><td class="label">Description</td><td>${invoice.description}</td></tr><tr><td class="label">Total</td><td>${fmt(invoice.amount)} ${acctCurrency}</td></tr><tr><td class="label">Paid</td><td>${fmt(invoice.paidAmount || 0)} ${acctCurrency}</td></tr><tr><td class="label">Remaining</td><td>${fmt(Math.max(0, (parseFloat(invoice.amount) || 0) - (parseFloat(invoice.paidAmount) || 0)))} ${acctCurrency}</td></tr></table><p>${invoice.note || ""}</p><script>window.print()</script></body></html>`);
    printWindow.document.close();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-2">
        <div>
          <h3 className="text-sm font-bold text-stone-700">{at("invoicesTitle")}</h3>
          <p className="text-xs text-stone-400">{at("invoicesSubtitle")}</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1 text-xs font-semibold text-white bg-teal-800 rounded-lg px-3 py-2"><Plus size={14} /> {at("newInvoice")}</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {["Draft", "Sent", "Overdue", "Paid"].map((status) => (
          <div key={status} className="bg-white border border-stone-200 rounded-xl p-3"><p className="text-xs text-stone-500">{status}</p><p className="text-lg font-bold text-stone-800">{invoices.filter((invoice) => invoiceStatus(invoice) === status).length}</p></div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto">
        <table className="w-full min-w-max text-sm"><thead className="bg-stone-50 text-stone-500 text-xs"><tr>
          <th className="text-left px-3 py-2">{at("invoiceNumber")}</th><th className="text-left px-3 py-2">{at("colCustomer")}</th><th className="text-left px-3 py-2">{at("dueDate")}</th><th className="text-right px-3 py-2">{at("colAmount")}</th><th className="text-right px-3 py-2">{at("colRemaining")}</th><th className="px-3 py-2" />
        </tr></thead><tbody className="divide-y divide-stone-100">
          {invoices.length === 0 ? <tr><td colSpan={6} className="text-center text-stone-400 py-8">{at("noInvoices")}</td></tr> : invoices.map((invoice) => {
            const remaining = Math.max(0, (parseFloat(invoice.amount) || 0) - (parseFloat(invoice.paidAmount) || 0));
            return <tr key={invoice.id}>
              <td className="px-3 py-2 font-semibold text-teal-800">{invoice.number}</td><td className="px-3 py-2">{invoice.customer}</td><td className="px-3 py-2 text-stone-500">{formatDisplayDate(invoice.dueDate)}</td><td className="px-3 py-2 text-right font-semibold">{fmt(invoice.amount)} {acctCurrency}</td><td className={`px-3 py-2 text-right font-semibold ${remaining ? "text-red-600" : "text-emerald-700"}`}>{fmt(remaining)} {acctCurrency}</td>
              <td className="px-3 py-2"><div className="flex items-center justify-end gap-2"><button title={at("recordCollection")} onClick={() => openPayment(invoice)} disabled={!remaining} className="text-emerald-600 disabled:opacity-30"><CheckCircle2 size={15} /></button><button title="Print" onClick={() => printInvoice(invoice)} className="text-stone-400 hover:text-teal-700"><Printer size={15} /></button><button title="Delete" onClick={() => onDelete(invoice.id)} className="text-stone-400 hover:text-red-600"><Trash2 size={15} /></button></div></td>
            </tr>;
          })}
        </tbody></table>
      </div>

      {showForm && <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={closeForm}><div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-stone-800">{at("newInvoice")}</h3><button onClick={closeForm}><X size={18} /></button></div>
        <div className="space-y-3"><select value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"><option value="">{at("selectCustomer")}</option>{customerNames.map((name) => <option key={name} value={name}>{name}</option>)}</select><input type="date" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /><input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /><input placeholder={at("invoiceDescription")} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /><input type="number" placeholder={at("colAmount")} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /><textarea placeholder={at("notesOptional")} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" rows={2} /></div>
        <button onClick={save} className="w-full mt-4 bg-teal-800 text-white rounded-xl py-2.5 text-sm font-semibold">{at("saveInvoice")}</button>
      </div></div>}

      {payment && <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setPayment(null)}><div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-stone-800">{at("recordCollection")} Â· {payment.number}</h3><button onClick={() => setPayment(null)}><X size={18} /></button></div>
        <div className="space-y-3"><input type="date" value={paymentForm.date} onChange={(e) => setPaymentForm({ ...paymentForm, date: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /><input type="number" value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /><select value={paymentForm.accountId} onChange={(e) => setPaymentForm({ ...paymentForm, accountId: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"><option value="">{at("selectAccount")}</option>{treasuryAccounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}</select><input placeholder={at("notesOptional")} value={paymentForm.note} onChange={(e) => setPaymentForm({ ...paymentForm, note: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /></div>
        <button onClick={() => { if (paymentForm.amount && paymentForm.accountId) { onRecordPayment(payment, paymentForm); setPayment(null); } }} className="w-full mt-4 bg-teal-800 text-white rounded-xl py-2.5 text-sm font-semibold">{at("recordCollection")}</button>
      </div></div>}
    </div>
  );
}

export { AccountsOverview, AccountsTabs, AccountsSuppliers, AccountsCustomers, AccountsTreasury, AccountsExpenses, AccountsReports, AccountsInvoices };

