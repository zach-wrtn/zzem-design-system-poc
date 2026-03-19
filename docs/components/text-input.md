# Component: TextInput

# Package: @zzem-design-system/components
# Category: inputs
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| size | 'sm' \| 'md' \| 'lg' | 'md' | false | 입력 필드 크기 |
| label | string | undefined | false | 라벨 텍스트 |
| helperText | string | undefined | false | 도움말 텍스트 |
| error | string | undefined | false | 에러 메시지 |
| disabled | boolean | false | false | 비활성화 |
| iconLeft | ReactNode | undefined | false | 좌측 아이콘 |
| iconRight | ReactNode | undefined | false | 우측 아이콘 |

## Design Tokens Used

- input.background.default / disabled
- input.border.default / focus / error
- input.text.default / placeholder / disabled
- input.size.{size}.height / paddingHorizontal / fontSize
- input.radius

## Behavior

- Focus: 테두리 색상 변경 (blue)
- Error: 테두리 + 에러 메시지 빨간색
- Disabled: 배경 회색, 입력 불가

## Code Example

```tsx
import { TextInput } from '@zzem-design-system/components';

<TextInput
  label="이메일"
  placeholder="이메일을 입력하세요"
  error={errors.email}
/>
```
