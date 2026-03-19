export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/docs/getting-started' },
    ],
  },
  {
    title: 'Foundations',
    items: [
      { label: 'Color', href: '/docs/foundations/color' },
      { label: 'Typography', href: '/docs/foundations/typography' },
      { label: 'Spacing', href: '/docs/foundations/spacing' },
      { label: 'Elevation', href: '/docs/foundations/elevation' },
      { label: 'Iconography', href: '/docs/foundations/iconography' },
    ],
  },
  {
    title: 'Primitives',
    items: [
      { label: 'Box', href: '/docs/components/primitives/box' },
      { label: 'Text', href: '/docs/components/primitives/text' },
      { label: 'Pressable', href: '/docs/components/primitives/pressable' },
      { label: 'Stack', href: '/docs/components/primitives/stack' },
    ],
  },
  {
    title: 'Inputs',
    items: [
      { label: 'Button', href: '/docs/components/inputs/button' },
      { label: 'TextInput', href: '/docs/components/inputs/text-input' },
      { label: 'Checkbox', href: '/docs/components/inputs/checkbox' },
      { label: 'Switch', href: '/docs/components/inputs/switch' },
      { label: 'IconButton', href: '/docs/components/inputs/icon-button' },
      { label: 'RadioGroup', href: '/docs/components/inputs/radio-group' },
    ],
  },
  {
    title: 'Display',
    items: [
      { label: 'Avatar', href: '/docs/components/display/avatar' },
      { label: 'Badge', href: '/docs/components/display/badge' },
      { label: 'Card', href: '/docs/components/display/card' },
      { label: 'Tag', href: '/docs/components/display/tag' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { label: 'Toast', href: '/docs/components/feedback/toast' },
      { label: 'Dialog', href: '/docs/components/feedback/dialog' },
      { label: 'BottomSheet', href: '/docs/components/feedback/bottom-sheet' },
      { label: 'Snackbar', href: '/docs/components/feedback/snackbar' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { label: 'Divider', href: '/docs/components/layout/divider' },
      { label: 'Spacer', href: '/docs/components/layout/spacer' },
      { label: 'SafeArea', href: '/docs/components/layout/safe-area' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { label: 'Header', href: '/docs/components/navigation/header' },
      { label: 'TabBar', href: '/docs/components/navigation/tab-bar' },
      { label: 'NavigationBar', href: '/docs/components/navigation/navigation-bar' },
    ],
  },
  {
    title: 'Patterns',
    items: [
      { label: 'Form Patterns', href: '/docs/patterns/form-patterns' },
      { label: 'List Patterns', href: '/docs/patterns/list-patterns' },
      { label: 'Navigation Patterns', href: '/docs/patterns/navigation-patterns' },
    ],
  },
  {
    title: 'Guidelines',
    items: [
      { label: 'Accessibility', href: '/docs/guidelines/accessibility' },
      { label: 'Animation', href: '/docs/guidelines/animation' },
      { label: 'Platform-Specific', href: '/docs/guidelines/platform-specific' },
    ],
  },
];
