# Pattern: Navigation

## Overview

zzem-design-system 네비게이션 패턴 가이드.

## 헤더

- 좌측: 뒤로가기 아이콘
- 중앙: 페이지 타이틀 (heading-sm)
- 우측: 액션 아이콘(들)

## 탭 바

- 최대 5개 탭
- 활성 탭: color.interactive.primary
- 비활성 탭: color.text.tertiary
- 라벨은 label-sm 사용

## Rules

- 네비게이션 요소에 accessibilityRole="tab" 또는 "header" 필수
- 현재 위치는 accessibilityState={{ selected: true }}로 표시
