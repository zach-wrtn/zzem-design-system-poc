/**
 * Figma icon export script
 *
 * Exports icons from Figma file as SVG and places them
 * in packages/icons/src/svg/ for generation.
 *
 * Usage: tsx figma/scripts/export-icons.ts
 */
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = path.resolve(__dirname, '../../packages/icons/src/svg');

async function main() {
  console.log('Exporting icons from Figma...');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // TODO: Implement Figma export API integration
  // 1. Fetch icon components from Figma
  // 2. Export as SVG
  // 3. Save to packages/icons/src/svg/
  // 4. Run pnpm generate in icons package

  console.log('Export complete.');
}

main();
