/**
 * Token build script wrapper
 *
 * Usage: pnpm build:tokens
 */
import { execSync } from 'child_process';
import * as path from 'path';

const tokensDir = path.resolve(__dirname, '../packages/tokens');

console.log('Building tokens...');
execSync('tsx transforms/react-native.ts', { cwd: tokensDir, stdio: 'inherit' });
console.log('Token build complete.');
