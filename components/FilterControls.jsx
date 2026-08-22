import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";

const normalizeOptions = (options) => options.map((option) =>
  typeof option === "object" && option !== null ? option : { value: option, label: option }
);

export function MultiSelectDropdown({ label, icon: Icon, options, selected, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const normalized = normalizeOptions(options);

  useEffect(() => {
    if (!open) return undefined;
    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const toggleValue = (value) => {
    onChange(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  };
  const selectedLabels = normalized.filter((option) => selected.includes(option.value)).map((option) => option.label);
  const displayText = selectedLabels.length === 0
    ? placeholder
    : selectedLabels.length === 1 ? selectedLabels[0] : `${selectedLabels.length} selected`;

  return (
    <div className="relative" ref={rootRef}>
      <button type="button" onClick={() => setOpen((value) => !value)} className={`w-auto max-w-[160px] flex items-center gap-1 border rounded-lg pl-7 pr-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white appearance-none relative ${selected.length > 0 ? "border-teal-700 text-teal-800" : "border-stone-300 text-stone-700"}`}>
        {Icon && <Icon size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />}
        <span className="truncate">{displayText}</span>
        <ChevronDown size={12} className={`ml-auto shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="absolute z-20 mt-1 w-48 max-h-64 overflow-auto bg-white border border-stone-200 rounded-lg shadow-lg py-1">
        {normalized.length === 0 && <div className="px-3 py-2 text-xs text-stone-400">No options</div>}
        {normalized.map((option) => <label key={option.value} className="flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-stone-50 cursor-pointer"><input type="checkbox" checked={selected.includes(option.value)} onChange={() => toggleValue(option.value)} className="accent-teal-700" /><span className="truncate">{option.label}</span></label>)}
        {selected.length > 0 && <button type="button" onClick={() => onChange([])} className="w-full text-left px-3 py-1.5 text-xs text-teal-700 hover:bg-stone-50 border-t border-stone-100 mt-1">Clear {label}</button>}
      </div>}
    </div>
  );
}

export function ThFilter({ label, align = "left", options, selected, onChange, className = "", padding = "px-1 py-0.5" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const normalized = normalizeOptions(options);

  useEffect(() => {
    if (!open) return undefined;
    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const toggleValue = (value) => onChange(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  const active = selected.length > 0;

  return <th className={`text-${align} ${padding} font-semibold whitespace-nowrap relative ${className}`}>
    <div className={`flex items-center gap-1 ${align === "right" ? "justify-end" : ""}`} ref={rootRef}>
      {align === "right" && <FilterButton label={label} active={active} open={open} onClick={() => setOpen((value) => !value)} />}
      <span>{label}</span>
      {align !== "right" && <FilterButton label={label} active={active} open={open} onClick={() => setOpen((value) => !value)} />}
      {open && <div className={`absolute z-30 top-full mt-1 ${align === "right" ? "right-0" : "left-0"} w-48 max-h-64 overflow-auto bg-white border border-stone-200 rounded-lg shadow-lg py-1 normal-case font-normal text-stone-700`}>
        {normalized.length === 0 && <div className="px-3 py-2 text-xs text-stone-400">No options</div>}
        {normalized.map((option) => <label key={option.value} className="flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-stone-50 cursor-pointer"><input type="checkbox" checked={selected.includes(option.value)} onChange={() => toggleValue(option.value)} className="accent-teal-700" /><span className="truncate">{option.label}</span></label>)}
        {selected.length > 0 && <button type="button" onClick={() => onChange([])} className="w-full text-left px-3 py-1.5 text-xs text-teal-700 hover:bg-stone-50 border-t border-stone-100 mt-1">Clear</button>}
      </div>}
    </div>
  </th>;
}

function FilterButton({ label, active, onClick }) {
  return <button type="button" onClick={onClick} className={`shrink-0 rounded p-0.5 hover:bg-teal-100 ${active ? "text-teal-700" : "text-stone-400"}`} title={`Filter ${label}`}><Filter size={11} className={active ? "fill-current" : ""} /></button>;
}

export function AppliedFilters({ groups, onClearAll }) {
  const chips = groups.flatMap((group) => group.values.map((value) => ({ ...value, groupLabel: group.label })));
  if (chips.length === 0) return null;
  return <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-stone-100 text-xs">
    <span className="text-stone-400 font-medium">Applied:</span>
    {chips.map((chip) => <span key={chip.key} className="inline-flex items-center gap-1 text-stone-600">{chip.groupLabel}: <span className="font-semibold text-stone-800">{chip.text}</span><button onClick={chip.onRemove} className="text-stone-400 hover:text-red-600" aria-label={`Remove ${chip.groupLabel} filter: ${chip.text}`}><X size={12} /></button></span>)}
    <button onClick={onClearAll} className="text-red-600 hover:text-red-700 font-semibold ml-auto">Clear all</button>
  </div>;
}

export const multiFilterGroup = (label, keyPrefix, selected, setSelected, textFor = (value) => value) => ({
  label,
  values: selected.map((value) => ({ key: `${keyPrefix}-${value}`, text: textFor(value), onRemove: () => setSelected(selected.filter((item) => item !== value)) })),
});
