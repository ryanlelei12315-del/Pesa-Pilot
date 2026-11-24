# PesaPilot status

PesaPilot is now a working browser-based personal-finance MVP.

- Dashboard: balances, safe-to-spend, spending categories, budget and runway.
- Accounts: add and track multiple accounts.
- Transactions: record income, expenses and transfers with automatic account updates.
- M-Pesa: parse/import supported message formats with duplicate prevention and deterministic categories.
- Planning: budget, emergency-fund target and contextual spending prompts.
- Privacy: all data stays in browser local storage; JSON export and demo reset are available.
- Data layer: Prisma schema validates against SQLite and has correctly defined user relations.

## Verification

`npm run typecheck`, `npm run build`, and `npx prisma validate --schema prisma/schema.prisma` pass.

## Current scope

This is intentionally a local-first MVP. It does not claim server accounts, cloud sync, social savings groups, live notifications, or an AI advisor until those services and their security requirements are implemented.
