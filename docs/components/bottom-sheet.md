# Component: BottomSheet

# Package: @zzem-design-system/components
# Category: feedback
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| visible | boolean | - | true | 표시 여부 |
| onDismiss | () => void | - | true | 닫기 핸들러 |
| title | string | undefined | false | 제목 |
| showHandle | boolean | true | false | 드래그 핸들 표시 |
| children | ReactNode | - | true | 콘텐츠 |

## Behavior

- 아래에서 슬라이드 업
- 드래그 핸들로 닫기
- 백드롭 탭으로 닫기
- 최대 높이 80%

## Code Example

```tsx
import { BottomSheet } from '@zzem-design-system/components';

<BottomSheet
  visible={showSheet}
  onDismiss={() => setShowSheet(false)}
  title="옵션 선택"
>
  <OptionList />
</BottomSheet>
```
