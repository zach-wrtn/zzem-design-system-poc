import type { Rule } from 'eslint';

export const useDesignTokens: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce usage of @zzem-design-system/tokens for design values.',
    },
    messages: {
      useDesignTokens:
        'Use @zzem-design-system/tokens for "{{property}}" instead of a raw value.',
    },
    schema: [],
  },
  create(context) {
    const tokenProperties = ['borderRadius', 'fontSize', 'fontWeight', 'lineHeight'];

    return {
      Property(node) {
        if (
          node.key.type === 'Identifier' &&
          tokenProperties.includes(node.key.name) &&
          node.value.type === 'Literal'
        ) {
          context.report({
            node,
            messageId: 'useDesignTokens',
            data: { property: node.key.name },
          });
        }
      },
    };
  },
};
