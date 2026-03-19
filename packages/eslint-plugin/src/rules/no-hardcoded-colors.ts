import type { Rule } from 'eslint';

export const noHardcodedColors: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hardcoded color values. Use @zzem-design-system/tokens instead.',
    },
    messages: {
      noHardcodedColor:
        'Hardcoded color "{{value}}" found. Use a token from @zzem-design-system/tokens instead.',
    },
    schema: [],
  },
  create(context) {
    return {
      Literal(node) {
        if (typeof node.value === 'string' && /^#[0-9A-Fa-f]{3,8}$/.test(node.value)) {
          context.report({
            node,
            messageId: 'noHardcodedColor',
            data: { value: node.value },
          });
        }
      },
    };
  },
};
