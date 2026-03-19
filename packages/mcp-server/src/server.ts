/**
 * @zzem-design-system/mcp-server
 *
 * MCP Server providing AI agents with access to:
 * - Component specs (props, tokens, guidelines)
 * - Design token values
 * - Usage validation
 * - Code snippet generation
 * - Guideline search
 */

import * as fs from 'fs';
import * as path from 'path';

// Tool definitions for the MCP server
const tools = [
  {
    name: 'zds_get_component',
    description: 'Get zzem-design-system component props, tokens, guidelines, and code examples.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Component name (e.g., Button, TextInput)' },
        section: {
          type: 'string',
          enum: ['all', 'props', 'tokens', 'guidelines', 'examples', 'dos-donts'],
          description: 'Section to retrieve',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'zds_get_tokens',
    description: 'Query zzem-design-system design token values with category/tier filtering.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['color', 'typography', 'spacing', 'radius', 'elevation'],
        },
        tier: { type: 'string', enum: ['primitive', 'semantic', 'component'] },
        component: { type: 'string', description: 'Component name (for component tier)' },
      },
    },
  },
  {
    name: 'zds_validate_usage',
    description: 'Validate code snippet against zzem-design-system rules.',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Code snippet to validate' },
        componentName: { type: 'string', description: 'Component being used' },
      },
      required: ['code'],
    },
  },
  {
    name: 'zds_generate_snippet',
    description: 'Generate zzem-design-system component code for a given scenario.',
    inputSchema: {
      type: 'object',
      properties: {
        scenario: { type: 'string', description: 'Usage scenario description' },
        components: {
          type: 'array',
          items: { type: 'string' },
          description: 'Components to use',
        },
      },
      required: ['scenario'],
    },
  },
  {
    name: 'zds_search_guidelines',
    description: 'Search zzem-design-system design guidelines and patterns.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search keyword' },
        category: {
          type: 'string',
          enum: ['foundations', 'components', 'patterns', 'accessibility'],
        },
      },
      required: ['query'],
    },
  },
];

// Handler implementations
function handleGetComponent(name: string, section: string = 'all') {
  const docsPath = path.resolve(__dirname, '../../../docs/components');
  const componentDocPath = path.join(docsPath, `${name.toLowerCase()}.md`);

  if (fs.existsSync(componentDocPath)) {
    return fs.readFileSync(componentDocPath, 'utf-8');
  }

  return `Component "${name}" documentation not found. Available components can be found in docs/components/`;
}

function handleGetTokens(category?: string, tier?: string, component?: string) {
  const tokensPath = path.resolve(__dirname, '../../tokens/output/tokens.json');

  if (!fs.existsSync(tokensPath)) {
    return 'Tokens not built. Run pnpm build:tokens first.';
  }

  const allTokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));

  if (component) {
    return JSON.stringify(allTokens.component?.[component] ?? {}, null, 2);
  }
  if (category) {
    return JSON.stringify(allTokens[category] ?? {}, null, 2);
  }

  return JSON.stringify(allTokens, null, 2);
}

function handleValidateUsage(code: string) {
  const issues: string[] = [];

  // Check for hardcoded colors
  const hexPattern = /#[0-9A-Fa-f]{3,8}/g;
  const hexMatches = code.match(hexPattern);
  if (hexMatches) {
    issues.push(`Hardcoded colors found: ${hexMatches.join(', ')}. Use tokens instead.`);
  }

  // Check for hardcoded spacing
  const spacingPattern = /padding:\s*\d+|margin:\s*\d+/g;
  const spacingMatches = code.match(spacingPattern);
  if (spacingMatches) {
    issues.push(`Hardcoded spacing found: ${spacingMatches.join(', ')}. Use spacing tokens.`);
  }

  // Check for StyleSheet.create
  if (code.includes('StyleSheet.create')) {
    issues.push('StyleSheet.create is forbidden. Use createStyles from @zzem-design-system/engine.');
  }

  // Check for Platform.OS direct usage
  if (code.includes('Platform.OS')) {
    issues.push('Direct Platform.OS usage is forbidden. Use platform.select() from @zzem-design-system/engine.');
  }

  // Check for default export
  if (code.includes('export default')) {
    issues.push('Default exports are forbidden. Use named exports only.');
  }

  if (issues.length === 0) {
    return 'Validation passed. No issues found.';
  }

  return `Validation failed:\n${issues.map((i) => `- ${i}`).join('\n')}`;
}

function handleSearchGuidelines(query: string, category?: string) {
  const docsRoot = path.resolve(__dirname, '../../../docs');
  const searchDirs = category ? [path.join(docsRoot, category)] : [docsRoot];
  const results: { file: string; content: string }[] = [];

  for (const dir of searchDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir, { recursive: true }) as string[];
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const fullPath = path.join(dir, file);
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (content.toLowerCase().includes(query.toLowerCase())) {
        results.push({ file, content });
      }
    }
  }

  if (results.length === 0) {
    return `No guidelines found for "${query}"`;
  }

  return results.map((r) => `## ${r.file}\n${r.content}`).join('\n\n---\n\n');
}

console.log('zzem-design-system MCP Server');
console.log('Tools available:', tools.map((t) => t.name).join(', '));

export { tools, handleGetComponent, handleGetTokens, handleValidateUsage, handleSearchGuidelines };
