---
name: audit-component
description: 컴포넌트의 구현이 디자인 스펙과 일치하는지 검증합니다.
---

$ARGUMENTS 컴포넌트의 구현이 디자인 스펙과 일치하는지 검증해.

## 검증 항목
1. 토큰 정합성: @zzem-design-system/tokens 참조가 스펙 문서와 일치하는가?
2. Props 완전성: 스펙의 모든 Props가 구현되어 있는가?
3. State 커버리지: default, pressed, disabled, focused, loading 등 모든 state 처리
4. 접근성: accessibilityRole, accessibilityLabel, accessibilityState 적용
5. Platform 분기: @zzem-design-system/engine의 platform.ts를 통한 iOS/Android 차이
6. ESLint: @zzem-design-system/eslint-plugin 규칙 위반 없는가?
7. 테스트 커버리지: 모든 variant/state에 대한 테스트 존재?

## 결과 형식
각 항목을 ✅ 통과 / ⚠️ 경고 / ❌ 실패 로 리포트
