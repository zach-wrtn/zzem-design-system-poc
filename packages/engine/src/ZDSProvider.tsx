import React, { createContext, useMemo } from 'react';
import { tokens, type Tokens } from '@zzem-design-system/tokens/output/tokens';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  tokens: Tokens;
  mode: ThemeMode;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ZDSProviderProps {
  mode?: ThemeMode;
  children: React.ReactNode;
}

export const ZDSProvider = ({ mode = 'light', children }: ZDSProviderProps) => {
  const value = useMemo<ThemeContextValue>(
    () => ({
      tokens,
      mode,
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
