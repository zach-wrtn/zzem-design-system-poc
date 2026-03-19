import type { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  setupFilesAfterSetup: ['./jest-setup.ts'],
  testMatch: ['**/*.test.tsx', '**/*.test.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(@zzem-design-system|react-native|@react-native)/)',
  ],
  moduleNameMapper: {
    '@zzem-design-system/tokens/output/tokens': '<rootDir>/../tokens/output/tokens',
    '@zzem-design-system/engine': '<rootDir>/../engine/src/index',
    '@zzem-design-system/tokens': '<rootDir>/../tokens/src/index',
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__template__/',
    '/index\\.ts$/',
    '\\.stories\\.tsx$',
  ],
};

export default config;
