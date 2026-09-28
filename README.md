# Snuffle Casino — Frontend + Admin Console

This repository contains two products:

1. **Player-facing casino** (`/`) — the crypto casino & sportsbook lobby.
<img width="1680" height="945" alt="Screenshot 2026-09-28 at 17 09 24" src="https://github.com/user-attachments/assets/e952103c-4816-485c-ba30-4e7d23d963a1" />
 
2. **Casino Admin Panel** (`/admin`) — a production-quality control center.
<img width="1680" height="945" alt="Screenshot 2026-09-28 at 17 09 45" src="https://github.com/user-attachments/assets/d1f7edb0-08ce-44e7-a41c-8915f49ea40c" />


## Casino Admin Panel (`/admin`)

| Module | Highlights |
| --- | --- |
| **Dashboard** | 13 KPIs with sparklines, revenue/GGR/NGR/P&L charts, deposits vs withdrawals, top games & providers, real-time activity feed |
| **Players** | Advanced table (search, filters, sorting, pagination, bulk actions, CSV export), full profile with 11 tabs (Overview / Wallet / Transactions / Bets / Bonuses / KYC / Sessions / Devices / Responsible Gaming / Notes / Activity Log) |
| **Finance** | Deposits, withdrawals with approval workflow (review drawer, batch approve, escalate), transactions ledger with detail drawers, wallets, chargebacks |
| **Casino** | Game manager with grid/table views, featured toggles, lobby reordering, RTP configuration, providers, categories, jackpots |
| **Sportsbook** | Sports, events, markets, odds, live betting, settlement queue, suspended markets |
| **Bonuses & VIP** | Campaigns, welcome/free spins/cashback, promo codes, VIP levels & tiers, loyalty points, rewards catalog |
| **Marketing** | Banners, popups, notifications, email & push campaigns, referrals |
| **Affiliates** | Accounts, applications, tracking, commissions, payouts |
| **Reports** | Revenue/GGR-NGR/player/game/provider/payment/bonus/affiliate/financial reports with charts & exports |
| **Risk & Security** | Fraud monitoring, suspicious activity, duplicate/multi-account detection, blocklists, session management, risk rules |
| **Compliance** | KYC review queue with approve/reject drawers, AML alerts, self-exclusion, deposit/betting limits |
| **CMS** | Homepage rails, pages, menus, FAQs, blog, localization coverage, SEO settings |
| **System** | Admin users, full RBAC permission matrix (9 roles × 13 resources × 6 permissions), audit logs with value diffs, API keys, integrations, webhooks, maintenance mode |

### Architecture
```
app/admin/                    # routes (handcrafted pages + catch-all renderer)
components/ui/                # shadcn/ui-style primitives (dark casino theme)
components/admin/layout/      # shell, sidebar, topbar, command palette
components/admin/blocks/      # DataTable engine, stat cards, charts, drawers
components/admin/charts/      # Recharts wrappers (area/bar/donut/rank/sparkline)
lib/admin/nav.ts              # navigation tree (sidebar + breadcrumbs + palette)
lib/admin/registry.tsx        # config-driven page specs for every nav item
lib/admin/api.ts              # data-access layer — swap mock bodies for fetch()
lib/admin/data/world.ts      
```

## Tech Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS + shadcn/ui-style components (Radix primitives)
- Framer Motion micro-animations · Recharts analytics · Lucide icons

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000  (player site at /, admin at /admin)
npm run build && npm run start
```

## Project Structure
```
app/                  # player-facing casino pages
app/admin/            # operator console
components/           # player site components
components/ui/        # shared design-system primitives
components/admin/     # admin layout + blocks + charts
data/                 # player site data (games, providers…)
lib/admin/            # admin data layer, nav, registry
public/assets/        # static assets
```
