/**
 * Figma Variables → @zzem-design-system/tokens sync script
 *
 * Usage: tsx figma/scripts/sync-tokens.ts
 */
import * as fs from 'fs';
import * as path from 'path';

const CONFIG_PATH = path.resolve(__dirname, '../figma.config.json');

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));

  if (!config.fileId || !config.personalAccessToken) {
    console.error('Error: Configure figma.config.json with fileId and personalAccessToken');
    process.exit(1);
  }

  console.log('Syncing Figma Variables...');
  console.log('File ID:', config.fileId);

  // TODO: Implement Figma Variables API integration
  // 1. Fetch variables from Figma
  // 2. Transform to token JSON format
  // 3. Write to packages/tokens/src/
  // 4. Run build:tokens

  console.log('Sync complete.');
}

main();
