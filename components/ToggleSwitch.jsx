import React from "react";

export default function ToggleSwitch({ checked, onChange, disabled, label, description }) {
  return (
    <label className={`flex items-start justify-between gap-3 py-1.5 ${disabled ? "opacity-50" : ""}`}>
      <span>
        <span className="text-sm text-stone-700 font-medium block">{label}</span>
        {description && <span className="text-[11px] text-stone-400 block">{description}</span>}
      </span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`shrink-0 mt-0.5 relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          checked ? "bg-teal-700" : "bg-stone-300"
        } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform"
          style={{ transform: checked ? "translateX(18px)" : "translateX(2px)" }}
        />
      </button>
    </label>
  );
}
