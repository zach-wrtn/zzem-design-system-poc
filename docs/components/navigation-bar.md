# Component: NavigationBar

# Package: @zzem-design-system/components
# Category: navigation
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| title | string | undefined | false | 네비게이션 타이틀 |
| largeTitle | boolean | false | false | 큰 타이틀 모드 |
| leftAction | object | undefined | false | 좌측 액션 |
| rightActions | object[] | undefined | false | 우측 액션 목록 |
| transparent | boolean | false | false | 투명 배경 |

## Code Example

```tsx
import { NavigationBar } from '@zzem-design-system/components';

<NavigationBar
  title="설정"
  largeTitle
  leftAction={{ label: '뒤로', onPress: goBack }}
  rightActions={[{ label: '완료', onPress: handleDone }]}
/>
```
