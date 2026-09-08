import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://teplo-modular-sauna.mew-77.chatgpt.site'),
  title: 'ТЕПЛО — модульні сауни під ключ в Україні',
  description: 'Виготовляємо архітектурні модульні сауни та доставляємо готовими на вашу ділянку по Україні.',
  openGraph: {
    title: 'ТЕПЛО — модульні сауни під ключ',
    description: 'Виготовлення, доставка та монтаж сучасних модульних саун по Україні.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ТЕПЛО — модульні сауни під ключ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ТЕПЛО — модульні сауни під ключ',
    description: 'Виготовлення, доставка та монтаж сучасних модульних саун по Україні.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
