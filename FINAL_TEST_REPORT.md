# Final test report

Executed successfully during this engineering pass:

- `npx prisma validate --schema prisma/schema.prisma`
- `npx prisma generate --schema prisma/schema.prisma`
- `npx prisma db push --schema prisma/schema.prisma --skip-generate`
- `npm run typecheck`
- `npm run build`
- `npm run lint`
- `npm test` (2 passing financial-engine tests)

Unit tests are included for core cash-flow transfer exclusion and savings-rate calculation. End-to-end, API integration and browser testing infrastructure was absent and is not represented as having run.

`npm audit --omit=dev` could not contact the npm audit endpoint in this environment (network access was denied); it did not produce a vulnerability result.
