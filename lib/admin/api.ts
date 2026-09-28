/**
 * Admin data-access layer.
 *
 * The UI only talks to this module. Every function simulates a network call
 * against the mock world. To connect a real backend, replace the bodies with
 * fetch() calls — signatures & return shapes are designed to stay stable.
 *
 *   e.g.  listPlayers(params) => GET /api/v1/admin/players?page=...&q=...
 */
import { sleep } from './utils';
import * as world from './data/world';
import type { Player, Transaction, Bet, AdminGame, Provider, BonusCampaign, Affiliate, AdminUser, AuditLog, RiskCase, KycDoc, SportsEvent } from './data/world';

export interface ListParams {
  page?: number;
  pageSize?: number;
  query?: string;
  sortKey?: string;
  sortDir?: 'asc' | 'desc';
  filters?: Record<string, string>;
}
export interface ListResult<T> {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
}

const LATENCY = () => 240 + Math.random() * 360;

function applyQuery<T extends Record<string, unknown>>(rows: T[], query?: string): T[] {
  if (!query?.trim()) return rows;
  const q = query.trim().toLowerCase();
  return rows.filter(r => Object.values(r).some(v => String(v ?? '').toLowerCase().includes(q)));
}

export function paginate<T extends Record<string, unknown>>(rows: T[], p: ListParams): ListResult<T> {
  const pageSize = p.pageSize ?? 10;
  let out = applyQuery(rows, p.query);
  if (p.filters) {
    for (const [k, v] of Object.entries(p.filters)) {
      if (!v || v === 'all') continue;
      out = out.filter(r => String(r[k] ?? '').toLowerCase() === v.toLowerCase());
    }
  }
  if (p.sortKey) {
    const dir = p.sortDir === 'asc' ? 1 : -1;
    out = [...out].sort((a, b) => {
      const av = a[p.sortKey!]; const bv = b[p.sortKey!];
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av ?? '').localeCompare(String(bv ?? '')) * dir;
    });
  }
  const page = p.page ?? 1;
  const total = out.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const safe = Math.min(page, pages);
  return { rows: out.slice((safe - 1) * pageSize, safe * pageSize), total, page: safe, pageSize, pages };
}

export const adminApi = {
  /* ------------------------------ players ------------------------------ */
  async listPlayers(params: ListParams): Promise<ListResult<Player>> {
    await sleep(LATENCY());
    return paginate(world.players as unknown as Record<string, unknown>[], params) as unknown as ListResult<Player>;
  },
  async getPlayer(id: string): Promise<Player | undefined> {
    await sleep(180);
    return world.players.find(p => p.id === id);
  },
  playerTransactions(playerId: string) { return world.transactions.filter(t => t.playerId === playerId); },
  playerBets(playerId: string) { return world.bets.filter(b => b.playerId === playerId); },
  playerSessions(playerId: string) { return world.sessions.filter(s => s.playerId === playerId); },

  /* ------------------------------ finance ------------------------------ */
  async listTransactions(params: ListParams & { type?: string }): Promise<ListResult<Transaction>> {
    await sleep(LATENCY());
    return paginate(world.transactions as unknown as Record<string, unknown>[], params) as unknown as ListResult<Transaction>;
  },
  async listBets(params: ListParams): Promise<ListResult<Bet>> {
    await sleep(LATENCY());
    return paginate(world.bets as unknown as Record<string, unknown>[], params) as unknown as ListResult<Bet>;
  },

  /* ------------------------------ casino ------------------------------ */
  async listGames(params: ListParams): Promise<ListResult<AdminGame>> {
    await sleep(LATENCY());
    return paginate(world.adminGames as unknown as Record<string, unknown>[], params) as unknown as ListResult<AdminGame>;
  },
  async listProviders(params: ListParams): Promise<ListResult<Provider>> {
    await sleep(LATENCY());
    return paginate(world.providers as unknown as Record<string, unknown>[], params) as unknown as ListResult<Provider>;
  },

  /* ------------------------------ sportsbook ------------------------------ */
  async listEvents(params: ListParams): Promise<ListResult<SportsEvent>> {
    await sleep(LATENCY());
    return paginate(world.sportsEvents as unknown as Record<string, unknown>[], params) as unknown as ListResult<SportsEvent>;
  },

  /* ------------------------------ bonuses & affiliates ------------------------------ */
  async listCampaigns(params: ListParams): Promise<ListResult<BonusCampaign>> {
    await sleep(LATENCY());
    return paginate(world.campaigns as unknown as Record<string, unknown>[], params) as unknown as ListResult<BonusCampaign>;
  },
  async listAffiliates(params: ListParams): Promise<ListResult<Affiliate>> {
    await sleep(LATENCY());
    return paginate(world.affiliates as unknown as Record<string, unknown>[], params) as unknown as ListResult<Affiliate>;
  },

  /* ------------------------------ risk & compliance ------------------------------ */
  async listRiskCases(params: ListParams): Promise<ListResult<RiskCase>> {
    await sleep(LATENCY());
    return paginate(world.riskCases as unknown as Record<string, unknown>[], params) as unknown as ListResult<RiskCase>;
  },
  async listKycDocs(params: ListParams): Promise<ListResult<KycDoc>> {
    await sleep(LATENCY());
    return paginate(world.kycDocs as unknown as Record<string, unknown>[], params) as unknown as ListResult<KycDoc>;
  },

  /* ------------------------------ system ------------------------------ */
  async listAdmins(params: ListParams): Promise<ListResult<AdminUser>> {
    await sleep(LATENCY());
    return paginate(world.adminUsers as unknown as Record<string, unknown>[], params) as unknown as ListResult<AdminUser>;
  },
  async listAuditLogs(params: ListParams): Promise<ListResult<AuditLog>> {
    await sleep(LATENCY());
    return paginate(world.auditLogs as unknown as Record<string, unknown>[], params) as unknown as ListResult<AuditLog>;
  },
};

/* Re-export the world for pages that render static-ish collections directly. */
export const data = world;
