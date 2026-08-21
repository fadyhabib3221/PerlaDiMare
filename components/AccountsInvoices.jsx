import React, { useState } from "react";
import { CheckCircle2, Printer, Plus, Trash2, X } from "lucide-react";

const emptyInvoice = () => ({
  customer: "",
  issueDate: new Date().toISOString().slice(0, 10),
  dueDate: new Date().toISOString().slice(0, 10),
  description: "",
  amount: "",
  note: "",
});

export default function AccountsInvoices({
  activeTab,
  invoices,
  customerNames,
  treasuryAccounts,
  fmt,
  acctCurrency,
  formatDisplayDate,
  onSave,
  onDelete,
  onRecordPayment,
  at,
}) {
  const [form, setForm] = useState(emptyInvoice);
  const [showForm, setShowForm] = useState(false);
  const [payment, setPayment] = useState(null);
  const [paymentForm, setPaymentForm] = useState({ date: new Date().toISOString().slice(0, 10), amount: "", accountId: "", note: "" });

  if (activeTab !== "invoices") return null;

  const closeForm = () => { setShowForm(false); setForm(emptyInvoice()); };
  const save = () => {
    if (!form.customer || !form.description || form.amount === "") return;
    onSave(form);
    closeForm();
  };
  const openPayment = (invoice) => {
    setPayment(invoice);
    setPaymentForm({ date: new Date().toISOString().slice(0, 10), amount: Math.max(0, (parseFloat(invoice.amount) || 0) - (parseFloat(invoice.paidAmount) || 0)), accountId: "", note: "" });
  };
  const printInvoice = (invoice) => {
    const printWindow = window.open("", "_blank", "width=800,height=700");
    if (!printWindow) return;
    printWindow.document.write(`<html><head><title>${invoice.number}</title><style>body{font-family:Arial;padding:40px;color:#292524}h1{color:#115e59}table{width:100%;border-collapse:collapse;margin-top:30px}td{padding:12px;border-bottom:1px solid #ddd}.label{color:#78716c;width:35%}</style></head><body><h1>Perla Di Mare Tours Agency</h1><h2>Invoice ${invoice.number}</h2><table><tr><td class="label">Customer</td><td>${invoice.customer}</td></tr><tr><td class="label">Issue date</td><td>${invoice.issueDate}</td></tr><tr><td class="label">Due date</td><td>${invoice.dueDate}</td></tr><tr><td class="label">Description</td><td>${invoice.description}</td></tr><tr><td class="label">Total</td><td>${fmt(invoice.amount)} ${acctCurrency}</td></tr><tr><td class="label">Paid</td><td>${fmt(invoice.paidAmount || 0)} ${acctCurrency}</td></tr><tr><td class="label">Remaining</td><td>${fmt(Math.max(0, (parseFloat(invoice.amount) || 0) - (parseFloat(invoice.paidAmount) || 0)))} ${acctCurrency}</td></tr></table><p>${invoice.note || ""}</p><script>window.print()</script></body></html>`);
    printWindow.document.close();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-2">
        <div>
          <h3 className="text-sm font-bold text-stone-700">{at("invoicesTitle")}</h3>
          <p className="text-xs text-stone-400">{at("invoicesSubtitle")}</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1 text-xs font-semibold text-white bg-teal-800 rounded-lg px-3 py-2"><Plus size={14} /> {at("newInvoice")}</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {["Draft", "Sent", "Overdue", "Paid"].map((status) => (
          <div key={status} className="bg-white border border-stone-200 rounded-xl p-3"><p className="text-xs text-stone-500">{status}</p><p className="text-lg font-bold text-stone-800">{invoices.filter((invoice) => invoice.status === status).length}</p></div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto">
        <table className="w-full min-w-max text-sm"><thead className="bg-stone-50 text-stone-500 text-xs"><tr>
          <th className="text-left px-3 py-2">{at("invoiceNumber")}</th><th className="text-left px-3 py-2">{at("colCustomer")}</th><th className="text-left px-3 py-2">{at("dueDate")}</th><th className="text-right px-3 py-2">{at("colAmount")}</th><th className="text-right px-3 py-2">{at("colRemaining")}</th><th className="px-3 py-2" />
        </tr></thead><tbody className="divide-y divide-stone-100">
          {invoices.length === 0 ? <tr><td colSpan={6} className="text-center text-stone-400 py-8">{at("noInvoices")}</td></tr> : invoices.map((invoice) => {
            const remaining = Math.max(0, (parseFloat(invoice.amount) || 0) - (parseFloat(invoice.paidAmount) || 0));
            return <tr key={invoice.id}>
              <td className="px-3 py-2 font-semibold text-teal-800">{invoice.number}</td><td className="px-3 py-2">{invoice.customer}</td><td className="px-3 py-2 text-stone-500">{formatDisplayDate(invoice.dueDate)}</td><td className="px-3 py-2 text-right font-semibold">{fmt(invoice.amount)} {acctCurrency}</td><td className={`px-3 py-2 text-right font-semibold ${remaining ? "text-red-600" : "text-emerald-700"}`}>{fmt(remaining)} {acctCurrency}</td>
              <td className="px-3 py-2"><div className="flex items-center justify-end gap-2"><button title={at("recordCollection")} onClick={() => openPayment(invoice)} disabled={!remaining} className="text-emerald-600 disabled:opacity-30"><CheckCircle2 size={15} /></button><button title="Print" onClick={() => printInvoice(invoice)} className="text-stone-400 hover:text-teal-700"><Printer size={15} /></button><button title="Delete" onClick={() => onDelete(invoice.id)} className="text-stone-400 hover:text-red-600"><Trash2 size={15} /></button></div></td>
            </tr>;
          })}
        </tbody></table>
      </div>

      {showForm && <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={closeForm}><div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-stone-800">{at("newInvoice")}</h3><button onClick={closeForm}><X size={18} /></button></div>
        <div className="space-y-3"><select value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"><option value="">{at("selectCustomer")}</option>{customerNames.map((name) => <option key={name} value={name}>{name}</option>)}</select><input type="date" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /><input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /><input placeholder={at("invoiceDescription")} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /><input type="number" placeholder={at("colAmount")} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /><textarea placeholder={at("notesOptional")} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" rows={2} /></div>
        <button onClick={save} className="w-full mt-4 bg-teal-800 text-white rounded-xl py-2.5 text-sm font-semibold">{at("saveInvoice")}</button>
      </div></div>}

      {payment && <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setPayment(null)}><div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-stone-800">{at("recordCollection")} · {payment.number}</h3><button onClick={() => setPayment(null)}><X size={18} /></button></div>
        <div className="space-y-3"><input type="date" value={paymentForm.date} onChange={(e) => setPaymentForm({ ...paymentForm, date: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /><input type="number" value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /><select value={paymentForm.accountId} onChange={(e) => setPaymentForm({ ...paymentForm, accountId: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"><option value="">{at("selectAccount")}</option>{treasuryAccounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}</select><input placeholder={at("notesOptional")} value={paymentForm.note} onChange={(e) => setPaymentForm({ ...paymentForm, note: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" /></div>
        <button onClick={() => { if (paymentForm.amount && paymentForm.accountId) { onRecordPayment(payment, paymentForm); setPayment(null); } }} className="w-full mt-4 bg-teal-800 text-white rounded-xl py-2.5 text-sm font-semibold">{at("recordCollection")}</button>
      </div></div>}
    </div>
  );
}