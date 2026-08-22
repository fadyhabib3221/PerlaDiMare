import React from "react";
import { X } from "lucide-react";

export const AppliedFilters = ({ groups, onClearAll }) => {
  const chips = groups.flatMap((g) => g.values.map((v) => ({ ...v, groupLabel: g.label })));
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-stone-100 text-xs">
      <span className="text-stone-400 font-medium">Applied:</span>
      {chips.map((chip) => (
        <span key={chip.key} className="inline-flex items-center gap-1 text-stone-600">
          {chip.groupLabel}: <span className="font-semibold text-stone-800">{chip.text}</span>
          <button onClick={chip.onRemove} className="text-stone-400 hover:text-red-600" aria-label={`Remove ${chip.groupLabel} filter: ${chip.text}`}>
            <X size={12} />
          </button>
        </span>
      ))}
      <button onClick={onClearAll} className="text-red-600 hover:text-red-700 font-semibold ml-auto">
        Clear all
      </button>
    </div>
  );
};

export const multiFilterGroup = (label, keyPrefix, selected, setSelected, textFor = (v) => v) => ({
  label,
  values: selected.map((v) => ({
    key: `${keyPrefix}-${v}`,
    text: textFor(v),
    onRemove: () => setSelected(selected.filter((x) => x !== v)),
  })),
});

export default AppliedFilters;
