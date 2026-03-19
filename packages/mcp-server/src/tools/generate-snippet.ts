export function generateSnippet(scenario: string, components?: string[]) {
  const imports = (components ?? [])
    .map((c) => c)
    .join(', ');

  return {
    snippet: `import { ${imports || 'Button'} } from '@zzem-design-system/components';
import { createStyles, useTheme } from '@zzem-design-system/engine';
import { tokens } from '@zzem-design-system/tokens';

// TODO: Implement for scenario: ${scenario}
`,
    note: 'This is a starter snippet. Customize based on the specific scenario.',
  };
}
