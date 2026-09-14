import type { Metadata } from 'next';
import { QueryProvider } from '@/providers/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Patoughi Driver',
  description: 'Find loads and place bids.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="shell">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
