import React from "react";
import { Plus, Search, X } from "lucide-react";

const FileLinkPicker = ({
  copyPickerSource,
  setCopyPickerSource,
  copyPickerSearch,
  setCopyPickerSearch,
  FILE_SOURCE_LABELS,
  createFileAndCopySource,
  visibleFiles,
  copySourceToFile,
}) => (
  <div
    className="fixed inset-0 bg-stone-900/40 flex items-center justify-center p-4 z-50"
    onClick={() => { setCopyPickerSource(null); setCopyPickerSearch(""); }}
  >
    <div
      className="bg-white rounded-2xl border border-stone-200 p-5 w-full max-w-sm max-h-[80vh] flex flex-col"
      onClick={(ev) => ev.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-stone-900">Link to which file?</h3>
        <button title="Close" onClick={() => { setCopyPickerSource(null); setCopyPickerSearch(""); }} className="text-stone-400 hover:text-stone-700 p-1">
          <X size={16} />
        </button>
      </div>
      <p className="text-xs text-stone-400 mb-3">
        Links this {FILE_SOURCE_LABELS[copyPickerSource.type] || copyPickerSource.type} record into the file — its price stays live, and the original record is never touched.
      </p>

      <button
        onClick={createFileAndCopySource}
        className="mb-3 bg-gradient-to-b from-teal-700 to-teal-900 hover:from-teal-600 hover:to-teal-800 text-white text-sm font-semibold rounded-xl px-4 py-2 shadow-sm shadow-teal-800/30 flex items-center justify-center gap-2"
      >
        <Plus size={15} /> New file (auto serial number)
      </button>

      <p className="text-xs text-stone-500 mb-1.5">Or an existing file</p>
      <div className="relative mb-2">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={copyPickerSearch}
          onChange={(e) => setCopyPickerSearch(e.target.value)}
          placeholder="Search by file number..."
          className="w-full border border-stone-200 rounded-xl pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600"
        />
      </div>
      <div className="border border-stone-200 rounded-xl divide-y divide-stone-100 overflow-y-auto">
        {(() => {
          const q = copyPickerSearch.trim().toLowerCase();
          const filteredFiles = q
            ? visibleFiles.filter(
                (f) =>
                  (f.serial || "").toLowerCase().includes(q) ||
                  (f.company || "").toLowerCase().includes(q)
              )
            : visibleFiles;
          if (visibleFiles.length === 0) {
            return <p className="text-xs text-stone-400 text-center py-4">No existing files yet.</p>;
          }
          if (filteredFiles.length === 0) {
            return <p className="text-xs text-stone-400 text-center py-4">No files match "{copyPickerSearch}"</p>;
          }
          return filteredFiles.map((f) => (
            <button
              key={f.id}
              onClick={() => copySourceToFile(f.id)}
              className="w-full text-left px-3 py-2 hover:bg-teal-50 text-sm flex items-center justify-between gap-2"
            >
              <span className="truncate">
                {f.serial} {f.company ? `· ${f.company}` : ""}
              </span>
              <span className="text-xs text-stone-400 shrink-0">{(f.items || []).length} item{(f.items || []).length === 1 ? "" : "s"}</span>
            </button>
          ));
        })()}
      </div>
    </div>
  </div>
);

export default FileLinkPicker;
