import React from "react";
import { Building2, ClipboardList, Landmark, PieChart, Receipt, Users } from "lucide-react";
import AccountsOverview from "./AccountsOverview";
import AccountsSuppliers from "./AccountsSuppliers";
import AccountsCustomers from "./AccountsCustomers";
import AccountsTreasury from "./AccountsTreasury";
import AccountsExpenses from "./AccountsExpenses";
import AccountsReports from "./AccountsReports";

const AccountsDashboard = ({
	translateAccountText,
	accountsTab,
	setAccountsTab,
	accountsError,
	monthRevenue,
	monthExpenses,
	totalTreasuryBalance,
	totalSupplierBalance,
	totalCustomerBalance,
	fmt,
	acctCurrency,
	tickets,
	hotelBookings,
	visaBookings,
	carBookings,
	thisMonthPrefix,
	profitAfterRefund,
	hotelProfitTotal,
	visaProfitTotal,
	carProfitTotal,
	sectionLabel,
	supplierQuery,
	setSupplierQuery,
	filteredSupplierLedger,
	setViewingSupplier,
	accountsLang,
	customerQuery,
	setCustomerQuery,
	filteredCustomerLedger,
	setViewingCustomer,
	treasuryAccounts,
	treasuryAccountTypeLabel,
	treasuryBalance,
	setTreasuryForm,
	getEmptyTreasuryAccountForm,
	setTreasuryAccountEditingId,
	setShowTreasuryAccountForm,
	handleEditTreasuryAccountClick,
	handleDeleteTreasuryAccount,
	treasuryFilterAccountId,
	setTreasuryFilterAccountId,
	setTreasuryEntryForm,
	getEmptyTreasuryEntryForm,
	setShowTreasuryEntryForm,
	filteredTreasuryTransactions,
	formatDisplayDate,
	handleDeleteTreasuryEntry,
	handleDeleteSupplierPayment,
	handleDeleteCustomerPayment,
	handleDeleteExpense,
	expenseCategoryFilter,
	setExpenseCategoryFilter,
	EXPENSE_CATEGORIES,
	expenseCategoryLabel,
	setExpenseForm,
	getEmptyExpenseForm,
	setExpenseEditingId,
	setShowExpenseForm,
	filteredExpenses,
	handleEditExpenseClick,
	reportsRange,
	setReportsRange,
	reportsFrom,
	setReportsFrom,
	reportsTo,
	setReportsTo,
	handleExportAccountsReport,
	reportRevenueBySection,
	reportBookingsCount,
	reportTotalRevenue,
	reportTotalExpenses,
	reportNetProfit,
	reportExpensesByCategory,
}) => (
	<>
		{accountsError && (
			<div className="text-sm rounded-xl px-3 py-2 mb-4 bg-red-50 text-red-700">{accountsError}</div>
		)}

		<div className="flex items-center gap-2 mb-5 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
			{[
				{ key: "overview", label: translateAccountText("tabOverview"), icon: PieChart },
				{ key: "suppliers", label: translateAccountText("tabSuppliers"), icon: Building2 },
				{ key: "customers", label: translateAccountText("tabCustomers"), icon: Users },
				{ key: "treasury", label: translateAccountText("tabTreasury"), icon: Landmark },
				{ key: "expenses", label: translateAccountText("tabExpenses"), icon: Receipt },
				{ key: "reports", label: translateAccountText("tabReports"), icon: ClipboardList },
			].map((tab) => (
				<button
					key={tab.key}
					onClick={() => setAccountsTab(tab.key)}
					className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors ${
						accountsTab === tab.key
							? "bg-teal-800 text-white border-teal-800"
							: "bg-white text-stone-500 border-stone-200 hover:border-teal-300 hover:text-teal-800"
					}`}
				>
					<tab.icon size={15} />
					{tab.label}
				</button>
			))}
		</div>

		{accountsTab === "overview" && (
			<AccountsOverview
				translateAccountText={translateAccountText}
				monthRevenue={monthRevenue}
				monthExpenses={monthExpenses}
				totalTreasuryBalance={totalTreasuryBalance}
				totalSupplierBalance={totalSupplierBalance}
				totalCustomerBalance={totalCustomerBalance}
				fmt={fmt}
				acctCurrency={acctCurrency}
				tickets={tickets}
				hotelBookings={hotelBookings}
				visaBookings={visaBookings}
				carBookings={carBookings}
				thisMonthPrefix={thisMonthPrefix}
				profitAfterRefund={profitAfterRefund}
				hotelProfitTotal={hotelProfitTotal}
				visaProfitTotal={visaProfitTotal}
				carProfitTotal={carProfitTotal}
				sectionLabel={sectionLabel}
			/>
		)}
		{accountsTab === "suppliers" && <AccountsSuppliers translateAccountText={translateAccountText} supplierQuery={supplierQuery} setSupplierQuery={setSupplierQuery} filteredSupplierLedger={filteredSupplierLedger} setViewingSupplier={setViewingSupplier} accountsLang={accountsLang} sectionLabel={sectionLabel} fmt={fmt} />}
		{accountsTab === "customers" && <AccountsCustomers translateAccountText={translateAccountText} customerQuery={customerQuery} setCustomerQuery={setCustomerQuery} filteredCustomerLedger={filteredCustomerLedger} setViewingCustomer={setViewingCustomer} accountsLang={accountsLang} sectionLabel={sectionLabel} fmt={fmt} />}
		{accountsTab === "treasury" && <AccountsTreasury translateAccountText={translateAccountText} treasuryAccounts={treasuryAccounts} treasuryAccountTypeLabel={treasuryAccountTypeLabel} treasuryBalance={treasuryBalance} acctCurrency={acctCurrency} fmt={fmt} setTreasuryForm={setTreasuryForm} getEmptyTreasuryAccountForm={getEmptyTreasuryAccountForm} setTreasuryAccountEditingId={setTreasuryAccountEditingId} setShowTreasuryAccountForm={setShowTreasuryAccountForm} handleEditTreasuryAccountClick={handleEditTreasuryAccountClick} handleDeleteTreasuryAccount={handleDeleteTreasuryAccount} treasuryFilterAccountId={treasuryFilterAccountId} setTreasuryFilterAccountId={setTreasuryFilterAccountId} setTreasuryEntryForm={setTreasuryEntryForm} getEmptyTreasuryEntryForm={getEmptyTreasuryEntryForm} setShowTreasuryEntryForm={setShowTreasuryEntryForm} filteredTreasuryTransactions={filteredTreasuryTransactions} formatDisplayDate={formatDisplayDate} handleDeleteTreasuryEntry={handleDeleteTreasuryEntry} handleDeleteSupplierPayment={handleDeleteSupplierPayment} handleDeleteCustomerPayment={handleDeleteCustomerPayment} handleDeleteExpense={handleDeleteExpense} />}
		{accountsTab === "expenses" && <AccountsExpenses translateAccountText={translateAccountText} expenseCategoryFilter={expenseCategoryFilter} setExpenseCategoryFilter={setExpenseCategoryFilter} EXPENSE_CATEGORIES={EXPENSE_CATEGORIES} expenseCategoryLabel={expenseCategoryLabel} setExpenseForm={setExpenseForm} getEmptyExpenseForm={getEmptyExpenseForm} setExpenseEditingId={setExpenseEditingId} setShowExpenseForm={setShowExpenseForm} filteredExpenses={filteredExpenses} treasuryAccounts={treasuryAccounts} fmt={fmt} formatDisplayDate={formatDisplayDate} handleEditExpenseClick={handleEditExpenseClick} handleDeleteExpense={handleDeleteExpense} />}
		{accountsTab === "reports" && <AccountsReports translateAccountText={translateAccountText} reportsRange={reportsRange} setReportsRange={setReportsRange} reportsFrom={reportsFrom} setReportsFrom={setReportsFrom} reportsTo={reportsTo} setReportsTo={setReportsTo} handleExportAccountsReport={handleExportAccountsReport} reportRevenueBySection={reportRevenueBySection} reportBookingsCount={reportBookingsCount} reportTotalRevenue={reportTotalRevenue} reportTotalExpenses={reportTotalExpenses} reportNetProfit={reportNetProfit} reportExpensesByCategory={reportExpensesByCategory} sectionLabel={sectionLabel} expenseCategoryLabel={expenseCategoryLabel} fmt={fmt} acctCurrency={acctCurrency} />}
	</>
);

export default AccountsDashboard;
