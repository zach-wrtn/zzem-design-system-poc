export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface ComponentData {
  name: string;
  description: string;
  importPath: string;
  category: string;
  props: ComponentProp[];
  usage: string;
  dos: string[];
  donts: string[];
}

const components: Record<string, ComponentData> = {
  box: {
    name: 'Box',
    description: 'Basic layout container that wraps React Native View with design system conventions.',
    importPath: "import { Box } from '@zzem-design-system/components';",
    category: 'primitives',
    props: [
      { name: 'children', type: 'React.ReactNode', description: 'Content to render inside the box.' },
      { name: 'style', type: 'ViewStyle', description: 'Style override.' },
      { name: 'testID', type: 'string', description: 'Test identifier.' },
    ],
    usage: `<Box style={{ padding: tokens.spacing[16] }}>
  <Text>Content inside a Box</Text>
</Box>`,
    dos: ['Use Box as a layout container', 'Apply spacing via tokens'],
    donts: ['Don\'t use inline colors', 'Don\'t nest Box deeply without purpose'],
  },
  text: {
    name: 'Text',
    description: 'Typography component with 11 predefined variants for consistent text rendering.',
    importPath: "import { Text } from '@zzem-design-system/components';",
    category: 'primitives',
    props: [
      { name: 'variant', type: "'heading-xl' | 'heading-lg' | 'heading-md' | 'heading-sm' | 'body-lg' | 'body-md' | 'body-sm' | 'label-lg' | 'label-md' | 'label-sm' | 'caption'", default: "'body-md'", description: 'Typography variant.' },
      { name: 'color', type: 'string', description: 'Text color override.' },
      { name: 'align', type: "'left' | 'center' | 'right'", description: 'Text alignment.' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Text content.' },
    ],
    usage: `<Text variant="heading-lg">Welcome</Text>
<Text variant="body-md" align="center">
  Description text here.
</Text>`,
    dos: ['Use semantic variants for consistency', 'Use design token colors'],
    donts: ['Don\'t hardcode font sizes', 'Don\'t use inline color hex values'],
  },
  pressable: {
    name: 'Pressable',
    description: 'Touch-interactive wrapper with haptic feedback on iOS and ripple on Android.',
    importPath: "import { Pressable } from '@zzem-design-system/components';",
    category: 'primitives',
    props: [
      { name: 'onPress', type: '() => void', description: 'Press handler.' },
      { name: 'disabled', type: 'boolean', description: 'Disable interaction.' },
      { name: 'children', type: 'React.ReactNode | ((state: { pressed: boolean }) => React.ReactNode)', description: 'Content or render function.' },
      { name: 'style', type: 'ViewStyle | ((state: { pressed: boolean }) => ViewStyle)', description: 'Style or style function.' },
    ],
    usage: `<Pressable onPress={() => console.log('pressed')}>
  <Text>Tap me</Text>
</Pressable>`,
    dos: ['Use for custom interactive areas', 'Provide accessibility labels'],
    donts: ['Don\'t use for standard buttons (use Button)', 'Don\'t forget accessibility'],
  },
  stack: {
    name: 'Stack',
    description: 'Flexible layout component with direction, gap, and alignment. Also exports HStack and VStack shorthand.',
    importPath: "import { Stack, HStack, VStack } from '@zzem-design-system/components';",
    category: 'primitives',
    props: [
      { name: 'direction', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'Layout direction.' },
      { name: 'gap', type: 'number', default: '0', description: 'Gap between children.' },
      { name: 'align', type: 'FlexAlignType', description: 'Cross-axis alignment.' },
      { name: 'justify', type: 'string', description: 'Main-axis alignment.' },
      { name: 'wrap', type: 'boolean', default: 'false', description: 'Enable flex wrap.' },
    ],
    usage: `<VStack gap={12}>
  <Text>First</Text>
  <Text>Second</Text>
</VStack>

<HStack gap={8} align="center">
  <Avatar initials="ZD" size="sm" />
  <Text>Username</Text>
</HStack>`,
    dos: ['Use HStack/VStack for clear intent', 'Use gap instead of margin between children'],
    donts: ['Don\'t use nested Stacks when a single Stack suffices'],
  },
  button: {
    name: 'Button',
    description: 'Primary action trigger with 4 variants, 3 sizes, loading, and full-width support.',
    importPath: "import { Button } from '@zzem-design-system/components';",
    category: 'inputs',
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: 'Visual variant.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading indicator.' },
      { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretch to container width.' },
      { name: 'onPress', type: '() => void', description: 'Press handler.' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Button label.' },
      { name: 'iconLeft', type: 'React.ReactNode', description: 'Icon before label.' },
      { name: 'iconRight', type: 'React.ReactNode', description: 'Icon after label.' },
    ],
    usage: `<Button variant="primary" size="md" onPress={handleSubmit}>
  Submit
</Button>

<Button variant="danger" loading={isDeleting}>
  Delete
</Button>`,
    dos: ['Use primary for main CTA', 'Use loading state during async operations', 'Provide clear action labels'],
    donts: ['Don\'t use more than one primary button per view', 'Don\'t use danger variant casually'],
  },
  'text-input': {
    name: 'TextInput',
    description: 'Text field with label, helper text, error states, and icon slots.',
    importPath: "import { TextInput } from '@zzem-design-system/components';",
    category: 'inputs',
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size.' },
      { name: 'label', type: 'string', description: 'Field label.' },
      { name: 'helperText', type: 'string', description: 'Guidance text below input.' },
      { name: 'error', type: 'string', description: 'Error message (replaces helper).' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input.' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
    ],
    usage: `<TextInput
  label="Email"
  placeholder="you@example.com"
  helperText="We'll never share your email."
/>

<TextInput
  label="Password"
  error="Password must be at least 8 characters."
/>`,
    dos: ['Always include a label', 'Show error messages clearly'],
    donts: ['Don\'t use placeholder as label replacement', 'Don\'t show helper and error simultaneously'],
  },
  checkbox: {
    name: 'Checkbox',
    description: 'Binary toggle with label support and accessible states.',
    importPath: "import { Checkbox } from '@zzem-design-system/components';",
    category: 'inputs',
    props: [
      { name: 'checked', type: 'boolean', required: true, description: 'Checked state.' },
      { name: 'onChange', type: '(value: boolean) => void', required: true, description: 'Change handler.' },
      { name: 'label', type: 'string', description: 'Checkbox label.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    ],
    usage: `<Checkbox
  checked={agreed}
  onChange={setAgreed}
  label="I agree to the terms"
/>`,
    dos: ['Always provide a label', 'Use for binary choices'],
    donts: ['Don\'t use for mutually exclusive options (use RadioGroup)'],
  },
  switch: {
    name: 'Switch',
    description: 'Toggle switch for on/off settings.',
    importPath: "import { Switch } from '@zzem-design-system/components';",
    category: 'inputs',
    props: [
      { name: 'value', type: 'boolean', required: true, description: 'Switch state.' },
      { name: 'onValueChange', type: '(value: boolean) => void', required: true, description: 'Change handler.' },
      { name: 'label', type: 'string', description: 'Switch label.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    ],
    usage: `<Switch
  value={darkMode}
  onValueChange={setDarkMode}
  label="Dark Mode"
/>`,
    dos: ['Use for immediate effect toggles', 'Provide a label'],
    donts: ['Don\'t use for form submissions (use Checkbox)'],
  },
  'icon-button': {
    name: 'IconButton',
    description: 'Icon-only button with filled, outlined, and ghost variants.',
    importPath: "import { IconButton } from '@zzem-design-system/components';",
    category: 'inputs',
    props: [
      { name: 'variant', type: "'filled' | 'outlined' | 'ghost'", default: "'ghost'", description: 'Visual variant.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
      { name: 'icon', type: 'React.ReactNode', required: true, description: 'Icon element.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
      { name: 'onPress', type: '() => void', description: 'Press handler.' },
      { name: 'accessibilityLabel', type: 'string', required: true, description: 'Screen reader label.' },
    ],
    usage: `<IconButton
  icon={<CloseIcon />}
  accessibilityLabel="Close"
  onPress={handleClose}
/>`,
    dos: ['Always provide accessibilityLabel', 'Use ghost for toolbar actions'],
    donts: ['Don\'t omit accessibility label', 'Don\'t use without clear icon meaning'],
  },
  'radio-group': {
    name: 'RadioGroup',
    description: 'Single-select option group with vertical/horizontal layout.',
    importPath: "import { RadioGroup } from '@zzem-design-system/components';",
    category: 'inputs',
    props: [
      { name: 'options', type: 'RadioOption[]', required: true, description: 'Available options.' },
      { name: 'value', type: 'string', required: true, description: 'Selected value.' },
      { name: 'onChange', type: '(value: string) => void', required: true, description: 'Change handler.' },
      { name: 'label', type: 'string', description: 'Group label.' },
      { name: 'direction', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all options.' },
    ],
    usage: `<RadioGroup
  label="Size"
  options={[
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ]}
  value={size}
  onChange={setSize}
/>`,
    dos: ['Provide a group label', 'Use for 2-5 mutually exclusive options'],
    donts: ['Don\'t use for binary choices (use Switch or Checkbox)'],
  },
  avatar: {
    name: 'Avatar',
    description: 'User avatar showing an image or initials fallback in 5 sizes.',
    importPath: "import { Avatar } from '@zzem-design-system/components';",
    category: 'display',
    props: [
      { name: 'source', type: 'ImageSourcePropType', description: 'Image source.' },
      { name: 'initials', type: 'string', description: 'Fallback initials (max 2 chars).' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Avatar size.' },
      { name: 'accessibilityLabel', type: 'string', description: 'Screen reader label.' },
    ],
    usage: `<Avatar source={{ uri: user.avatarUrl }} size="lg" />
<Avatar initials="ZD" size="md" />`,
    dos: ['Provide accessibilityLabel with user name', 'Use initials as fallback'],
    donts: ['Don\'t use more than 2 initial characters'],
  },
  badge: {
    name: 'Badge',
    description: 'Status indicator with 5 semantic variants and 2 sizes.',
    importPath: "import { Badge } from '@zzem-design-system/components';",
    category: 'display',
    props: [
      { name: 'variant', type: "'default' | 'success' | 'warning' | 'danger' | 'info'", default: "'default'", description: 'Semantic variant.' },
      { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Badge size.' },
      { name: 'label', type: 'string', required: true, description: 'Badge text.' },
    ],
    usage: `<Badge variant="success" label="Active" />
<Badge variant="danger" size="sm" label="Error" />`,
    dos: ['Use semantic variants consistently', 'Keep labels short'],
    donts: ['Don\'t use as a button replacement'],
  },
  card: {
    name: 'Card',
    description: 'Content container with elevation, border, and optional press interaction.',
    importPath: "import { Card } from '@zzem-design-system/components';",
    category: 'display',
    props: [
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Card content.' },
      { name: 'onPress', type: '() => void', description: 'Makes card pressable.' },
      { name: 'accessibilityLabel', type: 'string', description: 'Screen reader label.' },
    ],
    usage: `<Card>
  <Text variant="heading-sm">Card Title</Text>
  <Text>Card description text.</Text>
</Card>`,
    dos: ['Use for grouping related content', 'Add accessibilityLabel when pressable'],
    donts: ['Don\'t nest cards inside cards'],
  },
  tag: {
    name: 'Tag',
    description: 'Categorization label with 5 variants and optional close button.',
    importPath: "import { Tag } from '@zzem-design-system/components';",
    category: 'display',
    props: [
      { name: 'label', type: 'string', required: true, description: 'Tag text.' },
      { name: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'danger'", default: "'default'", description: 'Tag variant.' },
      { name: 'closable', type: 'boolean', default: 'false', description: 'Show close button.' },
      { name: 'onClose', type: '() => void', description: 'Close handler.' },
    ],
    usage: `<Tag label="React Native" variant="primary" />
<Tag label="Removable" closable onClose={handleRemove} />`,
    dos: ['Use for categorization and filtering', 'Keep labels concise'],
    donts: ['Don\'t use as status indicators (use Badge)'],
  },
  toast: {
    name: 'Toast',
    description: 'Temporary notification with auto-dismiss, 4 variants, and optional action.',
    importPath: "import { Toast } from '@zzem-design-system/components';",
    category: 'feedback',
    props: [
      { name: 'message', type: 'string', required: true, description: 'Toast message.' },
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'Toast variant.' },
      { name: 'position', type: "'top' | 'bottom'", default: "'bottom'", description: 'Display position.' },
      { name: 'visible', type: 'boolean', required: true, description: 'Show/hide toast.' },
      { name: 'duration', type: 'number', default: '3000', description: 'Auto-dismiss ms (0 = manual).' },
      { name: 'onDismiss', type: '() => void', description: 'Dismiss handler.' },
      { name: 'actionLabel', type: 'string', description: 'Action button text.' },
      { name: 'onAction', type: '() => void', description: 'Action handler.' },
    ],
    usage: `<Toast
  message="Changes saved successfully."
  variant="success"
  visible={showToast}
  onDismiss={() => setShowToast(false)}
/>`,
    dos: ['Use for non-critical confirmations', 'Keep messages brief'],
    donts: ['Don\'t use for critical errors (use Dialog)', 'Don\'t stack multiple toasts'],
  },
  dialog: {
    name: 'Dialog',
    description: 'Modal dialog with title, message, and configurable action buttons.',
    importPath: "import { Dialog } from '@zzem-design-system/components';",
    category: 'feedback',
    props: [
      { name: 'visible', type: 'boolean', required: true, description: 'Show/hide dialog.' },
      { name: 'title', type: 'string', required: true, description: 'Dialog title.' },
      { name: 'message', type: 'string', description: 'Dialog message.' },
      { name: 'actions', type: 'DialogAction[]', default: '[]', description: 'Action buttons.' },
      { name: 'onDismiss', type: '() => void', description: 'Backdrop dismiss handler.' },
    ],
    usage: `<Dialog
  visible={showDialog}
  title="Delete item?"
  message="This action cannot be undone."
  actions={[
    { label: 'Cancel', variant: 'secondary', onPress: close },
    { label: 'Delete', variant: 'danger', onPress: handleDelete },
  ]}
  onDismiss={close}
/>`,
    dos: ['Use for confirmations and critical decisions', 'Always provide a dismiss path'],
    donts: ['Don\'t use for non-blocking messages (use Toast)', 'Don\'t stack dialogs'],
  },
  'bottom-sheet': {
    name: 'BottomSheet',
    description: 'Slide-up panel from screen bottom with drag handle and title.',
    importPath: "import { BottomSheet } from '@zzem-design-system/components';",
    category: 'feedback',
    props: [
      { name: 'visible', type: 'boolean', required: true, description: 'Show/hide sheet.' },
      { name: 'onDismiss', type: '() => void', required: true, description: 'Dismiss handler.' },
      { name: 'title', type: 'string', description: 'Sheet title.' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Sheet content.' },
      { name: 'showHandle', type: 'boolean', default: 'true', description: 'Show drag handle.' },
    ],
    usage: `<BottomSheet
  visible={open}
  onDismiss={() => setOpen(false)}
  title="Options"
>
  <Text>Sheet content here</Text>
</BottomSheet>`,
    dos: ['Use for secondary actions and selections', 'Include a dismiss mechanism'],
    donts: ['Don\'t use for primary flows', 'Don\'t put critical-only content inside'],
  },
  snackbar: {
    name: 'Snackbar',
    description: 'Brief feedback bar at screen bottom with optional action button.',
    importPath: "import { Snackbar } from '@zzem-design-system/components';",
    category: 'feedback',
    props: [
      { name: 'message', type: 'string', required: true, description: 'Snackbar message.' },
      { name: 'visible', type: 'boolean', required: true, description: 'Show/hide.' },
      { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss ms.' },
      { name: 'onDismiss', type: '() => void', description: 'Dismiss handler.' },
      { name: 'actionLabel', type: 'string', description: 'Action button text.' },
      { name: 'onAction', type: '() => void', description: 'Action handler.' },
    ],
    usage: `<Snackbar
  message="Item deleted"
  visible={show}
  actionLabel="Undo"
  onAction={handleUndo}
  onDismiss={() => setShow(false)}
/>`,
    dos: ['Use for undoable actions', 'Keep message short'],
    donts: ['Don\'t use for persistent messages'],
  },
  divider: {
    name: 'Divider',
    description: 'Visual separator line in horizontal or vertical orientation.',
    importPath: "import { Divider } from '@zzem-design-system/components';",
    category: 'layout',
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Divider direction.' },
    ],
    usage: `<VStack>
  <Text>Above</Text>
  <Divider />
  <Text>Below</Text>
</VStack>`,
    dos: ['Use to visually separate content sections'],
    donts: ['Don\'t overuse — whitespace is often enough'],
  },
  spacer: {
    name: 'Spacer',
    description: 'Fixed-size empty space in vertical or horizontal direction.',
    importPath: "import { Spacer } from '@zzem-design-system/components';",
    category: 'layout',
    props: [
      { name: 'size', type: 'number', required: true, description: 'Space size in pixels.' },
      { name: 'direction', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'Space direction.' },
    ],
    usage: `<Text>Above</Text>
<Spacer size={16} />
<Text>Below</Text>`,
    dos: ['Use when Stack gap is not suitable', 'Use token values for size'],
    donts: ['Don\'t use when Stack gap can achieve the same result'],
  },
  'safe-area': {
    name: 'SafeArea',
    description: 'Wrapper that applies device safe area insets.',
    importPath: "import { SafeArea } from '@zzem-design-system/components';",
    category: 'layout',
    props: [
      { name: 'edges', type: "('top' | 'bottom' | 'left' | 'right')[]", default: "['top', 'bottom']", description: 'Edges to apply insets.' },
      { name: 'backgroundColor', type: 'string', description: 'Background color.' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Content.' },
    ],
    usage: `<SafeArea edges={['top', 'bottom']}>
  <Header title="Home" />
  <Content />
</SafeArea>`,
    dos: ['Wrap screen-level content', 'Select edges based on layout needs'],
    donts: ['Don\'t nest SafeArea components'],
  },
  header: {
    name: 'Header',
    description: 'Top navigation bar with centered title and optional left/right slots.',
    importPath: "import { Header } from '@zzem-design-system/components';",
    category: 'navigation',
    props: [
      { name: 'title', type: 'string', required: true, description: 'Header title.' },
      { name: 'left', type: 'React.ReactNode', description: 'Left slot content.' },
      { name: 'right', type: 'React.ReactNode', description: 'Right slot content.' },
      { name: 'border', type: 'boolean', default: 'true', description: 'Show bottom border.' },
    ],
    usage: `<Header
  title="Settings"
  left={<IconButton icon={<BackIcon />} accessibilityLabel="Back" />}
  right={<IconButton icon={<MoreIcon />} accessibilityLabel="More" />}
/>`,
    dos: ['Keep titles concise', 'Use IconButton for action slots'],
    donts: ['Don\'t put complex content in header slots'],
  },
  'tab-bar': {
    name: 'TabBar',
    description: 'Bottom tab navigation with icon, label, and badge support.',
    importPath: "import { TabBar } from '@zzem-design-system/components';",
    category: 'navigation',
    props: [
      { name: 'items', type: 'TabBarItem[]', required: true, description: 'Tab items.' },
      { name: 'activeKey', type: 'string', required: true, description: 'Active tab key.' },
      { name: 'onChange', type: '(key: string) => void', required: true, description: 'Tab change handler.' },
    ],
    usage: `<TabBar
  items={[
    { key: 'home', label: 'Home', icon: <HomeIcon /> },
    { key: 'search', label: 'Search', icon: <SearchIcon /> },
    { key: 'profile', label: 'Profile', icon: <UserIcon />, badge: 3 },
  ]}
  activeKey={activeTab}
  onChange={setActiveTab}
/>`,
    dos: ['Use 3-5 tabs', 'Include both icon and label'],
    donts: ['Don\'t use more than 5 tabs', 'Don\'t use icon-only tabs'],
  },
  'navigation-bar': {
    name: 'NavigationBar',
    description: 'iOS-style navigation bar with small/large title and action buttons.',
    importPath: "import { NavigationBar } from '@zzem-design-system/components';",
    category: 'navigation',
    props: [
      { name: 'title', type: 'string', description: 'Navigation title.' },
      { name: 'largeTitle', type: 'boolean', default: 'false', description: 'Use large title style.' },
      { name: 'leftAction', type: '{ icon?: ReactNode, label?: string, onPress: () => void }', description: 'Left navigation action.' },
      { name: 'rightActions', type: '{ icon?: ReactNode, label: string, onPress: () => void }[]', description: 'Right action buttons.' },
      { name: 'transparent', type: 'boolean', default: 'false', description: 'Transparent background.' },
    ],
    usage: `<NavigationBar
  title="Home"
  largeTitle
  rightActions={[
    { label: 'Edit', onPress: handleEdit },
  ]}
/>`,
    dos: ['Use largeTitle for primary screens', 'Use small title for detail screens'],
    donts: ['Don\'t combine largeTitle with transparent'],
  },
};

export function getComponentData(slug: string): ComponentData | null {
  return components[slug] ?? null;
}

export function getAllComponentSlugs(): { category: string; component: string }[] {
  return Object.entries(components).map(([slug, data]) => ({
    category: data.category,
    component: slug,
  }));
}
