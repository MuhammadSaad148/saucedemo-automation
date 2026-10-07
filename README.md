# SauceDemo Checkout Automation (Playwright)

End-to-end test: login, add two products, verify cart, checkout, verify order completion.

## Prerequisites
- Node.js 18 or later
- Git

## Setup
```
npm install
npx playwright install
```
Copy `.env.example` to `.env` and fill in the values:
```
APP_USERNAME=<username>
APP_PASSWORD=<password>
```

## Run
```
npx playwright test
npx playwright test --headed
npx playwright show-report
```

## Structure
- `pages/` page objects (login, product, cart, checkout)
- `tests/` test specs
- `playwright.config.ts` configuration

## Design notes
- Selectors use `data-test` attributes.
- No fixed waits; web-first assertions retry automatically.
- Each test logs in itself, so tests are independent.
- Credentials are read from `.env`, which is not committed.

## Limitations
- One happy-path flow only; no negative tests.
- Chromium only.
- Depends on a public demo site.