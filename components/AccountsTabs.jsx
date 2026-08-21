import React from "react";
import { Building2, ClipboardList, Landmark, PieChart, Receipt, Users } from "lucide-react";

const TABS = [
  { key: "overview", label: "Overview", icon: PieChart },
  { key: "suppliers", label: "Suppliers", icon: Building2 },
  { key: "customers", label: "Customers", icon: Users },
  { key: "treasury", label: "Treasury & Banks", icon: Landmark },
  { key: "expenses", label: "Expenses", icon: Receipt },
  { key: "reports", label: "Financial Reports", icon: ClipboardList },
];

export default function AccountsTabs({ activeTab, onChange, labels }) {
  return (
    <div className="flex items-center gap-2 mb-5 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        return <button key={tab.key} onClick={() => onChange(tab.key)} className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors ${activeTab === tab.key ? "bg-teal-800 text-white border-teal-800" : "bg-white text-stone-500 border-stone-200 hover:border-teal-300 hover:text-teal-800"}`}><Icon size={15} />{labels[tab.key]}</button>;
      })}
    </div>
  );
}
