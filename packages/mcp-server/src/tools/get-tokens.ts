import * as fs from 'fs';
import * as path from 'path';

export function getTokens(category?: string, tier?: string, component?: string) {
  const tokensPath = path.resolve(__dirname, '../../../tokens/output/tokens.json');

  if (!fs.existsSync(tokensPath)) {
    return { error: 'Tokens not built. Run pnpm build:tokens first.' };
  }

  const allTokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));

  if (component) {
    return { tokens: allTokens.component?.[component] ?? {} };
  }
  if (category) {
    return { tokens: allTokens[category] ?? {} };
  }

  return { tokens: allTokens };
}
