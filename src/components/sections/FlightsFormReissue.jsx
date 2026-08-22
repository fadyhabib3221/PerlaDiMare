import React from "react";
import { Check, X } from "lucide-react";

const FlightsFormReissue = ({
  form,
  setForm,
  refundBoxOpen,
  setRefundBoxOpen,
  refundRows,
  setRefundRows,
  refundSaved,
  setRefundSaved,
  clearAllRefundRows,
  handleOldTicketNumberChange,
  handleOldTicketNumberBlur,
  handleRefundRowNumberChange,
  handleRefundRowNumberBlur,
  addRefundRow,
  removeRefundRow,
  saveAllRefunds,
  findTicketByNumber,
  getCustomers,
  getRefunds,
  routeLabel,
  formatDisplayDate,
  fmt,
  addCentsOnBlur,
}) => (
  <>
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
  </>
);

export default FlightsFormReissue;
