import { Footer } from '@layouts/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import { Header } from 'src/components/layouts/Header';

import './globals.css';
import Loading from './loading';

import { Providers } from '@providers/Providers';

const inter = Inter({ subsets: ['latin'] });

const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <GoogleAnalytics gaId={NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string} />
        <Providers>
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
