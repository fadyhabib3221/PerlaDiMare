import React from "react";
import { Car } from "lucide-react";
import ThFilter from "../ThFilter";

const CarsTable = ({
  filteredCarBookings,
  visibleCarBookings,
  rankByServiceDate,
  isYearLocked,
  setViewingFileContext,
  setViewingCarBooking,
  carNetTotal,
  carSoldTotal,
  carProfitTotal,
  formatDisplayDate,
  fmt,
  carSuppliersAvailable,
  carSelectedSupplier,
  setCarSelectedSupplier,
}) => (
  <>
    {filteredCarBookings.length === 0 ? (
      <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-400">
        <Car size={40} className="mx-auto mb-3 text-stone-300" />
        <p className="text-sm">{visibleCarBookings.length === 0 ? "No transfer bookings yet." : "No transfer bookings match the current search/filters."}</p>
      </div>
    ) : (
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
          <table className="w-full min-w-max text-sm">
            <thead className="bg-stone-50 text-stone-500 text-xs">
              <tr>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">RN</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Entry date</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Customer</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Phone</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Route</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Car type</th>
                <ThFilter label="Supplier" options={carSuppliersAvailable} selected={carSelectedSupplier} onChange={setCarSelectedSupplier} padding="px-1.5 py-0.5" />
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Trip</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Waiting</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Flight #</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Date &amp; time</th>
                <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Return</th>
                <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Collection</th>
                <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Driver tip</th>
                <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Net</th>
                <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Sold</th>
                <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {(() => {
                const { sorted, rnByRowId } = rankByServiceDate(filteredCarBookings, "entryDate");
                return sorted.map((c) => {
                const net = carNetTotal(c);
                const sold = carSoldTotal(c);
                const profit = carProfitTotal(c);
                return (
                  <tr
                    key={c.id}
                    className={`leading-tight cursor-pointer ${isYearLocked("cars", c.bookingDate) ? "bg-stone-200/70 grayscale hover:bg-stone-200" : "hover:bg-stone-50"}`}
                    onClick={() => { setViewingFileContext(null); setViewingCarBooking(c); }}
                  >
                    <td className="px-1.5 py-0.5 text-stone-400 whitespace-nowrap">{rnByRowId[c.id]}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                      {c.entryDate ? formatDisplayDate(c.entryDate) : "-"}
                    </td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{c.customerName}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{c.phone || "-"}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{c.routeFrom} → {c.routeTo}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{c.carType}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{c.supplier}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{c.isRoundTrip ? "Round trip" : "One way"}</td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                      {c.hasWaiting ? `${c.waitingHours || 0} h` : "-"}
                    </td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                      {c.startsAtAirport ? (c.flightNumber || "-") : "-"}
                    </td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                      {c.bookingDate ? formatDisplayDate(c.bookingDate) : "-"}
                      {c.bookingTime ? ` · ${c.bookingTime}` : ""}
                    </td>
                    <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
                      {c.isRoundTrip
                        ? `${c.returnDate ? formatDisplayDate(c.returnDate) : "-"}${c.returnTime ? ` · ${c.returnTime}` : ""}`
                        : "-"}
                    </td>
                    <td className="px-1.5 py-0.5 text-right text-stone-700 whitespace-nowrap">
                      {c.collection ? `${fmt(parseFloat(c.collection) || 0)} ${c.currency}` : "-"}
                    </td>
                    <td className="px-1.5 py-0.5 text-right text-stone-700 whitespace-nowrap">
                      {c.driverTip ? `${fmt(parseFloat(c.driverTip) || 0)} ${c.currency}` : "-"}
                    </td>
                    <td className="px-1.5 py-0.5 text-right text-stone-700 whitespace-nowrap">{fmt(net)} {c.netCurrency}</td>
                    <td className="px-1.5 py-0.5 text-right text-stone-700 whitespace-nowrap">{fmt(sold)} {c.soldCurrency}</td>
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

export default CarsTable;
