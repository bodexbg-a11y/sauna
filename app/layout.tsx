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
  title: 'ТЕПЛО — модульные сауны под ключ',
  description: 'Производим архитектурные модульные сауны и доставляем готовыми на ваш участок.',
  openGraph: {
    title: 'ТЕПЛО — модульные сауны под ключ',
    description: 'Архитектурные сауны: производство, доставка и установка на вашем участке.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ТЕПЛО — модульные сауны под ключ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ТЕПЛО — модульные сауны под ключ',
    description: 'Архитектурные сауны: производство, доставка и установка на вашем участке.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
