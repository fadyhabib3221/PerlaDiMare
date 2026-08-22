import React from "react";

const FlightsFormPassengers = ({
  form,
  handleCustomerFieldChange,
  handleCustomerTypeChange,
  handleCustomerConjunctionToggle,
  handleTicketNumberBlur,
  handlePnrReferenceBlur,
}) => (
  <>
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
  </>
);

export default FlightsFormPassengers;
