import React from "react";
import { Trash2, X } from "lucide-react";

const AccountsCustomerDetails = ({
	translateAccountText,
	viewingCustomer,
	setViewingCustomer,
	customerLedger,
	acctBookings,
	customerPayments,
	customerPaymentForm,
	setCustomerPaymentForm,
	treasuryAccounts,
	handleSaveCustomerPayment,
	handleDeleteCustomerPayment,
	fmt,
	acctCurrency,
	addCentsOnBlur,
	formatDisplayDate,
	sectionLabel,
}) => {
	const customer = customerLedger.find((item) => item.customer === viewingCustomer) || { totalDue: 0, paid: 0, balance: 0 };
	const bookings = acctBookings
		.filter((booking) => booking.customers.includes(viewingCustomer))
		.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
	const payments = customerPayments
		.filter((payment) => payment.customer === viewingCustomer)
		.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

	return (
		<div className="fixed inset-0 bg-white z-40 overflow-y-auto">
			<div className="max-w-2xl mx-auto p-4 md:p-6">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-lg md:text-xl font-bold text-stone-900" style={{ fontFamily: "'Fraunces', serif" }}>{viewingCustomer}</h1>
					<button title="Close" onClick={() => setViewingCustomer(null)} className="text-stone-400 hover:text-stone-700 p-1.5"><X size={18} /></button>
				</div>
				<div className="grid grid-cols-3 gap-3 mb-6">
					<div className="bg-stone-50 rounded-xl p-3 text-center"><p className="text-[11px] text-stone-500 mb-1">{translateAccountText("colTotalDue")}</p><p className="font-bold text-stone-800">{fmt(customer.totalDue)}</p></div>
					<div className="bg-stone-50 rounded-xl p-3 text-center"><p className="text-[11px] text-stone-500 mb-1">{translateAccountText("colCollected")}</p><p className="font-bold text-emerald-700">{fmt(customer.paid)}</p></div>
					<div className="bg-stone-50 rounded-xl p-3 text-center"><p className="text-[11px] text-stone-500 mb-1">{translateAccountText("colRemaining")}</p><p className={`font-bold ${customer.balance > 0 ? "text-red-600" : "text-stone-500"}`}>{fmt(customer.balance)}</p></div>
				</div>
				<div className="bg-teal-50/60 border border-teal-100 rounded-2xl p-4 mb-6">
					<h3 className="text-xs font-bold text-teal-900 mb-3">{translateAccountText("recordNewCollection")}</h3>
					<div className="grid grid-cols-2 gap-2 mb-2">
						<input type="date" value={customerPaymentForm.date} onChange={(e) => setCustomerPaymentForm({ ...customerPaymentForm, customer: viewingCustomer, date: e.target.value })} className="border border-stone-300 rounded-lg px-2.5 py-2 text-sm" />
						<input type="number" placeholder={translateAccountText("colAmount")} value={customerPaymentForm.amount} onChange={(e) => setCustomerPaymentForm({ ...customerPaymentForm, customer: viewingCustomer, amount: e.target.value })} onBlur={(e) => setCustomerPaymentForm({ ...customerPaymentForm, customer: viewingCustomer, amount: addCentsOnBlur(e.target.value) })} className="border border-stone-300 rounded-lg px-2.5 py-2 text-sm" />
						<select value={customerPaymentForm.accountId} onChange={(e) => setCustomerPaymentForm({ ...customerPaymentForm, customer: viewingCustomer, accountId: e.target.value })} className="border border-stone-300 rounded-lg px-2.5 py-2 text-sm col-span-2"><option value="">{translateAccountText("collectInto")}</option>{treasuryAccounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}</select>
						<input placeholder={translateAccountText("notesOptional")} value={customerPaymentForm.note} onChange={(e) => setCustomerPaymentForm({ ...customerPaymentForm, customer: viewingCustomer, note: e.target.value })} className="border border-stone-300 rounded-lg px-2.5 py-2 text-sm col-span-2" />
					</div>
					<button onClick={handleSaveCustomerPayment} className="w-full bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-lg py-2">{translateAccountText("recordCollection")}</button>
				</div>
				<h3 className="text-xs font-bold text-stone-600 mb-2">{translateAccountText("collectionHistory")}</h3>
				<div className="space-y-2 mb-6">{payments.length === 0 ? <p className="text-xs text-stone-400">{translateAccountText("noCollectionsRecorded")}</p> : payments.map((payment) => <div key={payment.id} className="flex items-center justify-between bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm"><div><p className="font-semibold text-stone-800">{fmt(parseFloat(payment.amount) || 0)} {acctCurrency}</p><p className="text-[11px] text-stone-400">{payment.date ? formatDisplayDate(payment.date) : "-"} · {treasuryAccounts.find((account) => account.id === payment.accountId)?.name || "-"}{payment.note ? ` · ${payment.note}` : ""}</p></div><button title="Delete payment" onClick={() => handleDeleteCustomerPayment(payment.id)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button></div>)}</div>
				<h3 className="text-xs font-bold text-stone-600 mb-2">{translateAccountText("relatedBookings")}</h3>
				<div className="space-y-2">{bookings.length === 0 ? <p className="text-xs text-stone-400">{translateAccountText("noBookings")}</p> : bookings.map((booking) => <div key={booking.key} className="flex items-center justify-between bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm"><div><p className="font-semibold text-stone-800">{sectionLabel(booking.section)}</p><p className="text-[11px] text-stone-400">{booking.date ? formatDisplayDate(booking.date) : "-"}</p></div><p className="font-semibold text-stone-700">{fmt(booking.sold / (booking.customers.length || 1))} {acctCurrency}</p></div>)}</div>
			</div>
		</div>
	);
};

export default AccountsCustomerDetails;
