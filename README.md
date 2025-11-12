# Shopping Electron App

A tiny **Electron** desktop app (Windows/macOS/Linux).

## Features
- Product list with **category filter** and **price sort**.
- Cart with **quantity update** and **remove**, persistent via `localStorage`.
- **Checkout page** with shipping form (name, email, address, city, postcode), validation, and **order summary**.
- Pricing rules:
  - **VAT**: 20% of Subtotal.
  - **Shipping**: Free when **Subtotal ≥ £50.00**, otherwise **£4.95**.
  - **Promo code**: `SAVE10` gives **10% off Subtotal before VAT & shipping**.

## Prerequisites
- Node.js 18+ and npm

## Run the app
```bash
npm install
npm start
```
The Electron window will open automatically.

---

## Candidate Task

### Part 1 — Manual tests
Provide a manual test suite (Markdown/CSV/Excel) that covers some of these bullet points:
- Add to cart, adjust quantity, remove item
- Sorting and filtering interactions
- Rounding and totals (VAT, shipping threshold, promo)
- Persistence on window reload (`Ctrl/Cmd+R`)
- Negative cases (invalid promo, qty > stock, etc.)

Include: **ID, Title, Preconditions, Steps, Expected Result, Priority, Notes**.

### Part 2 — Automation (TypeScript)
Pick **Playwright** *or* **WebdriverIO** and automate **at least two** tests from your manual test suite.


Provide:
- `/manual-tests/` folder for your manual suite
- `/automation/` folder with your tests and a README explaining how to run them

### Part 3 — Submit project
Upload your project to github and share the repo with us.
