import React from "react";
import { ChevronDown, Copy } from "lucide-react";

const FlightsFormCorporate = ({
  form,
  setForm,
  suggestions,
  companyName,
  companyDeals,
  corporateDropdownRef,
  corporateDropdownOpen,
  setCorporateDropdownOpen,
  dealsDropdownRef,
  dealsDropdownOpen,
  setDealsDropdownOpen,
  copiedDealIndex,
  setCopiedDealIndex,
  supplierOther,
  setSupplierOther,
}) => {
  const selectedCompanyRecord = suggestions.companies.find((c) => companyName(c) === form.company);
  const selectedDeals = selectedCompanyRecord ? companyDeals(selectedCompanyRecord) : [];
  const unregisteredCurrent =
    form.company && !suggestions.companies.some((c) => companyName(c) === form.company);
  const sortedCompanies = [...suggestions.companies].sort((a, b) =>
    companyName(a).localeCompare(companyName(b))
  );
  const copyDeal = (d, i) => {
    const text = d.details;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedDealIndex(i);
        setTimeout(() => setCopiedDealIndex((cur) => (cur === i ? null : cur)), 1500);
      });
    }
  };

  return (
    <>
      <div className="flex-1 min-w-[160px]">
        <label className="text-xs text-stone-500 block mb-1">Corporates (optional)</label>
        <div className="relative" ref={corporateDropdownRef}>
          <button
            type="button"
            onClick={() => setCorporateDropdownOpen((o) => !o)}
            className={`w-full border rounded-xl px-3 py-2 text-sm bg-white flex items-center justify-between gap-2 text-left focus:outline-none focus:ring-2 focus:ring-teal-700 ${selectedDeals.length ? "border-teal-300" : "border-stone-300"}`}
          >
            <span className={form.company ? "text-stone-800" : "text-stone-400"}>
              {form.company || "— No corporate —"}
            </span>
            <ChevronDown size={14} className={`shrink-0 text-stone-400 transition-transform ${corporateDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {corporateDropdownOpen && (
            <div className="absolute z-20 mt-1 w-full max-h-80 overflow-y-auto bg-white border border-stone-200 rounded-xl shadow-lg py-1">
              <button
                type="button"
                onClick={() => { setForm({ ...form, company: "" }); setCorporateDropdownOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-sm hover:bg-stone-50 ${!form.company ? "text-teal-800 font-semibold" : "text-stone-500"}`}
              >
                — No corporate —
              </button>
              {unregisteredCurrent && (
                // The ticket already has a company value that isn't (or is no longer) a
                // registered corporate — e.g. saved before Corporate Management existed,
                // or the corporate was later renamed/deleted. Keep it selectable/visible
                // instead of silently blanking the field.
                <button
                  type="button"
                  onClick={() => setCorporateDropdownOpen(false)}
                  className="w-full text-left px-3 py-1.5 text-sm text-teal-800 font-semibold bg-teal-50"
                >
                  {form.company} (not registered)
                </button>
              )}
              {sortedCompanies.map((c) => {
                const name = companyName(c);
                const deals = companyDeals(c);
                const selected = name === form.company;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => { setForm({ ...form, company: name }); setCorporateDropdownOpen(false); setCopiedDealIndex(null); setDealsDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-sm hover:bg-teal-50 ${selected ? "bg-teal-50" : ""}`}
                  >
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="flex items-center gap-1.5 shrink-0">
                        <span className={selected ? "text-teal-800 font-semibold" : "text-stone-800"}>{name}</span>
                        {deals.length > 0 && (
                          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500" />
                        )}
                      </span>
                      {deals.map((d, i) => (
                        <span key={i} className="inline-flex items-center text-[11px] leading-snug text-teal-700 whitespace-nowrap">
                          {d.airline && <span className="font-semibold">{d.airline.toUpperCase()}{" — "}</span>}
                          {d.details}
                        </span>
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="w-56 shrink-0">
        <label className="text-xs text-stone-500 block mb-1">Deals</label>
        <div className="relative" ref={dealsDropdownRef}>
          <button
            type="button"
            disabled={selectedDeals.length === 0}
            onClick={() => setDealsDropdownOpen((o) => !o)}
            className={`w-full border rounded-xl px-3 py-2 text-sm flex items-center justify-between gap-2 text-left focus:outline-none focus:ring-2 focus:ring-teal-700 ${
              selectedDeals.length > 0
                ? "bg-white border-teal-300 text-stone-800"
                : "bg-stone-50 border-stone-200 text-stone-400 cursor-not-allowed"
            }`}
          >
            <span className="truncate">
              {selectedDeals.length > 0 ? `${selectedDeals.length} Deal${selectedDeals.length > 1 ? "s" : ""}` : "No deals"}
            </span>
            <ChevronDown size={14} className={`shrink-0 transition-transform ${selectedDeals.length > 0 ? "text-teal-600" : "text-stone-300"} ${dealsDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dealsDropdownOpen && selectedDeals.length > 0 && (
            <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-stone-200 rounded-xl shadow-lg py-1">
              {selectedDeals.map((d, i) => {
                const matchesAirline = form.airline && d.airline && d.airline.toUpperCase() === form.airline.trim().toUpperCase();
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between gap-2 px-3 py-1.5 ${matchesAirline ? "bg-teal-50" : ""}`}
                  >
                    <span className={`text-[11px] leading-snug ${matchesAirline ? "text-teal-900 font-semibold" : "text-teal-700"}`}>
                      {d.airline && <span className="font-semibold">{d.airline.toUpperCase()}{" — "}</span>}
                      {d.details}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyDeal(d, i)}
                      className="shrink-0 flex items-center gap-1 text-[10px] font-semibold text-teal-700 hover:text-teal-900"
                      title="Copy this deal"
                    >
                      <Copy size={11} />
                      {copiedDealIndex === i ? "Copied" : ""}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="w-40 shrink-0">
        <label className="text-xs text-stone-500 block mb-1">Supplier</label>
        {supplierOther ? (
          <div className="flex gap-2">
            <input
              className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 ${(form.supplier || "").trim() ? "border-blue-400 text-blue-700 font-medium bg-blue-50" : "border-stone-300"}`}
              value={form.supplier || ""}
              onChange={(e) => setForm({ ...form, supplier: e.target.value })}
              placeholder="Enter supplier name"
              autoFocus
            />
            <button
              type="button"
              onClick={() => { setSupplierOther(false); setForm({ ...form, supplier: "" }); }}
              className="shrink-0 text-xs text-stone-500 hover:text-teal-800 border border-stone-300 rounded-xl px-2"
            >
              List
            </button>
          </div>
        ) : (
          <select
            className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 ${form.supplier ? "border-blue-400 text-blue-700 font-medium bg-blue-50" : "border-stone-300 bg-white"}`}
            value={form.supplier}
            onChange={(e) => {
              if (e.target.value === "__other__") {
                setSupplierOther(true);
                setForm({ ...form, supplier: "" });
              } else {
                setForm({ ...form, supplier: e.target.value });
              }
            }}
          >
            <option value="">Select supplier</option>
            {(suggestions.flightSuppliers || []).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
            <option value="__other__">Other</option>
          </select>
        )}
      </div>
    </>
  );
};

export default FlightsFormCorporate;
