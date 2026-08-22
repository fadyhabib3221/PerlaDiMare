import React, { useEffect, useRef, useState } from "react";
import { Filter } from "lucide-react";

export const ThFilter = ({ label, align = "left", options, selected, onChange, className = "", padding = "px-1 py-0.5" }) => {
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
    if (selected.includes(value)) onChange(selected.filter((v) => v !== value));
    else onChange([...selected, value]);
  };

  const active = selected.length > 0;

  return (
    <th className={`text-${align} ${padding} font-semibold whitespace-nowrap relative ${className}`}>
      <div className={`flex items-center gap-1 ${align === "right" ? "justify-end" : ""}`} ref={rootRef}>
        {align === "right" && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`shrink-0 rounded p-0.5 hover:bg-teal-100 ${active ? "text-teal-700" : "text-stone-400"}`}
            title={`Filter ${label}`}
          >
            <Filter size={11} className={active ? "fill-current" : ""} />
          </button>
        )}
        <span>{label}</span>
        {align !== "right" && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`shrink-0 rounded p-0.5 hover:bg-teal-100 ${active ? "text-teal-700" : "text-stone-400"}`}
            title={`Filter ${label}`}
          >
            <Filter size={11} className={active ? "fill-current" : ""} />
          </button>
        )}
        {open && (
          <div
            className={`absolute z-30 top-full mt-1 ${align === "right" ? "right-0" : "left-0"} w-48 max-h-64 overflow-auto bg-white border border-stone-200 rounded-lg shadow-lg py-1 normal-case font-normal text-stone-700`}
          >
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
                Clear
              </button>
            )}
          </div>
        )}
      </div>
    </th>
  );
};

export default ThFilter;
