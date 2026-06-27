# SigmaMedex Mobile App — SQL Integration Sandbox

A React Native + Expo mobile app for browsing the **SigmaMedex** pharmacy
catalogue. Built as a sandbox to test connecting a Microsoft SQL Server
database (from [TAFE-SQL-DDL](https://github.com/rainfantry/TAFE-SQL-DDL))
to a mobile front-end via an HTTP middle tier.

**Assessment context:**
- ICTDBS416 — Build a Database (data tier: SigmaMedex SQL schema)
- ICTPRG431 — Apply Query Language (DML queries)
- ICTPRG436 — Develop Mobile Applications (presentation tier)
- ICTPRG437 — Build a User Interface (UI rendering of pharmaceutical data)

**Author:** George Wu — TAFE NSW, 2026.

## Architecture (3-tier)

```
┌─────────────────────┐     ┌────────────────────┐     ┌─────────────────────┐
│  React Native App   │ ──> │  HTTP API tier     │ ──> │  SQL Server DB      │
│  (Expo, this repo)  │     │  (Node + Express)  │     │  (SigmaMedex DDL)   │
│  iOS / Android      │     │  localhost:3000    │     │  SSMS, localhost    │
└─────────────────────┘     └────────────────────┘     └─────────────────────┘
       fetch()                    mssql driver               TDS protocol
```

The app does NOT speak SQL directly. React Native can only speak HTTP —
this is a hard architectural constraint of mobile platforms. The API tier
is the only component that owns the SQL connection string and credentials.

## Source database

The SQL Server database is built from the DDL script at:
https://github.com/rainfantry/TAFE-SQL-DDL/blob/main/SigmaMedex_Codex.sql

Schema:
- `MedicationCategory` (30 rows) — drug category names
- `DosageForm` (22 rows) — tablet, capsule, injection, etc.
- `Medication` (415 rows) — full catalogue with prices, active ingredients,
  category FK, dosage form FK

## Status

| Tier | Status |
|---|---|
| 1. SQL DDL | Available in TAFE-SQL-DDL repo |
| 2. API tier | NOT YET BUILT |
| 3. Mobile app | Scaffold copied from EHC-MobileApp (working Expo base) |

## Tech Stack

- **React Native** with **Expo** (managed workflow, SDK 54)
- **React Navigation v7** — bottom tabs + native stack
- **React Native Paper** — Material Design UI components
- **JavaScript (ES2022+)** — async/await, hooks
- **Git + GitHub** — version control

## Installation

1. Clone:
   ```
   git clone https://github.com/rainfantry/SigmaMedex-App.git
   cd SigmaMedex-App
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npx expo start
   ```
4. Scan the QR code in Expo Go on iOS/Android, or press `w` for web.

## Project Structure

```
SigmaMedex-App/
├── App.js                      # Root component, navigation setup
├── package.json                # Dependencies
├── app.json                    # Expo configuration
├── assets/                     # Icons, splash, favicon
├── screens/
│   ├── HomeScreen.js           # Medication catalogue list
│   ├── DetailsScreen.js        # Single medication detail view
│   └── SettingsScreen.js       # App settings
└── README.md
```

## Licence

Educational sandbox. No commercial use.

---

## TODO — Release Blackops

_Automated read-only assessment — what a full public-release pass would do for this repo. Suggestions only; nothing above has been changed or removed._

- [ ] Audit git history for AI/Claude attribution; scrub if any is found.
- [ ] Add discovery topics for SEO (`gh repo edit --add-topic ...`, up to 20).
- [ ] Cut a tagged release (`v1.0.0`); attach a build artifact if this ships a binary/app.
- [ ] Add a screenshot or diagram to the README if there's a GUI or visual output.
- [ ] Verify a clean from-scratch build/run against the README quick start (produce a real artifact, don't trust the docs).

<sub>Workflow: https://github.com/rainfantry/release-blackops-skill</sub>
