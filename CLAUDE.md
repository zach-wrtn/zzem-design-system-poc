# zzem-design-system — React Native Design System

## Project Overview

zzem-design-system는 AI Agent와 사람이 함께 운용하는 React Native 디자인 시스템이다.
Wanted Montage 벤치마크 기반. 모노레포 구조 (pnpm workspace), TypeScript strict mode.

## Tech Stack

- React Native 0.76+ (New Architecture enabled)
- TypeScript 5.x (strict)
- pnpm workspace (monorepo)
- Style Dictionary (token transform)
- Storybook React Native
- Jest + React Native Testing Library

## Package Map

| Package                           | Path                   | Description                   |
| --------------------------------- | ---------------------- | ----------------------------- |
| @zzem-design-system/tokens        | packages/tokens        | Design tokens (SSOT)          |
| @zzem-design-system/engine        | packages/engine        | Styling engine, ThemeProvider |
| @zzem-design-system/components    | packages/components    | UI components                 |
| @zzem-design-system/icons         | packages/icons         | Icon components (SVG→RN)      |
| @zzem-design-system/mcp-server    | packages/mcp-server    | MCP server for AI agents      |
| @zzem-design-system/eslint-plugin | packages/eslint-plugin | ESLint rules                  |
| @zzem-design-system/codemod       | packages/codemod       | Migration scripts             |

## Architecture Rules

1. 모든 색상/간격/타이포는 반드시 @zzem-design-system/tokens의 Design Token을 사용한다
2. 하드코딩 금지: `color: '#FF0000'` → `color: tokens.color.danger.default`
3. 컴포넌트는 `packages/components/src/__template__/` 구조를 따른다
4. Platform 분기는 `@zzem-design-system/engine`의 `platform.ts`를 통해서만 한다
5. 인라인 스타일 금지 → `createStyles()` 팩토리 사용
6. 스펙 문서를 먼저 작성하고 → 코드를 구현한다 (Docs-First)

## Component Creation Workflow

1. `docs/components/{name}.md`에 스펙 문서 먼저 작성
2. `packages/tokens/src/component/{name}.tokens.json` 토큰 정의
3. `packages/components/src/{category}/{Name}/` 아래 구현
4. 파일 구조: index.ts, {Name}.tsx, {Name}.styles.ts, {Name}.types.ts
5. Storybook story 작성 (모든 variant 커버)
6. 테스트 작성 (렌더링 + 접근성 + 스냅샷)
7. `pnpm lint` 통과 확인

## Token Naming Convention

- Primitive: `{category}.{scale}` → `color.blue.500`
- Semantic: `{category}.{usage}.{variant}` → `color.interactive.primary`
- Component: `{component}.{element}.{property}.{state}` → `button.label.color.pressed`

## Forbidden Patterns

- `StyleSheet.create` 직접 사용 금지 (→ `createStyles` 사용)
- `Platform.OS === 'ios'` 직접 분기 금지 (→ `platform.select()`)
- 컴포넌트 내 색상 HEX 직접 사용 금지
- `any` 타입 사용 금지
- default export 금지 (named export만 사용)
- index 파일에서 로직 금지 (re-export만)

## MCP Servers

- zzem-design-system MCP (`@zzem-design-system/mcp-server`): 컴포넌트/토큰/가이드라인 조회 및 검증
- Figma MCP: 디자인 검증 시 사용

## Commands

- `pnpm build` — 전체 빌드
- `pnpm build:tokens` — 토큰 빌드 (JSON → TS)
- `pnpm test` — 전체 테스트
- `pnpm test:a11y` — 접근성 테스트
- `pnpm lint` — ESLint (zzem-design-system 규칙 포함)
- `pnpm storybook` — Storybook 실행
- `pnpm new-component {name}` — 컴포넌트 스캐폴딩
