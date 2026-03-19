# Foundation: Elevation

## Overview

zzem-design-system의 그림자/높이 시스템.

## Elevation Scale

| Token | iOS Shadow | Android Elevation | Usage |
|-------|-----------|-------------------|-------|
| elevation.none | none | 0 | 플랫 요소 |
| elevation.sm | 0 1 2 0.05 | 1 | 카드, 인풋 |
| elevation.md | 0 2 4 0.1 | 3 | 드롭다운 |
| elevation.lg | 0 4 8 0.15 | 6 | 모달 |
| elevation.xl | 0 8 16 0.2 | 12 | 토스트, 다이얼로그 |

## Platform Notes

- iOS: shadowColor, shadowOffset, shadowOpacity, shadowRadius
- Android: elevation prop (Material Design)
- 반드시 `platform.select()`으로 분기
