import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthContext';
import ErrorSuppressor from '@/components/ErrorSuppressor';

export const metadata: Metadata = {
  title: 'Shuffle | Crypto Casino & Bitcoin Casino with Sportsbook',
  description: 'Play Online Crypto Casino Games at Shuffle – 15,000+ games with provably fair Originals, top slots, live casino & game shows. Instant Bitcoin & crypto deposits, instant withdrawals, huge bonuses & VIP rewards!',
  icons: {
    icon: 'https://shuffle.com/favicon.ico',
    shortcut: 'https://shuffle.com/favicon.ico',
    apple: 'https://shuffle.com/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#7717ff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="https://shuffle.com/favicon.ico" />
        <link rel="shortcut icon" href="https://shuffle.com/favicon.ico" />
        <link rel="preconnect" href="https://shuffle-com.imgix.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.ctfassets.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://shuffle.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://shuffle-com.imgix.net" />
        <link rel="dns-prefetch" href="https://images.ctfassets.net" />
        <link rel="dns-prefetch" href="https://shuffle.com" />
      </head>
      <body className="bg-[#0a0a0f] text-white antialiased min-h-screen">
        <ErrorSuppressor />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
