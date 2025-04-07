'use client';

import { SessionProvider } from "@/components/session-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeWrapper } from "@/components/theme-wrapper";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ThemeWrapper>
        <SessionProvider>
          {children}
        </SessionProvider>
      </ThemeWrapper>
    </ThemeProvider>
  );
} 