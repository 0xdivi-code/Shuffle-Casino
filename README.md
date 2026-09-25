# Shuffle Casino Frontend – Pixel-Accurate Recreation

This is a **UI-only** frontend recreation of Shuffle.com homepage, built from the supplied `index.html` as exact design specification.

**No casino backend, gambling logic, payments, auth, wallet, game engines, sportsbook functionality, admin, APIs, deposits/withdrawals, or real-money functionality.**

## Exact Design Tokens (extracted from Shuffle CSS)

From `/_next/static/css/0660accdaeed6d09.css` (chunk 36/37):

**Colors:**
- `--color-black900: #080808` – main background (body, header)
- `--color-gray900: #121418` – search, mobile nav
- `--color-gray800: #202329` – cards, nav tabs, buttons secondary
- `--color-gray700: #2a2e38` – borders, hover, input borders
- `--color-gray600: #343843` – active tab
- `--color-gray400: #828998`, `--color-gray300: #9ba5b4`, `--color-gray200: #bec6d1`
- `--color-primaryViolet: #886cff`, `--color-primaryNeonPurple: #7717ff` – primary CTAs, hover, badges
- `--color-white: #ffffff`, `--color-black: #000000`

**Radius:**
- `--radius-sm: 0.25rem (4px)`, `--radius-sm1: 0.375rem (6px)` – buttons, inputs, small cards
- `--radius-md: 0.5rem (8px)` – game cards, banners
- `--radius-lg: 0.75rem (12px)`, `--radius-full: 100%`

**Spacing:**
- `--spacing-sm: 0.125rem (2px)` to `--spacing-xl: 3.75rem (60px)` – exact 8pt-ish scale
- Header: `--height-header: 4.75rem (76px)`, mobile nav `--height-mobile-nav: 3.6875rem`

**Fonts:**
- `--font-heading: "countach", "Aeonik", sans-serif` – Countach from Typekit `https://use.typekit.net/vtz4hie.css` (300/400/700) + Aeonik fallback
- `--font-body: "Aeonik", sans-serif` – Aeonik self-hosted from Shuffle CDN `/_next/static/media/aeonikpro-*.woff2` (100-900)
- Body uses Aeonik 400/500, headings use Countach bold

**Applied:**
- All components now use `var(--color-*)`, `var(--radius-*)`, `var(--spacing-*)`, `var(--font-*)`
- Buttons: `h-[var(--spacing-lg4)] (48px)` desktop, `rounded-[var(--radius-sm1)] (6px)`, Login = gray800 + gray700 border, Register = primaryNeonPurple #7717ff
- GameCard: `rounded-[var(--radius-md)] (8px)`, `bg-[var(--color-gray800)]`, border gray700, favorite `w-[2.25rem] h-[2.25rem] rounded-[var(--radius-sm1)]`
- Carousel titles: `fontFamily: var(--font-heading)`, size `var(--text-h3)` / `h2`

## Tech Stack
- Next.js 14 + TypeScript (App Router)
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Component-based architecture
- Fully responsive desktop/tablet/mobile

## Features Implemented
- **Exact asset reuse**: 8 promotional banners from `images.ctfassets.net`:
  - `BoostyrLevel-update9.png`, `20K-DEMONIC-DOLLS.png`, `20K-PLAYNETIC-RACE.png`, `1M_WEEKLY_AIRDROP.png`, `lot2m.png`, `100KWEEKLY_RACE.png`, `NEW_CCHALLENGES.png`, `Affiliate_Banner_ENG.png`
- **137 game cards** with exact `shuffle-com.imgix.net` URLs and border colors extracted from markup
- **SafeImage component** with 6-step fallback:
  1. Exact source URL
  2. Alternate resolution
  3. Local copy under `public/assets/`
  4. Image proxy `/api/image-proxy?url=`
  5. Category fallback (`/assets/fallbacks/game.webp`, `promotion.webp`, `logo.webp`, `avatar.webp`)
  6. Styled placeholder preserving dimensions
- **Reusable components**: Header, Sidebar, Logo, Hero, PromotionBanner, GameCard, GameCarousel (with View All card), CategoryNav, ProvidersSection, AirdropSection, Footer, GameModal
- **Data separation**: `data/games.ts`, `data/promotions.ts`, `data/gameSections.ts`, `data/navigation.ts`, `data/footerLinks.ts` with exact names from source
- **Interactions**: carousel scrolling, category tab selection, hover states, mobile hamburger + bottom nav, search UI, favorite heart toggle, mock preview modal

## Getting Started Locally

### 1. Clone the repo and checkout the branch
```bash
git clone https://github.com/0xdivi-code/shuffle-casino-frontend.git
cd shuffle-casino-frontend
git fetch origin
git checkout arena/01a0d9de-shuffle-casino-frontend
```

If you already have the repo cloned:
```bash
git fetch origin
git checkout arena/01a0d9de-shuffle-casino-frontend
git pull origin arena/01a0d9de-shuffle-casino-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run dev server
```bash
npm run dev
# App runs at http://localhost:3000
```

### 4. Build for production
```bash
npm run build
npm run start
```

### 5. Pull latest changes (collaboration / updates)
Every push to `arena/01a0d9de-shuffle-casino-frontend` can be pulled with:
```bash
git fetch origin
git pull origin arena/01a0d9de-shuffle-casino-frontend
# If you have local changes you want to discard:
git reset --hard origin/arena/01a0d9de-shuffle-casino-frontend
npm install
npm run build
```

## Project Structure
```
app/
  page.tsx              – homepage assembling all sections (uses exact tokens)
  layout.tsx            – root layout with Typekit vtz4hie.css + themeColor #7717ff
  globals.css           – exact :root tokens + Aeonik @font-face + Typekit import
  api/image-proxy/route.ts – proxy for hotlink/CORS
components/
  Header.tsx            – 76px height, black900 bg, gray700 border, sm1 radius
  Sidebar.tsx
  SafeImage.tsx
  GameCard.tsx          – 8px radius, gray800 bg, 6px fav button
  GameCarousel.tsx      – Countach headings, sm1 scroll buttons
  PromotionBanner.tsx   – md radius
  Hero.tsx
  CategoryNav.tsx
  ProvidersSection.tsx
  AirdropSection.tsx
  Footer.tsx
  GameModal.tsx
data/
  games.ts (137)
  promotions.ts (8)
  gameSections.ts (6 sections)
  navigation.ts
  footerLinks.ts
public/
  assets/fallbacks/
```

## Notes
- All buttons are UI-only, no real casino actions
- Game cards open a mock modal with "Play Now" but no gambling functionality
- Fonts: **Aeonik** (body) + **Countach** (headings) via Typekit `vtz4hie.css` – exact match to Shuffle, not Inter fallback
- Background is `#080808` (black900), not `#0a0a0f`
- Radius is `0.375rem (6px)` for buttons/inputs, `0.5rem (8px)` for cards – not 12px/14px/9999px

## Branch
All work is on `arena/01a0d9de-shuffle-casino-frontend`, branched from `c6864aa` (main).

## License
UI recreation for educational purposes only. No affiliation with Shuffle.com.
