import React, { useMemo, useState } from "react";
import {
  Briefcase, Building2, CalendarDays, CheckCircle2, Circle, Mail, Phone, Plus, Search,
  Star, UserRound, Users, TrendingUp, DollarSign, Target, Clock, Trash2, Pencil, X, Eye, EyeOff
} from "lucide-react";

const EMPTY_LEAD = {
  id: "",
  name: "",
  position: "",
  company: "",
  phone: "",
  email: "",
  source: "Website",
  status: "New",
  dealValue: "",
  expectedClose: "",
  nextFollowUp: "",
  notes: "",
  createdAt: new Date().toISOString().split('T')[0],
};

const STATUS_OPTIONS = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];
const SOURCE_OPTIONS = ["Website", "Referral", "Social Media", "Direct Call", "Email", "Event", "Partner"];

const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

const formatCurrency = (value) => {
  if (!value) return "—";
  return `EGP ${parseInt(value).toLocaleString()}`;
};

export default function CRMSection({ crmLeads, setCrmLeads, currentUser }) {
  const [activeTab, setActiveTab] = useState("pipeline");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState({ ...EMPTY_LEAD, id: crypto.randomUUID ? crypto.randomUUID() : `lead-${Date.now()}` });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const leads = crmLeads || [];

  const filteredLeads = useMemo(() => {
    let result = leads;
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter((lead) => {
        const haystack = [lead.name, lead.company, lead.phone, lead.email, lead.status, lead.notes]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }
    if (statusFilter) {
      result = result.filter((lead) => lead.status === statusFilter);
    }
    return result;
  }, [leads, query, statusFilter]);

  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const wonDeals = leads.filter((l) => l.status === "Won");
    const totalValue = leads.reduce((sum, l) => sum + (parseInt(l.dealValue) || 0), 0);
    const wonValue = wonDeals.reduce((sum, l) => sum + (parseInt(l.dealValue) || 0), 0);
    const avgDealSize = wonDeals.length > 0 ? wonValue / wonDeals.length : 0;
    
    const statusCounts = {};
    STATUS_OPTIONS.forEach((s) => {
      statusCounts[s] = leads.filter((l) => l.status === s).length;
    });

    return { totalLeads, wonDeals: wonDeals.length, totalValue, wonValue, avgDealSize, statusCounts };
  }, [leads]);

  const saveLead = () => {
    const trimmed = {
      ...draft,
      name: draft.name.trim(),
      company: draft.company.trim(),
      phone: draft.phone.trim(),
      email: draft.email.trim(),
      position: draft.position.trim(),
      notes: draft.notes.trim(),
      source: draft.source || "Website",
      status: draft.status || "New",
    };

    if (!trimmed.name && !trimmed.company) {
      return;
    }

    let next;
    if (editingId) {
      next = leads.map((lead) => (lead.id === editingId ? trimmed : lead));
      setEditingId(null);
    } else {
      next = [trimmed, ...leads];
    }

    setCrmLeads(next);
    setDraft({ ...EMPTY_LEAD, id: crypto.randomUUID ? crypto.randomUUID() : `lead-${Date.now()}` });
    setShowForm(false);
  };

  const updateField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const deleteLead = (leadId) => {
    setCrmLeads((prev) => (prev || []).filter((lead) => lead.id !== leadId));
  };

  const openEdit = (lead) => {
    setDraft(lead);
    setEditingId(lead.id);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setShowForm(false);
    setEditingId(null);
    setDraft({ ...EMPTY_LEAD, id: crypto.randomUUID ? crypto.randomUUID() : `lead-${Date.now()}` });
  };

  const statusClasses = {
    New: "bg-sky-100 text-sky-700 border-sky-200",
    Contacted: "bg-amber-100 text-amber-700 border-amber-200",
    Qualified: "bg-violet-100 text-violet-700 border-violet-200",
    Proposal: "bg-indigo-100 text-indigo-700 border-indigo-200",
    Negotiation: "bg-orange-100 text-orange-700 border-orange-200",
    Won: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Lost: "bg-rose-100 text-rose-700 border-rose-200",
  };

  const statusColors = {
    New: "#0EA5E9",
    Contacted: "#F59E0B",
    Qualified: "#8B5CF6",
    Proposal: "#6366F1",
    Negotiation: "#F97316",
    Won: "#10B981",
    Lost: "#EF4444",
  };

  return (
    <div className="space-y-4">
      {/* Header & Stats */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500 font-semibold">Sales Pipeline</p>
            <h2 className="text-xl font-bold text-stone-900">Customer Relationship Management</h2>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-teal-700 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-teal-800 transition-colors"
          >
            <Plus size={16} />
            {editingId ? "Cancel" : "New lead"}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-sky-700 font-medium">Total Leads</p>
                <p className="text-lg font-bold text-sky-900">{stats.totalLeads}</p>
              </div>
              <Users size={24} className="text-sky-600 opacity-60" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-700 font-medium">Won Deals</p>
                <p className="text-lg font-bold text-emerald-900">{stats.wonDeals}</p>
              </div>
              <CheckCircle2 size={24} className="text-emerald-600 opacity-60" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-purple-700 font-medium">Total Revenue</p>
                <p className="text-sm font-bold text-purple-900">{formatCurrency(stats.totalValue).split(' ')[0]}</p>
              </div>
              <TrendingUp size={24} className="text-purple-600 opacity-60" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-orange-700 font-medium">Avg Deal Size</p>
                <p className="text-sm font-bold text-orange-900">{formatCurrency(stats.avgDealSize).split(' ')[0]}</p>
              </div>
              <DollarSign size={24} className="text-orange-600 opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-bold text-stone-900 mb-4">{editingId ? "Edit lead" : "Add new lead"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Contact name *</label>
              <input value={draft.name} onChange={(e) => updateField("name", e.target.value)} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" placeholder="Ahmed Ali" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Position/Title</label>
              <input value={draft.position} onChange={(e) => updateField("position", e.target.value)} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" placeholder="Travel Manager" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Company *</label>
              <input value={draft.company} onChange={(e) => updateField("company", e.target.value)} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" placeholder="Example Corp" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Phone</label>
              <input value={draft.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" placeholder="+966..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Email</label>
              <input value={draft.email} onChange={(e) => updateField("email", e.target.value)} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" placeholder="name@email.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Lead Source</label>
              <select value={draft.source} onChange={(e) => updateField("source", e.target.value)} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700">
                {SOURCE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Status</label>
              <select value={draft.status} onChange={(e) => updateField("status", e.target.value)} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700">
                {STATUS_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Deal Value (EGP)</label>
              <input type="number" value={draft.dealValue} onChange={(e) => updateField("dealValue", e.target.value)} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" placeholder="50000" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Expected Close Date</label>
              <input type="date" value={draft.expectedClose} onChange={(e) => updateField("expectedClose", e.target.value)} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Next Follow-up</label>
              <input type="date" value={draft.nextFollowUp} onChange={(e) => updateField("nextFollowUp", e.target.value)} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-stone-600 mb-1">Notes & Details</label>
              <textarea value={draft.notes} onChange={(e) => updateField("notes", e.target.value)} rows={3} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" placeholder="Budget, priorities, preferences, special requirements..." />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button onClick={cancelEdit} className="px-4 py-2 rounded-xl border border-stone-300 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors">
              Cancel
            </button>
            <button onClick={saveLead} className="px-4 py-2 rounded-xl bg-teal-700 text-sm font-semibold text-white hover:bg-teal-800 transition-colors">
              {editingId ? "Update lead" : "Add lead"}
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <div className="flex gap-1 border-b border-stone-200 p-3 bg-stone-50/50">
          {[
            { id: "pipeline", label: "Pipeline", icon: Target },
            { id: "list", label: "All leads", icon: Users },
            { id: "followups", label: "Follow-ups", icon: Clock },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === id
                  ? "bg-teal-700 text-white"
                  : "bg-white text-stone-600 border border-stone-300 hover:bg-stone-100"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {activeTab === "pipeline" && (
            <div className="space-y-4">
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setStatusFilter("")}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === "" ? "bg-stone-800 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  All statuses
                </button>
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                      statusFilter === status
                        ? `${statusClasses[status]} border-current`
                        : `${statusClasses[status]} opacity-50 hover:opacity-75`
                    }`}
                  >
                    {status} ({stats.statusCounts[status]})
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {STATUS_OPTIONS.map((status) => {
                  const statusLeads = leads.filter((l) => l.status === status);
                  const statusTotal = statusLeads.reduce((sum, l) => sum + (parseInt(l.dealValue) || 0), 0);
                  return (
                    <div key={status} className={`border rounded-xl overflow-hidden ${statusClasses[status]}`}>
                      <div className="px-3 py-2 font-semibold text-sm">{status}</div>
                      <div className="px-3 py-1 text-xs opacity-80 bg-black/10">{statusLeads.length} leads • {formatCurrency(statusTotal)}</div>
                      <div className="divide-y divide-current divide-opacity-20 max-h-96 overflow-y-auto">
                        {statusLeads.length === 0 ? (
                          <div className="px-3 py-2 text-xs opacity-60">No leads</div>
                        ) : (
                          statusLeads.map((lead) => (
                            <div key={lead.id} className="px-3 py-2 text-xs space-y-1 hover:bg-black/5 cursor-pointer">
                              <p className="font-semibold">{lead.name}</p>
                              <p className="opacity-80">{lead.company}</p>
                              {lead.dealValue && <p className="font-medium">{formatCurrency(lead.dealValue)}</p>}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "list" && (
            <div className="space-y-4">
              <div className="relative mb-4">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  placeholder="Search by name, company, email, phone..."
                />
              </div>

              <div className="border border-stone-200 rounded-xl overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200">
                    <tr>
                      <th className="text-left px-3 py-2 font-semibold text-stone-600">Contact</th>
                      <th className="text-left px-3 py-2 font-semibold text-stone-600">Company</th>
                      <th className="text-left px-3 py-2 font-semibold text-stone-600">Phone</th>
                      <th className="text-left px-3 py-2 font-semibold text-stone-600">Status</th>
                      <th className="text-right px-3 py-2 font-semibold text-stone-600">Deal Value</th>
                      <th className="text-center px-3 py-2 font-semibold text-stone-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-stone-500">No leads found</td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="border-b border-stone-100 hover:bg-stone-50">
                          <td className="px-3 py-2">
                            <p className="font-medium text-stone-800">{lead.name || "Unnamed"}</p>
                            {lead.position && <p className="text-stone-500">{lead.position}</p>}
                          </td>
                          <td className="px-3 py-2 text-stone-700">{lead.company || "Individual"}</td>
                          <td className="px-3 py-2 text-stone-700">{lead.phone || "—"}</td>
                          <td className="px-3 py-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold border ${statusClasses[lead.status] || "bg-stone-100 text-stone-700"}`}>
                              {lead.status || "New"}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-right font-semibold text-stone-800">{formatCurrency(lead.dealValue)}</td>
                          <td className="px-3 py-2 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => openEdit(lead)} className="p-1 hover:bg-stone-200 rounded" title="Edit">
                                <Pencil size={14} className="text-amber-600" />
                              </button>
                              <button onClick={() => deleteLead(lead.id)} className="p-1 hover:bg-stone-200 rounded" title="Delete">
                                <Trash2 size={14} className="text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "followups" && (
            <div className="space-y-2">
              {leads
                .filter((l) => l.nextFollowUp)
                .sort((a, b) => new Date(a.nextFollowUp) - new Date(b.nextFollowUp))
                .map((lead) => {
                  const followUpDate = new Date(lead.nextFollowUp);
                  const today = new Date();
                  const daysUntil = Math.ceil((followUpDate - today) / (1000 * 60 * 60 * 24));
                  const isOverdue = daysUntil < 0;
                  const isToday = daysUntil === 0;
                  const isSoon = daysUntil > 0 && daysUntil <= 3;

                  return (
                    <div
                      key={lead.id}
                      className={`p-3 rounded-lg border ${
                        isOverdue
                          ? "bg-red-50 border-red-200"
                          : isToday
                          ? "bg-amber-50 border-amber-200"
                          : isSoon
                          ? "bg-blue-50 border-blue-200"
                          : "bg-stone-50 border-stone-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-stone-900">{lead.name}</p>
                          <p className="text-xs text-stone-600">{lead.company}</p>
                          <p className="text-xs text-stone-500 mt-1">{lead.email || lead.phone || "No contact"}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-xs font-semibold ${isOverdue ? "text-red-700" : isToday ? "text-amber-700" : "text-blue-700"}`}>
                            {isOverdue ? `${Math.abs(daysUntil)} days overdue` : isToday ? "Today" : `In ${daysUntil} days`}
                          </p>
                          <p className="text-xs text-stone-600">{formatDate(lead.nextFollowUp)}</p>
                          {lead.notes && <p className="text-xs text-stone-500 mt-1 line-clamp-1">{lead.notes}</p>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              {leads.filter((l) => l.nextFollowUp).length === 0 && (
                <div className="text-center py-8 text-stone-500">No follow-ups scheduled</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
