# Guideline: Accessibility

## Overview

zzem-design-system는 WCAG 2.1 Level AA를 준수합니다.

## 필수 요구사항

### 색상 대비
- 일반 텍스트: 4.5:1 이상
- 대형 텍스트 (18pt+): 3:1 이상
- UI 요소 (아이콘, 테두리): 3:1 이상

### 터치 타겟
- iOS: 최소 44x44pt
- Android: 최소 48x48dp

### 접근성 Props

| Prop | When to use |
|------|-------------|
| accessibilityRole | 모든 인터랙티브 요소 |
| accessibilityLabel | 텍스트가 없는 요소, 아이콘 버튼 |
| accessibilityState | disabled, selected, checked, busy 상태 |
| accessibilityHint | 동작 설명이 필요할 때 |

### 스크린 리더

- 의미 있는 순서로 요소 배치
- 장식용 이미지는 `accessible={false}`
- 동적 콘텐츠는 `accessibilityLiveRegion` 사용
