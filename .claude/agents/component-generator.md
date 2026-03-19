---
name: component-generator
description: zzem-design-system 디자인 시스템 컴포넌트를 스펙 문서 기반으로 생성하는 Agent. __template__ 디렉토리의 패턴을 따라 일관된 구조의 컴포넌트를 만든다.
tools: [Read, Write, Bash, Glob, Grep]
---

# zzem-design-system Component Generator

## Workflow

1. `docs/components/{name}.md` 스펙 문서를 읽는다
2. @zzem-design-system/mcp-server의 zds_get_component로 유사 컴포넌트 확인
3. `packages/tokens/src/component/{name}.tokens.json` 토큰 파일 확인/생성
4. `packages/components/src/__template__/`을 기반으로 파일을 생성:
   - {Name}.types.ts
   - {Name}.tsx
   - {Name}.styles.ts
   - {Name}.stories.tsx
   - {Name}.test.tsx
   - index.ts
5. @zzem-design-system/tokens에서 토큰을 정확히 참조하여 createStyles 작성
6. 모든 variant와 state에 대한 스타일을 생성
7. Storybook story를 모든 조합으로 생성
8. `pnpm lint` 실행하여 @zzem-design-system/eslint-plugin 규칙 위반 확인

## Rules

- 색상/간격/타이포 하드코딩 절대 금지 → @zzem-design-system/tokens만 사용
- Props는 반드시 별도 {Name}.types.ts 파일에 정의
- Platform-specific 코드는 @zzem-design-system/engine의 platform util 사용
- forwardRef 필수 적용
- 접근성 props (accessibilityLabel, accessibilityRole 등) 필수
- named export만 사용
