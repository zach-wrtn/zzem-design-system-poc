# Foundation: Spacing

## Overview

zzem-design-system의 간격 시스템. 2px 기준의 증분 체계.

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| spacing.0 | 0px | 간격 없음 |
| spacing.1 | 2px | 미세 간격 |
| spacing.2 | 4px | 최소 간격 |
| spacing.4 | 8px | 기본 간격 |
| spacing.6 | 12px | 중간 간격 |
| spacing.8 | 16px | 큰 간격 |
| spacing.12 | 24px | 섹션 간격 |
| spacing.16 | 32px | 레이아웃 간격 |
| spacing.20 | 40px | 대형 간격 |

## Semantic Spacing

- `spacing.component.gap` — 컴포넌트 내부 요소 간격 (8px)
- `spacing.component.padding` — 컴포넌트 내부 여백 (16px)
- `spacing.layout.gutter` — 레이아웃 거터 (16px)
- `spacing.layout.screenPadding` — 화면 좌우 여백 (16px)

## Usage Rules

- 모든 spacing 값은 tokens에서 참조
- 하드코딩 숫자 금지
- 홀수 값 사용 금지 (2의 배수만)
