# Component: Toast

# Package: @zzem-design-system/components
# Category: feedback
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| message | string | - | true | 토스트 메시지 |
| variant | 'info' \| 'success' \| 'warning' \| 'danger' | 'info' | false | 토스트 유형 |
| position | 'top' \| 'bottom' | 'bottom' | false | 위치 |
| visible | boolean | - | true | 표시 여부 |
| duration | number | 3000 | false | 자동 닫기 (ms, 0=비활성) |
| actionLabel | string | undefined | false | 액션 버튼 라벨 |

## Behavior

- 자동 닫기 (기본 3초)
- 좌측 색상 인디케이터로 유형 표시
- 탭으로 닫기 가능

## Code Example

```tsx
import { Toast } from '@zzem-design-system/components';

<Toast
  message="저장되었습니다"
  variant="success"
  visible={showToast}
  onDismiss={() => setShowToast(false)}
/>
```
