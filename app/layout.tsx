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
  title: 'ТЕПЛО — архітектура вашої тиші',
  description: 'Преміальні модульні сауни під ключ: персональне проєктування, виробництво, доставка та монтаж по Україні.',
  openGraph: {
    title: 'ТЕПЛО — архітектура вашої тиші',
    description: 'Преміальні модульні сауни під ключ. Створіть власний ритуал тепла.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ТЕПЛО — архітектура вашої тиші' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ТЕПЛО — архітектура вашої тиші',
    description: 'Преміальні модульні сауни під ключ. Створіть власний ритуал тепла.',
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
