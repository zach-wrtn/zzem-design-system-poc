import type { Rule } from 'eslint';

const VALID_PROPS: Record<string, Record<string, string[]>> = {
  Button: {
    variant: ['primary', 'secondary', 'ghost', 'danger'],
    size: ['sm', 'md', 'lg'],
  },
  Badge: {
    variant: ['default', 'success', 'warning', 'danger', 'info'],
    size: ['sm', 'md'],
  },
};

export const validComponentProps: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Validate @zzem-design-system/components prop values against allowed enums.',
    },
    messages: {
      invalidPropValue:
        'Invalid value "{{value}}" for prop "{{prop}}" on {{component}}. Valid values: {{validValues}}',
    },
    schema: [],
  },
  create(context) {
    return {
      JSXOpeningElement(node: any) {
        const componentName = node.name?.name;
        if (!componentName || !VALID_PROPS[componentName]) return;

        const validProps = VALID_PROPS[componentName];

        for (const attr of node.attributes) {
          if (attr.type !== 'JSXAttribute') continue;
          const propName = attr.name?.name;
          if (!propName || !validProps[propName]) continue;

          const value = attr.value?.value;
          if (value && !validProps[propName].includes(value)) {
            context.report({
              node: attr,
              messageId: 'invalidPropValue',
              data: {
                value,
                prop: propName,
                component: componentName,
                validValues: validProps[propName].join(', '),
              },
            });
          }
        }
      },
    };
  },
};
