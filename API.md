# API

Authentication: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`.

Authenticated resources: `GET|POST /api/accounts`, `GET|POST /api/transactions`, `GET|POST /api/reports`, `GET /api/export`, `POST /api/privacy/delete`, and `GET /api/me`. Amounts supplied to authenticated API endpoints are integer minor units.
