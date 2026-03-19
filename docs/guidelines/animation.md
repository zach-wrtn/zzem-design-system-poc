# Guideline: Animation

## Overview

zzem-design-system 애니메이션 가이드.

## Duration

| Token | Duration | Usage |
|-------|----------|-------|
| instant | 100ms | 마이크로 인터랙션 |
| fast | 150ms | 버튼 프레스, 토글 |
| normal | 250ms | 패널 열기/닫기 |
| slow | 350ms | 페이지 전환 |

## Easing

- ease-out: 요소가 나타날 때 (빠르게 시작, 천천히 끝)
- ease-in: 요소가 사라질 때 (천천히 시작, 빠르게 끝)
- ease-in-out: 요소가 이동할 때

## Rules

- `prefers-reduced-motion` 설정 존중
- 300ms 이상의 애니메이션은 스킵 가능해야 함
- 깜빡임은 초당 3회 미만
