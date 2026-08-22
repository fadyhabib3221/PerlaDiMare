import React from "react";
import ThFilter from "../ThFilter";

const HotelsTable = ({
  filteredHotelBookings,
  visibleHotelBookings,
  rankByServiceDate,
  isYearLocked,
  setViewingFileContext,
  setViewingHotelBooking,
  hotelLinesSummary,
  hotelRoomCount,
  hotelDateRange,
  formatDisplayDate,
  hotelNetTotal,
  hotelSoldTotal,
  hotelProfitTotal,
  fmt,
  hotelNamesAvailable,
  hotelSelectedHotelName,
  setHotelSelectedHotelName,
  hotelSuppliersAvailable,
  hotelSelectedSupplier,
  setHotelSelectedSupplier,
}) => (
  <div className="bg-white border border-stone-200 rounded-2xl overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}>
    <table className="w-full min-w-max text-xs border-collapse">
      <thead>
        <tr className="bg-stone-50 border-b border-stone-200 text-stone-500">
          <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">RN</th>
          <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Company</th>
          <ThFilter label="Hotel" options={hotelNamesAvailable} selected={hotelSelectedHotelName} onChange={setHotelSelectedHotelName} padding="px-1.5 py-0.5" />
          <ThFilter label="Supplier" options={hotelSuppliersAvailable} selected={hotelSelectedSupplier} onChange={setHotelSelectedSupplier} padding="px-1.5 py-0.5" />
          <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Rooms</th>
          <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap"># rooms</th>
          <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Booking date</th>
          <th className="text-left px-1.5 py-0.5 font-semibold whitespace-nowrap">Dates</th>
          <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Net total (EGP)</th>
          <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Sold total (EGP)</th>
          <th className="text-right px-1.5 py-0.5 font-semibold whitespace-nowrap">Profit (EGP)</th>
        </tr>
      </thead>
      <tbody>
        {filteredHotelBookings.length === 0 && (
          <tr>
            <td colSpan={11} className="text-center text-stone-400 px-2.5 py-6">
              {visibleHotelBookings.length === 0 ? "No hotel bookings yet." : "No hotel bookings match the current search/filters."}
            </td>
          </tr>
        )}
        {(() => {
          const { sorted, rnByRowId } = rankByServiceDate(filteredHotelBookings, "bookingDate");
          return sorted.map((h) => (
          <tr
            key={h.id}
            className={`border-b border-stone-100 cursor-pointer ${isYearLocked("hotels", h.bookingDate) ? "bg-stone-200/70 grayscale hover:bg-stone-200" : "hover:bg-stone-50"}`}
            onClick={() => { setViewingFileContext(null); setViewingHotelBooking(h); }}
          >
            <td className="px-1.5 py-0.5 text-stone-400 whitespace-nowrap">{rnByRowId[h.id]}</td>
            <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">
              {h.customer && h.customer.trim() ? (
                h.customer
              ) : (
                <span className="text-stone-400 italic">Individual</span>
              )}
            </td>
            <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{h.hotel}</td>
            <td className="px-1.5 py-0.5 text-stone-600 whitespace-nowrap">{h.supplier}</td>
            <td className="px-1.5 py-0.5 text-stone-600 whitespace-nowrap">{hotelLinesSummary(h)}</td>
            <td className="px-1.5 py-0.5 text-stone-600 text-right whitespace-nowrap">{hotelRoomCount(h)}</td>
            <td className="px-1.5 py-0.5 text-stone-600 whitespace-nowrap">
              {h.bookingDate ? formatDisplayDate(h.bookingDate) : "-"}
            </td>
            <td className="px-1.5 py-0.5 text-stone-600 whitespace-nowrap">
              {hotelDateRange(h).start && hotelDateRange(h).end
                ? `${formatDisplayDate(hotelDateRange(h).start)} → ${formatDisplayDate(hotelDateRange(h).end)}`
                : "-"}
            </td>
            <td className="px-1.5 py-0.5 text-stone-600 text-right whitespace-nowrap">{fmt(hotelNetTotal(h))}</td>
            <td className="px-1.5 py-0.5 text-stone-600 text-right whitespace-nowrap">{fmt(hotelSoldTotal(h))}</td>
            <td className="px-1.5 py-0.5 font-semibold text-emerald-700 text-right whitespace-nowrap">
              {fmt(hotelProfitTotal(h))}
            </td>
          </tr>
          ));
        })()}
      </tbody>
    </table>
  </div>
);

export default HotelsTable;
