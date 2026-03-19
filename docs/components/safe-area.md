# Component: SafeArea

# Package: @zzem-design-system/components
# Category: layout
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| edges | ('top'\|'bottom'\|'left'\|'right')[] | ['top','bottom'] | false | 적용할 가장자리 |
| backgroundColor | string | background.primary | false | 배경색 |
| children | ReactNode | - | true | 콘텐츠 |

## Code Example

```tsx
import { SafeArea } from '@zzem-design-system/components';

<SafeArea edges={['top', 'bottom']}>
  <ScreenContent />
</SafeArea>
```
