# Architecture

Next.js App Router supplies the client dashboard and route-handler API. Prisma/SQLite persists user-scoped entities. Authentication uses bcrypt password hashes and opaque, SHA-256-hashed session tokens in httpOnly cookies. The financial and transaction-parser packages are pure TypeScript modules.
