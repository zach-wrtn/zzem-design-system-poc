# Component: Snackbar

# Package: @zzem-design-system/components
# Category: feedback
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| message | string | - | true | 메시지 |
| visible | boolean | - | true | 표시 여부 |
| duration | number | 4000 | false | 자동 닫기 (ms) |
| actionLabel | string | undefined | false | 액션 라벨 |

## Behavior

- 하단에 고정 표시
- 자동 닫기 (기본 4초)
- 액션 버튼 선택적 표시

## Code Example

```tsx
import { Snackbar } from '@zzem-design-system/components';

<Snackbar
  message="항목이 삭제되었습니다"
  visible={showSnackbar}
  actionLabel="되돌리기"
  onAction={handleUndo}
  onDismiss={() => setShowSnackbar(false)}
/>
```
