export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Provably Fair", href: "/provably-fair" },
      { label: "Live Support", href: "/support" },
    ]
  },
  {
    title: "Platform",
    links: [
      { label: "VIP Club", href: "/vip" },
      { label: "Affiliate", href: "/affiliate" },
      { label: "Blog", href: "/blog" },
      { label: "SHFL Token", href: "/token" },
    ]
  },
  {
    title: "Policy",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Responsible Gaming", href: "/responsible-gaming" },
      { label: "AML Policy", href: "/aml" },
    ]
  },
  {
    title: "Community",
    links: [
      { label: "Twitter", href: "https://x.com/shufflecom" },
      { label: "Discord", href: "https://discord.gg/shuffle" },
      { label: "Telegram", href: "https://t.me/shuffle" },
      { label: "Instagram", href: "https://instagram.com/shufflecom" },
    ]
  }
];

export const cryptoIcons = [
  "btc", "eth", "usdt", "usdc", "shfl", "sol", "ltc", "xrp", "trx", "doge", "matic", "bnb"
];
