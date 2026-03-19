# Component: IconButton

# Package: @zzem-design-system/components
# Category: inputs
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| variant | 'filled' \| 'outlined' \| 'ghost' | 'ghost' | false | 버튼 스타일 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | false | 버튼 크기 |
| icon | ReactNode | - | true | 아이콘 요소 |
| disabled | boolean | false | false | 비활성화 |
| accessibilityLabel | string | - | true | 접근성 라벨 (필수) |

## Behavior

- Press: opacity 0.7
- Disabled: opacity 0.4
- 원형 히트 영역

## Do / Don't

- DO: accessibilityLabel 반드시 제공
- DO: 의미가 명확한 아이콘 사용
- DON'T: 텍스트가 필요한 경우 IconButton 대신 Button 사용

## Code Example

```tsx
import { IconButton } from '@zzem-design-system/components';
import { SearchIcon } from '@zzem-design-system/icons';

<IconButton
  icon={<SearchIcon size={20} />}
  accessibilityLabel="검색"
  onPress={handleSearch}
/>
```
