import React from "react";
import { Search } from "lucide-react";

const FlightsFormAirline = ({
  form,
  setForm,
  handleAirlineChange,
  getAirlineNameByIata,
  flightLookupResult,
  FLIGHT_STATUS_COLOR_CLASSES,
  FLIGHT_STATUS_LABELS,
  handleFormFlightLookup,
  flightLookupLoading,
  flightLookupError,
  flightApiKey,
}) => (
  <>
    <div>
      <label className="text-xs text-stone-500 mb-1 flex items-center gap-1.5">
        <span>Airline</span>
        {getAirlineNameByIata(form.airline) && (
          <span className="bg-teal-50 text-teal-700 border border-teal-200 rounded px-1.5 py-0.5 text-[10px] font-semibold">
            {getAirlineNameByIata(form.airline)}
          </span>
        )}
      </label>
      <input
        className="w-16 border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
        value={form.airline}
        onChange={(e) => handleAirlineChange(e.target.value)}
        placeholder="MS"
        list="airline-suggestions"
      />
    </div>
    <div>
      <label className="text-xs text-stone-500 mb-1 flex items-center gap-1.5">
        <span>Flight number</span>
        {flightLookupResult?.flight?.iata?.toUpperCase() === (form.flightNumber || "").trim().toUpperCase() && flightLookupResult?.flight_status && (
          <span className={`border rounded px-1.5 py-0.5 text-[10px] font-semibold ${FLIGHT_STATUS_COLOR_CLASSES[flightLookupResult.flight_status] || "bg-stone-50 text-stone-700 border-stone-200"}`}>
            {FLIGHT_STATUS_LABELS[flightLookupResult.flight_status] || flightLookupResult.flight_status}
          </span>
        )}
      </label>
      <div className="flex items-center gap-1">
        <input
          className="w-20 border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 uppercase"
          value={form.flightNumber}
          onChange={(e) => setForm({ ...form, flightNumber: e.target.value })}
          placeholder="MS985"
          title="Optional — look this up to auto-fill From/To/Airline and see live status"
        />
        <button
          type="button"
          onClick={handleFormFlightLookup}
          disabled={flightLookupLoading || !(form.flightNumber || "").trim()}
          title={flightApiKey ? "Look up flight (AviationStack)" : "Add an AviationStack API key in \"Check flight status\" first"}
          className="shrink-0 border border-stone-300 rounded-lg p-1.5 text-stone-600 hover:bg-stone-50 disabled:opacity-40"
        >
          <Search size={14} />
        </button>
      </div>
      {flightLookupError && (
        <p className="text-[10px] text-red-600 mt-1 max-w-[9rem]">{flightLookupError}</p>
      )}
    </div>
  </>
);

export default FlightsFormAirline;
