# Cybersmart Tech Task — Jay Imbery

---

## Candidate Task Overview

This repository demonstrates both **manual and automated testing** for a shopping Electron application.

---

## Part 1 — Manual Tests

Manual test suite is available in Excel in the folder: `manual-test`

**Coverage:**
- Cart functionality  
- Sorting functionality  

> The manual tests are structured with clear preconditions, steps, expected results, and notes for QA tracking.

---

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

## Part 3 — Running Automated Tests on a Virtual Machine

**Environment:**

- Windows 11, 24H2 (Build 26100.7171)  
- Vagrant v2.4.9  
- VirtualBox v7.2.4 r170995  

**Steps to Set Up the VM:**

1. Navigate to the virtual machine folder:

```bash
cd virtual-machine
```

2. Start and provision the VM:

```bash
vagrant up
```

3. Running Automated Tests:

Normal execution (internet enabled):
```bash
powershell -ExecutionPolicy Bypass -File '.\run-tests.ps1'
```

Execution with internet blocked (via firewall):
```bash
powershell -ExecutionPolicy Bypass -File '.\run-tests.ps1'
```