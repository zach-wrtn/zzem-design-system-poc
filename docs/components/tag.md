# Component: Tag

# Package: @zzem-design-system/components
# Category: display
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| label | string | - | true | 태그 텍스트 |
| variant | 'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' | 'default' | false | 태그 스타일 |
| closable | boolean | false | false | 삭제 버튼 표시 |
| onClose | () => void | undefined | false | 삭제 핸들러 |

## Behavior

- closable 시 우측에 × 버튼
- 닫기 버튼 hitSlop: 8

## Code Example

```tsx
import { Tag } from '@zzem-design-system/components';

<Tag label="React Native" variant="primary" />
<Tag label="삭제 가능" closable onClose={handleRemove} />
```
