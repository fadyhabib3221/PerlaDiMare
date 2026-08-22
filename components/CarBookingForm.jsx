import React from "react";

export default function CarBookingForm({
  carForm,
  setCarForm,
  carEditingId,
  carSupplierOther,
  setCarSupplierOther,
  suggestions,
  companyName,
  todayDateStr,
  TimeSelect,
  CAR_TYPES,
  HOTEL_CURRENCIES,
  addCentsOnBlur,
  usdHint,
  carProfitTotal,
  fmt,
  handleSaveCar,
  resetCarForm,
}) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-6">
      <h3 className="text-sm font-bold text-stone-700 mb-4">
        {carEditingId ? "Edit transfer booking" : "New transfer booking"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="text-xs text-stone-500 block mb-1">Corporates</label>
          <select className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white" value={carForm.customer} onChange={(e) => setCarForm({ ...carForm, customer: e.target.value })}>
            <option value="">— No corporate (Individual) —</option>
            {carForm.customer && !suggestions.companies.some((c) => companyName(c) === carForm.customer) && (
              <option value={carForm.customer}>{carForm.customer} (not registered)</option>
            )}
            {[...suggestions.companies].sort((a, b) => companyName(a).localeCompare(companyName(b))).map((c) => {
              const name = companyName(c);
              return <option key={name} value={name}>{name}</option>;
            })}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Customer name</label>
          <input className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={carForm.customerName} onChange={(e) => setCarForm({ ...carForm, customerName: e.target.value })} placeholder="Customer name (required)" />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Phone number</label>
          <input className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={carForm.phone} onChange={(e) => setCarForm({ ...carForm, phone: e.target.value })} placeholder="Phone number" />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Entry date (booking entered on)</label>
          <input type="date" max={todayDateStr()} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={carForm.entryDate} onChange={(e) => setCarForm({ ...carForm, entryDate: e.target.value })} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs text-stone-500 block mb-1">Route — from</label>
          <input className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={carForm.routeFrom} onChange={(e) => setCarForm({ ...carForm, routeFrom: e.target.value })} placeholder="e.g. Cairo Airport" />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Route — to</label>
          <input className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={carForm.routeTo} onChange={(e) => setCarForm({ ...carForm, routeTo: e.target.value })} placeholder="e.g. Downtown Hotel" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs text-stone-500 block mb-1">Date</label>
          <input type="date" className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={carForm.bookingDate} onChange={(e) => setCarForm({ ...carForm, bookingDate: e.target.value })} />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Time</label>
          <TimeSelect value={carForm.bookingTime} onChange={(v) => setCarForm({ ...carForm, bookingTime: v })} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs text-stone-500 block mb-1">Car type</label>
          <select className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white" value={carForm.carType} onChange={(e) => setCarForm({ ...carForm, carType: e.target.value })}>
            <option value="">Select car type</option>
            {CAR_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Supplier</label>
          {carSupplierOther ? (
            <div className="flex gap-2">
              <input className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 ${carForm.supplier.trim() ? "border-blue-400 text-blue-700 font-medium bg-blue-50" : "border-stone-300"}`} value={carForm.supplier} onChange={(e) => setCarForm({ ...carForm, supplier: e.target.value })} placeholder="Enter supplier name" autoFocus />
              <button type="button" onClick={() => { setCarSupplierOther(false); setCarForm({ ...carForm, supplier: "" }); }} className="shrink-0 text-xs text-stone-500 hover:text-teal-800 border border-stone-300 rounded-xl px-2">List</button>
            </div>
          ) : (
            <select className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 ${carForm.supplier ? "border-blue-400 text-blue-700 font-medium bg-blue-50" : "border-stone-300 bg-white"}`} value={carForm.supplier} onChange={(e) => { if (e.target.value === "__other__") { setCarSupplierOther(true); setCarForm({ ...carForm, supplier: "" }); } else { setCarForm({ ...carForm, supplier: e.target.value }); } }}>
              <option value="">Select supplier</option>
              {(suggestions.carSuppliers || []).map((s) => <option key={s} value={s}>{s}</option>)}
              <option value="__other__">Other</option>
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="flex items-center gap-2 text-xs text-stone-500 mb-1 cursor-pointer"><input type="checkbox" checked={carForm.hasWaiting} onChange={(e) => setCarForm({ ...carForm, hasWaiting: e.target.checked, waitingHours: e.target.checked ? carForm.waitingHours : "" })} className="rounded border-stone-300" />Waiting hours</label>
          {carForm.hasWaiting && <input type="number" className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={carForm.waitingHours} onChange={(e) => setCarForm({ ...carForm, waitingHours: e.target.value })} placeholder="Number of hours" />}
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs text-stone-500 mb-1 cursor-pointer"><input type="checkbox" checked={carForm.isRoundTrip} onChange={(e) => setCarForm({ ...carForm, isRoundTrip: e.target.checked, returnDate: e.target.checked ? carForm.returnDate : "", returnTime: e.target.checked ? carForm.returnTime : "" })} className="rounded border-stone-300" />Round trip (go &amp; return)</label>
          <p className="text-xs text-stone-400 mt-2">{carForm.isRoundTrip ? "Round trip" : "One way"}</p>
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs text-stone-500 mb-1 cursor-pointer"><input type="checkbox" checked={carForm.startsAtAirport} onChange={(e) => setCarForm({ ...carForm, startsAtAirport: e.target.checked, flightNumber: e.target.checked ? carForm.flightNumber : "" })} className="rounded border-stone-300" />Starts at the airport</label>
          {carForm.startsAtAirport && <input className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={carForm.flightNumber} onChange={(e) => setCarForm({ ...carForm, flightNumber: e.target.value })} placeholder="Flight number" />}
        </div>
      </div>

      {carForm.isRoundTrip && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-xs text-stone-500 block mb-1">Return date</label><input type="date" className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={carForm.returnDate} onChange={(e) => setCarForm({ ...carForm, returnDate: e.target.value })} /></div>
        <div><label className="text-xs text-stone-500 block mb-1">Return time</label><TimeSelect value={carForm.returnTime} onChange={(v) => setCarForm({ ...carForm, returnTime: v })} /></div>
      </div>}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div><label className="text-xs text-stone-500 block mb-1">Currency (collection/tip)</label><select className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white" value={carForm.currency} onChange={(e) => setCarForm({ ...carForm, currency: e.target.value })}>{HOTEL_CURRENCIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
        <PriceField label="Collection" value={carForm.collection} currency={carForm.currency} rate={carForm.usdRate} setCarForm={setCarForm} carForm={carForm} field="collection" addCentsOnBlur={addCentsOnBlur} usdHint={usdHint} />
        <PriceField label="Driver tip" value={carForm.driverTip} currency={carForm.currency} rate={carForm.usdRate} setCarForm={setCarForm} carForm={carForm} field="driverTip" addCentsOnBlur={addCentsOnBlur} usdHint={usdHint} />
        <div />
        <div><label className="text-xs text-stone-500 block mb-1">Net currency</label><select className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white" value={carForm.netCurrency} onChange={(e) => setCarForm({ ...carForm, netCurrency: e.target.value })}>{HOTEL_CURRENCIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
        <PriceField label="Price net" value={carForm.netPrice} currency={carForm.netCurrency} rate={carForm.usdRate} setCarForm={setCarForm} carForm={carForm} field="netPrice" addCentsOnBlur={addCentsOnBlur} usdHint={usdHint} />
        <div><label className="text-xs text-stone-500 block mb-1">Sold currency</label><select className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white" value={carForm.soldCurrency} onChange={(e) => setCarForm({ ...carForm, soldCurrency: e.target.value })}>{HOTEL_CURRENCIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
        <PriceField label="Sold" value={carForm.soldPrice} currency={carForm.soldCurrency} rate={carForm.usdRate} setCarForm={setCarForm} carForm={carForm} field="soldPrice" addCentsOnBlur={addCentsOnBlur} usdHint={usdHint} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4"><div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-center"><p className="text-[11px] text-stone-500">Profit (auto, EGP)</p><p className="text-sm font-bold text-emerald-700">{fmt(carProfitTotal(carForm))} EGP</p></div></div>

      <div className="flex items-center gap-2"><button onClick={handleSaveCar} className="bg-gradient-to-b from-teal-700 to-teal-900 text-white text-sm font-semibold rounded-xl px-4 py-2 hover:brightness-110">{carEditingId ? "Save changes" : "Add transfer booking"}</button>{carEditingId && <button onClick={resetCarForm} className="text-sm text-stone-500 hover:text-stone-700 border border-stone-300 rounded-xl px-4 py-2">Cancel</button>}</div>
    </div>
  );
}

function PriceField({ label, value, currency, rate, setCarForm, carForm, field, addCentsOnBlur, usdHint }) {
  return <div><label className="text-xs text-stone-500 block mb-1">{label}</label><div className="relative"><input type="number" className="w-28 border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 price-input" value={value} onChange={(e) => setCarForm({ ...carForm, [field]: e.target.value })} onBlur={(e) => setCarForm({ ...carForm, [field]: addCentsOnBlur(e.target.value) })} placeholder="0" />{usdHint(value, currency, rate) && <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] leading-none text-emerald-600 bg-white/90 pl-1 pointer-events-none truncate max-w-[70px]">{usdHint(value, currency, rate)}</span>}</div></div>;
}