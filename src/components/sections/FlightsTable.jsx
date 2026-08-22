import React from "react";
import { Download } from "lucide-react";
import ThFilter from "../ThFilter";

const FlightsTable = ({
  filtered,
  visibleTickets,
  sortedFiltered,
  buildTicketRows,
  employeesAvailable,
  selectedEmployee,
  setSelectedEmployee,
  airlinesAvailable,
  selectedAirline,
  setSelectedAirline,
  companiesAvailable,
  selectedCompany,
  setSelectedCompany,
  suppliersAvailable,
  selectedSupplier,
  setSelectedSupplier,
  monthlyBreakdown,
  selectedMonth,
  setSelectedMonth,
  monthLabel,
  fmt,
  exportMonth,
}) => (
  <>
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
                const allRows = sortedFiltered.flatMap((ticket) => buildTicketRows(ticket));
                const byDateAsc = [...allRows].sort((a, b) => {
                  if (!a.sortDate && !b.sortDate) return 0;
                  if (!a.sortDate) return 1;
                  if (!b.sortDate) return -1;
                  if (a.sortDate !== b.sortDate) return a.sortDate.localeCompare(b.sortDate);
                  if (a.bookingId === b.bookingId) return a.orderIndex - b.orderIndex;
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
                    if (!a.sortDate && !b.sortDate) return 0;
                    if (!a.sortDate) return 1;
                    if (!b.sortDate) return -1;
                    if (a.sortDate !== b.sortDate) return b.sortDate.localeCompare(a.sortDate);
                    if (a.bookingId === b.bookingId) return b.orderIndex - a.orderIndex;
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
              {monthlyBreakdown.map((month) => (
                <tr key={month.key} className="border-t border-stone-100 hover:bg-stone-50">
                  <td className="px-3 py-2 font-medium text-stone-800 whitespace-nowrap">{monthLabel(month.key)}</td>
                  <td className="px-3 py-2 text-stone-600 whitespace-nowrap">{month.count}</td>
                  <td className="px-3 py-2 text-stone-600 whitespace-nowrap">{fmt(month.total)}</td>
                  <td className="px-3 py-2 font-semibold text-emerald-700 whitespace-nowrap">{fmt(month.profit)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-3 justify-end">
                      <button
                        onClick={() => exportMonth(month.key)}
                        className="text-stone-400 hover:text-teal-800 text-xs font-medium flex items-center gap-1"
                      >
                        <Download size={13} /> Export
                      </button>
                      <button
                        onClick={() => setSelectedMonth([month.key])}
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
  </>
);

export default FlightsTable;
