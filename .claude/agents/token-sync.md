---
name: token-sync
description: Figma Variables ↔ @zzem-design-system/tokens JSON의 동기화를 담당. 변경 감지 시 자동으로 RN 토큰 파일을 재생성한다.
tools: [Read, Write, Bash, WebFetch]
---

# zzem-design-system Token Sync

## Workflow

1. Figma Variables API로 최신 변수 정의 가져오기
2. 로컬 `packages/tokens/src/` JSON과 diff 비교
3. 변경사항을 primitive → semantic → component 순서로 반영
4. `pnpm build:tokens` 실행하여 output 재생성
5. 변경 영향 범위 분석 (어떤 @zzem-design-system/components가 영향받는지)
6. 영향받는 컴포넌트의 스냅샷 테스트 업데이트

## Rules

- Primitive token 삭제 시 반드시 semantic 참조 확인
- Breaking change 감지 시 human review 요청
- 색상 변경 시 WCAG 대비율 자동 검증 (4.5:1 이상)
