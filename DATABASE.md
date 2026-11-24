# Database

SQLite is configured by `DATABASE_URL` in `.env`. Monetary API writes use integer minor units; for example KSh 500.00 is `50000`. Run `npx prisma validate`, `npx prisma generate`, and `npx prisma db push` in development. Production deployments must use migrations and a managed database backup process.
