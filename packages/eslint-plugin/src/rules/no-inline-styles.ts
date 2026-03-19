import type { Rule } from 'eslint';

export const noInlineStyles: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow inline style objects. Use createStyles from @zzem-design-system/engine.',
    },
    messages: {
      noInlineStyles:
        'Inline style object detected. Use createStyles() from @zzem-design-system/engine instead.',
    },
    schema: [],
  },
  create(context) {
    return {
      JSXAttribute(node: any) {
        if (
          node.name.name === 'style' &&
          node.value?.expression?.type === 'ObjectExpression'
        ) {
          context.report({
            node,
            messageId: 'noInlineStyles',
          });
        }
      },
    };
  },
};
