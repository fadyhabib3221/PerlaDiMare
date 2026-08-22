import React from "react";
import { Building2, Car, Plane, X } from "lucide-react";
import PassportIcon from "../PassportIcon";

const FilesServicePicker = ({
  openFile,
  draftFile,
  setShowFilePicker,
  filePickerTab,
  setFilePickerTab,
  visibleTickets,
  visibleHotelBookings,
  visibleVisaBookingsForFiles,
  visibleCarBookings,
  addDraftItem,
  addItemToFile,
  routeLabel,
  getCustomers,
  fmt,
  hotelSoldTotal,
  visaSoldTotal,
}) => (
  <div className="fixed inset-0 bg-stone-900/40 flex items-center justify-center p-4 z-50" onClick={() => setShowFilePicker(false)}>
    <div
      className="bg-white rounded-2xl border border-stone-200 w-full max-w-lg max-h-[85vh] flex flex-col"
      onClick={(ev) => ev.stopPropagation()}
    >
      <div className="flex items-center justify-between p-4 border-b border-stone-100">
        <h3 className="font-semibold text-stone-900">
          {draftFile ? "Add services" : `Add a copy to ${openFile.serial}`}
        </h3>
        <button title="Close" onClick={() => setShowFilePicker(false)} className="text-stone-400 hover:text-stone-700 p-1">
          <X size={16} />
        </button>
      </div>

      <div className="flex gap-2 px-4 pt-3">
        {[
          { key: "flights", label: "Flights", icon: Plane },
          { key: "hotels", label: "Hotels", icon: Building2 },
          { key: "visa", label: "Visa", icon: PassportIcon },
          { key: "cars", label: "Transportation", icon: Car },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilePickerTab(tab.key)}
            className={`flex items-center gap-1.5 text-xs font-semibold rounded-xl px-3 py-1.5 border ${
              filePickerTab === tab.key
                ? "bg-teal-800 text-white border-teal-800"
                : "bg-white text-stone-600 border-stone-300 hover:bg-stone-50"
            }`}
          >
            <tab.icon size={14} className={tab.key === "flights" ? "rotate-45" : ""} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="overflow-y-auto p-4 space-y-2">
        {filePickerTab === "flights" && (
          visibleTickets.length === 0 ? (
            <p className="text-sm text-stone-400 text-center py-6">No tickets to add yet.</p>
          ) : (
            visibleTickets.map((t) => (
              <button
                key={t.id}
                onClick={async () => {
                  if (draftFile) addDraftItem("flights", t);
                  else await addItemToFile(openFile.id, "flights", t);
                  setShowFilePicker(false);
                }}
                className="w-full text-left border border-stone-200 rounded-xl px-3 py-2 hover:bg-teal-50 hover:border-teal-300 flex items-center justify-between gap-2"
              >
                <span className="text-sm text-stone-800 truncate">
                  {routeLabel(t)} · {getCustomers(t).map((c) => c.name).filter(Boolean).join(", ") || "-"}
                </span>
                <span className="text-xs text-stone-400 shrink-0">{fmt(t.soldPrice)} {t.soldCurrency || "EGP"}</span>
              </button>
            ))
          )
        )}
        {filePickerTab === "hotels" && (
          visibleHotelBookings.length === 0 ? (
            <p className="text-sm text-stone-400 text-center py-6">No hotel bookings to add yet.</p>
          ) : (
            visibleHotelBookings.map((h) => (
              <button
                key={h.id}
                onClick={async () => {
                  if (draftFile) addDraftItem("hotels", h);
                  else await addItemToFile(openFile.id, "hotels", h);
                  setShowFilePicker(false);
                }}
                className="w-full text-left border border-stone-200 rounded-xl px-3 py-2 hover:bg-teal-50 hover:border-teal-300 flex items-center justify-between gap-2"
              >
                <span className="text-sm text-stone-800 truncate">
                  {h.hotel || "Hotel"}{h.customer ? ` · ${h.customer}` : ""}
                </span>
                <span className="text-xs text-stone-400 shrink-0">{fmt(hotelSoldTotal(h))}</span>
              </button>
            ))
          )
        )}
        {filePickerTab === "visa" && (
          visibleVisaBookingsForFiles.length === 0 ? (
            <p className="text-sm text-stone-400 text-center py-6">No visa bookings to add yet.</p>
          ) : (
            visibleVisaBookingsForFiles.map((v) => (
              <button
                key={v.id}
                onClick={async () => {
                  if (draftFile) addDraftItem("visa", v);
                  else await addItemToFile(openFile.id, "visa", v);
                  setShowFilePicker(false);
                }}
                className="w-full text-left border border-stone-200 rounded-xl px-3 py-2 hover:bg-teal-50 hover:border-teal-300 flex items-center justify-between gap-2"
              >
                <span className="text-sm text-stone-800 truncate">
                  {v.visaType || "Visa"} · {(v.customers || []).map((c) => c.name).filter(Boolean).join(", ") || "-"}
                </span>
                <span className="text-xs text-stone-400 shrink-0">{fmt(visaSoldTotal(v))} {v.soldCurrency}</span>
              </button>
            ))
          )
        )}
        {filePickerTab === "cars" && (
          visibleCarBookings.length === 0 ? (
            <p className="text-sm text-stone-400 text-center py-6">No transfer bookings to add yet.</p>
          ) : (
            visibleCarBookings.map((c) => (
              <button
                key={c.id}
                onClick={async () => {
                  if (draftFile) addDraftItem("cars", c);
                  else await addItemToFile(openFile.id, "cars", c);
                  setShowFilePicker(false);
                }}
                className="w-full text-left border border-stone-200 rounded-xl px-3 py-2 hover:bg-teal-50 hover:border-teal-300 flex items-center justify-between gap-2"
              >
                <span className="text-sm text-stone-800 truncate">
                  {c.routeFrom || "-"} → {c.routeTo || "-"}{c.customerName ? ` · ${c.customerName}` : ""}
                </span>
                <span className="text-xs text-stone-400 shrink-0">{fmt(parseFloat(c.soldPrice) || 0)} {c.soldCurrency}</span>
              </button>
            ))
          )
        )}
      </div>
    </div>
  </div>
);

export default FilesServicePicker;
