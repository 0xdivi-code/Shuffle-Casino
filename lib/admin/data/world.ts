/**
 * Mock data world for the Casino Admin Panel.
 *
 * Everything here is deterministic (seeded) demo data, clearly separated from
 * integration surfaces. When a real backend is connected, replace the exports
 * in `lib/admin/api.ts` — nothing in the UI imports this file directly except
 * through that API layer.
 */
import { mulberry32, pick, rndInt, rndFloat, uid, ADMIN_NOW } from '../utils';
import { games as rawGames } from '@/data/games';

/* ------------------------------------------------------------------ types */
export type KycStatus = 'verified' | 'pending' | 'rejected' | 'unsubmitted';
export type AccountStatus = 'active' | 'suspended' | 'banned' | 'self-excluded' | 'dormant';
export type RiskLevel = 'low' | 'medium' | 'high';
export type TxStatus = 'completed' | 'pending' | 'failed' | 'reversed' | 'cancelled' | 'suspicious';
export type TxType = 'deposit' | 'withdrawal' | 'bonus' | 'adjustment' | 'chargeback';

export interface Player {
  id: string; username: string; email: string; country: string; flag: string;
  currency: string; balance: number; vipLevel: number; vipName: string;
  kyc: KycStatus; status: AccountStatus; totalDeposits: number; totalWithdrawals: number;
  ggr: number; lastLogin: string; registeredAt: string; risk: RiskLevel;
  tags: string[]; lifetimeBets: number; favoriteGame: string; twoFA: boolean;
  ip: string; device: string;
}
export interface Transaction {
  id: string; playerId: string; player: string; type: TxType; amount: number;
  currency: string; method: string; status: TxStatus; date: string; reference: string; risk?: number;
}
export interface Bet {
  id: string; playerId: string; player: string; game: string; provider: string;
  amount: number; payout: number; multiplier: number; result: 'win' | 'loss';
  time: string; status: 'settled' | 'live';
}
export interface AdminGame {
  id: string; title: string; provider: string; category: string; rtp: number;
  status: 'active' | 'disabled' | 'maintenance'; featured: boolean; popularity: number;
  launches: number; ggr7d: number; image: string; order: number;
}
export interface Provider {
  id: string; name: string; games: number; status: 'enabled' | 'disabled';
  revenueShare: number; ggr30d: number; bets30d: number; availability: number; aggregated: boolean;
}
export interface BonusCampaign {
  id: string; name: string; type: string; status: 'active' | 'scheduled' | 'paused' | 'ended';
  budget: number; claimed: number; redeemed: number; wager: number;
  starts: string; ends: string; channel: string;
}
export interface Affiliate {
  id: string; name: string; company: string; plan: 'RevShare' | 'CPA' | 'Hybrid';
  rate: string; clicks: number; registrations: number; ftds: number; revenue: number;
  commission: number; balance: number; status: 'active' | 'pending' | 'suspended'; since: string;
}
export interface AdminUser {
  id: string; name: string; email: string; role: string; status: 'active' | 'invited' | 'suspended';
  lastActive: string; twoFA: boolean;
}
export interface AuditLog {
  id: string; admin: string; action: string; resource: string; ip: string;
  time: string; before: string; after: string; result: 'success' | 'denied' | 'error';
}
export interface RiskCase {
  id: string; player: string; playerId: string; type: string; severity: 'low' | 'medium' | 'high' | 'critical';
  score: number; status: 'open' | 'investigating' | 'resolved' | 'false-positive';
  assignee: string; opened: string; signals: string[];
}
export interface KycDoc {
  id: string; player: string; playerId: string; docType: string; submitted: string;
  status: 'pending' | 'approved' | 'rejected' | 'escalated'; reviewer: string; note: string;
}
export interface SportsEvent {
  id: string; sport: string; league: string; home: string; away: string; starts: string;
  status: 'live' | 'upcoming' | 'finished'; odds: [number, number, number];
  markets: number; margin: number; suspended: boolean;
}
export interface FeedEvent {
  id: string; kind: 'registration' | 'deposit' | 'withdrawal' | 'bet' | 'win' | 'kyc' | 'system' | 'risk';
  message: string; player?: string; amount?: number; currency?: string; time: string;
}
export interface DayMetric {
  date: string; label: string; revenue: number; deposits: number; withdrawals: number;
  ggr: number; ngr: number; newPlayers: number; activePlayers: number; bets: number;
  betVolume: number; profit: number;
}

/* ------------------------------------------------------------------ pools */
const COUNTRIES: Array<[string, string]> = [
  ['BR', 'Brazil 🇧🇷'], ['DE', 'Germany 🇩🇪'], ['JP', 'Japan 🇯🇵'], ['US', 'United States 🇺🇸'],
  ['GB', 'United Kingdom 🇬🇧'], ['CA', 'Canada 🇨🇦'], ['FR', 'France 🇫🇷'], ['NL', 'Netherlands 🇳🇱'],
  ['FI', 'Finland 🇫🇮'], ['NO', 'Norway 🇳🇴'], ['AU', 'Australia 🇦🇺'], ['MX', 'Mexico 🇲🇽'],
  ['AR', 'Argentina 🇦🇷'], ['TR', 'Türkiye 🇹🇷'], ['IN', 'India 🇮🇳'], ['PH', 'Philippines 🇵🇭'],
  ['VN', 'Vietnam 🇻🇳'], ['ES', 'Spain 🇪🇸'], ['PT', 'Portugal 🇵🇹'], ['CH', 'Switzerland 🇨🇭'],
];
const FIRST = ['Lucas', 'Emma', 'Noah', 'Mia', 'Liam', 'Sofia', 'Mateo', 'Yuki', 'Hana', 'Felix', 'Aiko', 'Marco', 'Lena', 'Diego', 'Nina', 'Oliver', 'Chloe', 'Ravi', 'Elin', 'Jonas', 'Isla', 'Kenji', 'Amara', 'Theo', 'Bianca', 'Hugo', 'Freya', 'Dante', 'Alina', 'Santiago'];
const LAST = ['Silva', 'Müller', 'Tanaka', 'Johnson', 'Rossi', 'Dubois', 'Nielsen', 'Kowalski', 'Nakamura', 'García', 'Schmidt', 'Costa', 'Fernandez', 'Yamamoto', 'Berg', 'Novak', 'Larsen', 'Moreau', 'Santos', 'Weber', 'Ricci', 'Olsen', 'Pereira', 'Sato', 'Klein', 'Vargas', 'Lindberg', 'Fischer', 'Romano', 'Duarte'];
const METHODS = ['Bitcoin', 'Ethereum', 'USDT (TRC-20)', 'Litecoin', 'Visa', 'Mastercard', 'Apple Pay', 'Google Pay', 'Bank Transfer', 'Pix', 'Interac'];
const CRYPTO_METHODS = ['Bitcoin', 'Ethereum', 'USDT (TRC-20)', 'Litecoin'];
export const VIP_LEVELS = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond I', 'Diamond II', 'Diamond III', 'Royal'];
const TAGS = ['high-roller', 'bonus-hunter', 'crypto-native', 'slots-fan', 'live-casino', 'sports-bettor', 'churn-risk', 'winning-streak', 'referral', 'support-escalation'];
const DEVICES = ['iPhone 15 Pro · Safari', 'Windows 11 · Chrome', 'Pixel 9 · Chrome', 'macOS · Firefox', 'Galaxy S24 · App', 'iPad Air · Safari', 'Windows 10 · Edge'];
const GAME_NAMES = rawGames.map(g => g.title);
const GAME_PROVIDERS = rawGames.map(g => g.provider || 'Snuffle Games');

export const PROVIDER_NAMES = Array.from(new Set([...GAME_PROVIDERS.filter(Boolean), 'Snuffle Games', 'Pragmatic Play', 'Evolution', 'NetEnt', 'Hacksaw Gaming', 'Play\u2019n GO', 'Push Gaming', 'Nolimit City', 'Big Time Gaming']))
  .filter(Boolean).slice(0, 18) as string[];

/* ------------------------------------------------------------------ core entities */
const rnd = mulberry32(20260928);

export const players: Player[] = Array.from({ length: 96 }, (_, i) => {
  const first = pick(rnd, FIRST); const last = pick(rnd, LAST);
  const username = `${first.toLowerCase()}${last.toLowerCase()}${rndInt(rnd, 7, 999)}`;
  const [cc, country] = pick(rnd, COUNTRIES);
  const vip = rndInt(rnd, 0, 7);
  const statusRoll = rnd();
  const status: AccountStatus = statusRoll < 0.78 ? 'active' : statusRoll < 0.86 ? 'dormant' : statusRoll < 0.92 ? 'suspended' : statusRoll < 0.97 ? 'self-excluded' : 'banned';
  const kycRoll = rnd();
  const kyc: KycStatus = kycRoll < 0.62 ? 'verified' : kycRoll < 0.78 ? 'pending' : kycRoll < 0.88 ? 'unsubmitted' : 'rejected';
  const deposits = rndFloat(rnd, 120, 180000, 0) + vip * rndFloat(rnd, 5000, 40000, 0);
  const withdrawals = Math.round(deposits * rndFloat(rnd, 0.35, 0.92, 2));
  const tagCount = rndInt(rnd, 0, 3);
  const tags: string[] = [];
  while (tags.length < tagCount) { const t = pick(rnd, TAGS); if (!tags.includes(t)) tags.push(t); }
  return {
    id: `P-${100230 + i}`,
    username,
    email: `${username}@${pick(rnd, ['gmail.com', 'outlook.com', 'proton.me', 'yahoo.com', 'icloud.com'])}`,
    country, flag: country.split(' ')[1] || '', currency: pick(rnd, ['USD', 'USD', 'USD', 'EUR', 'BTC', 'ETH', 'USDT']),
    balance: rndFloat(rnd, 0, 42000, 2), vipLevel: vip, vipName: VIP_LEVELS[vip],
    kyc, status,
    totalDeposits: Math.round(deposits), totalWithdrawals: withdrawals,
    ggr: Math.round(deposits - withdrawals + rndFloat(rnd, -2000, 9000, 0)),
    lastLogin: new Date(ADMIN_NOW - rndInt(rnd, 1, 96) * 3600000).toISOString(),
    registeredAt: new Date(ADMIN_NOW - rndInt(rnd, 2, 1090) * 86400000).toISOString(),
    risk: rnd() < 0.72 ? 'low' : rnd() < 0.82 ? 'medium' : 'high',
    tags, lifetimeBets: rndInt(rnd, 40, 92000), favoriteGame: pick(rnd, GAME_NAMES),
    twoFA: rnd() < 0.45,
    ip: `${rndInt(rnd, 11, 223)}.${rndInt(rnd, 0, 255)}.${rndInt(rnd, 0, 255)}.${rndInt(rnd, 2, 254)}`,
    device: pick(rnd, DEVICES),
  };
});

export const transactions: Transaction[] = Array.from({ length: 480 }, (_, i) => {
  const p = pick(rnd, players);
  const type = pick(rnd, ['deposit', 'deposit', 'deposit', 'withdrawal', 'withdrawal', 'bonus', 'adjustment', 'chargeback'] as TxType[]);
  const crypto = p.currency !== 'USD' && p.currency !== 'EUR';
  const statusRoll = rnd();
  const status: TxStatus = statusRoll < 0.74 ? 'completed' : statusRoll < 0.86 ? 'pending' : statusRoll < 0.92 ? 'failed' : statusRoll < 0.96 ? 'reversed' : statusRoll < 0.985 ? 'cancelled' : 'suspicious';
  const base = type === 'bonus' ? rndFloat(rnd, 10, 500, 2) : type === 'adjustment' ? rndFloat(rnd, -800, 800, 2) : type === 'chargeback' ? -rndFloat(rnd, 40, 2200, 2) : rndFloat(rnd, 20, 25000, 2);
  return {
    id: `TX-${uid('', rnd, 9)}`,
    playerId: p.id, player: p.username, type,
    amount: base, currency: p.currency,
    method: crypto ? pick(rnd, CRYPTO_METHODS) : pick(rnd, METHODS),
    status,
    date: new Date(ADMIN_NOW - rndInt(rnd, 0, 45 * 24) * 3600000).toISOString(),
    reference: uid('', rnd, 12).toLowerCase(),
    risk: status === 'suspicious' ? rndInt(rnd, 72, 98) : rndInt(rnd, 2, 40),
  };
}).sort((a, b) => b.date.localeCompare(a.date));

export const bets: Bet[] = Array.from({ length: 420 }, () => {
  const p = pick(rnd, players);
  const gi = rndInt(rnd, 0, rawGames.length - 1);
  const amount = rndFloat(rnd, 0.5, 2500, 2);
  const win = rnd() < 0.44;
  const multiplier = win ? rndFloat(rnd, 1.05, 48, 2) : 0;
  return {
    id: `BT-${uid('', rnd, 9)}`,
    playerId: p.id, player: p.username,
    game: GAME_NAMES[gi], provider: GAME_PROVIDERS[gi] || 'Snuffle Games',
    amount, payout: win ? Number((amount * multiplier).toFixed(2)) : 0, multiplier,
    result: win ? 'win' : 'loss',
    time: new Date(ADMIN_NOW - rndInt(rnd, 0, 30 * 24) * 3600000).toISOString(),
    status: rnd() < 0.06 ? 'live' : 'settled',
  };
}).sort((a, b) => b.time.localeCompare(a.time));

export const adminGames: AdminGame[] = rawGames.slice(0, 120).map((g, i) => {
  const statusRoll = rnd();
  return {
    id: g.id, title: g.title,
    provider: g.provider || 'Snuffle Games',
    category: g.isOriginal ? 'Originals' : pick(rnd, ['Slots', 'Slots', 'Slots', 'Live Casino', 'Table Games', 'Game Shows', 'Instant Win']),
    rtp: rndFloat(rnd, 93.2, 97.8, 1),
    status: statusRoll < 0.9 ? 'active' : statusRoll < 0.96 ? 'disabled' : 'maintenance',
    featured: rnd() < 0.18,
    popularity: rndInt(rnd, 4, 100),
    launches: rndInt(rnd, 120, 480000),
    ggr7d: rndFloat(rnd, 250, 182000, 0),
    image: g.image?.alternate || g.image?.primary || '',
    order: i,
  };
});

export const providers: Provider[] = PROVIDER_NAMES.map((name, i) => ({
  id: `PRV-${100 + i}`, name,
  games: rndInt(rnd, 8, 420),
  status: rnd() < 0.92 ? 'enabled' : 'disabled',
  revenueShare: rndFloat(rnd, 8, 25, 1),
  ggr30d: rndFloat(rnd, 12000, 2400000, 0),
  bets30d: rndInt(rnd, 40000, 5200000),
  availability: rndFloat(rnd, 97.2, 100, 2),
  aggregated: rnd() < 0.4,
}));

export const campaigns: BonusCampaign[] = Array.from({ length: 26 }, (_, i) => {
  const type = pick(rnd, ['Welcome', 'Free Spins', 'Cashback', 'Reload', 'Loyalty', 'Tournament', 'Rakeback']);
  const statusRoll = rnd();
  return {
    id: `CMP-${4200 + i}`,
    name: pick(rnd, ['Neon Nights', 'Golden Rush', 'Weekend Booster', 'High Roller Boost', 'Spin Frenzy', 'Cashback Sunday', 'VIP Reload', 'Launch Week', 'Midnight Drops', 'Royal Rebate', 'Turbo Spins', 'Mega Wheel']) + ` ${rndInt(rnd, 1, 9)}`,
    type,
    status: statusRoll < 0.5 ? 'active' : statusRoll < 0.68 ? 'scheduled' : statusRoll < 0.85 ? 'paused' : 'ended',
    budget: rndFloat(rnd, 5000, 400000, 0),
    claimed: rndInt(rnd, 20, 9800),
    redeemed: rndInt(rnd, 5, 6200),
    wager: pick(rnd, [0, 1, 5, 10, 20, 25, 30, 35, 40]),
    starts: new Date(ADMIN_NOW - rndInt(rnd, 1, 90) * 86400000).toISOString(),
    ends: new Date(ADMIN_NOW + rndInt(rnd, -20, 60) * 86400000).toISOString(),
    channel: pick(rnd, ['All players', 'New players', 'VIP only', 'Dormant players', 'Depositors 30d']),
  };
});

export const affiliates: Affiliate[] = Array.from({ length: 34 }, (_, i) => {
  const plan = pick(rnd, ['RevShare', 'RevShare', 'CPA', 'Hybrid'] as const);
  const clicks = rndInt(rnd, 300, 120000);
  const regs = Math.round(clicks * rndFloat(rnd, 0.02, 0.09, 3));
  const ftds = Math.round(regs * rndFloat(rnd, 0.18, 0.55, 2));
  const revenue = rndFloat(rnd, 800, 260000, 0);
  return {
    id: `AFF-${7100 + i}`,
    name: `${pick(rnd, FIRST)} ${pick(rnd, LAST)}`,
    company: pick(rnd, ['BetStreams', 'CryptoBets Media', 'LuckyFunnel', 'SpinPress', 'OddsDaily', 'CasinoHive', 'WagerWeekly', 'TokenPlay', 'AcesReview', 'SlotSignal']),
    plan,
    rate: plan === 'CPA' ? `$${rndInt(rnd, 80, 450)} / FTD` : plan === 'RevShare' ? `${rndInt(rnd, 20, 45)}% rev share` : `${rndInt(rnd, 15, 30)}% + $${rndInt(rnd, 50, 150)}`,
    clicks, registrations: regs, ftds, revenue,
    commission: Math.round(revenue * rndFloat(rnd, 0.18, 0.45, 2)),
    balance: rndFloat(rnd, 0, 24000, 0),
    status: rnd() < 0.85 ? 'active' : rnd() < 0.6 ? 'pending' : 'suspended',
    since: new Date(ADMIN_NOW - rndInt(rnd, 30, 1200) * 86400000).toISOString(),
  };
});

export const adminUsers: AdminUser[] = [
  { id: 'ADM-1', name: 'Alexandra Voss', email: 'alexandra@shuffle.com', role: 'Super Admin', status: 'active', lastActive: new Date(ADMIN_NOW - 4 * 60000).toISOString(), twoFA: true },
  { id: 'ADM-2', name: 'Marcus Chen', email: 'marcus@shuffle.com', role: 'Admin', status: 'active', lastActive: new Date(ADMIN_NOW - 32 * 60000).toISOString(), twoFA: true },
  { id: 'ADM-3', name: 'Priya Nair', email: 'priya@shuffle.com', role: 'Finance', status: 'active', lastActive: new Date(ADMIN_NOW - 2 * 3600000).toISOString(), twoFA: true },
  { id: 'ADM-4', name: 'Tomás Herrera', email: 'tomas@shuffle.com', role: 'Support', status: 'active', lastActive: new Date(ADMIN_NOW - 18 * 60000).toISOString(), twoFA: false },
  { id: 'ADM-5', name: 'Ingrid Bergström', email: 'ingrid@shuffle.com', role: 'Risk Manager', status: 'active', lastActive: new Date(ADMIN_NOW - 26 * 3600000).toISOString(), twoFA: true },
  { id: 'ADM-6', name: 'Ken Watanabe', email: 'ken@shuffle.com', role: 'Compliance', status: 'active', lastActive: new Date(ADMIN_NOW - 8 * 3600000).toISOString(), twoFA: true },
  { id: 'ADM-7', name: 'Sofia Marino', email: 'sofia@shuffle.com', role: 'Marketing', status: 'active', lastActive: new Date(ADMIN_NOW - 3 * 86400000).toISOString(), twoFA: false },
  { id: 'ADM-8', name: 'Dmitri Volkov', email: 'dmitri@shuffle.com', role: 'Game Manager', status: 'active', lastActive: new Date(ADMIN_NOW - 5 * 3600000).toISOString(), twoFA: true },
  { id: 'ADM-9', name: 'Hannah Fischer', email: 'hannah@shuffle.com', role: 'Analyst', status: 'active', lastActive: new Date(ADMIN_NOW - 49 * 60000).toISOString(), twoFA: true },
  { id: 'ADM-10', name: 'Lucas Meyer', email: 'lucas@shuffle.com', role: 'Support', status: 'invited', lastActive: new Date(ADMIN_NOW - 6 * 86400000).toISOString(), twoFA: false },
  { id: 'ADM-11', name: 'Yara Aziz', email: 'yara@shuffle.com', role: 'Compliance', status: 'suspended', lastActive: new Date(ADMIN_NOW - 21 * 86400000).toISOString(), twoFA: false },
];

const ACTIONS = ['player.suspend', 'player.unsuspend', 'player.kyc.approve', 'player.kyc.reject', 'player.balance.adjust', 'player.note.create', 'withdrawal.approve', 'withdrawal.reject', 'game.rtp.update', 'game.disable', 'game.feature.toggle', 'game.reorder', 'campaign.create', 'campaign.pause', 'promo.create', 'affiliate.payout.approve', 'role.permissions.update', 'admin.invite', 'settings.update', 'risk.case.resolve', 'blocklist.add', 'webhook.create', 'api.key.revoke', 'cms.page.publish', 'banner.activate', 'maintenance.enable'];
const RESOURCES: Record<string, string> = { player: 'Player', withdrawal: 'Withdrawal', game: 'Game', campaign: 'Campaign', promo: 'Promo code', affiliate: 'Affiliate', role: 'Role', admin: 'Admin user', settings: 'Settings', risk: 'Risk case', blocklist: 'Blocklist', webhook: 'Webhook', api: 'API key', cms: 'CMS page', banner: 'Banner', maintenance: 'Maintenance' };

export const auditLogs: AuditLog[] = Array.from({ length: 260 }, (_, i) => {
  const a = pick(rnd, adminUsers.filter(x => x.status === 'active'));
  const action = pick(rnd, ACTIONS);
  const entity = action.split('.')[0];
  const who = action.startsWith('player') || action.startsWith('withdrawal') ? pick(rnd, players).username : entity;
  const hasDiff = /\.(update|adjust|rtp|permissions)/.test(action);
  return {
    id: `LOG-${90000 + i}`,
    admin: a.name,
    action,
    resource: `${RESOURCES[entity] || entity} · ${who}`,
    ip: `${rndInt(rnd, 11, 223)}.${rndInt(rnd, 0, 255)}.${rndInt(rnd, 0, 255)}.${rndInt(rnd, 2, 254)}`,
    time: new Date(ADMIN_NOW - i * rndInt(rnd, 4, 42) * 60000).toISOString(),
    before: hasDiff ? String(rndFloat(rnd, 1, 96, 1)) : '—',
    after: hasDiff ? String(rndFloat(rnd, 1, 96, 1)) : '—',
    result: rnd() < 0.94 ? 'success' : rnd() < 0.6 ? 'denied' : 'error',
  };
});

export const riskCases: RiskCase[] = Array.from({ length: 42 }, (_, i) => {
  const p = pick(rnd, players);
  return {
    id: `RC-${5100 + i}`,
    player: p.username, playerId: p.id,
    type: pick(rnd, ['Bonus abuse', 'Multi-accounting', 'Card testing', 'Chargeback fraud', 'Collusion', 'Velocity abuse', 'Stolen payment method', 'Arbitrage betting', 'VPN circumvention']),
    severity: pick(rnd, ['low', 'medium', 'medium', 'high', 'high', 'critical']),
    score: rndInt(rnd, 35, 99),
    status: pick(rnd, ['open', 'open', 'investigating', 'investigating', 'resolved', 'false-positive']),
    assignee: rnd() < 0.7 ? pick(rnd, ['Ingrid Bergström', 'Ken Watanabe', 'Marcus Chen']) : 'Unassigned',
    opened: new Date(ADMIN_NOW - rndInt(rnd, 0, 21 * 24) * 3600000).toISOString(),
    signals: Array.from({ length: rndInt(rnd, 1, 4) }, () => pick(rnd, ['Shared device fingerprint', 'Rapid deposit→withdrawal', 'Matched IP cluster', 'New card + max bet', 'Bonus stacked across accounts', 'Geo mismatch', 'Unusual bet sizing', 'Dormant account sudden activity'])),
  };
});

export const kycDocs: KycDoc[] = Array.from({ length: 58 }, (_, i) => {
  const p = pick(rnd, players);
  return {
    id: `DOC-${3300 + i}`,
    player: p.username, playerId: p.id,
    docType: pick(rnd, ['Passport', 'National ID', 'Driver License', 'Utility Bill', 'Bank Statement', 'Source of Funds', 'Selfie / Liveness']),
    submitted: new Date(ADMIN_NOW - rndInt(rnd, 0, 14 * 24) * 3600000).toISOString(),
    status: pick(rnd, ['pending', 'pending', 'pending', 'approved', 'approved', 'rejected', 'escalated']),
    reviewer: rnd() < 0.6 ? pick(rnd, ['Ken Watanabe', 'Yara Aziz', 'Marcus Chen']) : '—',
    note: pick(rnd, ['Awaiting review', 'Blurry image, re-request sent', 'Name mismatch on document', 'Verified against registry', 'PEP screening clear', 'Requires source of funds', 'Document expired', '']),
  };
});

const TEAMS = ['Arsenal', 'Real Madrid', 'Barcelona', 'Bayern Munich', 'Man City', 'Liverpool', 'PSG', 'Inter', 'Juventus', 'Dortmund', 'Lakers', 'Celtics', 'Warriors', 'Bucks', 'Chiefs', 'Eagles', 'Yankees', 'Dodgers', 'Nadal', 'Alcaraz', 'Djokovic', 'Sinner', 'UFC 312', 'Canelo', 'Golovkin'];
export const sportsEvents: SportsEvent[] = Array.from({ length: 64 }, (_, i) => {
  const h = pick(rnd, TEAMS); let a2 = pick(rnd, TEAMS);
  while (a2 === h) a2 = pick(rnd, TEAMS);
  const roll = rnd();
  return {
    id: `EV-${8800 + i}`,
    sport: pick(rnd, ['Soccer', 'Soccer', 'Basketball', 'Tennis', 'American Football', 'Baseball', 'MMA', 'Esports']),
    league: pick(rnd, ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'NBA', 'ATP Masters', 'NFL', 'MLB', 'UFC', 'CS2 Major']),
    home: h, away: a2,
    starts: new Date(ADMIN_NOW + rndInt(rnd, -20, 96) * 3600000).toISOString(),
    status: roll < 0.18 ? 'live' : roll < 0.72 ? 'upcoming' : 'finished',
    odds: [rndFloat(rnd, 1.2, 4.5, 2), rndFloat(rnd, 2.8, 4.2, 2), rndFloat(rnd, 1.3, 6, 2)],
    markets: rndInt(rnd, 24, 380),
    margin: rndFloat(rnd, 3.5, 8.5, 1),
    suspended: rnd() < 0.06,
  };
});

/* ------------------------------------------------------------------ time series (90 days) */
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const daily: DayMetric[] = Array.from({ length: 90 }, (_, i) => {
  const r = mulberry32(77000 + i);
  const d = new Date(ADMIN_NOW - (89 - i) * 86400000);
  const weekend = d.getUTCDay() === 0 || d.getUTCDay() === 6;
  const trend = 1 + i * 0.004;
  const deposits = Math.round((380000 + r() * 140000) * trend * (weekend ? 1.22 : 1));
  const withdrawals = Math.round(deposits * (0.52 + r() * 0.16));
  const ggr = Math.round(deposits * (0.16 + r() * 0.09));
  const ngr = Math.round(ggr * (0.74 + r() * 0.1));
  return {
    date: d.toISOString().slice(0, 10),
    label: `${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCDate()}`,
    revenue: ggr, deposits, withdrawals, ggr, ngr,
    newPlayers: Math.round((140 + r() * 160) * trend * (weekend ? 1.15 : 1)),
    activePlayers: Math.round((5200 + r() * 2400) * trend * (weekend ? 1.18 : 1)),
    bets: Math.round((168000 + r() * 90000) * trend * (weekend ? 1.2 : 1)),
    betVolume: Math.round((2100000 + r() * 900000) * trend * (weekend ? 1.25 : 1)),
    profit: Math.round(ngr - 62000 - r() * 24000),
  };
});

/* ------------------------------------------------------------------ live feed */
const feedRnd = mulberry32(4242);
let feedSeq = 0;
export function makeFeedEvent(offsetSeconds = 0, clock: number = ADMIN_NOW): FeedEvent {
  feedSeq += 1;
  const p = pick(feedRnd, players);
  const kind = pick(feedRnd, ['bet', 'bet', 'deposit', 'registration', 'withdrawal', 'win', 'kyc', 'risk', 'system'] as FeedEvent['kind'][]);
  const t = new Date(clock - offsetSeconds * 1000).toISOString();
  const base = { id: `FE-${clock}-${feedSeq}`, time: t };
  switch (kind) {
    case 'registration': return { ...base, kind, message: `New player registered from ${p.country.split(' ')[0]}`, player: p.username };
    case 'deposit': { const amt = rndFloat(feedRnd, 25, 12000, 2); return { ...base, kind, message: `Deposited via ${pick(feedRnd, METHODS)}`, player: p.username, amount: amt, currency: p.currency }; }
    case 'withdrawal': { const amt = rndFloat(feedRnd, 40, 22000, 2); return { ...base, kind, message: 'Withdrawal requested', player: p.username, amount: amt, currency: p.currency }; }
    case 'bet': { const amt = rndFloat(feedRnd, 1, 900, 2); return { ...base, kind, message: `Bet placed on ${pick(feedRnd, GAME_NAMES)}`, player: p.username, amount: amt, currency: 'USD' }; }
    case 'win': { const amt = rndFloat(feedRnd, 120, 48000, 2); return { ...base, kind, message: `Big win on ${pick(feedRnd, GAME_NAMES)}`, player: p.username, amount: amt, currency: 'USD' }; }
    case 'kyc': return { ...base, kind, message: `KYC documents submitted`, player: p.username };
    case 'risk': return { ...base, kind, message: `Risk engine flagged session (score ${rndInt(feedRnd, 60, 97)})`, player: p.username };
    default: return { ...base, kind: 'system', message: pick(feedRnd, ['Payout batch processed (142 withdrawals)', 'Game provider sync completed', 'Odds feed reconnected', 'Nightly reconciliation finished', 'Jackpot pool updated', 'CMS cache invalidated']) };
  }
}
export const initialFeed: FeedEvent[] = Array.from({ length: 18 }, (_, i) => makeFeedEvent((18 - i) * 9));

/* ------------------------------------------------------------------ misc entities */
export const banners = Array.from({ length: 14 }, (_, i) => ({
  id: `BN-${300 + i}`,
  name: pick(rnd, ['Homepage Hero', 'Casino Rail', 'Sportsbook Strip', 'VIP Lounge', 'Slots Spotlight', 'Footer CTA', 'Mobile App Push', 'Live Casino Takeover']) + ` v${rndInt(rnd, 1, 6)}`,
  placement: pick(rnd, ['Homepage', 'Casino lobby', 'Sportsbook', 'Player profile', 'Footer', 'In-game']),
  status: pick(rnd, ['live', 'live', 'scheduled', 'draft', 'paused']),
  impressions: rndInt(rnd, 4000, 1800000),
  clicks: 0, ctr: 0, starts: new Date(ADMIN_NOW - rndInt(rnd, 1, 60) * 86400000).toISOString(),
  ends: new Date(ADMIN_NOW + rndInt(rnd, 2, 45) * 86400000).toISOString(),
})).map(b => ({ ...b, clicks: Math.round(b.impressions * rndFloat(rnd, 0.008, 0.06, 4)), ctr: rndFloat(rnd, 0.8, 6, 2) }));

export const emailCampaigns = Array.from({ length: 16 }, (_, i) => ({
  id: `EM-${900 + i}`,
  subject: pick(rnd, ['🎰 Your weekend spins are here', 'VIP: exclusive cashback unlocked', 'We miss you — 50 free spins inside', 'New slots dropped this week', 'Deposit match: 100% up to $500', 'Your loyalty tier is about to expire', 'Big game tonight — boosted odds', 'Responsible gaming check-in']),
  segment: pick(rnd, ['All players', 'Active 30d', 'Dormant 60d', 'VIP Gold+', 'New registrations', 'FTD pending']),
  status: pick(rnd, ['sent', 'sent', 'scheduled', 'draft']),
  sent: rndInt(rnd, 1200, 96000), openRate: rndFloat(rnd, 18, 52, 1), clickRate: rndFloat(rnd, 1.2, 9.5, 1),
  date: new Date(ADMIN_NOW - rndInt(rnd, 0, 40) * 86400000).toISOString(),
}));

export const faqs = Array.from({ length: 12 }, (_, i) => ({
  id: `FAQ-${i + 1}`,
  q: pick(rnd, ['How fast are crypto withdrawals?', 'What is the minimum deposit?', 'How do VIP levels work?', 'Is my data secure?', 'Which currencies are supported?', 'How do I verify my account?', 'What happens if a game malfunctions?', 'Can I set deposit limits?', 'How do promo codes work?', 'Are the games provably fair?', 'How do I contact support?', 'What is the wagering requirement?']),
  category: pick(rnd, ['Payments', 'Account', 'VIP', 'Security', 'Bonuses', 'Games']),
  views: rndInt(rnd, 400, 84000), helpful: rndInt(rnd, 62, 98), status: rnd() < 0.85 ? 'published' : 'draft',
}));

export const blogPosts = Array.from({ length: 12 }, (_, i) => ({
  id: `POST-${40 + i}`,
  title: pick(rnd, ['Top 10 Slots of September', 'Behind the Scenes: Provably Fair', 'VIP Program Refresh — What Changed', 'Responsible Gaming: Our Commitment', 'Sportsbook Margins Explained', 'New Provider Onboarding: Nolimit City', 'How Our Risk Engine Works', 'Monthly Product Update', 'The Rise of Live Game Shows', 'Crypto Payments 101']),
  author: pick(rnd, adminUsers).name, status: pick(rnd, ['published', 'published', 'draft', 'scheduled']),
  date: new Date(ADMIN_NOW - rndInt(rnd, 0, 120) * 86400000).toISOString(), views: rndInt(rnd, 200, 42000),
}));

export const apiKeys = Array.from({ length: 8 }, (_, i) => ({
  id: `KEY-${i + 1}`,
  name: pick(rnd, ['Payments API', 'Game Aggregator', 'Analytics Export', 'Mobile App', 'Affiliate Postback', 'Webhook Signer', 'KYC Provider', 'Data Warehouse']),
  prefix: `sk_live_${uid('', rnd, 4).toLowerCase()}`,
  scopes: Array.from({ length: rndInt(rnd, 1, 3) }, () => pick(rnd, ['read:players', 'write:payments', 'read:games', 'write:bonuses', 'read:reports', 'admin:system'])),
  created: new Date(ADMIN_NOW - rndInt(rnd, 10, 400) * 86400000).toISOString(),
  lastUsed: new Date(ADMIN_NOW - rndInt(rnd, 0, 72) * 3600000).toISOString(),
  status: rnd() < 0.85 ? 'active' : 'revoked',
}));

export const webhooks = Array.from({ length: 9 }, (_, i) => ({
  id: `WH-${i + 1}`,
  url: `https://${pick(rnd, ['api.partner.io', 'hooks.casinoops.com', 'internal.shuffle.com', 'notify.thirdparty.dev'])}/${pick(rnd, ['v1', 'v2'])}/${pick(rnd, ['payments', 'players', 'games', 'risk', 'affiliates'])}`,
  events: Array.from({ length: rndInt(rnd, 1, 4) }, () => pick(rnd, ['deposit.completed', 'withdrawal.requested', 'player.created', 'game.round.settled', 'kyc.status.changed', 'risk.flagged'])),
  status: rnd() < 0.8 ? 'enabled' : 'disabled',
  successRate: rndFloat(rnd, 92, 100, 2),
  lastDelivery: new Date(ADMIN_NOW - rndInt(rnd, 0, 48) * 3600000).toISOString(),
}));

export const integrations = [
  { id: 'INT-1', name: 'Stripe', category: 'Payments', status: 'connected', desc: 'Card processing & chargeback handling.' },
  { id: 'INT-2', name: 'CoinsPaid', category: 'Crypto rails', status: 'connected', desc: 'BTC / ETH / USDT deposits & payouts.' },
  { id: 'INT-3', name: 'Sumsub', category: 'KYC / Identity', status: 'connected', desc: 'Automated document & liveness checks.' },
  { id: 'INT-4', name: 'Sportradar', category: 'Sportsbook feed', status: 'connected', desc: 'Odds & live event data.' },
  { id: 'INT-5', name: 'SoftSwiss Aggregator', category: 'Game aggregation', status: 'connected', desc: 'Unified game launch & wallet API.' },
  { id: 'INT-6', name: 'SendGrid', category: 'Email', status: 'connected', desc: 'Transactional & marketing email.' },
  { id: 'INT-7', name: 'Firebase FCM', category: 'Push', status: 'disconnected', desc: 'Mobile push notifications.' },
  { id: 'INT-8', name: 'Chainalysis', category: 'AML screening', status: 'connected', desc: 'Wallet risk & sanctions screening.' },
  { id: 'INT-9', name: 'Snowflake', category: 'Data warehouse', status: 'disconnected', desc: 'Analytics export pipeline.' },
];

export const jackpots = Array.from({ length: 10 }, (_, i) => ({
  id: `JP-${i + 1}`,
  name: pick(rnd, ['Mega Fortune Wheel', 'Drops & Wins Mega', 'Royal Jackpot', 'Neon Millions', 'Daily Drop', 'Lightning Pot', 'Golden Sevens', 'Cosmic Cash']),
  provider: pick(rnd, ['Pragmatic Play', 'NetEnt', 'Snuffle Games', 'Hacksaw Gaming']),
  amount: rndFloat(rnd, 8000, 4200000, 0),
  seed: rndFloat(rnd, 2000, 120000, 0),
  contribution: rndFloat(rnd, 0.5, 3.5, 2),
  lastWon: new Date(ADMIN_NOW - rndInt(rnd, 1, 90) * 86400000).toISOString(),
  status: rnd() < 0.85 ? 'running' : 'paused',
}));

export const notifications = [
  { id: 'N1', kind: 'risk', title: 'High-risk withdrawal pending review', body: 'TX-8F2K41 · $18,400 flagged by velocity rule', time: new Date(ADMIN_NOW - 6 * 60000).toISOString(), unread: true },
  { id: 'N2', kind: 'finance', title: 'Withdrawal queue above threshold', body: '8 withdrawals pending for 45+ minutes', time: new Date(ADMIN_NOW - 22 * 60000).toISOString(), unread: true },
  { id: 'N3', kind: 'system', title: 'Provider latency spike', body: 'Evolution lobby API p95 = 2.4s', time: new Date(ADMIN_NOW - 64 * 60000).toISOString(), unread: true },
  { id: 'N4', kind: 'compliance', title: 'KYC backlog growing', body: '14 documents waiting for first review', time: new Date(ADMIN_NOW - 3 * 3600000).toISOString(), unread: false },
  { id: 'N5', kind: 'marketing', title: 'Campaign "Golden Rush" paused', body: 'Budget exhausted at 98% allocation', time: new Date(ADMIN_NOW - 8 * 3600000).toISOString(), unread: false },
  { id: 'N6', kind: 'system', title: 'Nightly reconciliation complete', body: 'No discrepancies across 41,209 transactions', time: new Date(ADMIN_NOW - 26 * 3600000).toISOString(), unread: false },
];

export const promoCodes = Array.from({ length: 18 }, (_, i) => ({
  id: `PC-${700 + i}`,
  code: uid('', rnd, 7),
  reward: pick(rnd, ['100% up to $200', '50 Free Spins', '$25 No-deposit', '20% Cashback', '25 Free Spins', '75% up to $100']),
  uses: rndInt(rnd, 0, 4200), limit: pick(rnd, [500, 1000, 2500, 5000, 10000]),
  wager: pick(rnd, [10, 20, 25, 30, 35]),
  expires: new Date(ADMIN_NOW + rndInt(rnd, -10, 90) * 86400000).toISOString(),
  status: rnd() < 0.7 ? 'active' : rnd() < 0.5 ? 'expired' : 'paused',
}));

export const wallets = ['BTC', 'ETH', 'USDT', 'LTC', 'USD-FIAT', 'EUR-FIAT'].map((cur, i) => ({
  id: `WL-${i + 1}`, currency: cur,
  hotBalance: rndFloat(rnd, 120000, 9800000, 0), coldBalance: rndFloat(rnd, 900000, 64000000, 0),
  pendingOut: rndFloat(rnd, 4000, 320000, 0),
  inflow24h: rndFloat(rnd, 90000, 2400000, 0), outflow24h: rndFloat(rnd, 60000, 1900000, 0),
  utilization: rndFloat(rnd, 22, 88, 1),
}));

export const sessions = Array.from({ length: 40 }, (_, i) => {
  const p = pick(rnd, players);
  return {
    id: `SES-${uid('', rnd, 6)}`, player: p.username, playerId: p.id,
    device: p.device, ip: p.ip, location: p.country,
    started: new Date(ADMIN_NOW - rndInt(rnd, 0, 72) * 3600000).toISOString(),
    durationMin: rndInt(rnd, 2, 460), wagered: rndFloat(rnd, 5, 18000, 0),
    geoMatch: rnd() < 0.93, vpn: rnd() < 0.08,
  };
});

export const selfExclusions = Array.from({ length: 12 }, (_, i) => {
  const p = pick(rnd, players.filter(x => x.status === 'self-excluded'));
  return {
    id: `SE-${i + 1}`, player: p.username, playerId: p.id,
    type: pick(rnd, ['Self-exclusion', 'Cool-off', 'Operator exclusion']),
    started: new Date(ADMIN_NOW - rndInt(rnd, 5, 300) * 86400000).toISOString(),
    until: pick(rnd, ['Permanent', new Date(ADMIN_NOW + rndInt(rnd, 30, 365) * 86400000).toISOString()]),
    jurisdiction: pick(rnd, ['Global', 'UKGC', 'MGA', 'Curaçao']),
    marketingOptOut: true,
  };
});

export const duplicateGroups = Array.from({ length: 8 }, (_, i) => ({
  id: `DG-${i + 1}`,
  accounts: Array.from({ length: rndInt(rnd, 2, 4) }, () => pick(rnd, players)),
  matchType: pick(rnd, ['Same device fingerprint', 'Same IP cluster', 'Same payment method', 'Same payout address', 'Identity document match']),
  confidence: rndInt(rnd, 62, 99),
  status: pick(rnd, ['open', 'investigating', 'resolved', 'false-positive']),
  detected: new Date(ADMIN_NOW - rndInt(rnd, 0, 30) * 86400000).toISOString(),
}));

export const paymentMethods = METHODS.map((name, i) => ({
  id: `PM-${i + 1}`, name,
  type: CRYPTO_METHODS.includes(name) ? 'Crypto' : name.includes('card') || name.includes('Visa') || name.includes('Mastercard') ? 'Card' : name === 'Bank Transfer' ? 'Bank' : 'Wallet / APM',
  status: rnd() < 0.88 ? 'enabled' : 'disabled',
  deposits30d: rndInt(rnd, 200, 18000), volume30d: rndFloat(rnd, 120000, 9800000, 0),
  successRate: rndFloat(rnd, 88.5, 99.6, 1), avgTime: `${rndInt(rnd, 1, 48)}m`, fee: rndFloat(rnd, 0, 2.9, 2) + '%',
}));

export const cmsPages = Array.from({ length: 14 }, (_, i) => ({
  id: `PAGE-${i + 1}`,
  slug: '/' + pick(rnd, ['about', 'terms', 'privacy', 'aml-policy', 'responsible-gaming', 'vip-terms', 'bonus-terms', 'payments', 'affiliate-terms', 'self-exclusion', 'kyc-policy', 'sports-rules', 'provably-fair', 'contact']),
  title: pick(rnd, ['About Us', 'Terms of Service', 'Privacy Policy', 'AML Policy', 'Responsible Gaming', 'VIP Terms', 'Bonus Terms', 'Payments Overview', 'Affiliate Terms', 'Self-exclusion', 'KYC Policy', 'Sports Betting Rules', 'Provably Fair', 'Contact Support']),
  locale: 'en', status: rnd() < 0.85 ? 'published' : 'draft',
  updated: new Date(ADMIN_NOW - rndInt(rnd, 0, 120) * 86400000).toISOString(),
  author: pick(rnd, adminUsers).name,
}));
