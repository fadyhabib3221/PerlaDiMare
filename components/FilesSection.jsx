import React from "react";
import {
  Search, Trash2, TrendingUp, Wallet, Calendar, Building2, User, Plus,
  ArrowLeft, Printer, Pencil, X, Plane, Car, FileText, SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

const FilesSection = ({
  fileError, openFile, draftFile, visibleFiles, filesGrandTotals, fmt, fileQuery,
  setFileQuery, fileFiltersOpen, setFileFiltersOpen, activeFileFilterCount,
  fileYearsAvailable, fileSelectedYear, setFileSelectedYear, fileCompaniesAvailable,
  fileSelectedCompany, setFileSelectedCompany, fileEmployeesAvailable,
  fileSelectedEmployee, setFileSelectedEmployee, MultiSelectDropdown, AppliedFilters,
  multiFilterGroup, clearAllFileFilters, startNewFileDraft, filteredFiles, fileTotals,
  isYearLocked, setOpenFileId, setEditingFileServices, filesPerm, requestConfirm,
  formatDisplayDate,
  deleteFile, setConfirmDialog, cancelDraftFile, todayDateStr, updateDraftField,
  updateDraftDate, showFilePicker, setShowFilePicker, confirmDraftFile, resolveFileItem,
  FILE_SOURCE_LABELS, viewFileItemDetails, removeDraftItem, handlePrintFile,
  updateFileDate, updateFileField, editingFileServices, suggestions, companyName,
  removeItemFromFile, filePickerTab, setFilePickerTab, PassportIcon, visibleTickets,
  addDraftItem, addItemToFile, routeLabel, getCustomers, visibleHotelBookings,
  hotelSoldTotal, visibleVisaBookingsForFiles, visaSoldTotal, visibleCarBookings,
}) => (
  <>
    {fileError && (
      <div className="bg-red-50 text-red-700 text-sm rounded-xl px-3 py-2 mb-4">{fileError}</div>
    )}

    {!openFile && !draftFile && (
      <>
        {/* Summary cards, same style as the Flights section */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="bg-stone-100 rounded-xl p-1.5 sm:p-2 text-stone-600 shrink-0"><FileText size={18} className="sm:hidden" /><FileText size={20} className="hidden sm:block" /></div>
            <div className="min-w-0">
              <p className="text-xs text-stone-500">Files</p>
              <p className="text-sm sm:text-lg font-bold truncate">{visibleFiles.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="bg-teal-50 rounded-xl p-1.5 sm:p-2 text-teal-900 shrink-0"><Wallet size={18} className="sm:hidden" /><Wallet size={20} className="hidden sm:block" /></div>
            <div className="min-w-0">
              <p className="text-xs text-stone-500">Total sales (EGP)</p>
              <p className="text-sm sm:text-lg font-bold truncate">{fmt(filesGrandTotals.sold)}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="bg-emerald-50 rounded-xl p-1.5 sm:p-2 text-emerald-700 shrink-0"><TrendingUp size={18} className="sm:hidden" /><TrendingUp size={20} className="hidden sm:block" /></div>
            <div className="min-w-0">
              <p className="text-xs text-stone-500">Total profit (EGP)</p>
              <p className="text-sm sm:text-lg font-bold text-emerald-700 truncate">{fmt(filesGrandTotals.profit)}</p>
            </div>
          </div>
        </div>

        {/* Search and filters — same unified card style as the other sections. */}
        <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 mb-4">
          <div className="flex items-stretch gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                placeholder="Search by serial, company, notes, or employee"
                value={fileQuery}
                onChange={(e) => setFileQuery(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => setFileFiltersOpen(!fileFiltersOpen)}
              className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                fileFiltersOpen ? "border-teal-700 text-teal-800 bg-teal-50" : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white"
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filters</span>
              {activeFileFilterCount > 0 && (
                <span className="bg-teal-700 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                  {activeFileFilterCount}
                </span>
              )}
              <ChevronDown size={14} className={`transition-transform ${fileFiltersOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {fileFiltersOpen && (
            <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-stone-100">
              <div>
                <label className="text-xs text-stone-500 block mb-1">Year</label>
                <MultiSelectDropdown label="years" icon={Calendar} options={fileYearsAvailable} selected={fileSelectedYear} onChange={setFileSelectedYear} placeholder="All years" />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">Company</label>
                <MultiSelectDropdown label="companies" icon={Building2} options={fileCompaniesAvailable} selected={fileSelectedCompany} onChange={setFileSelectedCompany} placeholder="All companies" />
              </div>
              <div>
                <label className="text-xs text-stone-500 block mb-1">By</label>
                <MultiSelectDropdown label="employees" icon={User} options={fileEmployeesAvailable} selected={fileSelectedEmployee} onChange={setFileSelectedEmployee} placeholder="All employees" />
              </div>
            </div>
          )}

          <AppliedFilters
            groups={[
              multiFilterGroup("Year", "year", fileSelectedYear, setFileSelectedYear),
              multiFilterGroup("Company", "company", fileSelectedCompany, setFileSelectedCompany),
              multiFilterGroup("By", "employee", fileSelectedEmployee, setFileSelectedEmployee),
              { label: "Search", values: fileQuery.trim() ? [{ key: "search", text: `"${fileQuery.trim()}"`, onRemove: () => setFileQuery("") }] : [] },
            ]}
            onClearAll={clearAllFileFilters}
          />
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden mb-6">
          <button onClick={startNewFileDraft} className="w-full flex items-center gap-2 px-4 py-3 text-teal-800 hover:bg-teal-50/50 text-sm font-semibold text-left">
            <Plus size={16} /> Create new file
          </button>
          {filteredFiles.length === 0 ? (
            <p className="text-sm text-stone-400 text-center py-10">
              {visibleFiles.length === 0 ? "No files yet — create one and pull in copies from Flights, Hotels, or Visa." : "No files match the current search/filters."}
            </p>
          ) : (
            filteredFiles.map((f) => {
              const t = fileTotals(f);
              return (
                <div key={f.id} className={`w-full flex items-center justify-between gap-3 px-4 py-3 ${isYearLocked("files", f.createdAt) ? "bg-stone-200/70 grayscale hover:bg-stone-200" : "hover:bg-teal-50/50"}`}>
                  <button onClick={() => { setOpenFileId(f.id); setEditingFileServices(false); }} className="flex-1 min-w-0 flex items-center justify-between gap-3 text-left">
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-900 text-sm truncate">{f.serial} {f.company ? `· ${f.company}` : ""}</p>
                      <p className="text-xs text-stone-400">{formatDisplayDate(f.createdAt)} · {f.createdBy} · {(f.items || []).length} item{(f.items || []).length === 1 ? "" : "s"}</p>
                    </div>
                    <div className="text-right shrink-0"><p className="text-sm font-bold">{fmt(t.sold)}</p><p className="text-xs text-emerald-700 font-semibold">+{fmt(t.profit)}</p></div>
                  </button>
                  {filesPerm.canDelete && (
                    <button title="Delete file" onClick={() => requestConfirm(`Delete file ${f.serial}? This cannot be undone.`, async () => { await deleteFile(f.id); setConfirmDialog(null); })} className="text-red-500 hover:text-red-700 p-1.5 shrink-0"><Trash2 size={15} /></button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </>
    )}

    {draftFile && (
      <div>
        <button onClick={cancelDraftFile} className="mb-4 text-stone-500 hover:text-teal-800 text-sm font-semibold flex items-center gap-1.5"><ArrowLeft size={15} /> Cancel</button>
        <div className="bg-white rounded-2xl border border-stone-200 p-4 md:p-5 mb-6">
          <p className="text-xs text-stone-400 mb-4">New file — not saved yet</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div><label className="text-xs text-stone-500 block mb-1">Serial</label><input type="text" className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={draftFile.serial || ""} onChange={(e) => updateDraftField("serial", e.target.value)} /></div>
            <div><label className="text-xs text-stone-500 block mb-1">File date</label><input type="date" max={todayDateStr()} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={draftFile.createdAt || ""} onChange={(e) => e.target.value && updateDraftDate(e.target.value > todayDateStr() ? todayDateStr() : e.target.value)} /></div>
            <div><label className="text-xs text-stone-500 block mb-1">Company</label><input type="text" list="file-company-list" className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={draftFile.company || ""} onChange={(e) => updateDraftField("company", e.target.value)} /><datalist id="file-company-list">{suggestions.companies.map((c, i) => <option key={i} value={companyName(c)} />)}</datalist></div>
            <div className="md:col-span-2"><label className="text-xs text-stone-500 block mb-1">Notes</label><input type="text" className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={draftFile.notes || ""} onChange={(e) => updateDraftField("notes", e.target.value)} /></div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4"><button onClick={() => setShowFilePicker(true)} className="text-teal-800 border border-teal-800 hover:bg-teal-50 text-xs font-semibold rounded-xl px-3 py-2 flex items-center gap-1.5"><Plus size={14} /> Add services</button><button onClick={confirmDraftFile} className="bg-gradient-to-b from-teal-700 to-teal-900 hover:from-teal-600 hover:to-teal-800 text-white text-xs font-semibold rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-sm shadow-teal-800/30"><Plus size={14} /> Add file</button></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4"><div className="bg-stone-50 rounded-xl p-3 text-center"><p className="text-[11px] text-stone-500">Net</p><p className="font-bold text-sm">{fmt(fileTotals(draftFile).net)}</p></div><div className="bg-stone-50 rounded-xl p-3 text-center"><p className="text-[11px] text-stone-500">Sold</p><p className="font-bold text-sm">{fmt(fileTotals(draftFile).sold)}</p></div><div className="bg-emerald-50 rounded-xl p-3 text-center"><p className="text-[11px] text-emerald-700">Profit</p><p className="font-bold text-sm text-emerald-700">{fmt(fileTotals(draftFile).profit)}</p></div></div>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden">{(draftFile.items || []).length === 0 ? <p className="text-sm text-stone-400 text-center py-10">No services added yet — use "Add services" above.</p> : (draftFile.items || []).map((it) => { const r = resolveFileItem(it); return (<div key={it.id} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-stone-50 transition-colors"><button type="button" onClick={() => viewFileItemDetails(it, { draft: true, itemId: it.id })} className="min-w-0 text-left flex-1"><p className="text-xs text-teal-800 font-semibold">{FILE_SOURCE_LABELS[it.sourceType] || it.sourceType}</p><p className="text-sm text-stone-900 truncate">{r.label}</p><p className="text-xs text-stone-400">{r.date ? formatDisplayDate(r.date) : "-"}</p></button><div className="flex items-center gap-3 shrink-0"><button type="button" onClick={() => viewFileItemDetails(it, { draft: true, itemId: it.id })} className="text-right"><p className="text-sm font-bold">{fmt(r.soldPrice)} {r.soldCurrency}</p><p className="text-xs text-emerald-700">net {fmt(r.netPrice)} {r.netCurrency}</p></button><button title="Remove item" onClick={() => removeDraftItem(it.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={15} /></button></div></div>); })}</div>
      </div>
    )}

    {openFile && (
      <div>
        <button onClick={() => { setOpenFileId(null); setEditingFileServices(false); }} className="mb-4 text-stone-500 hover:text-teal-800 text-sm font-semibold flex items-center gap-1.5"><ArrowLeft size={15} /> Back to files</button>
        <div className="bg-white rounded-2xl border border-stone-200 p-4 md:p-5 mb-6">
          <div className="flex items-start justify-between gap-3 mb-4"><div><h2 className="font-semibold text-stone-900">{openFile.serial}</h2><p className="text-xs text-stone-400">{formatDisplayDate(openFile.createdAt)} · Created by {openFile.createdBy}</p></div><div className="flex items-center gap-2"><button onClick={() => handlePrintFile(openFile)} className="text-stone-400 hover:text-teal-800 p-1.5" title="Print"><Printer size={18} /></button>{filesPerm.canEdit && <button onClick={() => setEditingFileServices((v) => !v)} className={editingFileServices ? "bg-teal-800 text-white text-xs font-semibold rounded-xl px-3 py-1.5 flex items-center gap-1.5" : "text-teal-800 border border-teal-800 hover:bg-teal-50 text-xs font-semibold rounded-xl px-3 py-1.5 flex items-center gap-1.5"}><Pencil size={13} /> {editingFileServices ? "Done editing" : "Edit services"}</button>}{filesPerm.canDelete && <button onClick={() => deleteFile(openFile.id)} className="text-red-600 border border-red-200 hover:bg-red-50 text-xs font-semibold rounded-xl px-3 py-1.5 flex items-center gap-1.5"><Trash2 size={13} /> Delete file</button>}</div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4"><div><label className="text-xs text-stone-500 block mb-1">Serial</label><input type="text" className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={openFile.serial || ""} onChange={(e) => updateFileField(openFile.id, "serial", e.target.value)} /></div><div><label className="text-xs text-stone-500 block mb-1">File date</label><input type="date" max={todayDateStr()} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={openFile.createdAt || ""} onChange={(e) => e.target.value && updateFileDate(openFile.id, e.target.value > todayDateStr() ? todayDateStr() : e.target.value)} /></div><div><label className="text-xs text-stone-500 block mb-1">Company</label><input type="text" list="file-company-list" className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={openFile.company || ""} onChange={(e) => updateFileField(openFile.id, "company", e.target.value)} /><datalist id="file-company-list">{suggestions.companies.map((c, i) => <option key={i} value={companyName(c)} />)}</datalist></div><div className="md:col-span-2"><label className="text-xs text-stone-500 block mb-1">Notes</label><input type="text" className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={openFile.notes || ""} onChange={(e) => updateFileField(openFile.id, "notes", e.target.value)} /></div></div>
          {editingFileServices && <button onClick={() => setShowFilePicker(true)} className="mb-4 text-teal-800 border border-teal-800 hover:bg-teal-50 text-xs font-semibold rounded-xl px-3 py-2 flex items-center gap-1.5"><Plus size={14} /> Add service</button>}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4"><div className="bg-stone-50 rounded-xl p-3 text-center"><p className="text-[11px] text-stone-500">Net</p><p className="font-bold text-sm">{fmt(fileTotals(openFile).net)}</p></div><div className="bg-stone-50 rounded-xl p-3 text-center"><p className="text-[11px] text-stone-500">Sold</p><p className="font-bold text-sm">{fmt(fileTotals(openFile).sold)}</p></div><div className="bg-emerald-50 rounded-xl p-3 text-center"><p className="text-[11px] text-emerald-700">Profit</p><p className="font-bold text-sm text-emerald-700">{fmt(fileTotals(openFile).profit)}</p></div></div>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden">{(openFile.items || []).length === 0 ? <p className="text-sm text-stone-400 text-center py-10">No items added to this file yet.</p> : (openFile.items || []).map((it) => { const r = resolveFileItem(it); return (<div key={it.id} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-stone-50 transition-colors"><button type="button" onClick={() => viewFileItemDetails(it, { fileId: openFile.id, itemId: it.id })} className="min-w-0 text-left flex-1"><p className="text-xs text-teal-800 font-semibold">{FILE_SOURCE_LABELS[it.sourceType] || it.sourceType}</p><p className="text-sm text-stone-900 truncate">{r.label}</p><p className="text-xs text-stone-400">{r.date ? formatDisplayDate(r.date) : "-"}</p></button><div className="flex items-center gap-3 shrink-0"><button type="button" onClick={() => viewFileItemDetails(it, { fileId: openFile.id, itemId: it.id })} className="text-right"><p className="text-sm font-bold">{fmt(r.soldPrice)} {r.soldCurrency}</p><p className="text-xs text-emerald-700">net {fmt(r.netPrice)} {r.netCurrency}</p></button>{editingFileServices && filesPerm.canEdit && <button title="Remove item from file" onClick={() => removeItemFromFile(openFile.id, it.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={15} /></button>}</div></div>); })}</div>
      </div>
    )}

    {showFilePicker && (openFile || draftFile) && (
      <div className="fixed inset-0 bg-stone-900/40 flex items-center justify-center p-4 z-50" onClick={() => setShowFilePicker(false)}>
        <div className="bg-white rounded-2xl border border-stone-200 w-full max-w-lg max-h-[85vh] flex flex-col" onClick={(ev) => ev.stopPropagation()}>
          <div className="flex items-center justify-between p-4 border-b border-stone-100"><h3 className="font-semibold text-stone-900">{draftFile ? "Add services" : `Add a copy to ${openFile.serial}`}</h3><button title="Close" onClick={() => setShowFilePicker(false)} className="text-stone-400 hover:text-stone-700 p-1"><X size={16} /></button></div>
          <div className="flex gap-2 px-4 pt-3">{[{ key: "flights", label: "Flights", icon: Plane }, { key: "hotels", label: "Hotels", icon: Building2 }, { key: "visa", label: "Visa", icon: PassportIcon }, { key: "cars", label: "Transportation", icon: Car }].map((tab) => <button key={tab.key} onClick={() => setFilePickerTab(tab.key)} className={`flex items-center gap-1.5 text-xs font-semibold rounded-xl px-3 py-1.5 border ${filePickerTab === tab.key ? "bg-teal-800 text-white border-teal-800" : "bg-white text-stone-600 border-stone-300 hover:bg-stone-50"}`}><tab.icon size={14} className={tab.key === "flights" ? "rotate-45" : ""} /> {tab.label}</button>)}</div>
          <div className="overflow-y-auto p-4 space-y-2">
            {filePickerTab === "flights" && (visibleTickets.length === 0 ? <p className="text-sm text-stone-400 text-center py-6">No tickets to add yet.</p> : visibleTickets.map((t) => <button key={t.id} onClick={async () => { if (draftFile) addDraftItem("flights", t); else await addItemToFile(openFile.id, "flights", t); setShowFilePicker(false); }} className="w-full text-left border border-stone-200 rounded-xl px-3 py-2 hover:bg-teal-50 hover:border-teal-300 flex items-center justify-between gap-2"><span className="text-sm text-stone-800 truncate">{routeLabel(t)} · {getCustomers(t).map((c) => c.name).filter(Boolean).join(", ") || "-"}</span><span className="text-xs text-stone-400 shrink-0">{fmt(t.soldPrice)} {t.soldCurrency || "EGP"}</span></button>))}
            {filePickerTab === "hotels" && (visibleHotelBookings.length === 0 ? <p className="text-sm text-stone-400 text-center py-6">No hotel bookings to add yet.</p> : visibleHotelBookings.map((h) => <button key={h.id} onClick={async () => { if (draftFile) addDraftItem("hotels", h); else await addItemToFile(openFile.id, "hotels", h); setShowFilePicker(false); }} className="w-full text-left border border-stone-200 rounded-xl px-3 py-2 hover:bg-teal-50 hover:border-teal-300 flex items-center justify-between gap-2"><span className="text-sm text-stone-800 truncate">{h.hotel || "Hotel"}{h.customer ? ` · ${h.customer}` : ""}</span><span className="text-xs text-stone-400 shrink-0">{fmt(hotelSoldTotal(h))}</span></button>))}
            {filePickerTab === "visa" && (visibleVisaBookingsForFiles.length === 0 ? <p className="text-sm text-stone-400 text-center py-6">No visa bookings to add yet.</p> : visibleVisaBookingsForFiles.map((v) => <button key={v.id} onClick={async () => { if (draftFile) addDraftItem("visa", v); else await addItemToFile(openFile.id, "visa", v); setShowFilePicker(false); }} className="w-full text-left border border-stone-200 rounded-xl px-3 py-2 hover:bg-teal-50 hover:border-teal-300 flex items-center justify-between gap-2"><span className="text-sm text-stone-800 truncate">{v.visaType || "Visa"} · {(v.customers || []).map((c) => c.name).filter(Boolean).join(", ") || "-"}</span><span className="text-xs text-stone-400 shrink-0">{fmt(visaSoldTotal(v))} {v.soldCurrency}</span></button>))}
            {filePickerTab === "cars" && (visibleCarBookings.length === 0 ? <p className="text-sm text-stone-400 text-center py-6">No transfer bookings to add yet.</p> : visibleCarBookings.map((c) => <button key={c.id} onClick={async () => { if (draftFile) addDraftItem("cars", c); else await addItemToFile(openFile.id, "cars", c); setShowFilePicker(false); }} className="w-full text-left border border-stone-200 rounded-xl px-3 py-2 hover:bg-teal-50 hover:border-teal-300 flex items-center justify-between gap-2"><span className="text-sm text-stone-800 truncate">{c.routeFrom || "-"} → {c.routeTo || "-"}{c.customerName ? ` · ${c.customerName}` : ""}</span><span className="text-xs text-stone-400 shrink-0">{fmt(parseFloat(c.soldPrice) || 0)} {c.soldCurrency}</span></button>))}
          </div>
        </div>
      </div>
    )}
  </>
);

export default FilesSection;