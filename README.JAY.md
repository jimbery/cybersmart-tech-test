# Shopping Electron App

A tiny **Electron** desktop app (Windows/macOS/Linux).

## manual tests

## Prerequisites
- Node.js 18+ and npm

## run automated tests on local
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
done with playwright@v1.56.1 and node @v22.13.0

to install dependencies
npm i

to run tests
npm run test

### Part 3 - Run automated tests on virtual machine
tested on windows 11 machine 24H2 26100.7171; vagrant@v2.4.9; virtual box@v7.2.4 r170995

cd virtual-machine
vagrant up

wait for machine to power up and provision

to run tests in normal set up
powershell -ExecutionPolicy Bypass -File '.\run-tests.ps1'   

to run tests with internet blocked through firewall
powershell -ExecutionPolicy Bypass -File '.\run-tests-no-internet.ps1'   

