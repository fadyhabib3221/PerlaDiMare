import React from "react";
import PassportIcon from "../PassportIcon";
import ThFilter from "../ThFilter";

const VisaTable = ({
  filteredVisaBookings,
  visibleVisaBookings,
  rankByServiceDate,
  isYearLocked,
  setViewingFileContext,
  setViewingVisaBooking,
  visaNetTotal,
  visaSoldTotal,
  visaProfitTotal,
  employeeInitials,
  formatDisplayDate,
  fmt,
  visaEmployeesAvailable,
  visaSelectedEmployee,
  setVisaSelectedEmployee,
  visaSuppliersAvailable,
  visaSelectedSupplier,
  setVisaSelectedSupplier,
}) => (
  <>
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
);

export default VisaTable;
