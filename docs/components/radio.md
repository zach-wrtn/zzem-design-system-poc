# Component: RadioGroup

# Package: @zzem-design-system/components
# Category: inputs
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| options | RadioOption[] | - | true | 옵션 목록 |
| value | string | - | true | 선택된 값 |
| onChange | (value: string) => void | - | true | 변경 핸들러 |
| label | string | undefined | false | 그룹 라벨 |
| direction | 'vertical' \| 'horizontal' | 'vertical' | false | 레이아웃 방향 |
| disabled | boolean | false | false | 비활성화 |

## Code Example

```tsx
import { RadioGroup } from '@zzem-design-system/components';

<RadioGroup
  label="성별"
  options={[
    { value: 'male', label: '남성' },
    { value: 'female', label: '여성' },
    { value: 'other', label: '기타' },
  ]}
  value={gender}
  onChange={setGender}
/>
```
