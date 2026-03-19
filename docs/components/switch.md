# Component: Switch

# Package: @zzem-design-system/components
# Category: inputs
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| value | boolean | - | true | On/off 상태 |
| onValueChange | (value: boolean) => void | - | true | 변경 핸들러 |
| label | string | undefined | false | 라벨 텍스트 |
| disabled | boolean | false | false | 비활성화 |

## Behavior

- 탭: value 토글
- On: primary 색상 트랙 + 우측 thumb
- Off: gray 트랙 + 좌측 thumb

## Code Example

```tsx
import { Switch } from '@zzem-design-system/components';

<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="알림 받기"
/>
```
