import React from 'react';
import type { Preview } from '@storybook/react';
import { ZDSProvider } from '@zzem-design-system/engine';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ZDSProvider mode="light">
        <Story />
      </ZDSProvider>
    ),
  ],
};

export default preview;
