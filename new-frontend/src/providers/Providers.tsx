'use client';

import { ReactNode } from 'react';

import { AuthProvider } from '@providers/AuthProvider';
import { DarkModeProvider } from '@providers/DarkModeProvider';
import { MediaQueryProvider } from '@providers/MediaQueryProvider';
import { ModalProvider } from '@providers/ModalProvider';
import { ThemeProvider } from '@providers/ThemeProvider';
import { ToastProvider } from '@providers/ToastProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <DarkModeProvider>
      <ThemeProvider>
        <MediaQueryProvider>
          <AuthProvider>
            <ToastProvider>
              <ModalProvider>{children}</ModalProvider>
            </ToastProvider>
          </AuthProvider>
        </MediaQueryProvider>
      </ThemeProvider>
    </DarkModeProvider>
  );
}
