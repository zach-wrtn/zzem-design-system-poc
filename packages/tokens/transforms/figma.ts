// Figma Variables sync transform
// Converts @zzem-design-system/tokens JSON to Figma Variables format

import * as fs from 'fs';
import * as path from 'path';

interface FigmaVariable {
  name: string;
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING';
  valuesByMode: Record<string, unknown>;
}

function tokenToFigmaVariables(
  tokens: Record<string, unknown>,
  prefix: string = '',
): FigmaVariable[] {
  const variables: FigmaVariable[] = [];

  for (const [key, value] of Object.entries(tokens)) {
    const name = prefix ? `${prefix}/${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      variables.push(...tokenToFigmaVariables(value as Record<string, unknown>, name));
    } else {
      const resolvedType: 'COLOR' | 'FLOAT' | 'STRING' =
        typeof value === 'string' && value.startsWith('#')
          ? 'COLOR'
          : typeof value === 'number'
            ? 'FLOAT'
            : 'STRING';

      variables.push({
        name,
        resolvedType,
        valuesByMode: { default: value },
      });
    }
  }

  return variables;
}

function main() {
  const tokensPath = path.resolve(__dirname, '../output/tokens.json');

  if (!fs.existsSync(tokensPath)) {
    console.error('Error: tokens.json not found. Run build first.');
    process.exit(1);
  }

  const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
  const variables = tokenToFigmaVariables(tokens);

  const output = {
    version: '1.0',
    variables,
  };

  fs.writeFileSync(
    path.resolve(__dirname, '../output/figma-variables.json'),
    JSON.stringify(output, null, 2),
  );

  console.log(`Figma variables generated: ${variables.length} variables`);
}

main();
