# Foundation: Color

## Overview

zzem-design-system의 색상 시스템은 3-Tier 구조를 따릅니다.

## Tier 1: Primitive Colors

원색 팔레트. 직접 사용하지 않고, Semantic 토큰에서 참조합니다.

- Gray: 50–900 (10단계)
- Blue: 50–900 (Primary)
- Red: 50–900 (Danger)
- Green: 50–900 (Success)
- Yellow: 50–900 (Warning)

## Tier 2: Semantic Colors

용도에 따른 색상 매핑.

### Background
- `color.background.primary` — 기본 배경 (White)
- `color.background.secondary` — 보조 배경 (Gray 50)
- `color.background.tertiary` — 3차 배경 (Gray 100)
- `color.background.inverse` — 반전 배경 (Gray 900)

### Text
- `color.text.primary` — 기본 텍스트 (Gray 900)
- `color.text.secondary` — 보조 텍스트 (Gray 600)
- `color.text.tertiary` — 3차 텍스트 (Gray 400)
- `color.text.inverse` — 반전 텍스트 (White)

### Interactive
- `color.interactive.primary` — 주요 인터랙션 (Blue 600)
- `color.interactive.danger` — 위험 인터랙션 (Red 600)

### Border
- `color.border.default` — 기본 테두리 (Gray 200)
- `color.border.focus` — 포커스 테두리 (Blue 500)

### Status
- `color.status.success` — 성공 (Green 500)
- `color.status.warning` — 경고 (Yellow 500)
- `color.status.danger` — 위험 (Red 500)
- `color.status.info` — 정보 (Blue 500)

## Usage Rules

- 컴포넌트에서 절대 Primitive 색상을 직접 참조하지 않는다
- 반드시 Semantic 또는 Component 토큰을 사용한다
- 다크모드 대응을 위해 Semantic 레이어가 필수
