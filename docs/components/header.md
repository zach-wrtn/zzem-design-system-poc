# Component: Header

# Package: @zzem-design-system/components
# Category: navigation
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| title | string | - | true | 페이지 제목 |
| left | ReactNode | undefined | false | 좌측 요소 (뒤로가기) |
| right | ReactNode | undefined | false | 우측 요소 |
| border | boolean | true | false | 하단 테두리 |

## Code Example

```tsx
import { Header } from '@zzem-design-system/components';

<Header
  title="설정"
  left={<IconButton icon={<BackIcon />} accessibilityLabel="뒤로" onPress={goBack} />}
  right={<IconButton icon={<MoreIcon />} accessibilityLabel="더보기" onPress={showMore} />}
/>
```
