# Deployment guide

Set `DATABASE_URL` to a production database, set `NODE_ENV=production`, run Prisma migrations, and deploy behind HTTPS. Set a shared external rate limiter before running multiple instances. Back up the database and do not expose SQLite files publicly. No third-party financial provider, SMS hardware, PDF renderer, or AI provider is configured; each requires its own approved credentials and privacy review.
