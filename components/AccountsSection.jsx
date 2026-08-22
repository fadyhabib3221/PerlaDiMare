import {
  Search, Trash2, Pencil, Download, Building2, Users, Landmark, Receipt, PieChart,
  ClipboardList, Plus, Banknote, ArrowDownCircle, ArrowUpCircle,
} from "lucide-react";

const AccountsSection = ({
  accountsError,
  at,
  setAccountsTab,
  accountsTab,
  fmt,
  acctCurrency,
  monthRevenue,
  monthExpenses,
  totalTreasuryBalance,
  totalSupplierBalance,
  totalCustomerBalance,
  tickets,
  thisMonthPrefix,
  profitAfterRefund,
  hotelBookings,
  hotelProfitTotal,
  visaBookings,
  visaProfitTotal,
  carBookings,
  carProfitTotal,
  sectionLabel,
  supplierQuery,
  setSupplierQuery,
  filteredSupplierLedger,
  setViewingSupplier,
  accountsLang,
  customerQuery,
  setCustomerQuery,
  filteredCustomerLedger,
  setViewingCustomer,
  setTreasuryForm,
  getEmptyTreasuryAccountForm,
  setTreasuryAccountEditingId,
  setShowTreasuryAccountForm,
  treasuryAccounts,
  handleEditTreasuryAccountClick,
  handleDeleteTreasuryAccount,
  treasuryAccountTypeLabel,
  treasuryBalance,
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
  expenseCategoryFilter,
  setExpenseCategoryFilter,
  EXPENSE_CATEGORIES,
  expenseCategoryLabel,
  setExpenseForm,
  getEmptyExpenseForm,
  setExpenseEditingId,
  setShowExpenseForm,
  filteredExpenses,
  handleEditExpenseClick,
  reportsRange,
  setReportsRange,
  reportsFrom,
  setReportsFrom,
  reportsTo,
  setReportsTo,
  handleExportAccountsReport,
  reportRevenueBySection,
  reportBookingsCount,
  reportTotalRevenue,
  reportTotalExpenses,
  reportNetProfit,
}) => (
  <>
        {accountsError && (
          <div className="text-sm rounded-xl px-3 py-2 mb-4 bg-red-50 text-red-700">{accountsError}</div>
        )}

        {/* Accounts sub-tab switcher */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          {[
            { key: "overview", label: at("tabOverview"), icon: PieChart },
            { key: "suppliers", label: at("tabSuppliers"), icon: Building2 },
            { key: "customers", label: at("tabCustomers"), icon: Users },
            { key: "treasury", label: at("tabTreasury"), icon: Landmark },
            { key: "expenses", label: at("tabExpenses"), icon: Receipt },
            { key: "reports", label: at("tabReports"), icon: ClipboardList },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setAccountsTab(tab.key)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                accountsTab === tab.key
                  ? "bg-teal-800 text-white border-teal-800"
                  : "bg-white text-stone-500 border-stone-200 hover:border-teal-300 hover:text-teal-800"
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ---------- Overview ---------- */}
        {accountsTab === "overview" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-4">
                <p className="text-xs text-stone-500 mb-1">{at("monthRevenue")}</p>
                <p className="text-lg font-bold text-emerald-700">{fmt(monthRevenue)} {acctCurrency}</p>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-4">
                <p className="text-xs text-stone-500 mb-1">{at("monthExpenses")}</p>
                <p className="text-lg font-bold text-red-600">{fmt(monthExpenses)} {acctCurrency}</p>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-4">
                <p className="text-xs text-stone-500 mb-1">{at("monthNetProfit")}</p>
                <p className={`text-lg font-bold ${monthRevenue - monthExpenses >= 0 ? "text-emerald-700" : "text-red-600"}`}>
                  {fmt(monthRevenue - monthExpenses)} {acctCurrency}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-4">
                <p className="text-xs text-stone-500 mb-1">{at("totalTreasuryBalance")}</p>
                <p className="text-lg font-bold text-teal-800">{fmt(totalTreasuryBalance)} {acctCurrency}</p>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-4">
                <p className="text-xs text-stone-500 mb-1">{at("totalOwedSuppliers")}</p>
                <p className="text-lg font-bold text-amber-700">{fmt(totalSupplierBalance)} {acctCurrency}</p>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-4">
                <p className="text-xs text-stone-500 mb-1">{at("totalOwedCustomers")}</p>
                <p className="text-lg font-bold text-amber-700">{fmt(totalCustomerBalance)} {acctCurrency}</p>
              </div>
            </div>

            <h3 className="text-sm font-bold text-stone-700 mb-2">{at("profitBySection")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["flights", "hotels", "visa", "cars"].map((sec) => {
                const val =
                  sec === "flights"
                    ? tickets.filter((t) => (t.date || "").slice(0, 7) === thisMonthPrefix).reduce((s, t) => s + profitAfterRefund(t), 0)
                    : sec === "hotels"
                    ? hotelBookings.filter((h) => (h.bookingDate || "").slice(0, 7) === thisMonthPrefix).reduce((s, h) => s + hotelProfitTotal(h), 0)
                    : sec === "visa"
                    ? visaBookings.filter((v) => (v.bookingDate || "").slice(0, 7) === thisMonthPrefix).reduce((s, v) => s + visaProfitTotal(v), 0)
                    : carBookings.filter((c) => (c.bookingDate || "").slice(0, 7) === thisMonthPrefix).reduce((s, c) => s + carProfitTotal(c), 0);
                return (
                  <div key={sec} className="bg-white rounded-2xl border border-stone-200 p-4">
                    <p className="text-xs text-stone-500 mb-1">{sectionLabel(sec)}</p>
                    <p className="text-base font-bold text-emerald-700">{fmt(val)} {acctCurrency}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------- Suppliers ---------- */}
        {accountsTab === "suppliers" && (
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
                      <tr
                        key={s.supplier}
                        onClick={() => setViewingSupplier(s.supplier)}
                        className="hover:bg-teal-50 cursor-pointer"
                      >
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

        {/* ---------- Customers ---------- */}
        {accountsTab === "customers" && (
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

        {/* ---------- Treasury ---------- */}
        {accountsTab === "treasury" && (
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
        )}

        {/* ---------- Expenses ---------- */}
        {accountsTab === "expenses" && (
          <div>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <select
                value={expenseCategoryFilter}
                onChange={(e) => setExpenseCategoryFilter(e.target.value)}
                className="border border-stone-300 rounded-lg px-2 py-1.5 text-xs"
              >
                <option value="">{at("allCategories")}</option>
                {EXPENSE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{expenseCategoryLabel(c)}</option>
                ))}
              </select>
              <button
                onClick={() => { setExpenseForm(getEmptyExpenseForm()); setExpenseEditingId(null); setShowExpenseForm(true); }}
                className="flex items-center gap-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg px-3 py-1.5"
              >
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

        {/* ---------- Reports ---------- */}
        {accountsTab === "reports" && (
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

export default AccountsSection;
