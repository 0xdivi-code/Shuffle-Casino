# Shuffle Casino 
![Uploading Screenshot 2026-09-27 at 10.09.32.png…]()

## Tech Stack
- Next.js 14 + TypeScript (App Router)
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Component-based architecture
- Fully responsive desktop/tablet/mobile


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
