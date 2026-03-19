# Component: Button

# Package: @zzem-design-system/components
# Category: inputs
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| variant | 'primary' \| 'secondary' \| 'ghost' \| 'danger' | 'primary' | false | 버튼 스타일 변형 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | false | 버튼 크기 |
| disabled | boolean | false | false | 비활성화 상태 |
| loading | boolean | false | false | 로딩 상태 |
| iconLeft | ReactNode | undefined | false | 좌측 아이콘 |
| iconRight | ReactNode | undefined | false | 우측 아이콘 |
| fullWidth | boolean | false | false | 전체 너비 |

## Design Tokens Used

- button.{variant}.background
- button.{variant}.label
- button.{variant}.border
- button.size.{size}.height
- button.size.{size}.paddingHorizontal
- button.size.{size}.fontSize
- button.radius

## Behavior

- Press: opacity 0.7 (150ms ease-out)
- Disabled: opacity 0.4, no press feedback
- Loading: spinner replaces text, press disabled

## Do / Don't

- DO: 화면당 primary 버튼은 1개만 사용
- DO: 텍스트는 동사형으로 시작 (e.g., "지원하기")
- DON'T: 아이콘만 있는 버튼에 Button 사용 (→ IconButton 사용)
- DON'T: ghost 버튼을 단독 CTA로 사용

## Platform Notes

- iOS: haptic feedback (UIImpactFeedbackGenerator.medium)
- Android: ripple effect (android_ripple prop)

## Code Example

```tsx
import { Button } from '@zzem-design-system/components';

<Button variant="primary" size="md" onPress={handlePress}>
  지원하기
</Button>
```
