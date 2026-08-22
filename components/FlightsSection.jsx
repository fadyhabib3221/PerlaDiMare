import React from "react";
import {
  ArrowDownCircle, ArrowLeft, ArrowUpCircle, Banknote, Ban, BarChart3, Building2, Calendar, CalendarOff,
  Check, ChevronDown, ClipboardList, Clock, Cloud, Compass, Copy, Download, Eye, EyeOff, FileText, Filter,
  Globe, Globe2, HandCoins, History, Key, Landmark, List, Luggage, MapPin, Monitor, Pencil, PieChart, Plane,
  Plus, Printer, Receipt, Search, Send, Settings, ShieldCheck, SlidersHorizontal, Smartphone, Sparkles, Ticket,
  Trash2, TrendingUp, Truck, Unlock, Upload, User, UserPlus, Users, Wallet, Wifi, X,
} from "lucide-react";

export default function FlightsSection({  AIRLINE_CODES, AppliedFilters, FLIGHT_STATUS_COLOR_CLASSES, FLIGHT_STATUS_LABELS, HOTEL_CURRENCIES,
  NET_PAYMENT_METHODS, ThFilter, addCentsOnBlur, addDestinationStop, addRefundRow, airlinesAvailable,
  applyIataTicketValue, canAddTickets, canEditTickets, clearAllFilters, clearAllRefundRows, companiesAvailable,
  companyBreakdown, companyDeals, companyName, copiedDealIndex, corporateDropdownOpen, corporateDropdownRef,
  currentMonthKey, currentUser, dealsDropdownOpen, dealsDropdownRef, employeesAvailable, exportFiltered, exportMonth,
  findTicketByNumber, flightApiKey, flightApiKeyDraft, flightLookupError, flightLookupLoading, flightLookupNumber,
  flightLookupResult, fmt, form, formatDisplayDate, getAirlineIata, getAirlineNameByIata, getCustomers, getRefunds,
  handleAirlineChange, handleCancel, handleCityChange, handleClearFlightApiKey, handleCustomerConjunctionToggle,
  handleCustomerFieldChange, handleCustomersCountChange, handleCustomerTypeChange, handleDestinationChange,
  handleFormFlightLookup, handleOldTicketNumberBlur, handleOldTicketNumberChange, handlePnrReferenceBlur,
  handleRefundRowNumberBlur, handleRefundRowNumberChange, handleSaveFlightApiKey, handleSubmit, handleTicketNumberBlur,
  handleTicketScreenshot, hasActiveFilter, iataBalance, iataHistory, iataTicketValueInput, isAccountingUser,
  lookupFlight, monthLabel, monthlyBreakdown, monthsAvailable, multiFilterGroup, MultiSelectDropdown, persistIataBalance,
  query, refundBoxOpen, refundRows, refundSaved, removeDestinationStop, removeRefundRow, restoreError, restoreSuccess,
  routeLabel, saveAllRefunds, selectedAirline, selectedCompany, selectedEmployee, selectedMonth, selectedSupplier,
  selectedYear, setCopiedDealIndex, setCorporateDropdownOpen, setDealsDropdownOpen, setFiltersOpen, setFlightApiKeyDraft,
  setFlightLookupNumber, setForm, setIataBalance, setIataTicketValueInput, setQuery, setRefundBoxOpen, setRefundRows,
  setRefundSaved, setSelectedAirline, setSelectedCompany, setSelectedEmployee, setSelectedMonth, setSelectedSupplier,
  setSelectedYear, setShowFlightLookup, setShowIataHistory, setSupplierOther, showFlightLookup, showIataHistory,
  suggestions, supplierOther, suppliersAvailable, ticketNetTotal, ticketPaxCounts, ticketProfitEgp, ticketScanError,
  ticketScanLoading, ticketSoldTotal, todayDateStr, usdHint, visibleTickets,}) {
  return (
        <>
        {currentUser.isAdmin && (restoreError || restoreSuccess) && (
          <div className={`text-sm rounded-xl px-3 py-2 mb-4 ${restoreError ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
            {restoreError || restoreSuccess}
          </div>
        )}



        {/* Summary cards â€” default to the CURRENT calendar month's totals. As soon
            as any filter (year/month/company/employee/supplier/search) is selected
            below, switch to showing the totals for that filter selection instead. */}
        {(() => {
          const currentMonthTotals =
            monthlyBreakdown.find((m) => m.key === currentMonthKey) ||
            { count: 0, total: 0, net: 0, profit: 0 };
          const shown = hasActiveFilter ? totals : currentMonthTotals;
          return (
            <>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-stone-500">
                  Totals for: <span className="font-semibold text-stone-700">
                    {hasActiveFilter ? (
                      <>
                        {selectedYear.length ? selectedYear.join(", ") : ""}
                        {selectedMonth.length ? ` Â· ${selectedMonth.map(monthLabel).join(", ")}` : ""}
                        {selectedCompany.length ? ` Â· ${selectedCompany.join(", ")}` : ""}
                        {selectedEmployee.length ? ` Â· ${selectedEmployee.join(", ")}` : ""}
                        {selectedSupplier.length ? ` Â· ${selectedSupplier.join(", ")}` : ""}
                      </>
                    ) : (
                      monthLabel(currentMonthKey)
                    )}
                  </span>
                </p>
              </div>
              <div className="flex overflow-x-auto gap-2 sm:gap-3 mb-6 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none">
                <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 shrink-0 snap-start basis-[42%] sm:basis-0 sm:flex-1">
                  <div className="bg-stone-100 rounded-xl p-1.5 sm:p-2 text-stone-600 shrink-0"><Ticket size={18} className="sm:hidden" /><Ticket size={20} className="hidden sm:block" /></div>
                  <div className="min-w-0">
                    <p className="text-xs text-stone-500 whitespace-nowrap">Tickets</p>
                    <p className="text-sm sm:text-lg font-bold whitespace-nowrap">{shown.count}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 shrink-0 snap-start basis-[42%] sm:basis-0 sm:flex-1">
                  <div className="bg-teal-50 rounded-xl p-1.5 sm:p-2 text-teal-900 shrink-0"><Wallet size={18} className="sm:hidden" /><Wallet size={20} className="hidden sm:block" /></div>
                  <div className="min-w-0">
                    <p className="text-xs text-stone-500 whitespace-nowrap">Total sales (EGP)</p>
                    <p className="text-sm sm:text-lg font-bold whitespace-nowrap">{fmt(shown.total)}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 shrink-0 snap-start basis-[42%] sm:basis-0 sm:flex-1">
                  <div className="bg-amber-50 rounded-xl p-1.5 sm:p-2 text-amber-700 shrink-0"><Receipt size={18} className="sm:hidden" /><Receipt size={20} className="hidden sm:block" /></div>
                  <div className="min-w-0">
                    <p className="text-xs text-stone-500 whitespace-nowrap">Total net (EGP)</p>
                    <p className="text-sm sm:text-lg font-bold whitespace-nowrap">{fmt(shown.net)}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 shrink-0 snap-start basis-[42%] sm:basis-0 sm:flex-1">
                  <div className="bg-emerald-50 rounded-xl p-1.5 sm:p-2 text-emerald-700 shrink-0"><TrendingUp size={18} className="sm:hidden" /><TrendingUp size={20} className="hidden sm:block" /></div>
                  <div className="min-w-0">
                    <p className="text-xs text-stone-500 whitespace-nowrap">Total profit (EGP)</p>
                    <p className="text-sm sm:text-lg font-bold text-emerald-700 whitespace-nowrap">{fmt(shown.profit)}</p>
                  </div>
                </div>
              </div>
            </>
          );
        })()}

        {/* Button + modal to look up a flight's live status via AviationStack,
            independent of the ticket form's own flight-number field. */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={() => setShowFlightLookup(!showFlightLookup)}
            className="text-xs font-semibold text-teal-800 border border-teal-700 rounded-xl px-3 py-2 hover:bg-teal-50 flex items-center gap-1.5"
          >
            <Plane size={14} className="rotate-45" /> Check flight status
          </button>
          <input
            type="file"
            accept="image/*"
            id="ticket-screenshot-input"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              handleTicketScreenshot(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => document.getElementById("ticket-screenshot-input").click()}
            disabled={ticketScanLoading}
            title="Upload a screenshot/photo of the ticket, or just paste one (Ctrl/Cmd+V) anywhere on this tab"
            className="text-xs font-semibold text-teal-800 border border-teal-700 rounded-xl px-3 py-2 hover:bg-teal-50 disabled:opacity-40 flex items-center gap-1.5"
          >
            <Upload size={14} /> {ticketScanLoading ? "Reading..." : "Upload Ticket Mask"}
          </button>
          {ticketScanError && (
            <p className="text-[10px] text-red-600 basis-full">{ticketScanError}</p>
          )}
        </div>

        {showFlightLookup && (
          <div
            className="fixed inset-0 z-50 bg-black/40 flex items-start md:items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => { if (e.target === e.currentTarget) setShowFlightLookup(false); }}
          >
            <div className="bg-white rounded-2xl border border-stone-200 p-4 md:p-5 w-full max-w-md my-8 md:my-0 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold text-stone-900 flex items-center gap-2">
                  <Plane size={16} className="text-teal-800 rotate-45" /> Flight status checker
                </h2>
                <button
                  title="Close"
                  onClick={() => setShowFlightLookup(false)}
                  className="text-stone-400 hover:text-stone-600 p-1 -m-1 rounded-lg hover:bg-stone-100"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-xs text-stone-400 mb-4">Powered by AviationStack Â· live flight status and schedules</p>

              {!flightApiKey ? (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
                  <p className="text-xs text-stone-600 mb-2">
                    Add your AviationStack API key to enable this (sign up at aviationstack.com â€” a free
                    tier is available). Saved once here for the whole workspace â€” every signed-in employee
                    gets it automatically, including the "Look up flight" button on the ticket form.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <input
                      className="flex-1 min-w-[200px] border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                      value={flightApiKeyDraft}
                      onChange={(e) => setFlightApiKeyDraft(e.target.value)}
                      placeholder="Paste your AviationStack API key"
                      type="password"
                    />
                    <button
                      onClick={handleSaveFlightApiKey}
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
                      <label className="block text-xs text-stone-500 mb-1">Flight number</label>
                      <input
                        className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-teal-700"
                        value={flightLookupNumber}
                        onChange={(e) => setFlightLookupNumber(e.target.value)}
                        placeholder="e.g. MS985"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => lookupFlight(flightLookupNumber)}
                        disabled={flightLookupLoading}
                        className="flex-1 bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl px-4 py-2.5 hover:brightness-110 disabled:opacity-60"
                      >
                        {flightLookupLoading ? "Checking..." : "Check status"}
                      </button>
                      {currentUser.isAdmin && (
                        <button
                          onClick={handleClearFlightApiKey}
                          title="Remove saved API key"
                          className="text-xs text-stone-400 hover:text-red-600 px-2 py-2 shrink-0"
                        >
                          Remove key
                        </button>
                      )}
                    </div>
                  </div>

                  {flightLookupError && (
                    <p className="text-xs text-red-600 mb-2">{flightLookupError}</p>
                  )}

                  {flightLookupResult && (
                    <div className="border border-stone-200 rounded-xl p-3 mt-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold bg-stone-50 text-stone-700 border border-stone-200 rounded-lg px-2.5 py-1">
                          {flightLookupResult.airline?.name || "Unknown airline"} Â· {flightLookupResult.flight?.iata || flightLookupNumber}
                        </span>
                        <span className={`text-xs font-semibold border rounded-lg px-2.5 py-1 ${FLIGHT_STATUS_COLOR_CLASSES[flightLookupResult.flight_status] || "bg-stone-50 text-stone-700 border-stone-200"}`}>
                          {FLIGHT_STATUS_LABELS[flightLookupResult.flight_status] || flightLookupResult.flight_status || "Unknown status"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs border-t border-stone-100 pt-2 mt-1">
                        <div>
                          <p className="text-stone-400">Departure</p>
                          <p className="font-semibold text-stone-800">{flightLookupResult.departure?.airport || "-"} ({flightLookupResult.departure?.iata || "-"})</p>
                          {flightLookupResult.departure?.scheduled && (
                            <p className="text-stone-500">{new Date(flightLookupResult.departure.scheduled).toLocaleString()}</p>
                          )}
                          {flightLookupResult.departure?.terminal && (
                            <p className="text-stone-500">Terminal {flightLookupResult.departure.terminal}{flightLookupResult.departure.gate ? `, Gate ${flightLookupResult.departure.gate}` : ""}</p>
                          )}
                          {flightLookupResult.departure?.delay ? (
                            <p className="text-amber-700">Delayed {flightLookupResult.departure.delay} min</p>
                          ) : null}
                        </div>
                        <div>
                          <p className="text-stone-400">Arrival</p>
                          <p className="font-semibold text-stone-800">{flightLookupResult.arrival?.airport || "-"} ({flightLookupResult.arrival?.iata || "-"})</p>
                          {flightLookupResult.arrival?.scheduled && (
                            <p className="text-stone-500">{new Date(flightLookupResult.arrival.scheduled).toLocaleString()}</p>
                          )}
                          {flightLookupResult.arrival?.terminal && (
                            <p className="text-stone-500">Terminal {flightLookupResult.arrival.terminal}{flightLookupResult.arrival.gate ? `, Gate ${flightLookupResult.arrival.gate}` : ""}</p>
                          )}
                          {flightLookupResult.arrival?.delay ? (
                            <p className="text-amber-700">Delayed {flightLookupResult.arrival.delay} min</p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Entry form: hidden for accounting accounts (view-only + notes-only), and for
            anyone with neither add nor edit permission. Shown while editing an existing
            ticket as long as the person has edit access, even if add access is off. */}
        {!isAccountingUser && (canAddTickets || (form.id && canEditTickets)) && (
        <div id="ticket-form" className="bg-white rounded-2xl border border-stone-200 p-4 md:p-5 mb-6">
          <h2 className="font-semibold text-stone-900 mb-4">{form.id ? "Edit ticket" : "Add a new ticket"}</h2>
          {error && (
            <div className="bg-red-50 text-red-700 text-sm rounded-xl px-3 py-2 mb-3">{error}</div>
          )}
          <div className="max-w-xs">
            <label className="text-xs text-stone-500 block mb-1">Entered by</label>
            <div className="w-full border border-stone-200 bg-stone-50 rounded-xl px-3 py-2 text-sm text-stone-600">
              {currentUser.name}
            </div>
          </div>

          {/* Reissue / Refund: a single box where you pick which one applies to this
              ticket, instead of two separate checkbox boxes. Picking one clears/closes
              the other. */}
          <div className="mt-4 bg-stone-50 border border-stone-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-stone-500 mb-2">This ticket is...</p>
            <div className="flex flex-wrap gap-4 text-sm mb-1">
              <label className="flex items-center gap-1.5 cursor-pointer select-none text-stone-700">
                <input
                  type="radio"
                  name="ticketSpecialType"
                  className="w-4 h-4 accent-stone-600"
                  checked={!form.isReissued && !refundBoxOpen}
                  onChange={() => {
                    setForm({ ...form, isReissued: false, oldTicketNumber: "", oldTicketIssueDate: "", emdNumber: "", emdAmount: "" });
                    clearAllRefundRows();
                    setRefundBoxOpen(false);
                    setRefundRows([{ number: "", airlineAmount: "", customerAmount: "", customerIndex: 0 }]);
                    setRefundSaved(false);
                  }}
                />
                New ticket
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer select-none text-sky-800">
                <input
                  type="radio"
                  name="ticketSpecialType"
                  className="w-4 h-4 accent-sky-700"
                  checked={form.isReissued}
                  onChange={() => {
                    setForm({ ...form, isReissued: true });
                    clearAllRefundRows();
                    setRefundBoxOpen(false);
                    setRefundRows([{ number: "", airlineAmount: "", customerAmount: "", customerIndex: 0 }]);
                    setRefundSaved(false);
                  }}
                />
                Exchange Ticket
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer select-none text-red-800">
                <input
                  type="radio"
                  name="ticketSpecialType"
                  className="w-4 h-4 accent-red-700"
                  checked={refundBoxOpen}
                  onChange={() => {
                    setForm({ ...form, isReissued: false, oldTicketNumber: "", oldTicketIssueDate: "", emdNumber: "", emdAmount: "" });
                    setRefundBoxOpen(true);
                  }}
                />
                Refund Ticket
              </label>
            </div>

            {form.isReissued && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="text-xs text-stone-500 block mb-1">Old ticket number</label>
                  <input
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    value={form.oldTicketNumber}
                    onChange={(e) => handleOldTicketNumberChange(e.target.value)}
                    onBlur={handleOldTicketNumberBlur}
                    placeholder="e.g. 077-1234567890"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-500 block mb-1">Old ticket issue date</label>
                  <div className="w-full border border-stone-200 bg-stone-50 rounded-xl px-3 py-2 text-sm text-stone-600">
                    {form.oldTicketIssueDate
                      ? formatDisplayDate(form.oldTicketIssueDate)
                      : form.oldTicketNumber
                      ? "Not found among saved tickets"
                      : "Enter the old ticket number above"}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-stone-500 block mb-1">EMD Number</label>
                  <input
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    value={form.emdNumber}
                    onChange={(e) => setForm({ ...form, emdNumber: e.target.value })}
                    placeholder="e.g. 077-2345678901"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-500 block mb-1">EMD Amount</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
                    value={form.emdAmount}
                    onChange={(e) => setForm({ ...form, emdAmount: e.target.value })}
                    onBlur={(e) => setForm({ ...form, emdAmount: addCentsOnBlur(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}

            {refundBoxOpen && (
              <div className="mt-3 space-y-3">
                {refundRows.map((row, index) => {
                  const target = findTicketByNumber(row.number);
                  const targetCustomers = target ? getCustomers(target) : [];
                  return (
                    <div key={index} className="bg-white border border-sky-200 rounded-xl p-3">
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <label className="text-xs text-stone-500 block mb-1">
                            Ticket number to refund {refundRows.length > 1 ? `#${index + 1}` : ""}
                          </label>
                          <input
                            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                            value={row.number}
                            onChange={(e) => handleRefundRowNumberChange(index, e.target.value)}
                            onBlur={() => handleRefundRowNumberBlur(index)}
                            placeholder="e.g. 077-1234567890"
                          />
                        </div>
                        {refundRows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRefundRow(index)}
                            className="mt-6 text-stone-400 hover:text-red-600"
                            title="Remove this ticket"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>

                      {!target ? (
                        <p className="text-xs text-stone-400 mt-2">
                          {row.number ? "Not found among saved tickets" : "Enter the ticket number above"}
                        </p>
                      ) : (
                        <div className="mt-3">
                          <div className="bg-sky-50 border border-sky-200 rounded-xl px-3 py-2 text-sm mb-3">
                            <p className="text-xs text-sky-500 mb-1">Ticket found</p>
                            <p className="text-sky-900 font-medium">{routeLabel(target)}</p>
                            <p className="text-stone-600 text-xs mt-1">
                              {targetCustomers.map((c) => c.name || "-").join(", ")} Â· {fmt(target.soldPrice)} {target.soldCurrency || "EGP"}
                            </p>
                          </div>
                          {targetCustomers.length > 1 && (
                            <div className="mb-3">
                              <label className="text-xs text-stone-500 block mb-1">Refunded ticket</label>
                              <select
                                className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                                value={row.customerIndex}
                                onChange={(e) => {
                                  const newIndex = Number(e.target.value);
                                  const existing = getRefunds(target).find((r) => (r.customerIndex || 0) === newIndex);
                                  setRefundRows(
                                    refundRows.map((r, i) =>
                                      i === index
                                        ? {
                                            ...r,
                                            customerIndex: newIndex,
                                            airlineAmount: existing ? existing.airlineAmount || "" : "",
                                            customerAmount: existing ? existing.customerAmount || "" : "",
                                          }
                                        : r
                                    )
                                  );
                                }}
                              >
                                {targetCustomers.map((c, i) => (
                                  <option key={i} value={i}>
                                    {(c.name || `Customer ${i + 1}`) + (c.ticketNumber ? ` â€” ${c.ticketNumber}` : "")}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs text-stone-500 block mb-1">Refunded by airline</label>
                              <input
                                type="number"
                                className="w-28 border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
                                value={row.airlineAmount}
                                onChange={(e) =>
                                  setRefundRows(refundRows.map((r, i) => (i === index ? { ...r, airlineAmount: e.target.value } : r)))
                                }
                                onBlur={(e) =>
                                  setRefundRows(refundRows.map((r, i) => (i === index ? { ...r, airlineAmount: addCentsOnBlur(e.target.value) } : r)))
                                }
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-stone-500 block mb-1">Refunded to customer</label>
                              <input
                                type="number"
                                className="w-28 border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
                                value={row.customerAmount}
                                onChange={(e) =>
                                  setRefundRows(refundRows.map((r, i) => (i === index ? { ...r, customerAmount: e.target.value } : r)))
                                }
                                onBlur={(e) =>
                                  setRefundRows(refundRows.map((r, i) => (i === index ? { ...r, customerAmount: addCentsOnBlur(e.target.value) } : r)))
                                }
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={addRefundRow}
                    className="text-xs font-semibold text-sky-700 hover:text-sky-900"
                  >
                    + Add another ticket
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={saveAllRefunds}
                    className="bg-gradient-to-b from-teal-700 to-teal-900 hover:from-teal-600 hover:to-teal-800 text-white text-sm font-semibold rounded-xl px-4 py-2 flex items-center gap-1.5 shadow-sm shadow-teal-800/30 ring-1 ring-inset ring-white/10"
                  >
                    <Check size={15} /> Save refund{refundRows.length > 1 ? "s" : ""}
                  </button>
                  {refundSaved && (
                    <span className="text-xs text-emerald-700 font-medium">Saved</span>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* Route/pricing details: hidden while doing a Refund, since a refund only
              needs the "Refunded ticket number" box above (it looks up the existing
              ticket and its own price fields) â€” none of this new-ticket entry applies. */}
          {!refundBoxOpen && (
          <>
          <div className="flex flex-wrap items-start gap-2 mt-4">
            {(() => {
              const selectedCompanyRecord = suggestions.companies.find((c) => companyName(c) === form.company);
              const selectedDeals = selectedCompanyRecord ? companyDeals(selectedCompanyRecord) : [];
              const unregisteredCurrent =
                form.company && !suggestions.companies.some((c) => companyName(c) === form.company);
              const sortedCompanies = [...suggestions.companies].sort((a, b) =>
                companyName(a).localeCompare(companyName(b))
              );
              const copyDeal = (d, i) => {
                const text = d.details;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(text).then(() => {
                    setCopiedDealIndex(i);
                    setTimeout(() => setCopiedDealIndex((cur) => (cur === i ? null : cur)), 1500);
                  });
                }
              };
              return (
                <>
                  <div className="flex-1 min-w-[160px]">
                    <label className="text-xs text-stone-500 block mb-1">Corporates (optional)</label>
                    <div className="relative" ref={corporateDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setCorporateDropdownOpen((o) => !o)}
                        className={`w-full border rounded-xl px-3 py-2 text-sm bg-white flex items-center justify-between gap-2 text-left focus:outline-none focus:ring-2 focus:ring-teal-700 ${selectedDeals.length ? "border-teal-300" : "border-stone-300"}`}
                      >
                        <span className={form.company ? "text-stone-800" : "text-stone-400"}>
                          {form.company || "â€” No corporate â€”"}
                        </span>
                        <ChevronDown size={14} className={`shrink-0 text-stone-400 transition-transform ${corporateDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {corporateDropdownOpen && (
                        <div className="absolute z-20 mt-1 w-full max-h-80 overflow-y-auto bg-white border border-stone-200 rounded-xl shadow-lg py-1">
                          <button
                            type="button"
                            onClick={() => { setForm({ ...form, company: "" }); setCorporateDropdownOpen(false); }}
                            className={`w-full text-left px-3 py-1.5 text-sm hover:bg-stone-50 ${!form.company ? "text-teal-800 font-semibold" : "text-stone-500"}`}
                          >
                            â€” No corporate â€”
                          </button>
                          {unregisteredCurrent && (
                            // The ticket already has a company value that isn't (or is no longer) a
                            // registered corporate â€” e.g. saved before Corporate Management existed,
                            // or the corporate was later renamed/deleted. Keep it selectable/visible
                            // instead of silently blanking the field.
                            <button
                              type="button"
                              onClick={() => setCorporateDropdownOpen(false)}
                              className="w-full text-left px-3 py-1.5 text-sm text-teal-800 font-semibold bg-teal-50"
                            >
                              {form.company} (not registered)
                            </button>
                          )}
                          {sortedCompanies.map((c) => {
                            const name = companyName(c);
                            const deals = companyDeals(c);
                            const selected = name === form.company;
                            return (
                              <button
                                key={name}
                                type="button"
                                onClick={() => { setForm({ ...form, company: name }); setCorporateDropdownOpen(false); setCopiedDealIndex(null); setDealsDropdownOpen(false); }}
                                className={`w-full text-left px-3 py-1.5 text-sm hover:bg-teal-50 ${selected ? "bg-teal-50" : ""}`}
                              >
                                <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                  <span className="flex items-center gap-1.5 shrink-0">
                                    <span className={selected ? "text-teal-800 font-semibold" : "text-stone-800"}>{name}</span>
                                    {deals.length > 0 && (
                                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500" />
                                    )}
                                  </span>
                                  {deals.map((d, i) => (
                                    <span key={i} className="inline-flex items-center text-[11px] leading-snug text-teal-700 whitespace-nowrap">
                                      {d.airline && <span className="font-semibold">{d.airline.toUpperCase()}{" â€” "}</span>}
                                      {d.details}
                                    </span>
                                  ))}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-56 shrink-0">
                    <label className="text-xs text-stone-500 block mb-1">Deals</label>
                    <div className="relative" ref={dealsDropdownRef}>
                      <button
                        type="button"
                        disabled={selectedDeals.length === 0}
                        onClick={() => setDealsDropdownOpen((o) => !o)}
                        className={`w-full border rounded-xl px-3 py-2 text-sm flex items-center justify-between gap-2 text-left focus:outline-none focus:ring-2 focus:ring-teal-700 ${
                          selectedDeals.length > 0
                            ? "bg-white border-teal-300 text-stone-800"
                            : "bg-stone-50 border-stone-200 text-stone-400 cursor-not-allowed"
                        }`}
                      >
                        <span className="truncate">
                          {selectedDeals.length > 0 ? `${selectedDeals.length} Deal${selectedDeals.length > 1 ? "s" : ""}` : "No deals"}
                        </span>
                        <ChevronDown size={14} className={`shrink-0 transition-transform ${selectedDeals.length > 0 ? "text-teal-600" : "text-stone-300"} ${dealsDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {dealsDropdownOpen && selectedDeals.length > 0 && (
                        <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-stone-200 rounded-xl shadow-lg py-1">
                          {selectedDeals.map((d, i) => {
                            const matchesAirline = form.airline && d.airline && d.airline.toUpperCase() === form.airline.trim().toUpperCase();
                            return (
                              <div
                                key={i}
                                className={`flex items-center justify-between gap-2 px-3 py-1.5 ${matchesAirline ? "bg-teal-50" : ""}`}
                              >
                                <span className={`text-[11px] leading-snug ${matchesAirline ? "text-teal-900 font-semibold" : "text-teal-700"}`}>
                                  {d.airline && <span className="font-semibold">{d.airline.toUpperCase()}{" â€” "}</span>}
                                  {d.details}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => copyDeal(d, i)}
                                  className="shrink-0 flex items-center gap-1 text-[10px] font-semibold text-teal-700 hover:text-teal-900"
                                  title="Copy this deal"
                                >
                                  <Copy size={11} />
                                  {copiedDealIndex === i ? "Copied" : ""}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
            <div className="w-40 shrink-0">
              <label className="text-xs text-stone-500 block mb-1">Supplier</label>
              {supplierOther ? (
                <div className="flex gap-2">
                  <input
                    className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 ${(form.supplier || "").trim() ? "border-blue-400 text-blue-700 font-medium bg-blue-50" : "border-stone-300"}`}
                    value={form.supplier || ""}
                    onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                    placeholder="Enter supplier name"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => { setSupplierOther(false); setForm({ ...form, supplier: "" }); }}
                    className="shrink-0 text-xs text-stone-500 hover:text-teal-800 border border-stone-300 rounded-xl px-2"
                  >
                    List
                  </button>
                </div>
              ) : (
                <select
                  className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 ${form.supplier ? "border-blue-400 text-blue-700 font-medium bg-blue-50" : "border-stone-300 bg-white"}`}
                  value={form.supplier}
                  onChange={(e) => {
                    if (e.target.value === "__other__") {
                      setSupplierOther(true);
                      setForm({ ...form, supplier: "" });
                    } else {
                      setForm({ ...form, supplier: e.target.value });
                    }
                  }}
                >
                  <option value="">Select supplier</option>
                  {(suggestions.flightSuppliers || []).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  <option value="__other__">Other</option>
                </select>
              )}
            </div>
            <div className="w-14 shrink-0">
              <label className="text-xs text-stone-500 block mb-1">Customers</label>
              <input
                type="number"
                min={1}
                max={50}
                className="w-14 border border-stone-300 rounded-xl px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                value={form.customersCount}
                onChange={(e) => handleCustomersCountChange(e.target.value)}
                onBlur={(e) => {
                  if (e.target.value === "" || parseInt(e.target.value, 10) < 1) {
                    handleCustomersCountChange(1);
                  }
                }}
                placeholder="1"
              />
            </div>
          </div>

          {/* Dynamic customer name + ticket number cells, one row per customer. A
              "Conjunction" checkbox sits between the name and ticket number â€” check it
              when that customer has a second ticket number issued together with the
              first, which reveals a second field for its "-XXX" suffix inside the same
              ticket number box. */}
          <div className="mt-4">
            <label className="text-xs text-stone-500 block mb-2">
              Customers ({form.customers.length})
            </label>
            <div className="space-y-2">
              {form.customers.map((c, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-2 md:gap-3 md:items-start">
                  <input
                    className="w-full md:flex-1 border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    value={c.name}
                    onChange={(e) => handleCustomerFieldChange(i, "name", e.target.value)}
                    placeholder={i === 0 ? `Customer ${i + 1} name (required)` : `Customer ${i + 1} name`}
                  />
                  <select
                    className={`w-full md:w-[9ch] md:shrink-0 border rounded-xl px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-700 bg-white ${
                      c.type === "child" || c.type === "infant" ? "border-blue-400 text-blue-700 font-medium" : "border-stone-300"
                    }`}
                    value={c.type || "adult"}
                    onChange={(e) => handleCustomerTypeChange(i, e.target.value)}
                    title="Passenger type â€” Child/Infant can be priced differently below"
                  >
                    <option value="adult">Adult</option>
                    <option value="child">Child</option>
                    <option value="infant">Infant</option>
                  </select>
                  <label
                    className="flex items-center gap-1.5 shrink-0 cursor-pointer select-none text-xs text-stone-500 md:py-2"
                    title="This customer has a second ticket number issued together with the first"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-stone-600"
                      checked={!!c.conjunction}
                      onChange={(e) => handleCustomerConjunctionToggle(i, e.target.checked)}
                    />
                    Conjunction
                  </label>
                  <div className="w-full md:w-[24ch] md:shrink-0 flex items-center border border-stone-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-teal-700">
                    <input
                      className="min-w-0 text-sm outline-none bg-transparent flex-1"
                      style={c.conjunction && (c.ticketNumber || "").length > 0 ? { flex: "0 0 auto", width: `${Math.max((c.ticketNumber || "").length - ((c.ticketNumber || "").match(/-/g) || []).length * 0.5, 3)}ch` } : { width: "20ch" }}
                      value={c.ticketNumber}
                      onChange={(e) => handleCustomerFieldChange(i, "ticketNumber", e.target.value)}
                      onBlur={() => handleTicketNumberBlur(i)}
                      placeholder={`Ticket number ${i + 1}`}
                    />
                    {c.conjunction && (c.ticketNumber || "").replace(/[^A-Z0-9]/g, "").length >= 13 && (
                      <>
                        <span className="text-stone-800 font-semibold mx-0.5 select-none">-</span>
                        <input
                          className="min-w-0 text-sm outline-none bg-transparent"
                          style={{ flex: "0 0 auto", width: `${Math.max((c.ticketNumber2 || "").replace(/^-/, "").length, 1) + 1}ch` }}
                          value={(c.ticketNumber2 || "").replace(/^-/, "")}
                          onChange={(e) => handleCustomerFieldChange(i, "ticketNumber2", `-${e.target.value.replace(/^-/, "")}`)}
                          placeholder="891"
                        />
                      </>
                    )}
                  </div>
                  <input
                    className="w-full md:w-[13ch] md:shrink-0 border border-stone-300 rounded-xl px-3 py-2 text-sm font-mono uppercase outline-none focus:ring-2 focus:ring-teal-700"
                    value={c.pnrReference || ""}
                    onChange={(e) => handleCustomerFieldChange(i, "pnrReference", e.target.value)}
                    onBlur={() => handlePnrReferenceBlur(i)}
                    placeholder="PNR ref"
                    maxLength={6}
                    title="Booking PNR reference (up to 6 letters/digits)"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-4 text-xs text-stone-500">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="radio"
                  name="routeMode"
                  className="w-4 h-4 accent-teal-800"
                  checked={!form.multiDestination && (form.tripType || "oneWay") === "oneWay"}
                  onChange={() => setForm({ ...form, tripType: "oneWay", multiDestination: false })}
                />
                One way
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="radio"
                  name="routeMode"
                  className="w-4 h-4 accent-teal-800"
                  checked={!form.multiDestination && form.tripType === "roundTrip"}
                  onChange={() => setForm({ ...form, tripType: "roundTrip", multiDestination: false })}
                />
                Round trip
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-500 cursor-pointer select-none">
                <input
                  type="radio"
                  name="routeMode"
                  className="w-4 h-4 accent-teal-800"
                  checked={!!form.multiDestination}
                  onChange={() => {
                    setForm({
                      ...form,
                      multiDestination: true,
                      routeFormat: "legs",
                      // Seed the stop list from the current From/To the first time this is
                      // switched on, so nothing already typed gets lost.
                      destinations:
                        !(form.destinations || []).some((d) => (d || "").trim())
                          ? [form.from || "", form.to || ""]
                          : form.destinations,
                    });
                  }}
                />
                Multi-destination route (multi-city)
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-2 mt-2">
            {form.multiDestination ? (
              <>
                {/* Each group is one flight leg with its OWN From/To pair â€” legs no longer share
                    a point, so editing one leg's airport never changes the leg next to it.
                    Stored flat in form.destinations: leg i's From is cell 2*i, its To is
                    cell 2*i + 1. Rendered as direct siblings (not a stacked column) so every
                    leg sits in the same row as the Add-flight button and the Airline/Flight
                    number fields, wrapping only if the row runs out of width. */}
                {legsFromPairs(form.destinations).map((_, i) => (
                  <div key={i} className="flex items-end gap-1">
                    <span className="text-[10px] font-semibold text-stone-400 mb-1.5 shrink-0">
                      Flight {i + 1}
                    </span>
                    <div>
                      <label className="text-[10px] text-stone-400 block mb-1">From</label>
                      <input
                        className="w-16 border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 uppercase"
                        value={form.destinations[i * 2]}
                        onChange={(e) => handleDestinationChange(i * 2, e.target.value)}
                        placeholder="CAI"
                        list="city-suggestions"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-stone-400 block mb-1">To</label>
                      <input
                        className="w-16 border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 uppercase"
                        value={form.destinations[i * 2 + 1]}
                        onChange={(e) => handleDestinationChange(i * 2 + 1, e.target.value)}
                        placeholder="DXB"
                        list="city-suggestions"
                      />
                    </div>
                    {form.destinations.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeDestinationStop(i)}
                        className="shrink-0 text-stone-400 hover:text-red-600 mb-1.5"
                        title="Remove this flight"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDestinationStop}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 mb-1.5 shrink-0"
                >
                  <Plus size={14} /> Add flight
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="text-xs text-stone-500 block mb-1">From</label>
                  <input
                    className="w-16 border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 uppercase"
                    value={form.from}
                    onChange={(e) => handleCityChange("from", e.target.value)}
                    placeholder="CAI"
                    list="city-suggestions"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-500 block mb-1">To</label>
                  <input
                    className="w-16 border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 uppercase"
                    value={form.to}
                    onChange={(e) => handleCityChange("to", e.target.value)}
                    placeholder="DXB"
                    list="city-suggestions"
                  />
                </div>
                {form.tripType === "roundTrip" && (
                  <div>
                    <label className="text-xs text-stone-500 block mb-1">Return airport</label>
                    <div
                      className="w-16 border border-stone-200 bg-stone-50 rounded-lg px-2 py-1.5 text-xs text-stone-600 uppercase truncate"
                      title="Automatically matches the first (From) airport"
                    >
                      {form.from || "-"}
                    </div>
                  </div>
                )}
              </>
            )}
            <div>
              <label className="text-xs text-stone-500 mb-1 flex items-center gap-1.5">
                <span>Airline</span>
                {getAirlineNameByIata(form.airline) && (
                  <span className="bg-teal-50 text-teal-700 border border-teal-200 rounded px-1.5 py-0.5 text-[10px] font-semibold">
                    {getAirlineNameByIata(form.airline)}
                  </span>
                )}
              </label>
              <input
                className="w-16 border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
                value={form.airline}
                onChange={(e) => handleAirlineChange(e.target.value)}
                placeholder="MS"
                list="airline-suggestions"
              />
            </div>
            <div>
              <label className="text-xs text-stone-500 mb-1 flex items-center gap-1.5">
                <span>Flight number</span>
                {flightLookupResult?.flight?.iata?.toUpperCase() === (form.flightNumber || "").trim().toUpperCase() && flightLookupResult?.flight_status && (
                  <span className={`border rounded px-1.5 py-0.5 text-[10px] font-semibold ${FLIGHT_STATUS_COLOR_CLASSES[flightLookupResult.flight_status] || "bg-stone-50 text-stone-700 border-stone-200"}`}>
                    {FLIGHT_STATUS_LABELS[flightLookupResult.flight_status] || flightLookupResult.flight_status}
                  </span>
                )}
              </label>
              <div className="flex items-center gap-1">
                <input
                  className="w-20 border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 uppercase"
                  value={form.flightNumber}
                  onChange={(e) => setForm({ ...form, flightNumber: e.target.value })}
                  placeholder="MS985"
                  title="Optional â€” look this up to auto-fill From/To/Airline and see live status"
                />
                <button
                  type="button"
                  onClick={handleFormFlightLookup}
                  disabled={flightLookupLoading || !(form.flightNumber || "").trim()}
                  title={flightApiKey ? "Look up flight (AviationStack)" : "Add an AviationStack API key in \"Check flight status\" first"}
                  className="shrink-0 border border-stone-300 rounded-lg p-1.5 text-stone-600 hover:bg-stone-50 disabled:opacity-40"
                >
                  <Search size={14} />
                </button>
              </div>
              {flightLookupError && (
                <p className="text-[10px] text-red-600 mt-1 max-w-[9rem]">{flightLookupError}</p>
              )}
            </div>
          </div>

          {/* Mobile layout: date gets its own row (native date inputs can overflow
              their grid cell on phones), prices share a separate 3-col row. */}
          <div className="sm:hidden mt-3 w-full min-w-0 overflow-hidden">
            <label className="text-xs text-stone-500 block mb-1">Ticket issue date</label>
            <input
              type="date"
              lang="en-GB"
              max={todayDateStr()}
              className="block w-full max-w-full min-w-0 box-border border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              style={{ WebkitAppearance: "none" }}
              value={form.date}
              onChange={(e) => {
                const v = e.target.value;
                setForm({ ...form, date: v > todayDateStr() ? todayDateStr() : v });
              }}
            />
          </div>
          <div className="sm:hidden grid grid-cols-2 gap-2 mt-3">
            <div>
              <label className="text-xs text-stone-500 block mb-1">Net currency</label>
              <select
                className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                value={form.netCurrency}
                onChange={(e) => setForm({ ...form, netCurrency: e.target.value })}
              >
                {HOTEL_CURRENCIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-stone-500 block mb-1">Net price</label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
                  value={form.netPrice}
                  onChange={(e) => setForm({ ...form, netPrice: e.target.value })}
                  onBlur={(e) => setForm({ ...form, netPrice: addCentsOnBlur(e.target.value) })}
                  placeholder="0"
                />
                {usdHint(form.netPrice, form.netCurrency, form.usdRate) && (
                  <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none">
                    {usdHint(form.netPrice, form.netCurrency, form.usdRate)}
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-xs text-stone-500 block mb-1">Net paid via</label>
              <select
                className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                value={form.netPaymentMethod || "cash"}
                onChange={(e) => setForm({ ...form, netPaymentMethod: e.target.value })}
              >
                {NET_PAYMENT_METHODS.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="sm:hidden grid grid-cols-2 gap-2 mt-2">
            <div>
              <label className="text-xs text-stone-500 block mb-1">Sold currency</label>
              <select
                className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                value={form.soldCurrency}
                onChange={(e) => setForm({ ...form, soldCurrency: e.target.value })}
              >
                {HOTEL_CURRENCIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-stone-500 block mb-1">Sold price</label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
                  value={form.soldPrice}
                  onChange={(e) => setForm({ ...form, soldPrice: e.target.value })}
                  onBlur={(e) => setForm({ ...form, soldPrice: addCentsOnBlur(e.target.value) })}
                  placeholder="0"
                />
                {usdHint(form.soldPrice, form.soldCurrency, form.usdRate) && (
                  <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none">
                    {usdHint(form.soldPrice, form.soldCurrency, form.usdRate)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="sm:hidden mt-2">
            <label className="text-xs text-stone-500 block mb-1">Profit (auto, EGP)</label>
            <div className="w-full border border-stone-200 bg-stone-50 rounded-xl px-2 py-2 text-sm text-emerald-700 font-semibold truncate">
              {fmt(ticketProfitEgp(form))} EGP
            </div>
          </div>

          {/* Desktop/tablet layout: date on its own row, then net/sold â€” each with its
              own currency â€” plus the EGP profit preview. */}
          <div className="hidden sm:block sm:mt-3">
            <label className="text-xs text-stone-500 block mb-1">Ticket issue date</label>
            <input
              type="date"
              lang="en-GB"
              max={todayDateStr()}
              className="w-full max-w-xs border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              value={form.date}
              onChange={(e) => {
                const v = e.target.value;
                setForm({ ...form, date: v > todayDateStr() ? todayDateStr() : v });
              }}
            />
          </div>
          <div className="hidden sm:grid sm:grid-cols-6 sm:gap-3 sm:mt-3">
            <div>
              <label className="text-xs text-stone-500 block mb-1">Net currency</label>
              <select
                className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                value={form.netCurrency}
                onChange={(e) => setForm({ ...form, netCurrency: e.target.value })}
              >
                {HOTEL_CURRENCIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-stone-500 block mb-1">Net price</label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
                  value={form.netPrice}
                  onChange={(e) => setForm({ ...form, netPrice: e.target.value })}
                  onBlur={(e) => setForm({ ...form, netPrice: addCentsOnBlur(e.target.value) })}
                  placeholder="0"
                />
                {usdHint(form.netPrice, form.netCurrency, form.usdRate) && (
                  <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none">
                    {usdHint(form.netPrice, form.netCurrency, form.usdRate)}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="text-xs text-stone-500 block mb-1">Net paid via</label>
              <select
                className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                value={form.netPaymentMethod || "cash"}
                onChange={(e) => setForm({ ...form, netPaymentMethod: e.target.value })}
              >
                {NET_PAYMENT_METHODS.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-stone-500 block mb-1">Sold currency</label>
              <select
                className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                value={form.soldCurrency}
                onChange={(e) => setForm({ ...form, soldCurrency: e.target.value })}
              >
                {HOTEL_CURRENCIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-stone-500 block mb-1">Sold price</label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
                  value={form.soldPrice}
                  onChange={(e) => setForm({ ...form, soldPrice: e.target.value })}
                  onBlur={(e) => setForm({ ...form, soldPrice: addCentsOnBlur(e.target.value) })}
                  placeholder="0"
                />
                {usdHint(form.soldPrice, form.soldCurrency, form.usdRate) && (
                  <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none">
                    {usdHint(form.soldPrice, form.soldCurrency, form.usdRate)}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="text-xs text-stone-500 block mb-1">Profit (auto, EGP)</label>
              <div className="w-full border border-stone-200 bg-stone-50 rounded-xl px-3 py-2 text-sm text-emerald-700 font-semibold">
                {fmt(ticketProfitEgp(form))} EGP
              </div>
            </div>
          </div>
          </>
          )}

          {/* Child/Infant fares â€” only shown once at least one customer row above is
              marked Child or Infant. Each is a per-passenger rate (same currency as the
              adult Net/Sold price), multiplied by however many child/infant passengers
              are on this ticket to get the grand total shown below. */}
          {(() => {
            const paxCounts = ticketPaxCounts(form);
            if (paxCounts.child === 0 && paxCounts.infant === 0) return null;
            return (
              <div className="mt-3 border border-blue-100 bg-blue-50/60 rounded-xl p-3">
                <p className="text-xs font-semibold text-blue-800 mb-2">
                  Child/Infant fares â€” {paxCounts.child > 0 ? `${paxCounts.child} child` : ""}
                  {paxCounts.child > 0 && paxCounts.infant > 0 ? ", " : ""}
                  {paxCounts.infant > 0 ? `${paxCounts.infant} infant` : ""}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {paxCounts.child > 0 && (
                    <>
                      <div>
                        <label className="text-xs text-stone-500 block mb-1">Child net price (each)</label>
                        <input
                          type="number"
                          className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input bg-white"
                          value={form.childNetPrice}
                          onChange={(e) => setForm({ ...form, childNetPrice: e.target.value })}
                          onBlur={(e) => setForm({ ...form, childNetPrice: addCentsOnBlur(e.target.value) })}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-500 block mb-1">Child sold price (each)</label>
                        <input
                          type="number"
                          className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input bg-white"
                          value={form.childSoldPrice}
                          onChange={(e) => setForm({ ...form, childSoldPrice: e.target.value })}
                          onBlur={(e) => setForm({ ...form, childSoldPrice: addCentsOnBlur(e.target.value) })}
                          placeholder="0"
                        />
                      </div>
                    </>
                  )}
                  {paxCounts.infant > 0 && (
                    <>
                      <div>
                        <label className="text-xs text-stone-500 block mb-1">Infant net price (each)</label>
                        <input
                          type="number"
                          className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input bg-white"
                          value={form.infantNetPrice}
                          onChange={(e) => setForm({ ...form, infantNetPrice: e.target.value })}
                          onBlur={(e) => setForm({ ...form, infantNetPrice: addCentsOnBlur(e.target.value) })}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-500 block mb-1">Infant sold price (each)</label>
                        <input
                          type="number"
                          className="w-full border border-stone-300 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input bg-white"
                          value={form.infantSoldPrice}
                          onChange={(e) => setForm({ ...form, infantSoldPrice: e.target.value })}
                          onBlur={(e) => setForm({ ...form, infantSoldPrice: addCentsOnBlur(e.target.value) })}
                          placeholder="0"
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-2 flex gap-4 text-xs text-stone-600">
                  <span>Total net: <span className="font-semibold text-stone-800">{fmt(ticketNetTotal(form))} {form.netCurrency}</span></span>
                  <span>Total sold: <span className="font-semibold text-stone-800">{fmt(ticketSoldTotal(form))} {form.soldCurrency}</span></span>
                </div>
              </div>
            );
          })()}

          <div className="mt-3">
            <label className="text-xs text-stone-500 block mb-1">Notes</label>
            <textarea
              className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 min-h-[80px]"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value.toUpperCase() })}
              placeholder="Optional"
            />
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-b from-teal-700 to-teal-900 hover:from-teal-600 hover:to-teal-800 text-white text-sm font-semibold rounded-xl px-4 py-2 shadow-sm shadow-teal-800/30 ring-1 ring-inset ring-white/10 transition-colors flex items-center gap-1.5"
            >
              <Check size={16} /> {form.id ? "Save changes" : "Add ticket"}
            </button>
            {form.id && (
              <button
                onClick={handleCancel}
                className="border border-stone-300 text-stone-600 text-sm rounded-xl px-4 py-2 flex items-center gap-1.5"
              >
                <X size={16} /> Cancel
              </button>
            )}
          </div>
        </div>
        )}

        {/* IATA balance tracker: the balance itself (editable directly, turns red when
            negative) and a separate box for the value of each newly issued ticket â€”
            entering a value there and pressing Enter subtracts it from the balance
            above automatically (no separate Deduct button). The History button opens a
            popup listing every amount deducted today â€” it resets empty at the start of
            each new day. Both fields
            live entirely in their own shared-storage keys (tickets:iataBalance /
            tickets:iataHistory) â€” they never read from or write into tickets,
            customers, or any other account/total elsewhere in the app. Number spin
            arrows are removed from both via the shared .price-input class. */}
        <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 mb-3 flex flex-wrap items-end gap-3">
          <div>
            <label className="text-xs text-stone-500 block mb-1">IATA balance</label>
            <div className="relative">
              <Wallet size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              <input
                type="number"
                className={`price-input w-40 border rounded-xl pl-9 pr-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700 ${
                  iataBalance !== null && iataBalance < 0
                    ? "border-red-300 text-red-600 bg-red-50"
                    : "border-stone-300 text-stone-800"
                }`}
                value={iataBalance ?? ""}
                onChange={(e) => setIataBalance(e.target.value === "" ? null : parseFloat(e.target.value))}
                onBlur={() => iataBalance !== null && !Number.isNaN(iataBalance) && persistIataBalance(iataBalance)}
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">Issued ticket value</label>
            <div className="relative">
              <Ticket size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              <input
                type="number"
                className="price-input w-40 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                value={iataTicketValueInput}
                onChange={(e) => setIataTicketValueInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyIataTicketValue()}
                placeholder="0"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowIataHistory(true)}
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 border border-teal-800 rounded-xl px-3 py-2 hover:bg-teal-50"
          >
            <History size={14} /> History
          </button>
        </div>

        {/* Search and filters â€” one unified card: search + a "Filters" toggle with a
            count badge, an optional expanded panel with the dropdowns, and a row of
            removable chips for whatever is currently active. */}
        <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 mb-3">
          <div className="flex items-stretch gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                placeholder="Search by employee, company, ticket number, customer, destination, or airline"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                filtersOpen ? "border-teal-700 text-teal-800 bg-teal-50" : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white"
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-teal-700 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown size={14} className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
            </button>
            <button
              type="button"
              onClick={() => { if (hasActiveFilter) exportFiltered(); }}
              disabled={!hasActiveFilter}
              title={hasActiveFilter ? "" : "Select at least one filter (year, month, company, employee, supplier, or search) before exporting"}
              className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                hasActiveFilter
                  ? "text-teal-800 border-teal-800 hover:bg-teal-50 bg-white"
                  : "text-stone-400 border-stone-200 cursor-not-allowed bg-white"
              }`}
            >
              <Download size={16} />
              <span className="hidden sm:inline">{hasActiveFilter ? "Export to Excel" : "Select a filter to export"}</span>
            </button>
          </div>

          {filtersOpen && (
            <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-stone-100">
              <div>
                <label className="text-xs text-stone-500 block mb-1">Year</label>
                <MultiSelectDropdown
                  label="years"
                  icon={Calendar}
                  options={yearsAvailable}
                  selected={selectedYear}
                  onChange={setSelectedYear}
                  placeholder="All years"
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Month</label>
                <MultiSelectDropdown
                  label="months"
                  icon={Calendar}
                  options={monthsAvailable.map((key) => ({ value: key, label: monthLabel(key) }))}
                  selected={selectedMonth}
                  onChange={setSelectedMonth}
                  placeholder="All months"
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Company</label>
                <MultiSelectDropdown
                  label="companies"
                  icon={Building2}
                  options={companiesAvailable}
                  selected={selectedCompany}
                  onChange={setSelectedCompany}
                  placeholder="All companies"
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">By</label>
                <MultiSelectDropdown
                  label="employees"
                  icon={User}
                  options={employeesAvailable}
                  selected={selectedEmployee}
                  onChange={setSelectedEmployee}
                  placeholder="All employees"
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Supplier</label>
                <MultiSelectDropdown
                  label="suppliers"
                  icon={Plane}
                  options={suppliersAvailable}
                  selected={selectedSupplier}
                  onChange={setSelectedSupplier}
                  placeholder="All suppliers"
                />
              </div>
            </div>
          )}

          <AppliedFilters
            groups={[
              multiFilterGroup("Year", "year", selectedYear, setSelectedYear),
              multiFilterGroup("Month", "month", selectedMonth, setSelectedMonth, monthLabel),
              multiFilterGroup("Company", "company", selectedCompany, setSelectedCompany),
              multiFilterGroup("By", "employee", selectedEmployee, setSelectedEmployee),
              multiFilterGroup("Supplier", "supplier", selectedSupplier, setSelectedSupplier),
              multiFilterGroup("Airline", "airline", selectedAirline, setSelectedAirline, (a) => getAirlineIata(a) || a),
              { label: "Search", values: query.trim() ? [{ key: "search", text: `"${query.trim()}"`, onRemove: () => setQuery("") }] : [] },
            ]}
            onClearAll={clearAllFilters}
          />
        </div>

        <datalist id="airline-suggestions">
          {suggestions.airlines.map((code) => (
            <option key={`u-${code}`} value={code} />
          ))}
          {AIRLINE_CODES.map((a) => (
            <option key={`a-${a.iata}`} value={a.iata} label={`${a.iata} â€” ${a.name}`} />
          ))}
        </datalist>
        <datalist id="city-suggestions">
          {suggestions.cities.map((name) => (
            <option key={`u-${name}`} value={name} />
          ))}
          {AIRPORTS.map((entry) => (
            <option key={`p-${entry}`} value={entry} />
          ))}
        </datalist>

        {/* Ticket list */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          {filtered.length === 0 ? (
            <p className="text-center text-stone-400 text-sm py-10">
              {visibleTickets.length === 0 ? "No tickets recorded yet" : "No results match your search"}
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-stone-200" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
              <table className="w-full min-w-max text-xs border-collapse">
                <thead>
                  <tr className="bg-teal-50/60 text-teal-800 text-[11px] uppercase tracking-wide border-b-2 border-teal-200">
                    <th className="text-left px-1 py-0.5 font-semibold whitespace-nowrap">RN</th>
                    <ThFilter label="By" options={employeesAvailable} selected={selectedEmployee} onChange={setSelectedEmployee} />
                    <th className="text-left px-1 py-0.5 font-semibold whitespace-nowrap">Date</th>
                    <th className="text-left px-1 py-0.5 font-semibold whitespace-nowrap">Customer</th>
                    <th className="text-left px-1 py-0.5 font-semibold whitespace-nowrap">Ticket #</th>
                    <ThFilter label="Airline" options={airlinesAvailable} selected={selectedAirline} onChange={setSelectedAirline} />
                    <th className="text-left px-1 py-0.5 font-semibold whitespace-nowrap">Route</th>
                    <th className="text-right px-1 py-0.5 font-semibold whitespace-nowrap">Sold price</th>
                    <th className="text-right px-1 py-0.5 font-semibold whitespace-nowrap">Net price</th>
                    <th className="text-right px-1 py-0.5 font-semibold whitespace-nowrap">Profit</th>
                    <ThFilter label="Company" options={companiesAvailable} selected={selectedCompany} onChange={setSelectedCompany} />
                    <ThFilter label="Supplier" options={suppliersAvailable} selected={selectedSupplier} onChange={setSelectedSupplier} />
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const allRows = sortedFiltered.flatMap((t) => buildTicketRows(t));
                    // RN reflects each row's position in date order (oldest = 1), kept
                    // stable regardless of how the table itself is currently sorted â€”
                    // tickets and refunds are numbered in their own separate sequence.
                    const byDateAsc = [...allRows].sort((a, b) => {
                      if (!a.sortDate && !b.sortDate) return 0;
                      if (!a.sortDate) return 1;
                      if (!b.sortDate) return -1;
                      if (a.sortDate !== b.sortDate) return a.sortDate.localeCompare(b.sortDate);
                      // Same date: rows from the same booking always keep customer
                      // entry order (first customer = first ticket), regardless of
                      // which direction the surrounding dates are being sorted in.
                      if (a.bookingId === b.bookingId) return a.orderIndex - b.orderIndex;
                      // Different bookings on the same date: order by ticket number.
                      return (a.ticketNumber || "").localeCompare(b.ticketNumber || "", undefined, { numeric: true, sensitivity: "base" });
                    });
                    const rnByRid = {};
                    let ticketCount = 0;
                    let refundCount = 0;
                    byDateAsc.forEach((row) => {
                      if (row.type === "refund") {
                        refundCount += 1;
                        rnByRid[row.rid] = `R${refundCount}`;
                      } else {
                        ticketCount += 1;
                        rnByRid[row.rid] = ticketCount;
                      }
                    });
                    return allRows
                      .sort((a, b) => {
                        // Places every row â€” including refund rows â€” by its own date, so a
                        // refund lands where it belongs in the date order rather than always
                        // staying pinned directly under its parent ticket's row(s). Rows with
                        // no date are pushed to the end, matching sortedFiltered above.
                        if (!a.sortDate && !b.sortDate) return 0;
                        if (!a.sortDate) return 1;
                        if (!b.sortDate) return -1;
                        if (a.sortDate !== b.sortDate) return b.sortDate.localeCompare(a.sortDate);
                        // Same date: mirror the ascending RN-assignment order above, in reverse,
                        // for BOTH same-booking rows (multi-passenger bookings) and different
                        // bookings â€” so RN counts down with no exceptions as you read down the
                        // (newest-first) table, instead of a tied group climbing back up
                        // (e.g. showing 6, 7 or 4, 3, 1, 2 instead of 7, 6 / 4, 3, 2, 1).
                        if (a.bookingId === b.bookingId) return b.orderIndex - a.orderIndex;
                        // Different bookings on the same date: order by ticket number, reversed.
                        return (b.ticketNumber || "").localeCompare(a.ticketNumber || "", undefined, { numeric: true, sensitivity: "base" });
                      })
                      .map((row) => row.render(rnByRid[row.rid]));
                  })()}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedMonth.length === 0 && monthlyBreakdown.length > 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden mt-6">
            <div className="px-4 py-3 border-b border-stone-100">
              <h2 className="font-semibold text-stone-900 text-sm">Totals by month</h2>
            </div>
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
              <table className="w-full min-w-max text-sm">
                <thead>
                  <tr className="bg-stone-50 text-stone-500 text-xs">
                    <th className="text-left px-3 py-2 font-medium whitespace-nowrap">Month</th>
                    <th className="text-left px-3 py-2 font-medium whitespace-nowrap">Tickets</th>
                    <th className="text-left px-3 py-2 font-medium whitespace-nowrap">Total sales (EGP)</th>
                    <th className="text-left px-3 py-2 font-medium whitespace-nowrap">Total profit (EGP)</th>
                    <th className="text-left px-3 py-2 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyBreakdown.map((m) => (
                    <tr key={m.key} className="border-t border-stone-100 hover:bg-stone-50">
                      <td className="px-3 py-2 font-medium text-stone-800 whitespace-nowrap">{monthLabel(m.key)}</td>
                      <td className="px-3 py-2 text-stone-600 whitespace-nowrap">{m.count}</td>
                      <td className="px-3 py-2 text-stone-600 whitespace-nowrap">{fmt(m.total)}</td>
                      <td className="px-3 py-2 font-semibold text-emerald-700 whitespace-nowrap">{fmt(m.profit)}</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-3 justify-end">
                          <button
                            onClick={() => exportMonth(m.key)}
                            className="text-stone-400 hover:text-teal-800 text-xs font-medium flex items-center gap-1"
                          >
                            <Download size={13} /> Export
                          </button>
                          <button
                            onClick={() => setSelectedMonth(m.key)}
                            className="text-teal-800 text-xs font-medium hover:underline"
                          >
                            View details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedCompany.length === 0 && companyBreakdown.length > 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden mt-6">
            <div className="px-4 py-3 border-b border-stone-100">
              <h2 className="font-semibold text-stone-900 text-sm">Corporates and their customers</h2>
            </div>
            <div className="divide-y divide-stone-100">
              {companyBreakdown.map((c) => (
                <div key={c.name} className="px-4 py-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-stone-400" />
                      <button
                        onClick={() => setSelectedCompany([c.name])}
                        className="font-medium text-stone-800 hover:text-teal-800 hover:underline text-sm"
                      >
                        {c.name}
                      </button>
                      <span className="text-xs text-stone-400">({c.count} tickets)</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-stone-500">
                      <span>Sales (EGP): <span className="font-semibold text-stone-700">{fmt(c.total)}</span></span>
                      <span>Profit (EGP): <span className="font-semibold text-emerald-700">{fmt(c.profit)}</span></span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-500 mt-1.5 pl-6">
                    Customers: {c.customers.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-stone-400 mt-3">
          This data is shared between signed-in employees. Login is a basic access gate, not strong security â€” treat it accordingly.
        </p>
        </>

  );
}

