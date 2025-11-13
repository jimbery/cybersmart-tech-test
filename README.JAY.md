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

## Part 1 — Manual Tests

Manual test suite is available in Excel in the folder: `manual-test`

**Coverage:**
- Cart functionality  
- Sorting functionality  

## Part 2 — Automation (TypeScript)

Automated tests have been implemented using:

- `playwright@v1.56.1`  
- `node@v22.13.0`  

**Coverage:**
- Cart functionality  

**Setup & Run:**

```bash
# Install dependencies
npm i

# Run automated tests
npm run test
```

### Part 3 - Run automated tests on virtual machine
tested on windows 11 machine 24H2 26100.7171; vagrant@v2.4.9; virtual box@v7.2.4 r170995

cd virtual-machine
vagrant up

wait for machine to power up and provision

Normal execution (internet enabled):
```bash
powershell -ExecutionPolicy Bypass -File '.\run-tests.ps1'
```

Execution with internet blocked (via firewall):
```bash
powershell -ExecutionPolicy Bypass -File '.\run-tests-no-internet.ps1'
```