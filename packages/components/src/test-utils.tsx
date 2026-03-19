import React from 'react';
import { render, type RenderOptions } from '@testing-library/react-native';
import { ZDSProvider } from '@zzem-design-system/engine';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <ZDSProvider mode="light">{children}</ZDSProvider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
