#!/usr/bin/env node

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

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { getComponent } from './tools/get-component';
import { getTokens } from './tools/get-tokens';
import { validateUsage } from './tools/validate-usage';
import { generateSnippet } from './tools/generate-snippet';
import { getGuidelines } from './tools/get-guidelines';

const server = new Server(
  {
    name: '@zzem-design-system/mcp-server',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'zds_get_component',
      description:
        'Get zzem-design-system component props, tokens, guidelines, and code examples.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          name: {
            type: 'string',
            description: 'Component name (e.g., Button, TextInput)',
          },
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
      description:
        'Query zzem-design-system design token values with category/tier filtering.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          category: {
            type: 'string',
            enum: ['color', 'typography', 'spacing', 'radius', 'elevation'],
          },
          tier: {
            type: 'string',
            enum: ['primitive', 'semantic', 'component'],
          },
          component: {
            type: 'string',
            description: 'Component name (for component tier)',
          },
        },
      },
    },
    {
      name: 'zds_validate_usage',
      description: 'Validate code snippet against zzem-design-system rules.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          code: {
            type: 'string',
            description: 'Code snippet to validate',
          },
          componentName: {
            type: 'string',
            description: 'Component being used',
          },
        },
        required: ['code'],
      },
    },
    {
      name: 'zds_generate_snippet',
      description:
        'Generate zzem-design-system component code for a given scenario.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          scenario: {
            type: 'string',
            description: 'Usage scenario description',
          },
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
        type: 'object' as const,
        properties: {
          query: {
            type: 'string',
            description: 'Search keyword',
          },
          category: {
            type: 'string',
            enum: ['foundations', 'components', 'patterns', 'accessibility'],
            description: 'Search scope',
          },
        },
        required: ['query'],
      },
    },
  ],
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'zds_get_component': {
      const result = getComponent(
        args?.name as string,
        args?.section as string | undefined,
      );
      return {
        content: [
          {
            type: 'text' as const,
            text:
              'error' in result
                ? `Error: ${result.error}`
                : result.content ?? '',
          },
        ],
      };
    }

    case 'zds_get_tokens': {
      const result = getTokens(
        args?.category as string | undefined,
        args?.tier as string | undefined,
        args?.component as string | undefined,
      );
      return {
        content: [
          {
            type: 'text' as const,
            text:
              'error' in result
                ? `Error: ${result.error}`
                : JSON.stringify(result.tokens, null, 2),
          },
        ],
      };
    }

    case 'zds_validate_usage': {
      const result = validateUsage(args?.code as string);
      return {
        content: [
          {
            type: 'text' as const,
            text: result.valid
              ? 'Validation passed. No issues found.'
              : `Validation failed:\n${result.issues.map((i) => `- ${i}`).join('\n')}`,
          },
        ],
      };
    }

    case 'zds_generate_snippet': {
      const result = generateSnippet(
        args?.scenario as string,
        args?.components as string[] | undefined,
      );
      return {
        content: [
          {
            type: 'text' as const,
            text: `${result.snippet}\n\n${result.note}`,
          },
        ],
      };
    }

    case 'zds_search_guidelines': {
      const results = getGuidelines(
        args?.query as string,
        args?.category as string | undefined,
      );
      return {
        content: [
          {
            type: 'text' as const,
            text:
              results.length === 0
                ? `No guidelines found for "${args?.query}"`
                : results
                    .map((r) => `## ${r.file}\n${r.excerpt}`)
                    .join('\n\n---\n\n'),
          },
        ],
      };
    }

    default:
      return {
        content: [
          {
            type: 'text' as const,
            text: `Unknown tool: ${name}`,
          },
        ],
        isError: true,
      };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('MCP Server failed to start:', error);
  process.exit(1);
});
