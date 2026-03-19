---
name: sync-tokens
description: Figma Variables와 @zzem-design-system/tokens의 동기화를 수행합니다.
---

Figma Variables와 @zzem-design-system/tokens의 동기화를 수행해.

## 작업 순서
1. Figma MCP로 최신 Variables 가져오기
2. `packages/tokens/src/` 의 JSON 파일과 diff 비교
3. 변경사항 요약 리포트:
   - 추가된 토큰
   - 수정된 토큰 (이전값 → 새값)
   - 삭제된 토큰 (breaking change 경고)
4. 확인 후 로컬 JSON 업데이트
5. `pnpm build:tokens` 실행
6. 영향받는 @zzem-design-system/components 목록 출력
7. 색상 변경 시 WCAG 대비율 검증 (4.5:1 이상)
