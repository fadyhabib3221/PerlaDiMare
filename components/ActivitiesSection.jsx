import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Car, Copy, MapPin, Search, Sparkles, Truck, Wifi } from "lucide-react";

const ACTIVITY_WIDGETS = [
  { id: "kiwitaxi-search", title: "Search & book a transfer", icon: Truck, src: "https://tpscr.com/content?currency=USD&trs=563109&shmarker=765452.765452&language=en&theme=6&powered_by=true&campaign_id=1&promo_id=1486" },
  { id: "localrent-search", title: "Search & book a car rental", icon: Car, src: "https://tpscr.com/content?trs=563109&shmarker=765452.765452&locale=en&powered_by=true&campaign_id=172&promo_id=4850" },
  { id: "esim-search", title: "Search & buy an eSIM", icon: Wifi, src: "https://tpscr.com/content?trs=563109&shmarker=765452.765452&locale=en&powered_by=true&color_button=%23f2685f&color_focused=%23f2685f&secondary=%23FFFFFF&dark=%2311100f&light=%23FFFFFF&special=%23C4C4C4&border_radius=30&plain=false&no_labels=true&promo_id=8588&campaign_id=541" },
  { id: "partner-offer-10", title: "Economy Car Rental", icon: Sparkles, src: "https://tpscr.com/content?trs=563109&shmarker=765452.765452&locale=en&width=100&height=100&powered_by=true&campaign_id=10&promo_id=2082" },
];

const WEGOTRIP_SUB_ID = "563109";
const FEATURED_ACTIVITY_DEAL = {
  name: "Weaving Tradition & Taste: Tokyo Kimono, Tea & Food Tour",
  image: "https://media.tacdn.com/media/attractions-splice-spp-360x240/15/42/6d/63.jpg",
  description: "Experience Japanese tradition in Asakusa: visit Sensoji temple, wear a kimono, ride an old Japanese-style car, and enjoy freshly made sushi with a local guide, starting from Kaminarimon Gate.",
  price: "246.5", currency: "USD", promo: "Save 15.00%!", location: "Tokyo, Japan", category: "Day Trips",
  link: "https://www.viator.com/tours/Tokyo/Weaving-Tradition-and-Taste-Tokyo-Kimono-Tea-and-Food-Tour/d334-100234P1",
};
const WEGOTRIP_API = "https://wegotrip-proxy.fadyhabib3221.workers.dev/api/v2";

const TravelpayoutsWidget = ({ src, minHeight = 320 }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !src) return;
    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.charset = "utf-8";
    container.appendChild(script);
    return () => {
      container.innerHTML = "";
    };
  }, [src]);
  return <div ref={containerRef} style={{ minHeight }} />;
};

const ActivitiesSection = React.memo(function ActivitiesSection() {
  const [activeActivityWidgetId, setActiveActivityWidgetId] = useState(null);
  const [activityCitiesCache, setActivityCitiesCache] = useState(null);
  const [activityCityQuery, setActivityCityQuery] = useState("");
  const [activityCityResults, setActivityCityResults] = useState([]);
  const [activityCitySearching, setActivityCitySearching] = useState(false);
  const [activityCityError, setActivityCityError] = useState("");
  const [activitySelectedCity, setActivitySelectedCity] = useState(null);
  const [activityProducts, setActivityProducts] = useState([]);
  const [activityProductsLoading, setActivityProductsLoading] = useState(false);
  const [activityProductsError, setActivityProductsError] = useState("");

  const loadActivityCitiesCache = async () => {
    try {
      let all = [];
      let page = 1;
      let totalPages = 1;
      do {
        const res = await fetch(`${WEGOTRIP_API}/cities/?popular=true&page=${page}`, { headers: { "Accept-Language": "en" } });
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        const block = (data && data.data) || data || {};
        const pageResults = block.results || (Array.isArray(block) ? block : []) || (Array.isArray(data) ? data : []);
        all = all.concat(pageResults);
        totalPages = block.pages || block.total_pages || 1;
        page += 1;
      } while (page <= totalPages && page <= 20);
      setActivityCitiesCache(all);
      return all;
    } catch (e) {
      setActivityCitiesCache([]);
      return [];
    }
  };

  const searchActivityCities = async (query) => {
    const q = query.trim();
    if (q.length < 2) { setActivityCityResults([]); setActivityCityError(""); return; }
    setActivityCitySearching(true);
    setActivityCityError("");
    try {
      const list = activityCitiesCache === null ? await loadActivityCitiesCache() : activityCitiesCache;
      const matches = list.filter((c) => ((c && (c.name || c.title)) || "").toLowerCase().includes(q.toLowerCase()));
      setActivityCityResults(matches);
      if (!matches.length) setActivityCityError(`No match (${list.length} cities loaded from WeGoTrip) — try another spelling`);
    } catch (e) {
      setActivityCityError("Couldn't reach WeGoTrip — try again");
      setActivityCityResults([]);
    } finally { setActivityCitySearching(false); }
  };

  const loadActivityProducts = async (city) => {
    setActivitySelectedCity(city); setActivityProducts([]); setActivityProductsError(""); setActivityProductsLoading(true);
    try {
      const res = await fetch(`${WEGOTRIP_API}/products/popular/?lang=en&city=${encodeURIComponent(city.id)}&currency=USD`, { headers: { "Accept-Language": "en" } });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      const results = (data && data.data && data.data.results) || [];
      setActivityProducts(results);
      if (!results.length) setActivityProductsError("No activities found for this city right now");
    } catch (e) { setActivityProductsError("Couldn't load activities — try again"); }
    finally { setActivityProductsLoading(false); }
  };

  const activityProductLink = (product) => {
    const city = (product.city && product.city.slug) || (activitySelectedCity && activitySelectedCity.slug) || "";
    const cityId = (product.city && product.city.id) || (activitySelectedCity && activitySelectedCity.id) || "";
    return `https://wegotrip.com/${city}-d${cityId}/${product.slug}-p${product.id}/?sub_id=${WEGOTRIP_SUB_ID}`;
  };

  return (
    <>
      {activeActivityWidgetId ? (() => {
        const w = ACTIVITY_WIDGETS.find((x) => x.id === activeActivityWidgetId);
        if (!w) return null;
        return <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4"><button onClick={() => setActiveActivityWidgetId(null)} className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-700 mb-3"><ArrowLeft size={14} /> Back</button><h2 className="font-semibold text-stone-900 text-sm mb-3">{w.title}</h2><TravelpayoutsWidget src={w.src} /></div>;
      })() : <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4"><h2 className="font-semibold text-stone-900 text-sm mb-3">Quick search</h2><div className="flex flex-wrap gap-4">{ACTIVITY_WIDGETS.map((w) => { const Icon = w.icon; return <button key={w.id} onClick={() => setActiveActivityWidgetId(w.id)} className="flex flex-col items-center gap-1.5 w-20 group"><span className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center group-hover:bg-teal-100 transition-colors"><Icon size={22} /></span><span className="text-[11px] font-medium text-stone-600 text-center leading-tight">{w.title}</span></button>; })}</div></div>}

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden mb-4"><div className="px-4 pt-3"><h2 className="font-semibold text-stone-900 text-sm mb-1">Featured deal</h2><p className="text-xs text-stone-500 mb-3">Example item from a partner feed.</p></div><div className="flex flex-col sm:flex-row gap-3 px-4 pb-4"><img src={FEATURED_ACTIVITY_DEAL.image} alt={FEATURED_ACTIVITY_DEAL.name} className="w-full sm:w-40 h-40 sm:h-auto object-cover rounded-xl flex-shrink-0" loading="lazy" /><div className="flex flex-col gap-1.5 flex-1"><div className="flex items-start justify-between gap-2"><p className="text-sm font-semibold text-stone-800 leading-snug">{FEATURED_ACTIVITY_DEAL.name}</p><span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5 whitespace-nowrap">{FEATURED_ACTIVITY_DEAL.promo}</span></div><p className="text-xs text-stone-500">{FEATURED_ACTIVITY_DEAL.location} · {FEATURED_ACTIVITY_DEAL.category}</p><p className="text-xs text-stone-500 line-clamp-3">{FEATURED_ACTIVITY_DEAL.description}</p><div className="mt-auto flex items-center justify-between pt-2"><span className="text-sm font-bold text-stone-800">{FEATURED_ACTIVITY_DEAL.currency} {FEATURED_ACTIVITY_DEAL.price}</span><div className="flex items-center gap-1.5"><a href={FEATURED_ACTIVITY_DEAL.link} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-white bg-teal-800 rounded-lg px-2.5 py-1.5 hover:bg-teal-900">Book</a><button onClick={() => navigator.clipboard && navigator.clipboard.writeText(FEATURED_ACTIVITY_DEAL.link)} title="Copy booking link" className="text-xs font-semibold text-stone-500 border border-stone-300 rounded-lg px-2 py-1.5 hover:bg-stone-50"><Copy size={13} /></button></div></div></div></div></div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4"><h2 className="font-semibold text-stone-900 text-sm mb-1">Activities & tours</h2><p className="text-xs text-stone-500 mb-3">Search a destination city to see bookable tours, tickets, and audio guides. Every "Book / copy link" button gives you a ready booking link — bookings made through it are tracked to this account.</p><div className="relative max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" /><input value={activityCityQuery} onChange={(e) => { const v = e.target.value; setActivityCityQuery(v); searchActivityCities(v); }} placeholder="Search a city (e.g. Paris, Rome, Cairo)…" className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" /></div>{activityCitySearching && <p className="text-xs text-stone-400 mt-2">Searching…</p>}{activityCityError && <p className="text-xs text-red-500 mt-2">{activityCityError}</p>}{activityCityResults.length > 0 && <div className="flex flex-wrap gap-1.5 mt-3">{activityCityResults.slice(0, 12).map((c) => <button key={c.id} onClick={() => loadActivityProducts(c)} className={`flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5 border transition-colors ${activitySelectedCity && activitySelectedCity.id === c.id ? "bg-teal-700 border-teal-700 text-white" : "bg-white border-stone-300 text-stone-600 hover:bg-stone-50"}`}><MapPin size={12} /> {c.name || c.title}</button>)}</div>}</div>

      {activitySelectedCity && <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden"><div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between"><h2 className="font-semibold text-stone-900 text-sm">Activities in {activitySelectedCity.name || activitySelectedCity.title}</h2>{activityProductsLoading && <span className="text-xs text-stone-400">Loading…</span>}</div>{activityProductsError && <p className="text-xs text-red-500 px-4 py-3">{activityProductsError}</p>}<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">{activityProducts.map((p) => <div key={p.id} className="border border-stone-200 rounded-xl overflow-hidden flex flex-col">{p.preview && <img src={p.preview} alt={p.title} className="w-full h-32 object-cover" loading="lazy" />}<div className="p-3 flex flex-col gap-1.5 flex-1"><p className="text-sm font-semibold text-stone-800 leading-snug">{p.title}</p><p className="text-xs text-stone-500">{p.category}{p.duration ? ` · ${p.duration}` : ""}</p>{!!p.rating && <p className="text-xs text-amber-600 font-medium">★ {p.rating} ({p.reviewsCount || 0})</p>}<div className="mt-auto flex items-center justify-between pt-2"><span className="text-sm font-bold text-stone-800">{p.currency}{p.price}</span><div className="flex items-center gap-1.5"><a href={activityProductLink(p)} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-white bg-teal-800 rounded-lg px-2.5 py-1.5 hover:bg-teal-900">Book</a><button onClick={() => navigator.clipboard && navigator.clipboard.writeText(activityProductLink(p))} title="Copy booking link" className="text-xs font-semibold text-stone-500 border border-stone-300 rounded-lg px-2 py-1.5 hover:bg-stone-50"><Copy size={13} /></button></div></div></div></div>)}</div></div>}
    </>
  );
});

export default ActivitiesSection;
