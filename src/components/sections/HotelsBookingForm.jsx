import React from "react";
import HotelsRoomLines from "./HotelsRoomLines";
import HotelsBookingTotals from "./HotelsBookingTotals";

const HotelsBookingForm = ({
  canAddTickets,
  hotelEditingId,
  hotelForm,
  setHotelForm,
  suggestions,
  companyName,
  hotelNameOther,
  setHotelNameOther,
  hotelSupplierOther,
  setHotelSupplierOther,
  HOTEL_CURRENCIES,
  updateHotelRoomLine,
  ROOM_TYPES,
  MEAL_PLANS,
  ROOM_CAPACITY,
  guestsForCapacity,
  usdHint,
  addCentsOnBlur,
  roomLineNights,
  hotelInEgp,
  hotelLineSoldTotal,
  hotelLineNetTotal,
  removeHotelRoomLine,
  updateRoomGuest,
  addRoomChild,
  updateRoomChild,
  sanitizeAgeInput,
  removeRoomChild,
  addHotelRoomLine,
  hotelNetTotal,
  hotelSoldTotal,
  hotelProfitTotal,
  fmt,
  handleSaveHotel,
  resetHotelForm,
}) => canAddTickets && (
  <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-6">
    <h3 className="text-sm font-bold text-stone-700 mb-4">
      {hotelEditingId ? "Edit hotel booking" : "New hotel booking"}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <label className="text-xs text-stone-500 block mb-1">
          Corporates
        </label>
        <select
          className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
          value={hotelForm.customer}
          onChange={(e) => setHotelForm({ ...hotelForm, customer: e.target.value })}
        >
          <option value="">— No corporate (Individual) —</option>
          {hotelForm.customer && !suggestions.companies.some((c) => companyName(c) === hotelForm.customer) && (
            <option value={hotelForm.customer}>{hotelForm.customer} (not registered)</option>
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
        <label className="text-xs text-stone-500 block mb-1">Hotel name</label>
        {hotelNameOther ? (
          <div className="flex gap-2">
            <input
              className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              value={hotelForm.hotel}
              onChange={(e) => setHotelForm({ ...hotelForm, hotel: e.target.value })}
              placeholder="Enter hotel name"
              autoFocus
            />
            <button
              type="button"
              onClick={() => { setHotelNameOther(false); setHotelForm({ ...hotelForm, hotel: "" }); }}
              className="shrink-0 text-xs text-stone-500 hover:text-teal-800 border border-stone-300 rounded-xl px-2"
            >
              List
            </button>
          </div>
        ) : (
          <select
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
            value={hotelForm.hotel}
            onChange={(e) => {
              if (e.target.value === "__other__") {
                setHotelNameOther(true);
                setHotelForm({ ...hotelForm, hotel: "" });
              } else {
                setHotelForm({ ...hotelForm, hotel: e.target.value });
              }
            }}
          >
            <option value="">Select hotel</option>
            {suggestions.hotelNames.map((hn) => (
              <option key={hn} value={hn}>{hn}</option>
            ))}
            <option value="__other__">Other</option>
          </select>
        )}
      </div>
      <div>
        <label className="text-xs text-stone-500 block mb-1">Supplier</label>
        {hotelSupplierOther ? (
          <div className="flex gap-2">
            <input
              className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 ${hotelForm.supplier.trim() ? "border-blue-400 text-blue-700 font-medium bg-blue-50" : "border-stone-300"}`}
              value={hotelForm.supplier}
              onChange={(e) => setHotelForm({ ...hotelForm, supplier: e.target.value })}
              placeholder="Enter supplier name"
              autoFocus
            />
            <button
              type="button"
              onClick={() => { setHotelSupplierOther(false); setHotelForm({ ...hotelForm, supplier: "" }); }}
              className="shrink-0 text-xs text-stone-500 hover:text-teal-800 border border-stone-300 rounded-xl px-2"
            >
              List
            </button>
          </div>
        ) : (
          <select
            className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 ${hotelForm.supplier ? "border-blue-400 text-blue-700 font-medium bg-blue-50" : "border-stone-300 bg-white"}`}
            value={hotelForm.supplier}
            onChange={(e) => {
              if (e.target.value === "__other__") {
                setHotelSupplierOther(true);
                setHotelForm({ ...hotelForm, supplier: "" });
              } else {
                setHotelForm({ ...hotelForm, supplier: e.target.value });
              }
            }}
          >
            <option value="">Select supplier</option>
            {suggestions.suppliers.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
            <option value="__other__">Other</option>
          </select>
        )}
      </div>
      <div>
        <label className="text-xs text-stone-500 block mb-1">Booking date</label>
        <input
          type="date"
          className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
          value={hotelForm.bookingDate}
          onChange={(e) => setHotelForm({ ...hotelForm, bookingDate: e.target.value })}
        />
      </div>
      <div>
        <label className="text-xs text-stone-500 block mb-1">Net currency</label>
        <select
          className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
          value={hotelForm.netCurrency}
          onChange={(e) => setHotelForm({ ...hotelForm, netCurrency: e.target.value })}
        >
          {HOTEL_CURRENCIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-stone-500 block mb-1">Sold currency</label>
        <select
          className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
          value={hotelForm.soldCurrency}
          onChange={(e) => setHotelForm({ ...hotelForm, soldCurrency: e.target.value })}
        >
          {HOTEL_CURRENCIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-stone-500 block mb-1">Notes</label>
        <input
          className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
          value={hotelForm.notes}
          onChange={(e) => setHotelForm({ ...hotelForm, notes: e.target.value })}
        />
      </div>
    </div>

    <p className="text-xs text-stone-500 mb-3">
      Each room has its own check-in/check-out dates — price is per room, per night.
    </p>

    <HotelsRoomLines
      hotelForm={hotelForm}
      updateHotelRoomLine={updateHotelRoomLine}
      ROOM_TYPES={ROOM_TYPES}
      MEAL_PLANS={MEAL_PLANS}
      ROOM_CAPACITY={ROOM_CAPACITY}
      guestsForCapacity={guestsForCapacity}
      usdHint={usdHint}
      addCentsOnBlur={addCentsOnBlur}
      roomLineNights={roomLineNights}
      hotelInEgp={hotelInEgp}
      hotelLineSoldTotal={hotelLineSoldTotal}
      hotelLineNetTotal={hotelLineNetTotal}
      fmt={fmt}
      removeHotelRoomLine={removeHotelRoomLine}
      updateRoomGuest={updateRoomGuest}
      addRoomChild={addRoomChild}
      updateRoomChild={updateRoomChild}
      sanitizeAgeInput={sanitizeAgeInput}
      removeRoomChild={removeRoomChild}
      addHotelRoomLine={addHotelRoomLine}
    />

    <HotelsBookingTotals
      hotelForm={hotelForm}
      hotelEditingId={hotelEditingId}
      hotelNetTotal={hotelNetTotal}
      hotelSoldTotal={hotelSoldTotal}
      hotelProfitTotal={hotelProfitTotal}
      fmt={fmt}
      handleSaveHotel={handleSaveHotel}
      resetHotelForm={resetHotelForm}
    />
  </div>
);

export default HotelsBookingForm;
