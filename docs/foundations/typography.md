# Foundation: Typography

## Overview

zzem-design-system의 타이포그래피 시스템.

## Type Scale

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| heading-xl | 36 | 40 | Bold | 페이지 타이틀 |
| heading-lg | 30 | 36 | Bold | 섹션 타이틀 |
| heading-md | 24 | 32 | SemiBold | 서브 타이틀 |
| heading-sm | 20 | 28 | SemiBold | 카드 타이틀 |
| body-lg | 18 | 28 | Regular | 강조 본문 |
| body-md | 16 | 24 | Regular | 기본 본문 |
| body-sm | 14 | 20 | Regular | 보조 본문 |
| label-lg | 16 | 24 | Medium | 큰 라벨 |
| label-md | 14 | 20 | Medium | 기본 라벨 |
| label-sm | 12 | 16 | Medium | 작은 라벨 |
| caption | 12 | 16 | Regular | 캡션 |

## Font Family

- Default: System font (SF Pro on iOS, Roboto on Android)
- Mono: Courier (코드 블록용)

## Usage

```tsx
import { Text } from '@zzem-design-system/components';

<Text variant="heading-lg">제목</Text>
<Text variant="body-md">본문 텍스트</Text>
<Text variant="caption">캡션</Text>
```
