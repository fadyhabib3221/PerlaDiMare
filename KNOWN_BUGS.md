# Known Bugs

## Firestore Listen/Write instability

- Status: Unconfirmed, separate from the Accounts refactor.
- Symptom: Browser logs `net::ERR_ABORTED` for Firestore `Listen/channel` and `Write/channel` requests.
- Impact: `treasuryAccounts` can appear empty in the UI, blocking end-to-end payment and expense save tests.
- Revisit: After all Accounts files are extracted.

# TODO

- Re-test saving `AccountsExpenseForm.jsx` end-to-end after fixing the `treasuryAccounts` loading issue.
