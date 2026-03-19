# Foundation: Iconography

## Overview

zzem-design-system의 아이콘 시스템.

## Icon Sizes

| Size | Value | Usage |
|------|-------|-------|
| xs | 16 | 인라인 텍스트 |
| sm | 20 | 버튼 내부 |
| md | 24 | 기본 아이콘 |
| lg | 32 | 강조 아이콘 |
| xl | 48 | 일러스트레이션 |

## Usage

```tsx
import { SearchIcon } from '@zzem-design-system/icons';

<SearchIcon size={24} color={tokens.color.text.primary} />
```

## Rules

- SVG 원본은 `packages/icons/src/svg/`에 저장
- `pnpm generate`로 RN 컴포넌트 자동 생성
- 아이콘 색상은 반드시 토큰으로 지정
- accessibilityLabel 필수 (장식용 아이콘 제외)
