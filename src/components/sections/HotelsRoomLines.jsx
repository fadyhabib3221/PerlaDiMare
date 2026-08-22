import React from "react";
import { Trash2 } from "lucide-react";

const HotelsRoomLines = ({
  hotelForm,
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
  fmt,
  removeHotelRoomLine,
  updateRoomGuest,
  addRoomChild,
  updateRoomChild,
  sanitizeAgeInput,
  removeRoomChild,
  addHotelRoomLine,
}) => (
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
                {roomLineNights(line, hotelForm)} night{roomLineNights(line, hotelForm) === 1 ? "" : "s"} · {fmt(hotelInEgp(hotelLineSoldTotal(line, roomLineNights(line, hotelForm)), hotelForm.soldCurrency, hotelForm.usdRate) - hotelInEgp(hotelLineNetTotal(line, roomLineNights(line, hotelForm)), hotelForm.netCurrency, hotelForm.usdRate))} EGP
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

        {/* Adult guest names — one field per bed the room type holds, placed
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

        {/* Children in this room — name + age in years (0–11). */}
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
                    <label className="text-[11px] text-stone-500 block mb-1">Age (0–11)</label>
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
);

export default HotelsRoomLines;
