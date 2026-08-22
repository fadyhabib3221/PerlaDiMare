import React from "react";

const HotelsBookingTotals = ({
  hotelForm,
  hotelEditingId,
  hotelNetTotal,
  hotelSoldTotal,
  hotelProfitTotal,
  fmt,
  handleSaveHotel,
  resetHotelForm,
}) => (
  <>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
      <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center">
        <p className="text-[11px] text-stone-500">Net total (EGP)</p>
        <p className="text-sm font-bold text-stone-800">{fmt(hotelNetTotal(hotelForm))}</p>
      </div>
      <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center">
        <p className="text-[11px] text-stone-500">Sold total (EGP)</p>
        <p className="text-sm font-bold text-stone-800">{fmt(hotelSoldTotal(hotelForm))}</p>
      </div>
      <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center">
        <p className="text-[11px] text-stone-500">Profit (auto, EGP)</p>
        <p className="text-sm font-bold text-emerald-700">{fmt(hotelProfitTotal(hotelForm))}</p>
      </div>
    </div>
    <div className="flex items-center gap-3 mt-4">
      <button
        onClick={handleSaveHotel}
        className="bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl px-5 py-2.5 hover:brightness-110"
      >
        {hotelEditingId ? "Save changes" : "Add booking"}
      </button>
      {hotelEditingId && (
        <button
          onClick={resetHotelForm}
          className="text-sm font-semibold text-stone-500 rounded-xl px-4 py-2.5 hover:bg-stone-50"
        >
          Cancel
        </button>
      )}
    </div>
  </>
);

export default HotelsBookingTotals;
