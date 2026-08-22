import { Wallet, TrendingUp, Plus, Globe, X, Search, SlidersHorizontal, ChevronDown, FileText, Pencil, Copy, Printer, Trash2, Check } from "lucide-react";

export default function VisaSection({
  hasActiveVisaFilter, visaSelectedYear, visaSelectedMonth, visaSelectedEmployee, visaSelectedSupplier,
  monthLabel, currentMonthKey, PassportIcon, visaTotals, visaCurrentMonthTotals, fmt,
  Wallet, TrendingUp, setShowAddVisaSupplierPanel, showAddVisaSupplierPanel, Plus, setShowVisaChecker, showVisaChecker,
  Globe, X, visaApiKey, visaApiKeyDraft, setVisaApiKeyDraft, handleSaveVisaApiKey, visaCheckPassport,
  setVisaCheckPassport, VISA_COUNTRY_LIST, visaCheckDestination, setVisaCheckDestination, visaCheckLoading,
  checkVisaRequirement, currentUser, handleClearVisaApiKey, visaCheckError, visaCheckResult, VISA_RULE_COLOR_CLASSES,
  suggestions, newVisaSupplierDraft, setNewVisaSupplierDraft, handleAddVisaSupplierName, handleDeleteVisaSupplierName,
  visaError, visaEditingId, visaForm, setVisaForm, companyName, visaSupplierOther, setVisaSupplierOther,
  HOTEL_CURRENCIES, addCentsOnBlur, usdHint, visaPerm, filteredVisaBookings, visaQuery, setVisaQuery,
  visaFiltersOpen, setVisaFiltersOpen, visaYearsAvailable, visaMonthsAvailable, visaEmployeesAvailable,
  visaSuppliersAvailable, visibleVisaBookings,
  setVisaSelectedYear, setVisaSelectedMonth, setVisaSelectedEmployee, setVisaSelectedSupplier, MultiSelectDropdown,
  AppliedFilters, multiFilterGroup, clearAllVisaFilters, ThFilter, formatDisplayDate, handleVisaCustomerNameChange,
  handleVisaCustomersCountChange, handleSaveVisa, handleEditVisaClick, handleDuplicateVisaClick, handleDeleteVisa,
  handlePrintVisa, resetVisaForm, viewingVisaBooking, setViewingVisaBooking, visaNetTotal, visaSoldTotal, visaProfitTotal,
  usdToEgpRate, setCopyPickerSource, setViewingFileContext, viewingFileContext, removeDraftItem, removeItemFromFile
}) {
  return (

        <>
        {/* Summary cards — default to the CURRENT calendar month's totals. As soon
            as any filter is selected below, switch to the totals for that
            filter selection instead. */}
        <p className="text-sm text-stone-500 mb-2">
          Totals for: <span className="font-semibold text-stone-700">
            {hasActiveVisaFilter ? (
              <>
                {visaSelectedYear.length ? visaSelectedYear.join(", ") : ""}
                {visaSelectedMonth.length ? ` · ${visaSelectedMonth.map(monthLabel).join(", ")}` : ""}
                {visaSelectedEmployee.length ? ` · ${visaSelectedEmployee.join(", ")}` : ""}
                {visaSelectedSupplier.length ? ` · ${visaSelectedSupplier.join(", ")}` : ""}
              </>
            ) : (
              monthLabel(currentMonthKey)
            )}
          </span>
        </p>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="bg-stone-100 rounded-xl p-1.5 sm:p-2 text-stone-600 shrink-0"><PassportIcon size={18} className="sm:hidden" /><PassportIcon size={20} className="hidden sm:block" /></div>
            <div className="min-w-0">
              <p className="text-xs text-stone-500">Applicants</p>
              <p className="text-sm sm:text-lg font-bold truncate">{(hasActiveVisaFilter ? visaTotals : visaCurrentMonthTotals).count}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="bg-teal-50 rounded-xl p-1.5 sm:p-2 text-teal-900 shrink-0"><Wallet size={18} className="sm:hidden" /><Wallet size={20} className="hidden sm:block" /></div>
            <div className="min-w-0">
              <p className="text-xs text-stone-500">Total sales (EGP)</p>
              <p className="text-sm sm:text-lg font-bold truncate">{fmt((hasActiveVisaFilter ? visaTotals : visaCurrentMonthTotals).sold)}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="bg-emerald-50 rounded-xl p-1.5 sm:p-2 text-emerald-700 shrink-0"><TrendingUp size={18} className="sm:hidden" /><TrendingUp size={20} className="hidden sm:block" /></div>
            <div className="min-w-0">
              <p className="text-xs text-stone-500">Total profit (EGP)</p>
              <p className="text-sm sm:text-lg font-bold text-emerald-700 truncate">{fmt((hasActiveVisaFilter ? visaTotals : visaCurrentMonthTotals).profit)}</p>
            </div>
          </div>
        </div>

        {/* Button to register new supplier names for the Visa page's own supplier list —
            kept separate from the Hotels/Flights supplier lists. */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={() => setShowAddVisaSupplierPanel(!showAddVisaSupplierPanel)}
            className="text-xs font-semibold text-teal-800 border border-teal-700 rounded-xl px-3 py-2 hover:bg-teal-50 flex items-center gap-1.5"
          >
            <Plus size={14} /> Add supplier
          </button>
          <button
            onClick={() => setShowVisaChecker(!showVisaChecker)}
            className="text-xs font-semibold text-teal-800 border border-teal-700 rounded-xl px-3 py-2 hover:bg-teal-50 flex items-center gap-1.5"
          >
            <Globe size={14} /> Check visa requirement
          </button>
        </div>

        {showVisaChecker && (
          <div
            className="fixed inset-0 z-50 bg-black/40 flex items-start md:items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => { if (e.target === e.currentTarget) setShowVisaChecker(false); }}
          >
            <div className="bg-white rounded-2xl border border-stone-200 p-4 md:p-5 w-full max-w-md my-8 md:my-0 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold text-stone-900 flex items-center gap-2">
                  <Globe size={16} className="text-teal-800" /> Visa requirement checker
                </h2>
                <button
                  title="Close"
                  onClick={() => setShowVisaChecker(false)}
                  className="text-stone-400 hover:text-stone-600 p-1 -m-1 rounded-lg hover:bg-stone-100"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-xs text-stone-400 mb-4">Powered by Travel Buddy · data refreshed daily</p>

            {!visaApiKey ? (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
                <p className="text-xs text-stone-600 mb-2">
                  Add a free RapidAPI key for the Travel Buddy Visa Requirements API to enable this
                  (sign up at rapidapi.com and subscribe to "Visa Requirement" — a free tier is available).
                  Saved once here for the whole workspace — every signed-in employee gets it automatically.
                </p>
                <div className="flex flex-wrap gap-2">
                  <input
                    className="flex-1 min-w-[200px] border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    value={visaApiKeyDraft}
                    onChange={(e) => setVisaApiKeyDraft(e.target.value)}
                    placeholder="Paste your RapidAPI key"
                    type="password"
                  />
                  <button
                    onClick={handleSaveVisaApiKey}
                    className="bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl px-4 py-2 hover:brightness-110"
                  >
                    Save key
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-stone-500 mb-1">Passport</label>
                    <select
                      value={visaCheckPassport}
                      onChange={(e) => setVisaCheckPassport(e.target.value)}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    >
                      {VISA_COUNTRY_LIST.map((c) => (
                        <option key={c.code} value={c.code}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 mb-1">Destination</label>
                    <select
                      value={visaCheckDestination}
                      onChange={(e) => setVisaCheckDestination(e.target.value)}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    >
                      <option value="">Select destination</option>
                      {VISA_COUNTRY_LIST.map((c) => (
                        <option key={c.code} value={c.code}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={checkVisaRequirement}
                      disabled={visaCheckLoading}
                      className="flex-1 bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl px-4 py-2.5 hover:brightness-110 disabled:opacity-60"
                    >
                      {visaCheckLoading ? "Checking..." : "Check"}
                    </button>
                    {currentUser.isAdmin && (
                      <button
                        onClick={handleClearVisaApiKey}
                        title="Remove saved API key"
                        className="text-xs text-stone-400 hover:text-red-600 px-2 py-2 shrink-0"
                      >
                        Remove key
                      </button>
                    )}
                  </div>
                </div>

                {visaCheckError && (
                  <p className="text-xs text-red-600 mb-2">{visaCheckError}</p>
                )}

                {visaCheckResult && (
                  <div className="border border-stone-200 rounded-xl p-3 mt-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-semibold border rounded-lg px-2.5 py-1 ${VISA_RULE_COLOR_CLASSES[visaCheckResult.visa_rules?.primary_rule?.color] || "bg-stone-50 text-stone-700 border-stone-200"}`}>
                        {visaCheckResult.visa_rules?.primary_rule?.name || "No primary rule returned"}
                        {visaCheckResult.visa_rules?.primary_rule?.duration ? ` — ${visaCheckResult.visa_rules.primary_rule.duration}` : ""}
                      </span>
                      {visaCheckResult.visa_rules?.secondary_rule?.name && (
                        <span className={`text-xs font-semibold border rounded-lg px-2.5 py-1 ${VISA_RULE_COLOR_CLASSES[visaCheckResult.visa_rules.secondary_rule.color] || "bg-stone-50 text-stone-700 border-stone-200"}`}>
                          {visaCheckResult.visa_rules.secondary_rule.name}
                          {visaCheckResult.visa_rules.secondary_rule.duration ? ` — ${visaCheckResult.visa_rules.secondary_rule.duration}` : ""}
                        </span>
                      )}
                    </div>

                    {visaCheckResult.visa_rules?.secondary_rule?.link && (
                      <p className="text-xs text-stone-600">
                        <a href={visaCheckResult.visa_rules.secondary_rule.link} target="_blank" rel="noreferrer" className="underline text-teal-800">Apply / official visa link</a>
                      </p>
                    )}

                    {visaCheckResult.visa_rules?.exception_rule?.full_text && (
                      <p className="text-xs text-stone-600 bg-stone-50 rounded-lg p-2">
                        <span className="font-semibold">Exception: </span>{visaCheckResult.visa_rules.exception_rule.full_text}
                      </p>
                    )}

                    {visaCheckResult.mandatory_registration && (
                      <p className="text-xs text-amber-700">
                        <span className="font-semibold">Mandatory registration:</span> {visaCheckResult.mandatory_registration.name}
                        {visaCheckResult.mandatory_registration.link && (
                          <> · <a href={visaCheckResult.mandatory_registration.link} target="_blank" rel="noreferrer" className="underline">official link</a></>
                        )}
                      </p>
                    )}

                    {visaCheckResult.destination?.passport_validity && (
                      <p className="text-xs text-stone-600"><span className="font-semibold">Passport validity required:</span> {visaCheckResult.destination.passport_validity}</p>
                    )}

                    {/* Destination reference details — capital, currency, phone code, timezone, etc. */}
                    {visaCheckResult.destination && (
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-stone-500 border-t border-stone-100 pt-2 mt-1">
                        {visaCheckResult.destination.capital && <p><span className="text-stone-400">Capital:</span> {visaCheckResult.destination.capital}</p>}
                        {visaCheckResult.destination.continent && <p><span className="text-stone-400">Continent:</span> {visaCheckResult.destination.continent}</p>}
                        {visaCheckResult.destination.currency && <p><span className="text-stone-400">Currency:</span> {visaCheckResult.destination.currency} ({visaCheckResult.destination.currency_code})</p>}
                        {visaCheckResult.destination.phone_code && <p><span className="text-stone-400">Phone code:</span> {visaCheckResult.destination.phone_code}</p>}
                        {visaCheckResult.destination.timezone && <p><span className="text-stone-400">Timezone:</span> {visaCheckResult.destination.timezone}</p>}
                        {visaCheckResult.destination.population && <p><span className="text-stone-400">Population:</span> {Number(visaCheckResult.destination.population).toLocaleString()}</p>}
                      </div>
                    )}
                    {visaCheckResult.destination?.embassy_url && (
                      <p className="text-xs">
                        <a href={visaCheckResult.destination.embassy_url} target="_blank" rel="noreferrer" className="underline text-teal-800">Embassy info</a>
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
            </div>
          </div>
        )}

        {showAddVisaSupplierPanel && (
          <div className="bg-white border border-stone-200 rounded-2xl p-4 mb-4">
            <h3 className="text-sm font-bold text-stone-700 mb-3">Visa suppliers</h3>
            <div className="flex gap-2 mb-3">
              <input
                className="w-full max-w-xs border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                value={newVisaSupplierDraft}
                onChange={(e) => setNewVisaSupplierDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddVisaSupplierName()}
                placeholder="Supplier name"
              />
              <button
                onClick={handleAddVisaSupplierName}
                className="bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl px-4 py-2 hover:brightness-110"
              >
                Add
              </button>
            </div>
            {(suggestions.visaSuppliers || []).length === 0 ? (
              <p className="text-xs text-stone-400">No suppliers saved yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(suggestions.visaSuppliers || []).map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-xs text-stone-700"
                  >
                    {s}
                    <button title="Delete supplier" onClick={() => handleDeleteVisaSupplierName(s)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {visaError && (
          <div className="text-sm rounded-xl px-3 py-2 mb-4 bg-red-50 text-red-700">{visaError}</div>
        )}

        {canAddTickets && (
          <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-6">
            <h3 className="text-sm font-bold text-stone-700 mb-4">
              {visaEditingId ? "Edit visa booking" : "New visa booking"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-xs text-stone-500 block mb-1">
                  Corporates
                </label>
                <select
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                  value={visaForm.customer}
                  onChange={(e) => setVisaForm({ ...visaForm, customer: e.target.value })}
                >
                  <option value="">— No corporate (Individual) —</option>
                  {visaForm.customer && !suggestions.companies.some((c) => companyName(c) === visaForm.customer) && (
                    // Booking already has a company value that isn't (or is no longer) a
                    // registered corporate — e.g. saved before Corporate Management existed,
                    // or the corporate was later renamed/deleted. Keep it selectable/visible
                    // instead of silently blanking the field.
                    <option value={visaForm.customer}>{visaForm.customer} (not registered)</option>
                  )}
                  {[...suggestions.companies]
                    .sort((a, b) => companyName(a).localeCompare(companyName(b)))
                    .map((c) => {
                      const name = companyName(c);
                      return (
                        <option key={name} value={name}>{name}</option>
                      );
                    })}
                </select>
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Number of customers</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  value={visaForm.customersCount}
                  onChange={(e) => handleVisaCustomersCountChange(e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value === "" || parseInt(e.target.value, 10) < 1) {
                      handleVisaCustomersCountChange(1);
                    }
                  }}
                  placeholder="1"
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Visa</label>
                <input
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  value={visaForm.visaType}
                  onChange={(e) => setVisaForm({ ...visaForm, visaType: e.target.value })}
                  placeholder="e.g. Schengen, UK, Dubai"
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Booking date</label>
                <input
                  type="date"
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  value={visaForm.bookingDate}
                  onChange={(e) => setVisaForm({ ...visaForm, bookingDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Supplier</label>
                {visaSupplierOther ? (
                  <div className="flex gap-2">
                    <input
                      className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 ${visaForm.supplier.trim() ? "border-blue-400 text-blue-700 font-medium bg-blue-50" : "border-stone-300"}`}
                      value={visaForm.supplier}
                      onChange={(e) => setVisaForm({ ...visaForm, supplier: e.target.value })}
                      placeholder="Enter supplier name"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => { setVisaSupplierOther(false); setVisaForm({ ...visaForm, supplier: "" }); }}
                      className="shrink-0 text-xs text-stone-500 hover:text-teal-800 border border-stone-300 rounded-xl px-2"
                    >
                      List
                    </button>
                  </div>
                ) : (
                  <select
                    className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 ${visaForm.supplier ? "border-blue-400 text-blue-700 font-medium bg-blue-50" : "border-stone-300 bg-white"}`}
                    value={visaForm.supplier}
                    onChange={(e) => {
                      if (e.target.value === "__other__") {
                        setVisaSupplierOther(true);
                        setVisaForm({ ...visaForm, supplier: "" });
                      } else {
                        setVisaForm({ ...visaForm, supplier: e.target.value });
                      }
                    }}
                  >
                    <option value="">Select supplier</option>
                    {(suggestions.visaSuppliers || []).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                    <option value="__other__">Other</option>
                  </select>
                )}
              </div>
            </div>


            {/* Dynamic customer name cells, one row per customer */}
            <div className="mb-4">
              <label className="text-xs text-stone-500 block mb-2">
                Customers ({visaForm.customers.length})
              </label>
              <div className="space-y-2">
                {visaForm.customers.map((c, i) => (
                  <input
                    key={i}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    value={c.name}
                    onChange={(e) => handleVisaCustomerNameChange(i, e.target.value)}
                    placeholder={i === 0 ? `Customer ${i + 1} name (required)` : `Customer ${i + 1} name`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-xs text-stone-500 block mb-1">Net currency</label>
                <select
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                  value={visaForm.netCurrency}
                  onChange={(e) => setVisaForm({ ...visaForm, netCurrency: e.target.value })}
                >
                  {HOTEL_CURRENCIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Price net (per person)</label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-28 border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
                    value={visaForm.netPrice}
                    onChange={(e) => setVisaForm({ ...visaForm, netPrice: e.target.value })}
                    onBlur={(e) => setVisaForm({ ...visaForm, netPrice: addCentsOnBlur(e.target.value) })}
                    placeholder="0"
                  />
                  {usdHint(visaForm.netPrice, visaForm.netCurrency, visaForm.usdRate) && (
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none truncate max-w-[70px]">
                      {usdHint(visaForm.netPrice, visaForm.netCurrency, visaForm.usdRate)}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Sold currency</label>
                <select
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                  value={visaForm.soldCurrency}
                  onChange={(e) => setVisaForm({ ...visaForm, soldCurrency: e.target.value })}
                >
                  {HOTEL_CURRENCIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Sold (per person)</label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-28 border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
                    value={visaForm.soldPrice}
                    onChange={(e) => setVisaForm({ ...visaForm, soldPrice: e.target.value })}
                    onBlur={(e) => setVisaForm({ ...visaForm, soldPrice: addCentsOnBlur(e.target.value) })}
                    placeholder="0"
                  />
                  {usdHint(visaForm.soldPrice, visaForm.soldCurrency, visaForm.usdRate) && (
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none truncate max-w-[70px]">
                      {usdHint(visaForm.soldPrice, visaForm.soldCurrency, visaForm.usdRate)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Live total preview: per-person prices above multiplied by the number of
                customers entered, same style as the Hotels form's totals box. Profit
                converts both currencies to EGP since net/sold can now differ. */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1 mb-4">
              <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center">
                <p className="text-[11px] text-stone-500">Net total (× {visaForm.customers.length || 1})</p>
                <p className="text-sm font-bold text-stone-800">{fmt(visaNetTotal(visaForm))} {visaForm.netCurrency}</p>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center">
                <p className="text-[11px] text-stone-500">Sold total (× {visaForm.customers.length || 1})</p>
                <p className="text-sm font-bold text-stone-800">{fmt(visaSoldTotal(visaForm))} {visaForm.soldCurrency}</p>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center">
                <p className="text-[11px] text-stone-500">Profit (auto)</p>
                <p className="text-sm font-bold text-emerald-700">{fmt(visaProfitTotal(visaForm))} EGP</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveVisa}
                className="bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl px-4 py-2 hover:brightness-110"
              >
                {visaEditingId ? "Save changes" : "Add visa booking"}
              </button>
              {visaEditingId && (
                <button
                  onClick={resetVisaForm}
                  className="text-sm text-stone-500 hover:text-stone-700 border border-stone-300 rounded-xl px-4 py-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}

        {/* Search and filters — same unified card style as Flights/Hotels, adapted to
            the fields visa bookings actually have (no Employee filter — visa bookings
            don't track which employee created them). */}
        <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 mb-3">
          <div className="flex items-stretch gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                placeholder="Search by customer name, visa type, or supplier"
                value={visaQuery}
                onChange={(e) => setVisaQuery(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => setVisaFiltersOpen(!visaFiltersOpen)}
              className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                visaFiltersOpen ? "border-teal-700 text-teal-800 bg-teal-50" : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white"
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filters</span>
              {activeVisaFilterCount > 0 && (
                <span className="bg-teal-700 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                  {activeVisaFilterCount}
                </span>
              )}
              <ChevronDown size={14} className={`transition-transform ${visaFiltersOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {visaFiltersOpen && (
            <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-stone-100">
              <div>
                <label className="text-xs text-stone-500 block mb-1">Year</label>
                <MultiSelectDropdown
                  label="years"
                  icon={Calendar}
                  options={visaYearsAvailable}
                  selected={visaSelectedYear}
                  onChange={setVisaSelectedYear}
                  placeholder="All years"
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Month</label>
                <MultiSelectDropdown
                  label="months"
                  icon={Calendar}
                  options={visaMonthsAvailable.map((key) => ({ value: key, label: monthLabel(key) }))}
                  selected={visaSelectedMonth}
                  onChange={setVisaSelectedMonth}
                  placeholder="All months"
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">By</label>
                <MultiSelectDropdown
                  label="employees"
                  icon={User}
                  options={visaEmployeesAvailable}
                  selected={visaSelectedEmployee}
                  onChange={setVisaSelectedEmployee}
                  placeholder="All employees"
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Supplier</label>
                <MultiSelectDropdown
                  label="suppliers"
                  icon={Building2}
                  options={visaSuppliersAvailable}
                  selected={visaSelectedSupplier}
                  onChange={setVisaSelectedSupplier}
                  placeholder="All suppliers"
                />
              </div>
            </div>
          )}

          <AppliedFilters
            groups={[
              multiFilterGroup("Year", "year", visaSelectedYear, setVisaSelectedYear),
              multiFilterGroup("Month", "month", visaSelectedMonth, setVisaSelectedMonth, monthLabel),
              multiFilterGroup("By", "employee", visaSelectedEmployee, setVisaSelectedEmployee),
              multiFilterGroup("Supplier", "supplier", visaSelectedSupplier, setVisaSelectedSupplier),
              { label: "Search", values: visaQuery.trim() ? [{ key: "search", text: `"${visaQuery.trim()}"`, onRemove: () => setVisaQuery("") }] : [] },
            ]}
            onClearAll={clearAllVisaFilters}
          />
        </div>

        {/* Visa bookings list */}
        {filteredVisaBookings.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-400">
            <PassportIcon size={40} className="mx-auto mb-3 text-stone-300" />
            <p className="text-sm">{visibleVisaBookings.length === 0 ? "No visa bookings yet." : "No visa bookings match the current search/filters."}</p>
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
              <table className="w-full min-w-max text-sm">
                <thead className="bg-stone-50 text-stone-500 text-xs">
                  <tr>
                    <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">RN</th>
                    <ThFilter label="By" options={visaEmployeesAvailable} selected={visaSelectedEmployee} onChange={setVisaSelectedEmployee} padding="px-1.5 py-0.5" />
                    <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap"># Customers</th>
                    <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Names</th>
                    <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Visa</th>
                    <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Booking date</th>
                    <ThFilter label="Supplier" options={visaSuppliersAvailable} selected={visaSelectedSupplier} onChange={setVisaSelectedSupplier} padding="px-1.5 py-0.5" />
                    <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Net</th>
                    <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Sold</th>
                    <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {(() => {
                    const { sorted, rnByRowId } = rankByServiceDate(filteredVisaBookings, "bookingDate");
                    return sorted.map((v) => {
                    const net = visaNetTotal(v);
                    const sold = visaSoldTotal(v);
                    const profit = visaProfitTotal(v);
                    return (
                      <tr
                        key={v.id}
                        className={`cursor-pointer ${isYearLocked("visa", v.bookingDate) ? "bg-stone-200/70 grayscale hover:bg-stone-200" : "hover:bg-stone-50"}`}
                        onClick={() => { setViewingFileContext(null); setViewingVisaBooking(v); }}
                      >
                        <td className="px-1.5 py-0.5 text-stone-400 whitespace-nowrap">{rnByRowId[v.id]}</td>
                        <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap" title={v.employee || ""}>{employeeInitials(v.employee)}</td>
                        <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{(v.customers || []).length}</td>
                        <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                          {(v.customers || []).map((c) => c.name || "-").join(", ")}
                        </td>
                        <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{v.visaType}</td>
                        <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                          {v.bookingDate ? formatDisplayDate(v.bookingDate) : "-"}
                        </td>
                        <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{v.supplier}</td>
                        <td className="px-1.5 py-0.5 text-right text-stone-700 whitespace-nowrap">{fmt(net)} {v.netCurrency}</td>
                        <td className="px-1.5 py-0.5 text-right text-stone-700 whitespace-nowrap">{fmt(sold)} {v.soldCurrency}</td>
                        <td className="px-1.5 py-0.5 text-right font-semibold text-emerald-700 whitespace-nowrap">{fmt(profit)} EGP</td>
                      </tr>
                    );
                    });
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        )}

        </>
        )}

        {/* Rendered independently of activeSection so opening a visa's details from
            inside a File doesn't jump the user away to the Visa section. */}
        {viewingVisaBooking && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={() => setViewingVisaBooking(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-800">{viewingVisaBooking.visaType || "Visa"}</h3>
                  <p className="text-sm text-stone-500">
                    {(viewingVisaBooking.customers || []).length} customer
                    {(viewingVisaBooking.customers || []).length === 1 ? "" : "s"}
                  </p>
                  <p className="text-sm text-stone-500">
                    {viewingVisaBooking.customer && viewingVisaBooking.customer.trim() ? (
                      <>Company: {viewingVisaBooking.customer} <span className="text-teal-700 font-semibold">(Corporate)</span></>
                    ) : (
                      <span className="italic">Individual booking</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handlePrintVisa(viewingVisaBooking)}
                    className="text-stone-400 hover:text-teal-800 p-1.5"
                    title="Print"
                  >
                    <Printer size={18} />
                  </button>
                  <button
                    onClick={() => setCopyPickerSource({ type: "visa", record: viewingVisaBooking })}
                    className="text-stone-400 hover:text-amber-600 p-1.5"
                    title="Link to a file"
                  >
                    <FileText size={18} />
                  </button>
                  {visaPerm.canAdd && (
                    <button
                      onClick={() => { navigateToSection("visa"); handleDuplicateVisaClick(viewingVisaBooking); setViewingVisaBooking(null); }}
                      className="text-stone-400 hover:text-teal-800 p-1.5"
                      title="Duplicate as new booking"
                    >
                      <Copy size={18} />
                    </button>
                  )}
                  {visaPerm.canEdit && (
                    <button
                      onClick={() => { navigateToSection("visa"); handleEditVisaClick(viewingVisaBooking); setViewingVisaBooking(null); }}
                      className="text-stone-400 hover:text-teal-800 p-1.5"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                  )}
                  {visaPerm.canDelete && (
                    <button
                      onClick={() => {
                        if (viewingFileContext) {
                          if (viewingFileContext.draft) removeDraftItem(viewingFileContext.itemId);
                          else removeItemFromFile(viewingFileContext.fileId, viewingFileContext.itemId);
                          setViewingFileContext(null);
                          setViewingVisaBooking(null);
                          return;
                        }
                        const id = viewingVisaBooking.id;
                        handleDeleteVisa(id, () => setViewingVisaBooking(null));
                      }}
                      className="text-stone-400 hover:text-red-600 p-1.5"
                      title={viewingFileContext ? "Remove from file" : "Delete"}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => setViewingVisaBooking(null)}
                    className="text-stone-400 hover:text-stone-700 p-1.5"
                    title="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                <div><span className="text-stone-500">Supplier: </span>{viewingVisaBooking.supplier || "-"}</div>
                <div>
                  <span className="text-stone-500">Booking date: </span>
                  {viewingVisaBooking.bookingDate ? formatDisplayDate(viewingVisaBooking.bookingDate) : "-"}
                </div>
                <div><span className="text-stone-500">Net currency: </span>{viewingVisaBooking.netCurrency || "EGP"}</div>
                <div><span className="text-stone-500">Sold currency: </span>{viewingVisaBooking.soldCurrency || "EGP"}</div>
              </div>

              <div className="border border-stone-200 rounded-xl p-3 mb-4">
                <p className="text-xs text-stone-500 mb-1.5">Customers</p>
                <div className="text-sm text-stone-700 space-y-1">
                  {(viewingVisaBooking.customers || []).map((c, i) => (
                    <div key={i}>{i + 1}. {c.name || "-"}</div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center">
                  <p className="text-[11px] text-stone-500">Net total</p>
                  <p className="text-sm font-bold text-stone-800">
                    {fmt(visaNetTotal(viewingVisaBooking))} {viewingVisaBooking.netCurrency}
                  </p>
                  {viewingVisaBooking.netCurrency === "USD" && (viewingVisaBooking.usdRate ?? usdToEgpRate) && (
                    <p className="text-[10px] text-emerald-600 mt-0.5">
                      ≈ {fmt(visaNetTotal(viewingVisaBooking) * (viewingVisaBooking.usdRate ?? usdToEgpRate))} EGP
                    </p>
                  )}
                </div>
                <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center">
                  <p className="text-[11px] text-stone-500">Sold total</p>
                  <p className="text-sm font-bold text-stone-800">
                    {fmt(visaSoldTotal(viewingVisaBooking))} {viewingVisaBooking.soldCurrency}
                  </p>
                  {viewingVisaBooking.soldCurrency === "USD" && (viewingVisaBooking.usdRate ?? usdToEgpRate) && (
                    <p className="text-[10px] text-emerald-600 mt-0.5">
                      ≈ {fmt(visaSoldTotal(viewingVisaBooking) * (viewingVisaBooking.usdRate ?? usdToEgpRate))} EGP
                    </p>
                  )}
                </div>
                <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center">
                  <p className="text-[11px] text-stone-500">Profit</p>
                  <p className="text-sm font-bold text-emerald-700">
                    {fmt(visaProfitTotal(viewingVisaBooking))} EGP
                  </p>
                </div>
                {(viewingVisaBooking.netCurrency === "USD" || viewingVisaBooking.soldCurrency === "USD") && (viewingVisaBooking.usdRate ?? usdToEgpRate) && (
                  <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center col-span-2 sm:col-span-3">
                    <p className="text-[11px] text-stone-500">USD → EGP rate used</p>
                    <p className="text-sm font-bold text-stone-800">{fmt(viewingVisaBooking.usdRate ?? usdToEgpRate)} (locked at booking)</p>
                  </div>
                )}
              </div>
            </div>
          </div>
  );
}
