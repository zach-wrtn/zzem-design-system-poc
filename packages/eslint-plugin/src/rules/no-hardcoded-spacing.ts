import type { Rule } from 'eslint';

export const noHardcodedSpacing: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow hardcoded spacing values in style properties.',
    },
    messages: {
      noHardcodedSpacing:
        'Hardcoded spacing value found in "{{property}}". Use tokens.spacing instead.',
    },
    schema: [],
  },
  create(context) {
    const spacingProps = ['padding', 'margin', 'gap', 'paddingHorizontal', 'paddingVertical',
      'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
      'marginHorizontal', 'marginVertical', 'marginTop', 'marginBottom',
      'marginLeft', 'marginRight'];

    return {
      Property(node) {
        if (
          node.key.type === 'Identifier' &&
          spacingProps.includes(node.key.name) &&
          node.value.type === 'Literal' &&
          typeof node.value.value === 'number'
        ) {
          context.report({
            node,
            messageId: 'noHardcodedSpacing',
            data: { property: node.key.name },
          });
        }
      },
    };
  },
};
