export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  active?: boolean;
}

export const mainNavigation: NavLink[] = [
  { label: "Casino", href: "/casino", icon: "/icons/casino.svg", active: true },
  { label: "Sports", href: "/sports", icon: "/icons/sports.svg" },
  { label: "Promotions", href: "/promotions", icon: "/icons/promotions.svg" },
  { label: "VIP", href: "/vip", icon: "/icons/vip.svg" },
];

export const casinoNavigation: NavLink[] = [
  { label: "Home", href: "/", icon: "/icons/home.svg", active: true },
  { label: "Favourites", href: "/favourites", icon: "/icons/star.svg" },
  { label: "Latest Releases", href: "/casino/categories/latest-releases", icon: "/icons/latest-releases.svg" },
  { label: "SHFL Airdrop", href: "/airdrop", icon: "/icons/token.svg" },
  { label: "Snuffle Games", href: "/casino/providers/shuffle-games", icon: "/icons/shuffle-logo.svg" },
  { label: "Slots", href: "/casino/categories/slots", icon: "/icons/slots.svg" },
  { label: "Live Casino", href: "/casino/categories/live-casino", icon: "/icons/live-casino.svg" },
  { label: "Snuffle Picks", href: "/casino/categories/shuffle-picks", icon: "/icons/star.svg" },
  { label: "Game Shows", href: "/casino/categories/game-shows", icon: "/icons/game-show.svg" },
  { label: "Table Games", href: "/casino/categories/table-games", icon: "/icons/table-games.svg" },
  { label: "Blackjack", href: "/casino/categories/blackjack", icon: "/icons/blackjack.svg" },
  { label: "Baccarat", href: "/casino/categories/baccarat", icon: "/icons/baccarat.svg" },
  { label: "Providers", href: "/casino/providers", icon: "/icons/providers.svg" },
];

export const secondaryNavigation: NavLink[] = [
  { label: "VIP", href: "/vip", icon: "/icons/vip.svg" },
  { label: "Blog", href: "/blog", icon: "/icons/blog.svg" },
  { label: "Affiliate", href: "/affiliate", icon: "/icons/affiliate.svg" },
  { label: "Live Support", href: "/support", icon: "/icons/live-support.svg" },
];

export const topTabs: NavLink[] = [
  { label: "Casino", href: "/casino", active: true },
  { label: "Sports", href: "/sports" },
  { label: "Lottery", href: "/lottery" },
  { label: "Promotions", href: "/promotions" },
];
