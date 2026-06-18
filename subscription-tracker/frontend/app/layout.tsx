import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../src/context/AuthContext';
import { ThemeProvider } from '../src/components/ThemeProvider';
import { ThemeToggle } from '../src/components/ThemeToggle';
import { OfflineStatus } from '../src/components/OfflineStatus';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SubGrid',
  description: 'Управляйте своими подписками',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
            <OfflineStatus />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
