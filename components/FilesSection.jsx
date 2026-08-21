import React from "react";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Car,
  ChevronDown,
  FileText,
  Pencil,
  Plane,
  Plus,
  Printer,
  Search,
  SlidersHorizontal,
  Trash2,
  TrendingUp,
  User,
  Wallet,
  X,
} from "lucide-react";

export default function FilesSection({
  fileError, openFile, draftFile, visibleFiles, filesGrandTotals, fmt, formatDisplayDate, fileQuery, setFileQuery,
  fileFiltersOpen, setFileFiltersOpen, activeFileFilterCount, MultiSelectDropdown,
  fileYearsAvailable, fileSelectedYear, setFileSelectedYear, fileCompaniesAvailable,
  fileSelectedCompany, setFileSelectedCompany, fileEmployeesAvailable, fileSelectedEmployee,
  setFileSelectedEmployee, AppliedFilters, multiFilterGroup, clearAllFileFilters, filteredFiles,
  startNewFileDraft, fileTotals, isYearLocked, filesPerm, setOpenFileId, setEditingFileServices,
  requestConfirm, deleteFile, setConfirmDialog, cancelDraftFile, todayDateStr, updateDraftField,
  updateDraftDate, suggestions, companyName, showFilePicker, setShowFilePicker, confirmDraftFile,
  resolveFileItem, FILE_SOURCE_LABELS, viewFileItemDetails, removeDraftItem, handlePrintFile,
  updateFileField, updateFileDate, editingFileServices, removeItemFromFile, filePickerTab,
  setFilePickerTab, visibleTickets, routeLabel, getCustomers, visibleHotelBookings, PassportIcon,
  hotelSoldTotal, visibleVisaBookingsForFiles, visaSoldTotal, visibleCarBookings, addDraftItem,
  addItemToFile,
}) {
  const pickerTabs = [
    { key: "flights", label: "Flights", icon: Plane },
    { key: "hotels", label: "Hotels", icon: Building2 },
    { key: "visa", label: "Visa", icon: PassportIcon },
    { key: "cars", label: "Transportation", icon: Car },
  ];

  const addPickedRecord = async (sourceType, record) => {
    if (draftFile) addDraftItem(sourceType, record);
    else await addItemToFile(openFile.id, sourceType, record);
    setShowFilePicker(false);
  };

  return (
    <>
      {fileError && <div className="bg-red-50 text-red-700 text-sm rounded-xl px-3 py-2 mb-4">{fileError}</div>}

      {!openFile && !draftFile && (
        <>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="bg-stone-100 rounded-xl p-1.5 sm:p-2 text-stone-600 shrink-0"><FileText size={18} className="sm:hidden" /><FileText size={20} className="hidden sm:block" /></div>
              <div className="min-w-0"><p className="text-xs text-stone-500">Files</p><p className="text-sm sm:text-lg font-bold truncate">{visibleFiles.length}</p></div>
            </div>
            <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="bg-teal-50 rounded-xl p-1.5 sm:p-2 text-teal-900 shrink-0"><Wallet size={18} className="sm:hidden" /><Wallet size={20} className="hidden sm:block" /></div>
              <div className="min-w-0"><p className="text-xs text-stone-500">Total sales (EGP)</p><p className="text-sm sm:text-lg font-bold truncate">{fmt(filesGrandTotals.sold)}</p></div>
            </div>
            <div className="bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="bg-emerald-50 rounded-xl p-1.5 sm:p-2 text-emerald-700 shrink-0"><TrendingUp size={18} className="sm:hidden" /><TrendingUp size={20} className="hidden sm:block" /></div>
              <div className="min-w-0"><p className="text-xs text-stone-500">Total profit (EGP)</p><p className="text-sm sm:text-lg font-bold text-emerald-700 truncate">{fmt(filesGrandTotals.profit)}</p></div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 mb-4">
            <div className="flex items-stretch gap-2">
              <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" /><input className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" placeholder="Search by serial, company, notes, or employee" value={fileQuery} onChange={(e) => setFileQuery(e.target.value)} /></div>
              <button type="button" onClick={() => setFileFiltersOpen(!fileFiltersOpen)} className={`shrink-0 flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm font-medium transition-colors ${fileFiltersOpen ? "border-teal-700 text-teal-800 bg-teal-50" : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white"}`}><SlidersHorizontal size={16} /><span className="hidden sm:inline">Filters</span>{activeFileFilterCount > 0 && <span className="bg-teal-700 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">{activeFileFilterCount}</span>}<ChevronDown size={14} className={`transition-transform ${fileFiltersOpen ? "rotate-180" : ""}`} /></button>
            </div>
            {fileFiltersOpen && <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-stone-100">
              <div><label className="text-xs text-stone-500 block mb-1">Year</label><MultiSelectDropdown label="years" icon={Calendar} options={fileYearsAvailable} selected={fileSelectedYear} onChange={setFileSelectedYear} placeholder="All years" /></div>
              <div><label className="text-xs text-stone-500 block mb-1">Company</label><MultiSelectDropdown label="companies" icon={Building2} options={fileCompaniesAvailable} selected={fileSelectedCompany} onChange={setFileSelectedCompany} placeholder="All companies" /></div>
              <div><label className="text-xs text-stone-500 block mb-1">By</label><MultiSelectDropdown label="employees" icon={User} options={fileEmployeesAvailable} selected={fileSelectedEmployee} onChange={setFileSelectedEmployee} placeholder="All employees" /></div>
            </div>}
            <AppliedFilters groups={[multiFilterGroup("Year", "year", fileSelectedYear, setFileSelectedYear), multiFilterGroup("Company", "company", fileSelectedCompany, setFileSelectedCompany), multiFilterGroup("By", "employee", fileSelectedEmployee, setFileSelectedEmployee), { label: "Search", values: fileQuery.trim() ? [{ key: "search", text: `"${fileQuery.trim()}"`, onRemove: () => setFileQuery("") }] : [] }]} onClearAll={clearAllFileFilters} />
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden mb-6">
            <button onClick={startNewFileDraft} className="w-full flex items-center gap-2 px-4 py-3 text-teal-800 hover:bg-teal-50/50 text-sm font-semibold text-left"><Plus size={16} /> Create new file</button>
            {filteredFiles.length === 0 ? <p className="text-sm text-stone-400 text-center py-10">{visibleFiles.length === 0 ? "No files yet — create one and pull in copies from Flights, Hotels, or Visa." : "No files match the current search/filters."}</p> : filteredFiles.map((f) => {
              const totals = fileTotals(f);
              return <div key={f.id} className={`w-full flex items-center justify-between gap-3 px-4 py-3 ${isYearLocked("files", f.createdAt) ? "bg-stone-200/70 grayscale hover:bg-stone-200" : "hover:bg-teal-50/50"}`}>
                <button onClick={() => { setOpenFileId(f.id); setEditingFileServices(false); }} className="flex-1 min-w-0 flex items-center justify-between gap-3 text-left"><div className="min-w-0"><p className="font-semibold text-stone-900 text-sm truncate">{f.serial} {f.company ? `· ${f.company}` : ""}</p><p className="text-xs text-stone-400">{formatDisplayDate(f.createdAt)} · {f.createdBy} · {(f.items || []).length} item{(f.items || []).length === 1 ? "" : "s"}</p></div><div className="text-right shrink-0"><p className="text-sm font-bold">{fmt(totals.sold)}</p><p className="text-xs text-emerald-700 font-semibold">+{fmt(totals.profit)}</p></div></button>
                {filesPerm.canDelete && <button title="Delete file" onClick={() => requestConfirm(`Delete file ${f.serial}? This cannot be undone.`, async () => { await deleteFile(f.id); setConfirmDialog(null); })} className="text-red-500 hover:text-red-700 p-1.5 shrink-0"><Trash2 size={15} /></button>}
              </div>;
            })}
          </div>
        </>
      )}

      {draftFile && <FileEditor file={draftFile} isDraft suggestions={suggestions} companyName={companyName} todayDateStr={todayDateStr} formatDisplayDate={formatDisplayDate} fmt={fmt} updateField={updateDraftField} updateDate={updateDraftDate} onCancel={cancelDraftFile} onConfirm={confirmDraftFile} onAdd={() => setShowFilePicker(true)} fileTotals={fileTotals} resolveFileItem={resolveFileItem} FILE_SOURCE_LABELS={FILE_SOURCE_LABELS} viewFileItemDetails={viewFileItemDetails} removeItem={removeDraftItem} />}
      {openFile && <FileEditor file={openFile} suggestions={suggestions} companyName={companyName} todayDateStr={todayDateStr} formatDisplayDate={formatDisplayDate} fmt={fmt} updateField={(field, value) => updateFileField(openFile.id, field, value)} updateDate={(date) => updateFileDate(openFile.id, date)} onCancel={() => { setOpenFileId(null); setEditingFileServices(false); }} onPrint={() => handlePrintFile(openFile)} onAdd={() => setShowFilePicker(true)} onDelete={() => deleteFile(openFile.id)} canEdit={filesPerm.canEdit} canDelete={filesPerm.canDelete} editing={editingFileServices} setEditing={setEditingFileServices} fileTotals={fileTotals} resolveFileItem={resolveFileItem} FILE_SOURCE_LABELS={FILE_SOURCE_LABELS} viewFileItemDetails={viewFileItemDetails} removeItem={(itemId) => removeItemFromFile(openFile.id, itemId)} />}

      {showFilePicker && (openFile || draftFile) && <div className="fixed inset-0 bg-stone-900/40 flex items-center justify-center p-4 z-50" onClick={() => setShowFilePicker(false)}><div className="bg-white rounded-2xl border border-stone-200 w-full max-w-lg max-h-[85vh] flex flex-col" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-stone-100"><h3 className="font-semibold text-stone-900">{draftFile ? "Add services" : `Add a copy to ${openFile.serial}`}</h3><button title="Close" onClick={() => setShowFilePicker(false)} className="text-stone-400 hover:text-stone-700 p-1"><X size={16} /></button></div>
        <div className="flex gap-2 px-4 pt-3">{pickerTabs.map((tab) => <button key={tab.key} onClick={() => setFilePickerTab(tab.key)} className={`flex items-center gap-1.5 text-xs font-semibold rounded-xl px-3 py-1.5 border ${filePickerTab === tab.key ? "bg-teal-800 text-white border-teal-800" : "bg-white text-stone-600 border-stone-300 hover:bg-stone-50"}`}><tab.icon size={14} className={tab.key === "flights" ? "rotate-45" : ""} /> {tab.label}</button>)}</div>
        <div className="overflow-y-auto p-4 space-y-2">{filePickerTab === "flights" && <PickerList records={visibleTickets} empty="No tickets to add yet." label={(record) => `${routeLabel(record)} · ${getCustomers(record).map((customer) => customer.name).filter(Boolean).join(", ") || "-"}`} price={(record) => `${fmt(record.soldPrice)} ${record.soldCurrency || "EGP"}`} onPick={(record) => addPickedRecord("flights", record)} />}{filePickerTab === "hotels" && <PickerList records={visibleHotelBookings} empty="No hotel bookings to add yet." label={(record) => `${record.hotel || "Hotel"}${record.customer ? ` · ${record.customer}` : ""}`} price={(record) => fmt(hotelSoldTotal(record))} onPick={(record) => addPickedRecord("hotels", record)} />}{filePickerTab === "visa" && <PickerList records={visibleVisaBookingsForFiles} empty="No visa bookings to add yet." label={(record) => `${record.visaType || "Visa"} · ${(record.customers || []).map((customer) => customer.name).filter(Boolean).join(", ") || "-"}`} price={(record) => `${fmt(visaSoldTotal(record))} ${record.soldCurrency}`} onPick={(record) => addPickedRecord("visa", record)} />}{filePickerTab === "cars" && <PickerList records={visibleCarBookings} empty="No transfer bookings to add yet." label={(record) => `${record.routeFrom || "-"} → ${record.routeTo || "-"}${record.customerName ? ` · ${record.customerName}` : ""}`} price={(record) => `${fmt(parseFloat(record.soldPrice) || 0)} ${record.soldCurrency}`} onPick={(record) => addPickedRecord("cars", record)} />}</div>
      </div></div>}
    </>
  );
}

function FileEditor({ file, isDraft = false, suggestions, companyName, todayDateStr, formatDisplayDate, fmt, updateField, updateDate, onCancel, onConfirm, onPrint, onAdd, onDelete, canEdit, canDelete, editing, setEditing, fileTotals, resolveFileItem, FILE_SOURCE_LABELS, viewFileItemDetails, removeItem }) {
  return <div><button onClick={onCancel} className="mb-4 text-stone-500 hover:text-teal-800 text-sm font-semibold flex items-center gap-1.5"><ArrowLeft size={15} /> {isDraft ? "Cancel" : "Back to files"}</button><div className="bg-white rounded-2xl border border-stone-200 p-4 md:p-5 mb-6">{isDraft ? <p className="text-xs text-stone-400 mb-4">New file — not saved yet</p> : <div className="flex items-start justify-between gap-3 mb-4"><div><h2 className="font-semibold text-stone-900">{file.serial}</h2><p className="text-xs text-stone-400">{formatDisplayDate(file.createdAt)} · Created by {file.createdBy}</p></div><div className="flex items-center gap-2"><button onClick={onPrint} className="text-stone-400 hover:text-teal-800 p-1.5" title="Print"><Printer size={18} /></button>{canEdit && <button onClick={() => setEditing((value) => !value)} className={editing ? "bg-teal-800 text-white text-xs font-semibold rounded-xl px-3 py-1.5 flex items-center gap-1.5" : "text-teal-800 border border-teal-800 hover:bg-teal-50 text-xs font-semibold rounded-xl px-3 py-1.5 flex items-center gap-1.5"}><Pencil size={13} /> {editing ? "Done editing" : "Edit services"}</button>}{canDelete && <button onClick={onDelete} className="text-red-600 border border-red-200 hover:bg-red-50 text-xs font-semibold rounded-xl px-3 py-1.5 flex items-center gap-1.5"><Trash2 size={13} /> Delete file</button>}</div></div>}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4"><Field label="Serial" value={file.serial} onChange={(value) => updateField("serial", value)} /><Field label="File date" type="date" max={todayDateStr()} value={file.createdAt} onChange={(value) => value && updateDate(value > todayDateStr() ? todayDateStr() : value)} /><Field label="Company" list="file-company-list" suggestions={suggestions} companyName={companyName} value={file.company} onChange={(value) => updateField("company", value)} /><Field label="Notes" value={file.notes} onChange={(value) => updateField("notes", value)} wide /></div>
    {isDraft && <div className="flex flex-wrap gap-2 mb-4"><button onClick={onAdd} className="text-teal-800 border border-teal-800 hover:bg-teal-50 text-xs font-semibold rounded-xl px-3 py-2 flex items-center gap-1.5"><Plus size={14} /> Add services</button><button onClick={onConfirm} className="bg-gradient-to-b from-teal-700 to-teal-900 hover:from-teal-600 hover:to-teal-800 text-white text-xs font-semibold rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-sm shadow-teal-800/30"><Plus size={14} /> Add file</button></div>}{!isDraft && editing && <button onClick={onAdd} className="mb-4 text-teal-800 border border-teal-800 hover:bg-teal-50 text-xs font-semibold rounded-xl px-3 py-2 flex items-center gap-1.5"><Plus size={14} /> Add service</button>}
    <Totals totals={fileTotals(file)} fmt={fmt} /></div><div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden">{(file.items || []).length === 0 ? <p className="text-sm text-stone-400 text-center py-10">{isDraft ? "No services added yet — use \"Add services\" above." : "No items added to this file yet."}</p> : file.items.map((item) => { const resolved = resolveFileItem(item); return <div key={item.id} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-stone-50 transition-colors"><button type="button" onClick={() => viewFileItemDetails(item, isDraft ? { draft: true, itemId: item.id } : { fileId: file.id, itemId: item.id })} className="min-w-0 text-left flex-1"><p className="text-xs text-teal-800 font-semibold">{FILE_SOURCE_LABELS[item.sourceType] || item.sourceType}</p><p className="text-sm text-stone-900 truncate">{resolved.label}</p><p className="text-xs text-stone-400">{resolved.date ? formatDisplayDate(resolved.date) : "-"}</p></button><div className="flex items-center gap-3 shrink-0"><button type="button" onClick={() => viewFileItemDetails(item, isDraft ? { draft: true, itemId: item.id } : { fileId: file.id, itemId: item.id })} className="text-right"><p className="text-sm font-bold">{fmt(resolved.soldPrice)} {resolved.soldCurrency}</p><p className="text-xs text-emerald-700">net {fmt(resolved.netPrice)} {resolved.netCurrency}</p></button>{(isDraft || (editing && canEdit)) && <button title={isDraft ? "Remove item" : "Remove item from file"} onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={15} /></button>}</div></div>; })}</div></div>;
}

function Field({ label, type = "text", max, list, suggestions, companyName, value, onChange, wide }) { return <div className={wide ? "md:col-span-2" : ""}><label className="text-xs text-stone-500 block mb-1">{label}</label><input type={type} max={max} list={list} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" value={value || ""} onChange={(event) => onChange(event.target.value)} />{list && <datalist id={list}>{suggestions.companies.map((company, index) => <option key={index} value={companyName(company)} />)}</datalist>}</div>; }
function Totals({ totals, fmt }) { return <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4"><div className="bg-stone-50 rounded-xl p-3 text-center"><p className="text-[11px] text-stone-500">Net</p><p className="font-bold text-sm">{fmt(totals.net)}</p></div><div className="bg-stone-50 rounded-xl p-3 text-center"><p className="text-[11px] text-stone-500">Sold</p><p className="font-bold text-sm">{fmt(totals.sold)}</p></div><div className="bg-emerald-50 rounded-xl p-3 text-center"><p className="text-[11px] text-emerald-700">Profit</p><p className="font-bold text-sm text-emerald-700">{fmt(totals.profit)}</p></div></div>; }
function PickerList({ records, empty, label, price, onPick }) { return records.length === 0 ? <p className="text-sm text-stone-400 text-center py-6">{empty}</p> : records.map((record) => <button key={record.id} onClick={() => onPick(record)} className="w-full text-left border border-stone-200 rounded-xl px-3 py-2 hover:bg-teal-50 hover:border-teal-300 flex items-center justify-between gap-2"><span className="text-sm text-stone-800 truncate">{label(record)}</span><span className="text-xs text-stone-400 shrink-0">{price(record)}</span></button>); }
