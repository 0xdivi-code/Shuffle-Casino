"use client";

import type { LucideIcon } from 'lucide-react';
import {
  Bell,
  ChevronRight,
  Gift,
  HandCoins,
  History,
  Landmark,
  LifeBuoy,
  Settings,
  ShieldCheck,
  UserRound,
  WalletCards,
  Coins,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export const accountNav = [
  { label: 'Wallet', href: '/wallet', icon: WalletCards },
  { label: 'VIP', href: '/vip-program', icon: Gift },
  { label: 'Vault', href: '/vault', icon: Landmark },
  { label: 'Token', href: '/token', icon: Coins },
  { label: 'Affiliate Program', href: '/affiliate/overview', icon: HandCoins },
  { label: 'Notifications', href: '/notifications', icon: Bell },
  { label: 'Transactions', href: '/transactions', icon: History },
  { label: 'Redeem Code', href: '/redeem', icon: Gift },
  { label: 'Settings', href: '/settings/account', icon: Settings },
  { label: 'Shuffle Wise', href: '/shuffle-wise/self-exclusion', icon: ShieldCheck },
  { label: 'Live Support', href: '/support', icon: LifeBuoy },
];

export function PageTitle({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[24px] font-bold tracking-[-0.02em] text-white sm:text-[28px]">{title}</h1>
        {description && <p className="mt-1 max-w-[680px] text-[13px] leading-5 text-[#85859f] sm:text-[14px]">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-[14px] border border-[#262633] bg-[#15151d] ${className}`}>{children}</section>;
}

export function AccountPage({
  children,
  title,
  description,
  icon: Icon = UserRound,
}: {
  children: ReactNode;
  title: string;
  description?: string;
  icon?: LucideIcon;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full max-w-[1120px]">
      <PageTitle title={title} description={description} />
      <div className="grid items-start gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="hidden overflow-hidden rounded-[14px] border border-[#252532] bg-[#14141c] lg:block">
          <div className="flex items-center gap-3 border-b border-[#252532] px-4 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#252533] text-[#a887ff]">
              <Icon size={18} />
            </div>
            <div>
              <p className="text-[13px] font-bold text-white">Your account</p>
              <p className="text-[11px] text-[#66667d]">Manage &amp; explore</p>
            </div>
          </div>
          <nav className="p-2">
            {accountNav.map((item) => {
              const active = pathname === item.href || (item.href !== '/wallet' && pathname.startsWith(item.href.split('/').slice(0, 2).join('/')));
              const NavIcon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`mb-0.5 flex h-10 items-center gap-3 rounded-[9px] px-3 text-[12px] font-medium transition-colors ${active ? 'bg-[#7729f5] text-white' : 'text-[#85859b] hover:bg-[#20202b] hover:text-white'}`}
                >
                  <NavIcon size={16} strokeWidth={1.8} />
                  <span className="flex-1">{item.label}</span>
                  {active && <ChevronRight size={14} />}
                </a>
              );
            })}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={onChange} className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-[#7717ff]' : 'bg-[#30303e]'}`}>
      <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

export function PrimaryButton({ children, onClick, disabled = false, type = 'button', className = '' }: { children: ReactNode; onClick?: () => void; disabled?: boolean; type?: 'button' | 'submit'; className?: string }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`inline-flex h-10 items-center justify-center gap-2 rounded-[9px] bg-[#7717ff] px-5 text-[13px] font-bold text-white transition-colors hover:bg-[#8b3dff] disabled:cursor-not-allowed disabled:bg-[#30303c] disabled:text-[#66667b] ${className}`}>
      {children}
    </button>
  );
}

export function EmptyState({ icon: Icon, title, text, action }: { icon: LucideIcon; title: string; text: string; action?: ReactNode }) {
  return (
    <div className="flex min-h-[270px] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#30303d] bg-[#20202a] text-[#85859d]">
        <Icon size={24} strokeWidth={1.7} />
      </div>
      <h2 className="text-[16px] font-bold text-white">{title}</h2>
      <p className="mt-2 max-w-[380px] text-[13px] leading-5 text-[#717188]">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
