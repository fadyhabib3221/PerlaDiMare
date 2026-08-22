import React from "react";

const TIME_HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const TIME_MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

export default function TimeSelect({ value, onChange }) {
  const [hour = "", minute = ""] = (value || "").split(":");
  const update = (nextHour, nextMinute) => {
    if (!nextHour && !nextMinute) {
      onChange("");
      return;
    }
    onChange(`${nextHour || "00"}:${nextMinute || "00"}`);
  };

  return (
    <div className="w-full flex items-center border border-stone-300 rounded-xl px-3 py-2 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-700 bg-white">
      <select
        aria-label="Hour"
        className="flex-1 bg-transparent focus:outline-none appearance-none text-center"
        value={hour}
        onChange={(event) => update(event.target.value, minute)}
      >
        <option value="">--</option>
        {TIME_HOURS.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      <span className="text-stone-400 px-0.5">:</span>
      <select
        aria-label="Minute"
        className="flex-1 bg-transparent focus:outline-none appearance-none text-center"
        value={minute}
        onChange={(event) => update(hour, event.target.value)}
      >
        <option value="">--</option>
        {TIME_MINUTES.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}
