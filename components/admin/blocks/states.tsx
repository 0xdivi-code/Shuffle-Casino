'use client';
import { motion } from 'framer-motion';
import { Inbox, AlertTriangle, SearchX, RotateCw, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyState({ icon: Icon = Inbox, title, hint, action }: {
  icon?: LucideIcon; title: string; hint?: string; action?: { label: string; onClick: () => void };
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-adm-line bg-adm-card2">
        <Icon className="h-5 w-5 text-adm-dim" />
      </div>
      <div className="text-sm font-semibold text-adm-text">{title}</div>
      {hint && <p className="max-w-sm text-[12.5px] leading-relaxed text-adm-muted">{hint}</p>}
      {action && (
        <Button variant="secondary" size="sm" className="mt-2" onClick={action.onClick}>{action.label}</Button>
      )}
    </motion.div>
  );
}

export function ErrorState({ title = 'Something went wrong', hint, onRetry }: {
  title?: string; hint?: string; onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-adm-red/25 bg-adm-redsoft">
        <AlertTriangle className="h-5 w-5 text-adm-red" />
      </div>
      <div className="text-sm font-semibold text-adm-text">{title}</div>
      {hint && <p className="max-w-sm text-[12.5px] text-adm-muted">{hint}</p>}
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-2" onClick={onRetry}>
          <RotateCw className="h-3.5 w-3.5" /> Retry
        </Button>
      )}
    </div>
  );
}

export function SearchEmpty({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-adm-line bg-adm-card2">
        <SearchX className="h-5 w-5 text-adm-dim" />
      </div>
      <div className="text-sm font-semibold text-adm-text">No results for “{query}”</div>
      <p className="max-w-sm text-[12.5px] text-adm-muted">Try a different search term or clear the active filters.</p>
    </div>
  );
}
