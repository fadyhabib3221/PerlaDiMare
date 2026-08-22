import React from "react";
import { Plus, X } from "lucide-react";

const FlightsFormRoute = ({
  form,
  setForm,
  legsFromPairs,
  handleCityChange,
  handleDestinationChange,
  addDestinationStop,
  removeDestinationStop,
}) => (
  <>
    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
      <div className="flex items-center gap-4 text-xs text-stone-500">
        <label className="flex items-center gap-1.5 cursor-pointer select-none">
          <input
            type="radio"
            name="routeMode"
            className="w-4 h-4 accent-teal-800"
            checked={!form.multiDestination && (form.tripType || "oneWay") === "oneWay"}
            onChange={() => setForm({ ...form, tripType: "oneWay", multiDestination: false })}
          />
          One way
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer select-none">
          <input
            type="radio"
            name="routeMode"
            className="w-4 h-4 accent-teal-800"
            checked={!form.multiDestination && form.tripType === "roundTrip"}
            onChange={() => setForm({ ...form, tripType: "roundTrip", multiDestination: false })}
          />
          Round trip
        </label>
        <label className="flex items-center gap-2 text-xs font-semibold text-stone-500 cursor-pointer select-none">
          <input
            type="radio"
            name="routeMode"
            className="w-4 h-4 accent-teal-800"
            checked={!!form.multiDestination}
            onChange={() => {
              setForm({
                ...form,
                multiDestination: true,
                routeFormat: "legs",
                // Seed the stop list from the current From/To the first time this is
                // switched on, so nothing already typed gets lost.
                destinations:
                  !(form.destinations || []).some((d) => (d || "").trim())
                    ? [form.from || "", form.to || ""]
                    : form.destinations,
              });
            }}
          />
          Multi-destination route (multi-city)
        </label>
      </div>
    </div>

    {form.multiDestination ? (
        <>
          {/* Each group is one flight leg with its OWN From/To pair — legs no longer share
              a point, so editing one leg's airport never changes the leg next to it.
              Stored flat in form.destinations: leg i's From is cell 2*i, its To is
              cell 2*i + 1. Rendered as direct siblings (not a stacked column) so every
              leg sits in the same row as the Add-flight button and the Airline/Flight
              number fields, wrapping only if the row runs out of width. */}
          {legsFromPairs(form.destinations).map((_, i) => (
            <div key={i} className="flex items-end gap-1">
              <span className="text-[10px] font-semibold text-stone-400 mb-1.5 shrink-0">
                Flight {i + 1}
              </span>
              <div>
                <label className="text-[10px] text-stone-400 block mb-1">From</label>
                <input
                  className="w-16 border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 uppercase"
                  value={form.destinations[i * 2]}
                  onChange={(e) => handleDestinationChange(i * 2, e.target.value)}
                  placeholder="CAI"
                  list="city-suggestions"
                />
              </div>
              <div>
                <label className="text-[10px] text-stone-400 block mb-1">To</label>
                <input
                  className="w-16 border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 uppercase"
                  value={form.destinations[i * 2 + 1]}
                  onChange={(e) => handleDestinationChange(i * 2 + 1, e.target.value)}
                  placeholder="DXB"
                  list="city-suggestions"
                />
              </div>
              {form.destinations.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeDestinationStop(i)}
                  className="shrink-0 text-stone-400 hover:text-red-600 mb-1.5"
                  title="Remove this flight"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addDestinationStop}
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 mb-1.5 shrink-0"
          >
            <Plus size={14} /> Add flight
          </button>
        </>
      ) : (
        <>
          <div>
            <label className="text-xs text-stone-500 block mb-1">From</label>
            <input
              className="w-16 border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 uppercase"
              value={form.from}
              onChange={(e) => handleCityChange("from", e.target.value)}
              placeholder="CAI"
              list="city-suggestions"
            />
          </div>
          <div>
            <label className="text-xs text-stone-500 block mb-1">To</label>
            <input
              className="w-16 border border-stone-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 uppercase"
              value={form.to}
              onChange={(e) => handleCityChange("to", e.target.value)}
              placeholder="DXB"
              list="city-suggestions"
            />
          </div>
          {form.tripType === "roundTrip" && (
            <div>
              <label className="text-xs text-stone-500 block mb-1">Return airport</label>
              <div
                className="w-16 border border-stone-200 bg-stone-50 rounded-lg px-2 py-1.5 text-xs text-stone-600 uppercase truncate"
                title="Automatically matches the first (From) airport"
              >
                {form.from || "-"}
              </div>
            </div>
          )}
        </>
    )}
  </>
);

export default FlightsFormRoute;
