# Security

Passwords use bcrypt cost 12. Sessions are opaque random tokens, only their SHA-256 hashes are stored, and cookies are httpOnly, SameSite=Lax and Secure in production. Each API query is filtered by its authenticated user ID. Auth attempts are rate limited in-process; use a shared rate-limit store in a multi-instance deployment. Validate all external input with Zod and configure HTTPS plus a production `DATABASE_URL` before deployment.
