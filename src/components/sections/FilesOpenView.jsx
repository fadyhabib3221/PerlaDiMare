import React from "react";
import { ArrowLeft, Pencil, Plus, Printer, Trash2 } from "lucide-react";

const FilesOpenView = ({
  openFile,
  setOpenFileId,
  editingFileServices,
  setEditingFileServices,
  handlePrintFile,
  filesPerm,
  deleteFile,
  updateFileField,
  todayDateStr,
  updateFileDate,
  suggestions,
  companyName,
  setShowFilePicker,
  fileTotals,
  fmt,
  resolveFileItem,
  FILE_SOURCE_LABELS,
  formatDisplayDate,
  viewFileItemDetails,
  removeItemFromFile,
}) => (
  <div>
    <button
      onClick={() => { setOpenFileId(null); setEditingFileServices(false); }}
      className="mb-4 text-stone-500 hover:text-teal-800 text-sm font-semibold flex items-center gap-1.5"
    >
      <ArrowLeft size={15} /> Back to files
    </button>

    <div className="bg-white rounded-2xl border border-stone-200 p-4 md:p-5 mb-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="font-semibold text-stone-900">{openFile.serial}</h2>
          <p className="text-xs text-stone-400">{formatDisplayDate(openFile.createdAt)} · Created by {openFile.createdBy}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePrintFile(openFile)}
            className="text-stone-400 hover:text-teal-800 p-1.5"
            title="Print"
          >
            <Printer size={18} />
          </button>
          {filesPerm.canEdit && (
          <button
            onClick={() => setEditingFileServices((v) => !v)}
            className={
              editingFileServices
                ? "bg-teal-800 text-white text-xs font-semibold rounded-xl px-3 py-1.5 flex items-center gap-1.5"
                : "text-teal-800 border border-teal-800 hover:bg-teal-50 text-xs font-semibold rounded-xl px-3 py-1.5 flex items-center gap-1.5"
            }
          >
            <Pencil size={13} /> {editingFileServices ? "Done editing" : "Edit services"}
          </button>
          )}
          {filesPerm.canDelete && (
          <button
            onClick={() => deleteFile(openFile.id)}
            className="text-red-600 border border-red-200 hover:bg-red-50 text-xs font-semibold rounded-xl px-3 py-1.5 flex items-center gap-1.5"
          >
            <Trash2 size={13} /> Delete file
          </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs text-stone-500 block mb-1">Serial</label>
          <input
            type="text"
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            value={openFile.serial || ""}
            onChange={(e) => updateFileField(openFile.id, "serial", e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">File date</label>
          <input
            type="date"
            max={todayDateStr()}
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            value={openFile.createdAt || ""}
            onChange={(e) =>
              e.target.value &&
              updateFileDate(openFile.id, e.target.value > todayDateStr() ? todayDateStr() : e.target.value)
            }
          />
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">Company</label>
          <input
            type="text"
            list="file-company-list"
            className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            value={openFile.company || ""}
            onChange={(e) => updateFileField(openFile.id, "company", e.target.value)}
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
            value={openFile.notes || ""}
            onChange={(e) => updateFileField(openFile.id, "notes", e.target.value)}
          />
        </div>
      </div>

      {editingFileServices && (
        <button
          onClick={() => setShowFilePicker(true)}
          className="mb-4 text-teal-800 border border-teal-800 hover:bg-teal-50 text-xs font-semibold rounded-xl px-3 py-2 flex items-center gap-1.5"
        >
          <Plus size={14} /> Add service
        </button>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-stone-50 rounded-xl p-3 text-center">
          <p className="text-[11px] text-stone-500">Net</p>
          <p className="font-bold text-sm">{fmt(fileTotals(openFile).net)}</p>
        </div>
        <div className="bg-stone-50 rounded-xl p-3 text-center">
          <p className="text-[11px] text-stone-500">Sold</p>
          <p className="font-bold text-sm">{fmt(fileTotals(openFile).sold)}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-3 text-center">
          <p className="text-[11px] text-emerald-700">Profit</p>
          <p className="font-bold text-sm text-emerald-700">{fmt(fileTotals(openFile).profit)}</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden">
      {(openFile.items || []).length === 0 ? (
        <p className="text-sm text-stone-400 text-center py-10">No items added to this file yet.</p>
      ) : (
        (openFile.items || []).map((it) => {
          const r = resolveFileItem(it);
          return (
            <div key={it.id} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-stone-50 transition-colors">
              <button
                type="button"
                onClick={() => viewFileItemDetails(it, { fileId: openFile.id, itemId: it.id })}
                className="min-w-0 text-left flex-1"
              >
                <p className="text-xs text-teal-800 font-semibold">{FILE_SOURCE_LABELS[it.sourceType] || it.sourceType}</p>
                <p className="text-sm text-stone-900 truncate">{r.label}</p>
                <p className="text-xs text-stone-400">{r.date ? formatDisplayDate(r.date) : "-"}</p>
              </button>
              <div className="flex items-center gap-3 shrink-0">
                <button type="button" onClick={() => viewFileItemDetails(it, { fileId: openFile.id, itemId: it.id })} className="text-right">
                  <p className="text-sm font-bold">{fmt(r.soldPrice)} {r.soldCurrency}</p>
                  <p className="text-xs text-emerald-700">net {fmt(r.netPrice)} {r.netCurrency}</p>
                </button>
                {editingFileServices && filesPerm.canEdit && (
                  <button
                    title="Remove item from file"
                    onClick={() => removeItemFromFile(openFile.id, it.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
);

export default FilesOpenView;
