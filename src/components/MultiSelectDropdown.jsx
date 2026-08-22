import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export const MultiSelectDropdown = ({ label, icon: Icon, options, selected, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const normalized = options.map((opt) =>
    typeof opt === "object" && opt !== null ? opt : { value: opt, label: opt }
  );

  const toggleValue = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const selectedLabels = normalized
    .filter((opt) => selected.includes(opt.value))
    .map((opt) => opt.label);

  const displayText =
    selectedLabels.length === 0
      ? placeholder
      : selectedLabels.length === 1
      ? selectedLabels[0]
      : `${selectedLabels.length} selected`;

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-auto max-w-[160px] flex items-center gap-1 border rounded-lg pl-7 pr-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white appearance-none relative ${
          selected.length > 0 ? "border-teal-700 text-teal-800" : "border-stone-300 text-stone-700"
        }`}
      >
        {Icon && (
          <Icon size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
        )}
        <span className="truncate">{displayText}</span>
        <ChevronDown size={12} className={`ml-auto shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-48 max-h-64 overflow-auto bg-white border border-stone-200 rounded-lg shadow-lg py-1">
          {normalized.length === 0 && (
            <div className="px-3 py-2 text-xs text-stone-400">No options</div>
          )}
          {normalized.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-stone-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => toggleValue(opt.value)}
                className="accent-teal-700"
              />
              <span className="truncate">{opt.label}</span>
            </label>
          ))}
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="w-full text-left px-3 py-1.5 text-xs text-teal-700 hover:bg-stone-50 border-t border-stone-100 mt-1"
            >
              Clear {label}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
