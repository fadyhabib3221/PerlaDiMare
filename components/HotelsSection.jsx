import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Building2, Calendar, ChevronDown, Search, SlidersHorizontal, Trash2, TrendingUp, User, Wallet } from 'lucide-react';

function HotelSummaryCards({ hasActiveFilter, filteredTotals, currentMonthTotals, formatNumber }) {
  const totals = hasActiveFilter ? filteredTotals : currentMonthTotals;
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-6">
      <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="bg-stone-100 rounded-xl p-1.5 sm:p-2 text-stone-600 shrink-0"><Building2 size={18} className="sm:hidden" /><Building2 size={20} className="hidden sm:block" /></div>
        <div className="min-w-0"><p className="text-xs text-stone-500">Bookings</p><p className="text-sm sm:text-lg font-bold truncate">{totals.count}</p></div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="bg-teal-50 rounded-xl p-1.5 sm:p-2 text-teal-900 shrink-0"><Wallet size={18} className="sm:hidden" /><Wallet size={20} className="hidden sm:block" /></div>
        <div className="min-w-0"><p className="text-xs text-stone-500">Total sales (EGP)</p><p className="text-sm sm:text-lg font-bold truncate">{formatNumber(totals.sold)}</p></div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="bg-emerald-50 rounded-xl p-1.5 sm:p-2 text-emerald-700 shrink-0"><TrendingUp size={18} className="sm:hidden" /><TrendingUp size={20} className="hidden sm:block" /></div>
        <div className="min-w-0"><p className="text-xs text-stone-500">Total profit (EGP)</p><p className="text-sm sm:text-lg font-bold text-emerald-700 truncate">{formatNumber(totals.profit)}</p></div>
      </div>
    </div>
  );
}

const HotelBookingForm = ({
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
  ROOM_CAPACITY,
  updateHotelRoomLine,
  guestsForCapacity,
  ROOM_TYPES,
  MEAL_PLANS,
  addCentsOnBlur,
  usdHint,
  roomLineNights,
  hotelInEgp,
  hotelLineSoldTotal,
  hotelLineNetTotal,
  fmt,
  removeHotelRoomLine,
  addRoomChild,
  updateRoomGuest,
  sanitizeAgeInput,
  updateRoomChild,
  removeRoomChild,
  addHotelRoomLine,
  hotelNetTotal,
  hotelSoldTotal,
  hotelProfitTotal,
  handleSaveHotel,
  resetHotelForm,
}) => (
  canAddTickets && (
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
            <option value="">â€” No corporate (Individual) â€”</option>
            {hotelForm.customer && !suggestions.companies.some((c) => companyName(c) === hotelForm.customer) && (
              // Booking already has a company value that isn't (or is no longer) a
              // registered corporate â€” e.g. saved before Corporate Management existed,
              // or the corporate was later renamed/deleted. Keep it selectable/visible
              // instead of silently blanking the field.
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
        Each room has its own check-in/check-out dates â€” price is per room, per night.
      </p>

      {/* Room lines: one booking can mix different room types, meal plans, prices, and
          stay dates â€” each room keeps its own check-in/check-out. Currency is set once
          for the whole booking above. */}
      <div className="space-y-3">
        <label className="text-xs text-stone-500 block">Rooms</label>
        {hotelForm.roomLines.map((line) => (
          <div key={line.id} className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-3">
            {/* Row 1: room type, meal plan, dates. Currency is set once for the whole
                booking above, not per room line. */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Room type</label>
                <select
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  value={line.roomType}
                  onChange={(e) => {
                    const roomType = e.target.value;
                    const capacity = ROOM_CAPACITY[roomType] || 1;
                    updateHotelRoomLine(line.id, { roomType, guests: guestsForCapacity(line.guests, capacity) });
                  }}
                >
                  {ROOM_TYPES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Meal plan</label>
                <select
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  value={line.mealPlan}
                  onChange={(e) => updateHotelRoomLine(line.id, { mealPlan: e.target.value })}
                >
                  {MEAL_PLANS.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Check-in</label>
                <input
                  type="date"
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  value={line.checkIn}
                  onChange={(e) => updateHotelRoomLine(line.id, { checkIn: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Check-out</label>
                <input
                  type="date"
                  min={line.checkIn || undefined}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  value={line.checkOut}
                  onChange={(e) => updateHotelRoomLine(line.id, { checkOut: e.target.value })}
                />
              </div>
            </div>

            {/* Row 2: # rooms, net, sold. */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 items-start">
              <div>
                <label className="text-[11px] text-stone-500 block mb-1"># rooms</label>
                <input
                  type="number"
                  min="1"
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  value={line.count}
                  onChange={(e) => updateHotelRoomLine(line.id, { count: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Net (per room/night)</label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-28 border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
                    value={line.netPrice}
                    onChange={(e) => updateHotelRoomLine(line.id, { netPrice: e.target.value })}
                    onBlur={(e) => updateHotelRoomLine(line.id, { netPrice: addCentsOnBlur(e.target.value) })}
                    placeholder="0"
                  />
                  {usdHint(line.netPrice, hotelForm.netCurrency, hotelForm.usdRate) && (
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none truncate max-w-[70px]">
                      {usdHint(line.netPrice, hotelForm.netCurrency, hotelForm.usdRate)}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Sold (per room/night)</label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-28 border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input"
                    value={line.soldPrice}
                    onChange={(e) => updateHotelRoomLine(line.id, { soldPrice: e.target.value })}
                    onBlur={(e) => updateHotelRoomLine(line.id, { soldPrice: addCentsOnBlur(e.target.value) })}
                    placeholder="0"
                  />
                  {usdHint(line.soldPrice, hotelForm.soldCurrency, hotelForm.usdRate) && (
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none truncate max-w-[70px]">
                      {usdHint(line.soldPrice, hotelForm.soldCurrency, hotelForm.usdRate)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 mt-3">
                  <div className="text-xs text-emerald-700 font-semibold">
                    {roomLineNights(line, hotelForm)} night{roomLineNights(line, hotelForm) === 1 ? "" : "s"} Â· {fmt(hotelInEgp(hotelLineSoldTotal(line, roomLineNights(line, hotelForm)), hotelForm.soldCurrency, hotelForm.usdRate) - hotelInEgp(hotelLineNetTotal(line, roomLineNights(line, hotelForm)), hotelForm.netCurrency, hotelForm.usdRate))} EGP
                  </div>
                  <button
                    onClick={() => removeHotelRoomLine(line.id)}
                    disabled={hotelForm.roomLines.length <= 1}
                    className="text-red-500 hover:text-red-700 disabled:opacity-30"
                    title="Remove this room line"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Adult guest names â€” one field per bed the room type holds, placed
                directly above the Children section. Only the first guest is
                mandatory; the rest are optional. */}
            <div className="space-y-2">
              {(line.guests || []).map((g, i) => (
                <div key={g.id} className="bg-white border border-stone-200 rounded-lg p-2">
                  <label className="text-[11px] text-stone-500 block mb-1">
                    Guest {i + 1} name
                    {i === 0 ? <span className="text-red-500"> *</span> : (
                      <span className="text-stone-400"> (optional)</span>
                    )}
                  </label>
                  <input
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    value={g.name}
                    onChange={(e) => updateRoomGuest(line.id, i, e.target.value)}
                    placeholder={i === 0 ? "Guest 1 name (required)" : `Guest ${i + 1} name`}
                  />
                </div>
              ))}
            </div>

            {/* Children in this room â€” name + age in years (0â€“11). */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] text-stone-500 block">Children</label>
                <button
                  type="button"
                  onClick={() => addRoomChild(line.id)}
                  className="text-[11px] font-semibold text-teal-800 border border-teal-700 border-dashed rounded-lg px-2 py-1 hover:bg-teal-50"
                >
                  + Add child
                </button>
              </div>
              {(line.children || []).length > 0 && (
                <div className="space-y-2">
                  {line.children.map((c, i) => (
                    <div key={c.id} className="grid grid-cols-1 sm:grid-cols-8 gap-3 items-end bg-white border border-stone-200 rounded-lg p-3">
                      <div className="sm:col-span-6">
                        <label className="text-[11px] text-stone-500 block mb-1">Child {i + 1} name</label>
                        <input
                          className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                          value={c.name}
                          onChange={(e) => updateRoomChild(line.id, c.id, { name: e.target.value })}
                          placeholder="Child name"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-stone-500 block mb-1">Age (0â€“11)</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                          value={c.age}
                          onChange={(e) => updateRoomChild(line.id, c.id, { age: sanitizeAgeInput(e.target.value) })}
                          placeholder="e.g. 4"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => removeRoomChild(line.id, c.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Remove this child"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={addHotelRoomLine}
          className="text-xs font-semibold text-teal-800 border border-teal-700 border-dashed rounded-lg px-3 py-1.5 hover:bg-teal-50"
        >
          + Add another room
        </button>
      </div>

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
    </div>
  )
);

const HotelBookingsTable = ({
  hotelQuery,
  setHotelQuery,
  hotelFiltersOpen,
  setHotelFiltersOpen,
  activeHotelFilterCount,
  hotelYearsAvailable,
  hotelSelectedYear,
  setHotelSelectedYear,
  hotelMonthsAvailable,
  hotelSelectedMonth,
  setHotelSelectedMonth,
  hotelEmployeesAvailable,
  hotelSelectedEmployee,
  setHotelSelectedEmployee,
  hotelSuppliersAvailable,
  hotelSelectedSupplier,
  setHotelSelectedSupplier,
  hotelNamesAvailable,
  hotelSelectedHotelName,
  setHotelSelectedHotelName,
  monthLabel,
  clearAllHotelFilters,
  filteredHotelBookings,
  visibleHotelBookings,
  rankByServiceDate,
  isYearLocked,
  setViewingFileContext,
  setViewingHotelBooking,
  hotelLinesSummary,
  hotelRoomCount,
  formatDisplayDate,
  hotelDateRange,
  fmt,
  hotelNetTotal,
  hotelSoldTotal,
  hotelProfitTotal,
  MultiSelectDropdown,
  AppliedFilters,
  ThFilter,
  multiFilterGroup,
}) => (
  <>
    {/* Search and filters â€” same unified card style as Flights, adapted to the
        fields hotel bookings actually have (no month/year select stub â€” those
        come from each booking's own booking date). */}
    <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 mb-3">
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            placeholder="Search by employee, customer, hotel, or supplier"
            value={hotelQuery}
            onChange={(e) => setHotelQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => setHotelFiltersOpen(!hotelFiltersOpen)}
          className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
            hotelFiltersOpen ? "border-teal-700 text-teal-800 bg-teal-50" : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white"
          }`}
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Filters</span>
          {activeHotelFilterCount > 0 && (
            <span className="bg-teal-700 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
              {activeHotelFilterCount}
            </span>
          )}
          <ChevronDown size={14} className={`transition-transform ${hotelFiltersOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {hotelFiltersOpen && (
        <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-stone-100">
          <div>
            <label className="text-xs text-stone-500 block mb-1">Year</label>
            <MultiSelectDropdown label="years" icon={Calendar} options={hotelYearsAvailable} selected={hotelSelectedYear} onChange={setHotelSelectedYear} placeholder="All years" />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">Month</label>
            <MultiSelectDropdown label="months" icon={Calendar} options={hotelMonthsAvailable.map((key) => ({ value: key, label: monthLabel(key) }))} selected={hotelSelectedMonth} onChange={setHotelSelectedMonth} placeholder="All months" />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">By</label>
            <MultiSelectDropdown label="employees" icon={User} options={hotelEmployeesAvailable} selected={hotelSelectedEmployee} onChange={setHotelSelectedEmployee} placeholder="All employees" />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">Supplier</label>
            <MultiSelectDropdown label="suppliers" icon={Building2} options={hotelSuppliersAvailable} selected={hotelSelectedSupplier} onChange={setHotelSelectedSupplier} placeholder="All suppliers" />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">Hotel</label>
            <MultiSelectDropdown label="hotels" icon={Building2} options={hotelNamesAvailable} selected={hotelSelectedHotelName} onChange={setHotelSelectedHotelName} placeholder="All hotels" />
          </div>
        </div>
      )}

      <AppliedFilters
        groups={[
          multiFilterGroup("Year", "year", hotelSelectedYear, setHotelSelectedYear),
          multiFilterGroup("Month", "month", hotelSelectedMonth, setHotelSelectedMonth, monthLabel),
          multiFilterGroup("By", "employee", hotelSelectedEmployee, setHotelSelectedEmployee),
          multiFilterGroup("Supplier", "supplier", hotelSelectedSupplier, setHotelSelectedSupplier),
          multiFilterGroup("Hotel", "hotel", hotelSelectedHotelName, setHotelSelectedHotelName),
          { label: "Search", values: hotelQuery.trim() ? [{ key: "search", text: `"${hotelQuery.trim()}"`, onRemove: () => setHotelQuery("") }] : [] },
        ]}
        onClearAll={clearAllHotelFilters}
      />
    </div>

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
                {h.customer && h.customer.trim() ? h.customer : <span className="text-stone-400 italic">Individual</span>}
              </td>
              <td className="px-1.5 py-0.5 text-stone-700 whitespace-nowrap">{h.hotel}</td>
              <td className="px-1.5 py-0.5 text-stone-600 whitespace-nowrap">{h.supplier}</td>
              <td className="px-1.5 py-0.5 text-stone-600 whitespace-nowrap">{hotelLinesSummary(h)}</td>
              <td className="px-1.5 py-0.5 text-stone-600 text-right whitespace-nowrap">{hotelRoomCount(h)}</td>
              <td className="px-1.5 py-0.5 text-stone-600 whitespace-nowrap">{h.bookingDate ? formatDisplayDate(h.bookingDate) : "-"}</td>
              <td className="px-1.5 py-0.5 text-stone-600 whitespace-nowrap">
                {hotelDateRange(h).start && hotelDateRange(h).end
                  ? `${formatDisplayDate(hotelDateRange(h).start)} â†’ ${formatDisplayDate(hotelDateRange(h).end)}`
                  : "-"}
              </td>
              <td className="px-1.5 py-0.5 text-stone-600 text-right whitespace-nowrap">{fmt(hotelNetTotal(h))}</td>
              <td className="px-1.5 py-0.5 text-stone-600 text-right whitespace-nowrap">{fmt(hotelSoldTotal(h))}</td>
              <td className="px-1.5 py-0.5 font-semibold text-emerald-700 text-right whitespace-nowrap">{fmt(hotelProfitTotal(h))}</td>
            </tr>
            ));
          })()}
        </tbody>
      </table>
    </div>
  </>
);

export { HotelSummaryCards, HotelBookingForm, HotelBookingsTable };

