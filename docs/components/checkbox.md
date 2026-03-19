# Component: Checkbox

# Package: @zzem-design-system/components
# Category: inputs
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| checked | boolean | - | true | 체크 상태 |
| onChange | (checked: boolean) => void | - | true | 변경 핸들러 |
| label | string | undefined | false | 라벨 텍스트 |
| disabled | boolean | false | false | 비활성화 |

## Behavior

- 탭: checked 토글
- 체크 시: primary 색상 배경 + 체크마크
- 미체크 시: 테두리만 표시

## Code Example

```tsx
import { Checkbox } from '@zzem-design-system/components';

<Checkbox
  checked={agreed}
  onChange={setAgreed}
  label="이용약관에 동의합니다"
/>
```
