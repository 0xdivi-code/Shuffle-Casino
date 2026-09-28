'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight,
  Download, X, ArrowUpRight, type LucideIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Drawer, DrawerContent } from '@/components/ui/sheet';
import { EmptyState, SearchEmpty } from './states';
import type { ListParams, ListResult } from '@/lib/admin/api';
import { cn, downloadCSV } from '@/lib/admin/utils';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  width?: string;
  hideBelow?: 'sm' | 'md' | 'lg' | 'xl';
  render?: (row: T) => React.ReactNode;
  csv?: (row: T) => string | number;
}
export interface FilterSpec { key: string; label: string; options: Array<string | { value: string; label: string }> }
export interface BulkAction { label: string; icon?: LucideIcon; variant?: 'default' | 'danger' | 'secondary'; onClick: (rows: unknown[]) => void }

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  fetch: (params: ListParams) => Promise<ListResult<T>>;
  searchPlaceholder?: string;
  filters?: FilterSpec[];
  bulkActions?: BulkAction[];
  rowDetail?: (row: T, close: () => void) => React.ReactNode;
  rowLink?: (row: T) => string;
  exportName?: string;
  defaultSort?: { key: string; dir: 'asc' | 'desc' };
  defaultPageSize?: number;
  toolbarExtra?: React.ReactNode;
  idKey?: string;
  refreshKey?: number;
}

const hideCls = { sm: 'hidden sm:table-cell', md: 'hidden md:table-cell', lg: 'hidden lg:table-cell', xl: 'hidden xl:table-cell' };

export function DataTable<T extends Record<string, unknown>>(props: DataTableProps<T>) {
  const {
    columns, fetch, searchPlaceholder = 'Search…', filters, bulkActions, rowDetail,
    rowLink, exportName = 'export', defaultSort, defaultPageSize = 10, toolbarExtra, idKey = 'id', refreshKey = 0,
  } = props;
  const router = useRouter();

  const [rows, setRows] = React.useState<T[]>([]);
  const [total, setTotal] = React.useState(0);
  const [pages, setPages] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(defaultPageSize);
  const [query, setQuery] = React.useState('');
  const [debounced, setDebounced] = React.useState('');
  const [sortKey, setSortKey] = React.useState(defaultSort?.key);
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>(defaultSort?.dir ?? 'desc');
  const [filterVals, setFilterVals] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [drawerRow, setDrawerRow] = React.useState<T | null>(null);
  const [exporting, setExporting] = React.useState(false);
  const firstLoad = React.useRef(true);

  React.useEffect(() => {
    const t = setTimeout(() => { setDebounced(query); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const doFetch = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch({ page, pageSize, query: debounced, sortKey, sortDir, filters: filterVals });
      setRows(res.rows);
      setTotal(res.total);
      setPages(res.pages);
      setPage(res.page);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
      firstLoad.current = false;
    }
  }, [fetch, page, pageSize, debounced, sortKey, sortDir, filterVals]);

  React.useEffect(() => { doFetch(); }, [doFetch, refreshKey]);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const allSelected = rows.length > 0 && rows.every(r => selected.has(String(r[idKey])));
  const someSelected = rows.some(r => selected.has(String(r[idKey])));
  const toggleAll = () => {
    setSelected(prev => {
      const next = new Set(prev);
      if (allSelected) rows.forEach(r => next.delete(String(r[idKey])));
      else rows.forEach(r => next.add(String(r[idKey])));
      return next;
    });
  };
  const toggleOne = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const onRowClick = (row: T) => {
    if (rowDetail) setDrawerRow(row);
    else if (rowLink) router.push(rowLink(row));
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await fetch({ page: 1, pageSize: 5000, query: debounced, sortKey, sortDir, filters: filterVals });
      const cols = columns.map(c => ({ key: c.key, label: c.label }));
      const data = res.rows.map(r => {
        const o: Record<string, unknown> = {};
        columns.forEach(c => { o[c.key] = c.csv ? c.csv(r) : (r[c.key] as unknown); });
        return o;
      });
      downloadCSV(exportName, cols, data);
      toast.success(`Exported ${res.rows.length} rows to CSV`);
    } catch {
      toast.error('Export failed');
    } finally {
      setExporting(false);
    }
  };

  const selectedRows = rows.filter(r => selected.has(String(r[idKey])));
  const activeFilters = Object.entries(filterVals).filter(([, v]) => v && v !== 'all');

  return (
    <div className="overflow-hidden rounded-adm-lg border border-adm-line bg-adm-card shadow-adm">
      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-adm-line p-3">
        <div className="relative min-w-[180px] flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-adm-dim" />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder={searchPlaceholder} className="h-9 pl-8" />
        </div>
        {filters?.map(f => (
          <Select key={f.key} value={filterVals[f.key] ?? 'all'} onValueChange={v => { setFilterVals(prev => ({ ...prev, [f.key]: v })); setPage(1); }}>
            <SelectTrigger className="h-9 w-auto min-w-[130px]">
              <SelectValue placeholder={f.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {f.label.toLowerCase()}</SelectItem>
              {f.options.map(o => {
                const value = typeof o === 'string' ? o : o.value;
                const label = typeof o === 'string' ? o : o.label;
                return <SelectItem key={value} value={value}>{label}</SelectItem>;
              })}
            </SelectContent>
          </Select>
        ))}
        <div className="ml-auto flex items-center gap-2">
          {toolbarExtra}
          <Button variant="secondary" size="default" onClick={handleExport} disabled={exporting} className="h-9">
            <Download className="h-3.5 w-3.5" /> {exporting ? 'Exporting…' : 'Export CSV'}
          </Button>
        </div>
      </div>

      {/* active filter chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 border-b border-adm-line px-3 py-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-adm-dim">Filters:</span>
          {activeFilters.map(([k, v]) => (
            <button
              key={k}
              onClick={() => setFilterVals(prev => ({ ...prev, [k]: 'all' }))}
              className="inline-flex items-center gap-1 rounded-md border border-adm-brand/30 bg-adm-brandsoft px-2 py-0.5 text-[11px] font-medium text-adm-brand2 transition-colors hover:border-adm-brand/60"
            >
              {filters?.find(f => f.key === k)?.label}: {v}
              <X className="h-3 w-3" />
            </button>
          ))}
          <button onClick={() => setFilterVals({})} className="ml-1 text-[11px] text-adm-dim underline-offset-2 hover:text-adm-muted hover:underline">Clear all</button>
        </div>
      )}

      {/* bulk bar */}
      <AnimatePresence>
        {selected.size > 0 && bulkActions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-adm-brand/25 bg-adm-brandsoft"
          >
            <div className="flex flex-wrap items-center gap-2 px-3 py-2">
              <span className="text-xs font-medium text-adm-brand2">{selected.size} selected</span>
              <div className="mx-1 h-4 w-px bg-adm-line2" />
              {bulkActions.map(ba => (
                <Button
                  key={ba.label} size="sm"
                  variant={ba.variant === 'danger' ? 'danger' : ba.variant === 'secondary' ? 'secondary' : 'default'}
                  onClick={() => ba.onClick(selectedRows)}
                >
                  {ba.icon && <ba.icon className="h-3.5 w-3.5" />} {ba.label}
                </Button>
              ))}
              <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setSelected(new Set())}>
                <X className="h-3.5 w-3.5" /> Clear
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* table */}
      <div className={cn('transition-opacity duration-200', loading && !firstLoad.current && 'opacity-55')}>
        <Table>
          <TableHeader>
            <TableRow>
              {(bulkActions || rowDetail) && (
                <TableHead className="w-10">
                  {bulkActions && <Checkbox checked={allSelected ? true : someSelected ? 'indeterminate' : false} onCheckedChange={toggleAll} aria-label="Select all" />}
                </TableHead>
              )}
              {columns.map(c => (
                <TableHead key={c.key} className={cn(c.align === 'right' && 'text-right', c.align === 'center' && 'text-center', c.hideBelow && hideCls[c.hideBelow], c.width)}>
                  {c.sortable ? (
                    <button onClick={() => toggleSort(c.key)} className="inline-flex items-center gap-1 uppercase tracking-[.08em] transition-colors hover:text-adm-muted">
                      {c.label}
                      {sortKey === c.key
                        ? sortDir === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                        : <ChevronsUpDown className="h-3 w-3 opacity-50" />}
                    </button>
                  ) : c.label}
                </TableHead>
              ))}
              {rowLink && <TableHead className="w-10" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && firstLoad.current ? (
              Array.from({ length: Math.min(pageSize, 8) }).map((_, i) => (
                <TableRow key={i}>
                  {(bulkActions || rowDetail) && <TableCell><div className="adm-skeleton h-4 w-4 rounded" /></TableCell>}
                  {columns.map(c => (
                    <TableCell key={c.key} className={cn(c.hideBelow && hideCls[c.hideBelow])}>
                      <div className="adm-skeleton h-4 rounded" style={{ width: `${55 + ((i * 13 + c.key.length * 7) % 40)}%` }} />
                    </TableCell>
                  ))}
                  {rowLink && <TableCell><div className="adm-skeleton h-4 w-4 rounded" /></TableCell>}
                </TableRow>
              ))
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 2} className="p-0">
                  {debounced ? <SearchEmpty query={debounced} /> : <EmptyState title="No records found" hint="There are no records matching the current criteria yet." />}
                </TableCell>
              </TableRow>
            ) : (
              rows.map(row => {
                const rid = String(row[idKey]);
                const clickable = !!rowDetail || !!rowLink;
                return (
                  <TableRow
                    key={rid}
                    className={cn('adm-row-hover', clickable && 'cursor-pointer', selected.has(rid) && 'bg-[rgba(139,92,246,0.13)]')}
                    onClick={() => clickable && onRowClick(row)}
                  >
                    {(bulkActions || rowDetail) && (
                      <TableCell onClick={e => e.stopPropagation()}>
                        {bulkActions ? <Checkbox checked={selected.has(rid)} onCheckedChange={() => toggleOne(rid)} aria-label="Select row" /> : null}
                      </TableCell>
                    )}
                    {columns.map(c => (
                      <TableCell key={c.key} className={cn(c.align === 'right' && 'text-right', c.align === 'center' && 'text-center', c.hideBelow && hideCls[c.hideBelow], 'whitespace-nowrap')}>
                        {c.render ? c.render(row) : <span className="tnum">{String(row[c.key] ?? '—')}</span>}
                      </TableCell>
                    ))}
                    {rowLink && (
                      <TableCell onClick={e => e.stopPropagation()}>
                        <button onClick={() => router.push(rowLink(row))} className="rounded-md p-1 text-adm-dim transition-colors hover:bg-white/[.06] hover:text-adm-brand2" aria-label="Open">
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-adm-line px-3 py-2.5">
        <div className="flex items-center gap-2 text-xs text-adm-dim">
          <span className="tnum">{total.toLocaleString()} records</span>
          <span className="hidden items-center gap-1.5 sm:flex">
            · Rows per page
            <Select value={String(pageSize)} onValueChange={v => { setPageSize(Number(v)); setPage(1); }}>
              <SelectTrigger className="h-7 w-[64px] text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[10, 25, 50, 100].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
              </SelectContent>
            </Select>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="iconSm" disabled={page <= 1} onClick={() => setPage(p => p - 1)} aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></Button>
          {pageNumbers(page, pages).map((p, i) =>
            p === '…' ? (
              <span key={`gap${i}`} className="px-1 text-xs text-adm-dim">…</span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p as number)}
                className={cn('tnum h-7 min-w-[28px] rounded-lg px-1.5 text-xs font-medium transition-colors', p === page ? 'bg-adm-brand text-white' : 'text-adm-muted hover:bg-white/[.05] hover:text-adm-text')}
              >
                {p}
              </button>
            )
          )}
          <Button variant="ghost" size="iconSm" disabled={page >= pages} onClick={() => setPage(p => p + 1)} aria-label="Next page"><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* detail drawer */}
      {rowDetail && (
        <Drawer open={!!drawerRow} onOpenChange={o => !o && setDrawerRow(null)}>
          <DrawerContent width="max-w-[540px]">
            {drawerRow && rowDetail(drawerRow, () => setDrawerRow(null))}
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}

function pageNumbers(current: number, total: number): Array<number | '…'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: Array<number | '…'> = [1];
  if (current > 3) out.push('…');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) out.push(i);
  if (current < total - 2) out.push('…');
  out.push(total);
  return out;
}
