import {
  LayoutDashboard, Users, Dices, Trophy, Wallet, Gift, Crown, Megaphone, Share2,
  BarChart3, ShieldAlert, ScrollText, LayoutTemplate, Settings, type LucideIcon,
} from 'lucide-react';

export interface NavItem { title: string; href: string; badge?: string | number; dot?: boolean }
export interface NavSection { id: string; title: string; icon: LucideIcon; items: NavItem[] }

export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard,
    items: [
      { title: 'Overview', href: '/admin/dashboard' },
      { title: 'Revenue', href: '/admin/dashboard/revenue' },
      { title: 'Player Activity', href: '/admin/dashboard/player-activity' },
      { title: 'Deposits', href: '/admin/dashboard/deposits' },
      { title: 'Withdrawals', href: '/admin/dashboard/withdrawals' },
      { title: 'Bets', href: '/admin/dashboard/bets' },
      { title: 'GGR / NGR', href: '/admin/dashboard/ggr-ngr' },
      { title: 'Profit & Loss', href: '/admin/dashboard/profit-loss' },
      { title: 'Real-time Activity', href: '/admin/dashboard/real-time', dot: true },
    ],
  },
  {
    id: 'players', title: 'Players', icon: Users,
    items: [
      { title: 'All Players', href: '/admin/players' },
      { title: 'KYC Verification', href: '/admin/players/kyc', badge: 14 },
      { title: 'VIP Management', href: '/admin/players/vip' },
      { title: 'Segmentation', href: '/admin/players/segmentation' },
      { title: 'Player Activity', href: '/admin/players/activity' },
      { title: 'Login & Device History', href: '/admin/players/login-history' },
      { title: 'Transaction History', href: '/admin/players/transactions' },
      { title: 'Betting History', href: '/admin/players/betting-history' },
      { title: 'Responsible Gaming', href: '/admin/players/responsible-gaming' },
      { title: 'Suspensions & Bans', href: '/admin/players/suspensions' },
      { title: 'Notes & Tags', href: '/admin/players/notes' },
    ],
  },
  {
    id: 'casino', title: 'Casino', icon: Dices,
    items: [
      { title: 'Games', href: '/admin/casino/games' },
      { title: 'Game Providers', href: '/admin/casino/providers' },
      { title: 'Game Categories', href: '/admin/casino/categories' },
      { title: 'Game Configuration', href: '/admin/casino/configuration' },
      { title: 'Game Availability', href: '/admin/casino/availability' },
      { title: 'Featured Games', href: '/admin/casino/featured' },
      { title: 'Game Ordering', href: '/admin/casino/ordering' },
      { title: 'RTP Configuration', href: '/admin/casino/rtp' },
      { title: 'Jackpots', href: '/admin/casino/jackpots' },
      { title: 'Game Analytics', href: '/admin/casino/analytics' },
    ],
  },
  {
    id: 'sportsbook', title: 'Sportsbook', icon: Trophy,
    items: [
      { title: 'Sports', href: '/admin/sportsbook/sports' },
      { title: 'Events', href: '/admin/sportsbook/events' },
      { title: 'Markets', href: '/admin/sportsbook/markets' },
      { title: 'Betting Slips', href: '/admin/sportsbook/betting-slips' },
      { title: 'Live Betting', href: '/admin/sportsbook/live-betting', dot: true },
      { title: 'Odds Management', href: '/admin/sportsbook/odds' },
      { title: 'Sportsbook Providers', href: '/admin/sportsbook/providers' },
      { title: 'Bet Settlement', href: '/admin/sportsbook/settlement', badge: 6 },
      { title: 'Suspended Markets', href: '/admin/sportsbook/suspended', badge: 3 },
    ],
  },
  {
    id: 'finance', title: 'Finance', icon: Wallet,
    items: [
      { title: 'Deposits', href: '/admin/finance/deposits' },
      { title: 'Withdrawals', href: '/admin/finance/withdrawals', badge: 8 },
      { title: 'Transactions', href: '/admin/finance/transactions' },
      { title: 'Payment Methods', href: '/admin/finance/payment-methods' },
      { title: 'Payment Providers', href: '/admin/finance/payment-providers' },
      { title: 'Bonuses', href: '/admin/finance/bonuses' },
      { title: 'Promo Codes', href: '/admin/finance/promo-codes' },
      { title: 'Wallets', href: '/admin/finance/wallets' },
      { title: 'Balances', href: '/admin/finance/balances' },
      { title: 'Chargebacks', href: '/admin/finance/chargebacks', badge: 2 },
      { title: 'Financial Reports', href: '/admin/finance/reports' },
    ],
  },
  {
    id: 'bonuses', title: 'Bonuses & Promotions', icon: Gift,
    items: [
      { title: 'Bonus Campaigns', href: '/admin/bonuses/campaigns' },
      { title: 'Welcome Bonuses', href: '/admin/bonuses/welcome' },
      { title: 'Free Spins', href: '/admin/bonuses/free-spins' },
      { title: 'Cashback', href: '/admin/bonuses/cashback' },
      { title: 'Loyalty Rewards', href: '/admin/bonuses/loyalty' },
      { title: 'Promo Codes', href: '/admin/bonuses/promo-codes' },
      { title: 'Campaign Performance', href: '/admin/bonuses/performance' },
      { title: 'Bonus Rules', href: '/admin/bonuses/rules' },
    ],
  },
  {
    id: 'vip', title: 'VIP & Loyalty', icon: Crown,
    items: [
      { title: 'VIP Levels', href: '/admin/vip/levels' },
      { title: 'Player Tiers', href: '/admin/vip/tiers' },
      { title: 'Loyalty Points', href: '/admin/vip/points' },
      { title: 'Rewards', href: '/admin/vip/rewards' },
      { title: 'VIP Bonuses', href: '/admin/vip/bonuses' },
      { title: 'VIP Activity', href: '/admin/vip/activity' },
    ],
  },
  {
    id: 'marketing', title: 'Marketing', icon: Megaphone,
    items: [
      { title: 'Banners', href: '/admin/marketing/banners' },
      { title: 'Popups', href: '/admin/marketing/popups' },
      { title: 'Notifications', href: '/admin/marketing/notifications' },
      { title: 'Announcements', href: '/admin/marketing/announcements' },
      { title: 'Email Campaigns', href: '/admin/marketing/email' },
      { title: 'Push Notifications', href: '/admin/marketing/push' },
      { title: 'Affiliate Campaigns', href: '/admin/marketing/affiliate-campaigns' },
      { title: 'Referral Programs', href: '/admin/marketing/referrals' },
    ],
  },
  {
    id: 'affiliates', title: 'Affiliates', icon: Share2,
    items: [
      { title: 'Affiliate Accounts', href: '/admin/affiliates/accounts' },
      { title: 'Applications', href: '/admin/affiliates/applications', badge: 5 },
      { title: 'Tracking', href: '/admin/affiliates/tracking' },
      { title: 'Referral Statistics', href: '/admin/affiliates/statistics' },
      { title: 'Commissions', href: '/admin/affiliates/commissions' },
      { title: 'Payouts', href: '/admin/affiliates/payouts' },
      { title: 'Affiliate Reports', href: '/admin/affiliates/reports' },
    ],
  },
  {
    id: 'reports', title: 'Reports & Analytics', icon: BarChart3,
    items: [
      { title: 'Revenue Reports', href: '/admin/reports/revenue' },
      { title: 'GGR / NGR', href: '/admin/reports/ggr-ngr' },
      { title: 'Player Reports', href: '/admin/reports/players' },
      { title: 'Game Performance', href: '/admin/reports/game-performance' },
      { title: 'Provider Performance', href: '/admin/reports/provider-performance' },
      { title: 'Payment Reports', href: '/admin/reports/payments' },
      { title: 'Bonus Reports', href: '/admin/reports/bonuses' },
      { title: 'Affiliate Reports', href: '/admin/reports/affiliates' },
      { title: 'Financial Reports', href: '/admin/reports/financial' },
      { title: 'Custom Analytics', href: '/admin/reports/custom' },
    ],
  },
  {
    id: 'risk', title: 'Risk & Security', icon: ShieldAlert,
    items: [
      { title: 'Fraud Monitoring', href: '/admin/risk/fraud' },
      { title: 'Suspicious Activity', href: '/admin/risk/suspicious', badge: 7 },
      { title: 'Duplicate Accounts', href: '/admin/risk/duplicates' },
      { title: 'Multi-account Detection', href: '/admin/risk/multi-account' },
      { title: 'Chargeback Monitoring', href: '/admin/risk/chargebacks' },
      { title: 'IP / Device Monitoring', href: '/admin/risk/ip-device' },
      { title: 'Risk Rules', href: '/admin/risk/rules' },
      { title: 'Blocklists', href: '/admin/risk/blocklists' },
      { title: 'Session Management', href: '/admin/risk/sessions' },
    ],
  },
  {
    id: 'compliance', title: 'Compliance', icon: ScrollText,
    items: [
      { title: 'KYC', href: '/admin/compliance/kyc', badge: 14 },
      { title: 'AML Monitoring', href: '/admin/compliance/aml' },
      { title: 'Player Verification', href: '/admin/compliance/verification' },
      { title: 'Documents', href: '/admin/compliance/documents' },
      { title: 'Self-exclusion', href: '/admin/compliance/self-exclusion' },
      { title: 'Deposit Limits', href: '/admin/compliance/deposit-limits' },
      { title: 'Betting Limits', href: '/admin/compliance/betting-limits' },
      { title: 'Responsible Gaming', href: '/admin/compliance/responsible-gaming' },
      { title: 'Compliance Reports', href: '/admin/compliance/reports' },
    ],
  },
  {
    id: 'cms', title: 'CMS', icon: LayoutTemplate,
    items: [
      { title: 'Homepage', href: '/admin/cms/homepage' },
      { title: 'Pages', href: '/admin/cms/pages' },
      { title: 'Menus', href: '/admin/cms/menus' },
      { title: 'Game Categories', href: '/admin/cms/game-categories' },
      { title: 'Banners', href: '/admin/cms/banners' },
      { title: 'FAQs', href: '/admin/cms/faqs' },
      { title: 'Blog / News', href: '/admin/cms/blog' },
      { title: 'Localization', href: '/admin/cms/localization' },
      { title: 'SEO Settings', href: '/admin/cms/seo' },
    ],
  },
  {
    id: 'system', title: 'System', icon: Settings,
    items: [
      { title: 'Admin Users', href: '/admin/system/admins' },
      { title: 'Roles & Permissions', href: '/admin/system/roles' },
      { title: 'Audit Logs', href: '/admin/system/audit-logs' },
      { title: 'API Keys', href: '/admin/system/api-keys' },
      { title: 'Integrations', href: '/admin/system/integrations' },
      { title: 'Webhooks', href: '/admin/system/webhooks' },
      { title: 'Notifications', href: '/admin/system/notifications' },
      { title: 'System Settings', href: '/admin/system/settings' },
      { title: 'Maintenance Mode', href: '/admin/system/maintenance' },
      { title: 'Localization', href: '/admin/system/localization' },
      { title: 'Currency Settings', href: '/admin/system/currency' },
      { title: 'Timezone Settings', href: '/admin/system/timezone' },
    ],
  },
];

export interface Crumb { title: string; href?: string }
export function getBreadcrumbs(pathname: string): Crumb[] {
  const crumbs: Crumb[] = [{ title: 'Home', href: '/admin/dashboard' }];
  for (const section of NAV_SECTIONS) {
    const match = section.items.find(i => pathname === i.href || (pathname.startsWith(i.href + '/') && i.href !== '/admin/players'));
    if (match) {
      crumbs.push({ title: section.title, href: section.items[0].href });
      crumbs.push({ title: match.title, href: match.href });
      return crumbs;
    }
  }
  // player profile & other dynamic pages
  if (pathname.startsWith('/admin/players/')) {
    crumbs.push({ title: 'Players', href: '/admin/players' });
    crumbs.push({ title: 'Player Profile' });
    return crumbs;
  }
  return crumbs;
}

export const ALL_NAV_ITEMS = NAV_SECTIONS.flatMap(s => s.items.map(i => ({ ...i, section: s.title })));
