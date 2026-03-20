import type { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest-setup.ts'],
  testMatch: ['**/*.test.tsx', '**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/__template__/'],
  transformIgnorePatterns: [
    'node_modules/\\.pnpm/(?!(@react-native|react-native|@zzem-design-system))',
    'node_modules/(?!\\.pnpm|react-native|@react-native|@zzem-design-system)',
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
