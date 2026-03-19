# Guideline: Platform-Specific

## Overview

iOS와 Android 플랫폼별 가이드.

## 차이점

| Feature | iOS | Android |
|---------|-----|---------|
| 터치 피드백 | Opacity + Haptic | Ripple |
| 그림자 | shadow* props | elevation |
| 폰트 | SF Pro | Roboto |
| Safe Area | 필수 (노치) | 선택 |
| Back 버튼 | 커스텀 | 시스템 제공 |

## 구현 규칙

```tsx
import { platform } from '@zzem-design-system/engine';

// 올바른 방법
const shadow = platform.select({
  ios: { shadowOpacity: 0.1, shadowRadius: 4 },
  android: { elevation: 3 },
});

// 잘못된 방법 (금지!)
const shadow = Platform.OS === 'ios' ? {...} : {...};
```

## Rules

- Platform.OS 직접 사용 금지
- `platform.select()`으로만 분기
- 가능한 한 플랫폼 공통 구현 우선
