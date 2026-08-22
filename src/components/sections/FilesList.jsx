import React from "react";
import { Plus, Trash2 } from "lucide-react";

const FilesList = ({
  filteredFiles,
  visibleFiles,
  startNewFileDraft,
  setOpenFileId,
  setEditingFileServices,
  fileTotals,
  fmt,
  isYearLocked,
  filesPerm,
  requestConfirm,
  deleteFile,
  setConfirmDialog,
  formatDisplayDate,
}) => (
  <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden mb-6">
    <button
      onClick={startNewFileDraft}
      className="w-full flex items-center gap-2 px-4 py-3 text-teal-800 hover:bg-teal-50/50 text-sm font-semibold text-left"
    >
      <Plus size={16} /> Create new file
    </button>

    {filteredFiles.length === 0 ? (
      <p className="text-sm text-stone-400 text-center py-10">
        {visibleFiles.length === 0
          ? "No files yet — create one and pull in copies from Flights, Hotels, or Visa."
          : "No files match the current search/filters."}
      </p>
    ) : (
      filteredFiles.map((f) => {
        const t = fileTotals(f);
        return (
          <div
            key={f.id}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 ${isYearLocked("files", f.createdAt) ? "bg-stone-200/70 grayscale hover:bg-stone-200" : "hover:bg-teal-50/50"}`}
          >
            <button
              onClick={() => { setOpenFileId(f.id); setEditingFileServices(false); }}
              className="flex-1 min-w-0 flex items-center justify-between gap-3 text-left"
            >
              <div className="min-w-0">
                <p className="font-semibold text-stone-900 text-sm truncate">
                  {f.serial} {f.company ? `· ${f.company}` : ""}
                </p>
                <p className="text-xs text-stone-400">
                  {formatDisplayDate(f.createdAt)} · {f.createdBy} · {(f.items || []).length} item{(f.items || []).length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold">{fmt(t.sold)}</p>
                <p className="text-xs text-emerald-700 font-semibold">+{fmt(t.profit)}</p>
              </div>
            </button>
            {filesPerm.canDelete && (
            <button
              title="Delete file"
              onClick={() =>
                requestConfirm(`Delete file ${f.serial}? This cannot be undone.`, async () => {
                  await deleteFile(f.id);
                  setConfirmDialog(null);
                })
              }
              className="text-red-500 hover:text-red-700 p-1.5 shrink-0"
            >
              <Trash2 size={15} />
            </button>
            )}
          </div>
        );
      })
    )}
  </div>
);

export default FilesList;
