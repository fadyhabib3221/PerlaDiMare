import React from "react";
import { Building2, Car, Hotel, Plane, TrendingUp, Users } from "lucide-react";

const SECTION_ICONS = { flights: Plane, hotels: Hotel, visa: Users, cars: Car };

export default function AccountsOverview({ labels, currency, metrics, sectionProfits, formatNumber }) {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {metrics.map((metric) => (
          <div key={metric.key} className="bg-white rounded-2xl border border-stone-200 p-4">
            <p className="text-xs text-stone-500 mb-1">{metric.label}</p>
            <p className={`text-lg font-bold ${metric.color}`}>{formatNumber(metric.value)} {currency}</p>
          </div>
        ))}
      </div>
      <h3 className="text-sm font-bold text-stone-700 mb-2">{labels.profitBySection}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sectionProfits.map((item) => {
          const Icon = SECTION_ICONS[item.section] || Building2;
          return (
            <div key={item.section} className="bg-white rounded-2xl border border-stone-200 p-4">
              <div className="flex items-center gap-2 mb-1"><Icon size={14} className="text-stone-400" /><p className="text-xs text-stone-500">{item.label}</p></div>
              <p className="text-base font-bold text-emerald-700">{formatNumber(item.value)} {currency}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
