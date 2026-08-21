import { Check, ChevronDown, Copy, Plus, Search, X } from 'lucide-react';

export default function FlightBookingForm({
  isAccountingUser,
  canAddTickets,
  canEditTickets,
  form,
  setForm,
  error,
  currentUser,
  refundBoxOpen,
  setRefundBoxOpen,
  clearAllRefundRows,
  setRefundRows,
  setRefundSaved,
  refundRows,
  findTicketByNumber,
  getCustomers,
  routeLabel,
  formatDisplayDate,
  handleOldTicketNumberChange,
  handleOldTicketNumberBlur,
  handleRefundRowNumberChange,
  handleRefundRowNumberBlur,
  fmt,
  getRefunds,
  addCentsOnBlur,
  removeRefundRow,
  addRefundRow,
  saveAllRefunds,
  refundSaved,
  suggestions,
  companyName,
  companyDeals,
  corporateDropdownRef,
  corporateDropdownOpen,
  setCorporateDropdownOpen,
  copiedDealIndex,
  setCopiedDealIndex,
  dealsDropdownRef,
  dealsDropdownOpen,
  setDealsDropdownOpen,
  supplierOther,
  setSupplierOther,
  handleCustomersCountChange,
  handleCustomerFieldChange,
  handleCustomerTypeChange,
  handleCustomerConjunctionToggle,
  handleTicketNumberBlur,
  handlePnrReferenceBlur,
  legsFromPairs,
  handleDestinationChange,
  removeDestinationStop,
  addDestinationStop,
  handleCityChange,
  getAirlineNameByIata,
  handleAirlineChange,
  flightLookupResult,
  flightLookupError,
  FLIGHT_STATUS_COLOR_CLASSES,
  FLIGHT_STATUS_LABELS,
  flightLookupLoading,
  handleFormFlightLookup,
  flightApiKey,
  todayDateStr,
  HOTEL_CURRENCIES,
  usdHint,
  NET_PAYMENT_METHODS,
  ticketProfitEgp,
  ticketPaxCounts,
  ticketNetTotal,
  ticketSoldTotal,
  ticketScanError,
  handleSubmit,
  handleCancel,
}) {
  return (
!isAccountingUser && (canAddTickets || (form.id && canEditTickets)) && (
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
                          {targetCustomers.map((c) => c.name || "-").join(", ")} · {fmt(target.soldPrice)} {target.soldCurrency || "EGP"}
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
                                {(c.name || `Customer ${i + 1}`) + (c.ticketNumber ? ` — ${c.ticketNumber}` : "")}
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
          ticket and its own price fields) — none of this new-ticket entry applies. */}
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
                      {form.company || "— No corporate —"}
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
                        — No corporate —
                      </button>
                      {unregisteredCurrent && (
                        // The ticket already has a company value that isn't (or is no longer) a
                        // registered corporate — e.g. saved before Corporate Management existed,
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
                                  {d.airline && <span className="font-semibold">{d.airline.toUpperCase()}{" — "}</span>}
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
                              {d.airline && <span className="font-semibold">{d.airline.toUpperCase()}{" — "}</span>}
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
          "Conjunction" checkbox sits between the name and ticket number — check it
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
                title="Passenger type — Child/Infant can be priced differently below"
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
            {/* Each group is one flight leg with its OWN From/To pair — legs no longer share
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
              title="Optional — look this up to auto-fill From/To/Airline and see live status"
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

      {/* Desktop/tablet layout: date on its own row, then net/sold — each with its
          own currency — plus the EGP profit preview. */}
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

      {/* Child/Infant fares — only shown once at least one customer row above is
          marked Child or Infant. Each is a per-passenger rate (same currency as the
          adult Net/Sold price), multiplied by however many child/infant passengers
          are on this ticket to get the grand total shown below. */}
      {(() => {
        const paxCounts = ticketPaxCounts(form);
        if (paxCounts.child === 0 && paxCounts.infant === 0) return null;
        return (
          <div className="mt-3 border border-blue-100 bg-blue-50/60 rounded-xl p-3">
            <p className="text-xs font-semibold text-blue-800 mb-2">
              Child/Infant fares — {paxCounts.child > 0 ? `${paxCounts.child} child` : ""}
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

      <div className="flex flex-wrap gap-2 mt-4">
        {ticketScanError && (
          <p className="text-xs text-red-600 basis-full">{ticketScanError}</p>
        )}
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
    )  );
}
