import React from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

const FilesDraftEditor = ({
  draftFile,
  cancelDraftFile,
  updateDraftField,
  updateDraftDate,
  todayDateStr,
  suggestions,
  companyName,
  setShowFilePicker,
  confirmDraftFile,
  fmt,
  fileTotals,
  resolveFileItem,
  FILE_SOURCE_LABELS,
  viewFileItemDetails,
  removeDraftItem,
  formatDisplayDate,
}) => (
  <div>
    <button
      onClick={cancelDraftFile}
      className="mb-4 text-stone-500 hover:text-teal-800 text-sm font-semibold flex items-center gap-1.5"
    >
      <ArrowLeft size={15} /> Cancel
    </button>

    <div className="bg-white rounded-2xl border border-stone-200 p-4 md:p-5 mb-6">
      <p className="text-xs text-stone-400 mb-4">New file — not saved yet</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs text-stone-500 block mb-1">Serial</label>
          <input
            type="text"
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            value={draftFile.serial || ""}
            onChange={(e) => updateDraftField("serial", e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">File date</label>
          <input
            type="date"
            max={todayDateStr()}
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            value={draftFile.createdAt || ""}
            onChange={(e) =>
              e.target.value && updateDraftDate(e.target.value > todayDateStr() ? todayDateStr() : e.target.value)
            }
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Company</label>
          <input
            type="text"
            list="file-company-list"
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            value={draftFile.company || ""}
            onChange={(e) => updateDraftField("company", e.target.value)}
          />
          <datalist id="file-company-list">
            {suggestions.companies.map((c, i) => (
              <option key={i} value={companyName(c)} />
            ))}
          </datalist>
        </div>
        <div className="md:col-span-2">
          <label className="text-xs text-stone-500 block mb-1">Notes</label>
          <input
            type="text"
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            value={draftFile.notes || ""}
            onChange={(e) => updateDraftField("notes", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setShowFilePicker(true)}
          className="text-teal-800 border border-teal-800 hover:bg-teal-50 text-xs font-semibold rounded-xl px-3 py-2 flex items-center gap-1.5"
        >
          <Plus size={14} /> Add services
        </button>
        <button
          onClick={confirmDraftFile}
          className="bg-gradient-to-b from-teal-700 to-teal-900 hover:from-teal-600 hover:to-teal-800 text-white text-xs font-semibold rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-sm shadow-teal-800/30"
        >
          <Plus size={14} /> Add file
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-stone-50 rounded-xl p-3 text-center">
          <p className="text-[11px] text-stone-500">Net</p>
          <p className="font-bold text-sm">{fmt(fileTotals(draftFile).net)}</p>
        </div>
        <div className="bg-stone-50 rounded-xl p-3 text-center">
          <p className="text-[11px] text-stone-500">Sold</p>
          <p className="font-bold text-sm">{fmt(fileTotals(draftFile).sold)}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-3 text-center">
          <p className="text-[11px] text-emerald-700">Profit</p>
          <p className="font-bold text-sm text-emerald-700">{fmt(fileTotals(draftFile).profit)}</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden">
      {(draftFile.items || []).length === 0 ? (
        <p className="text-sm text-stone-400 text-center py-10">No services added yet — use "Add services" above.</p>
      ) : (
        (draftFile.items || []).map((it) => {
          const r = resolveFileItem(it);
          return (
            <div key={it.id} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-stone-50 transition-colors">
              <button
                type="button"
                onClick={() => viewFileItemDetails(it, { draft: true, itemId: it.id })}
                className="min-w-0 text-left flex-1"
              >
                <p className="text-xs text-teal-800 font-semibold">{FILE_SOURCE_LABELS[it.sourceType] || it.sourceType}</p>
                <p className="text-sm text-stone-900 truncate">{r.label}</p>
                <p className="text-xs text-stone-400">{r.date ? formatDisplayDate(r.date) : "-"}</p>
              </button>
              <div className="flex items-center gap-3 shrink-0">
                <button type="button" onClick={() => viewFileItemDetails(it, { draft: true, itemId: it.id })} className="text-right">
                  <p className="text-sm font-bold">{fmt(r.soldPrice)} {r.soldCurrency}</p>
                  <p className="text-xs text-emerald-700">net {fmt(r.netPrice)} {r.netCurrency}</p>
                </button>
                <button
                  title="Remove item"
                  onClick={() => removeDraftItem(it.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
);

export default FilesDraftEditor;
