# SauceDemo Automation (Playwright + TypeScript)

End-to-end test for the primary revenue journey on https://www.saucedemo.com/ using `standard_user`:
**login → add two products → verify cart → checkout info → verify overview math → finish → verify confirmation**.

## Prerequisites
- Node.js 18 or newer
- Internet access to https://www.saucedemo.com/

## Setup
```bash
npm install            # or: npm ci once a lockfile exists
npx playwright install chromium
```

## Run
```bash
npm test               # headless
npm run test:headed    # watch the browser
npm run test:ui        # Playwright UI mode
npm run report         # open the last HTML report
npm run typecheck      # TypeScript check
```
Optional overrides: copy `.env.example` values into your environment (`BASE_URL`, `SAUCE_USER`, `SAUCE_PASSWORD`).

## Folder structure
```
saucedemo-automation/
├── .github/workflows/playwright.yml   CI run + report artifact
├── src/
│   ├── fixtures/index.ts              page-object fixtures (fresh context per test)
│   ├── pages/                         Page Objects: Login, Inventory, Cart, Checkout
│   └── utils/                         money helpers (integer cents), test data
├── tests/e2e/
│   ├── checkout.spec.ts               main end-to-end flow
│   └── checkout-validation.spec.ts    negative check: required first name
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Design decisions
- Locators use SauceDemo's `data-test` attributes (`testIdAttribute` set in config), so selectors survive styling changes.
- No fixed sleeps; Playwright auto-waiting and web-first assertions (`toHaveText`, `toHaveURL`) handle timing.
- Each test runs in a fresh browser context, so cart state never leaks between tests.
- Money is parsed to integer cents. Expected subtotal is computed from the prices actually shown, not hard-coded.
- Assertions cover item names, subtotal, tax, total, confirmation message, and the cart badge being cleared.

## AI assistance notes (edit to reflect your real usage)
- **AI helped with:** page-object skeleton, locator choices, test structure, CI workflow.
- **Needed correction or review:** locators had to be checked against the live DOM (`data-test` values); URL-only assertions were replaced with data assertions; float money handling replaced with integer cents; fixed waits removed.
- **Validated by:** running the suite repeatedly (`npx playwright test --repeat-each=5`) and temporarily breaking an expectation (e.g. wrong tax rate) to confirm the test fails.

## Limitations and risks
- Depends on a public third-party site; downtime or changes can fail tests.
- The 8% tax rate is an observed assumption, centralized in `src/utils/testData.ts`.
- Chromium only by default; add projects in `playwright.config.ts` for Firefox/WebKit.
- No visual, accessibility, or performance checks; limited data variation.
