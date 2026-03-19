# PRD: zzem-design-system — Agent-Driven React Native Design System

> Montage (Wanted Design System) 벤치마크 기반, AI Agent 운용을 위한 React Native 디자인 시스템 **zzem-design-system** 설계 및 구현 전략

---

## 1. Executive Summary

### 1.1 배경

Wanted의 Montage 디자인 시스템은 2만+ 다운로드의 Figma 라이브러리에서 출발하여, 문서화 사이트 + 코드 레포지토리 + MCP 서버까지 확장된 선진 사례다. 특히 "AI가 읽기 쉬운 디자인 시스템(Machine-Readable Design System)"이라는 방향성은 에이전틱 환경에서의 디자인 시스템 운용이라는 본 프로젝트의 핵심 목표와 정확히 일치한다.

### 1.2 왜 zzem-design-system인가

zzem-design-system는 **사람과 Agent가 함께 만드는 UI**라는 의미를 담고 있다. 디자이너가 Figma에서 설계하고, Agent가 토큰과 가이드라인을 기반으로 정확히 구현하는 — 두 주체의 협주를 상징한다.

### 1.3 목표

React Native 환경에서 AI Agent(Claude Code, Cursor 등)가 zzem-design-system 디자인 시스템을 정확하게 이해하고 활용하여 일관된 UI를 생성할 수 있는 체계를 구축한다.

### 1.4 핵심 원칙

- **Machine-Readable First**: 사람이 읽기 좋은 것이 아니라, Agent가 파싱하기 좋은 구조
- **Single Source of Truth**: Design Token → Figma Variables → RN StyleSheet의 단방향 흐름
- **Composable Architecture**: Primitive → Semantic → Component 3-tier 토큰 구조
- **Platform-Aware**: iOS/Android 네이티브 특성을 존중하는 cross-platform 설계

---

## 2. Montage 벤치마크 분석

### 2.1 Montage 아키텍처

Montage는 아래와 같은 모노레포 패키지 구조를 채택하고 있다:

| Montage 패키지                 | 역할                        | zzem-design-system 대응 패키지      |
| ------------------------------ | --------------------------- | ----------------------------------- |
| `@wanteddev/wds`               | Core UI 컴포넌트 라이브러리 | `@zzem-design-system/components`    |
| `@wanteddev/wds-engine`        | 스타일링 엔진               | `@zzem-design-system/engine`        |
| `@wanteddev/wds-theme`         | 디자인 토큰 + 테마 정의     | `@zzem-design-system/tokens`        |
| `@wanteddev/wds-icon`          | 아이콘 컴포넌트             | `@zzem-design-system/icons`         |
| `@wanteddev/wds-lottie`        | Lottie 애니메이션           | `lottie-react-native` 통합          |
| `@wanteddev/wds-mcp`           | AI Agent용 MCP 서버         | `@zzem-design-system/mcp-server`    |
| `@wanteddev/eslint-plugin-wds` | ESLint 플러그인             | `@zzem-design-system/eslint-plugin` |
| `@wanteddev/wds-codemod`       | 마이그레이션 스크립트       | `@zzem-design-system/codemod`       |

### 2.2 Montage의 AX(Agent Experience) 전환 전략

Montage 팀이 공개한 "AX 전환" 방향성에서 핵심 포인트:

1. **AI가 읽기 쉬운 디자인 시스템**: 상세한 가이드라인 + 접근 가능한 코드
2. **코드 레포지토리 공개**: AI가 실제로 디자인 시스템을 활용할 수 있는 기반
3. **MCP 서버 제공**: `@wanteddev/wds-mcp`를 통한 AI-assisted 개발
4. **CLAUDE.md / AGENTS.md**: Agent가 프로젝트 컨텍스트를 이해하기 위한 메모리 파일
5. **ESLint 플러그인**: Agent가 생성한 코드의 자동 검증

### 2.3 Montage → zzem-design-system 구조 매핑

```
montage-web/                          zzem-design-system/
├── .claude-plugin/            →      ├── .claude/
├── CLAUDE.md                  →      ├── CLAUDE.md
├── AGENTS.md                  →      ├── AGENTS.md
├── packages/                         ├── packages/
│   ├── wds/                   →      │   ├── components/
│   ├── wds-engine/            →      │   ├── engine/
│   ├── wds-theme/             →      │   ├── tokens/
│   ├── wds-icon/              →      │   ├── icons/
│   ├── wds-mcp/               →      │   ├── mcp-server/
│   └── eslint-plugin-wds/     →      │   └── eslint-plugin/
├── docs/                      →      ├── docs/
├── figma/                     →      ├── figma/
└── tests/                     →      └── tests/
```

---

## 3. zzem-design-system 아키텍처 설계

### 3.1 전체 디렉토리 구조

```
zzem-design-system/
├── CLAUDE.md                          # [Core] Agent 프로젝트 메모리
├── AGENTS.md                          # [Core] Sub-agent 정의 & 오케스트레이션
├── .claude/
│   ├── agents/                        # Sub-agent 마크다운 정의
│   │   ├── component-generator.md     # 컴포넌트 생성 Agent
│   │   ├── token-sync.md             # 토큰 동기화 Agent
│   │   ├── design-verifier.md        # 디자인 검증 Agent
│   │   ├── a11y-auditor.md           # 접근성 감사 Agent
│   │   └── migration-assistant.md    # 마이그레이션 Agent
│   ├── commands/                      # Slash 커맨드
│   │   ├── new-component.md
│   │   ├── sync-tokens.md
│   │   └── audit-component.md
│   └── settings.json
│
├── packages/
│   ├── tokens/                        # @zzem-design-system/tokens — Design Tokens (SSOT)
│   │   ├── src/
│   │   │   ├── primitive/            # Primitive Tokens (색상 팔레트, 타입 스케일)
│   │   │   │   ├── colors.json
│   │   │   │   ├── typography.json
│   │   │   │   ├── spacing.json
│   │   │   │   ├── radius.json
│   │   │   │   ├── elevation.json
│   │   │   │   └── opacity.json
│   │   │   ├── semantic/             # Semantic Tokens (용도 기반 매핑)
│   │   │   │   ├── color.semantic.json
│   │   │   │   ├── typography.semantic.json
│   │   │   │   └── spacing.semantic.json
│   │   │   └── component/            # Component Tokens (컴포넌트 전용)
│   │   │       ├── button.tokens.json
│   │   │       ├── input.tokens.json
│   │   │       └── card.tokens.json
│   │   ├── transforms/              # Token → Platform 변환
│   │   │   ├── react-native.ts
│   │   │   └── figma.ts
│   │   ├── output/                   # 빌드 결과
│   │   │   ├── tokens.ts             # RN용 TypeScript 토큰
│   │   │   ├── tokens.json           # JSON (MCP/Agent 참조용)
│   │   │   └── figma-variables.json  # Figma Variables 동기화용
│   │   └── package.json
│   │
│   ├── engine/                        # @zzem-design-system/engine — Styling Engine
│   │   ├── src/
│   │   │   ├── ZDSProvider.tsx     # 테마 컨텍스트 Provider
│   │   │   ├── useTheme.ts           # 테마 Hook
│   │   │   ├── createStyles.ts       # StyleSheet 팩토리
│   │   │   ├── responsive.ts         # 반응형 유틸리티
│   │   │   └── platform.ts           # iOS/Android 분기
│   │   ├── index.ts
│   │   └── package.json
│   │
│   ├── components/                    # @zzem-design-system/components — UI Components
│   │   ├── src/
│   │   │   ├── primitives/           # 기초 컴포넌트
│   │   │   │   ├── Box/
│   │   │   │   ├── Text/
│   │   │   │   ├── Pressable/
│   │   │   │   └── Stack/
│   │   │   ├── inputs/               # 입력 컴포넌트
│   │   │   │   ├── Button/
│   │   │   │   ├── TextInput/
│   │   │   │   ├── Checkbox/
│   │   │   │   └── Switch/
│   │   │   ├── display/              # 표시 컴포넌트
│   │   │   │   ├── Avatar/
│   │   │   │   ├── Badge/
│   │   │   │   ├── Card/
│   │   │   │   └── Tag/
│   │   │   ├── feedback/             # 피드백 컴포넌트
│   │   │   │   ├── Toast/
│   │   │   │   ├── Dialog/
│   │   │   │   ├── BottomSheet/
│   │   │   │   └── Snackbar/
│   │   │   ├── navigation/           # 네비게이션 컴포넌트
│   │   │   │   ├── TabBar/
│   │   │   │   ├── Header/
│   │   │   │   └── NavigationBar/
│   │   │   └── layout/               # 레이아웃 컴포넌트
│   │   │       ├── Divider/
│   │   │       ├── Spacer/
│   │   │       └── SafeArea/
│   │   ├── __template__/             # 컴포넌트 생성 템플릿 (Agent용)
│   │   │   ├── Component.tsx
│   │   │   ├── Component.styles.ts
│   │   │   ├── Component.types.ts
│   │   │   ├── Component.stories.tsx
│   │   │   ├── Component.test.tsx
│   │   │   ├── Component.docs.md
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   └── package.json
│   │
│   ├── icons/                         # @zzem-design-system/icons — Icons
│   │   ├── src/
│   │   │   ├── svg/                  # SVG 원본
│   │   │   ├── generated/            # react-native-svg 변환 결과
│   │   │   └── Icon.tsx              # 범용 Icon 컴포넌트
│   │   ├── scripts/
│   │   │   └── generate.ts           # SVG → RN 자동 변환
│   │   └── package.json
│   │
│   ├── mcp-server/                    # @zzem-design-system/mcp-server — MCP Server
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   ├── tools/
│   │   │   │   ├── get-component.ts
│   │   │   │   ├── get-tokens.ts
│   │   │   │   ├── get-guidelines.ts
│   │   │   │   ├── validate-usage.ts
│   │   │   │   └── generate-snippet.ts
│   │   │   └── resources/
│   │   │       ├── component-catalog.json
│   │   │       └── usage-guidelines.json
│   │   └── package.json
│   │
│   ├── eslint-plugin/                 # @zzem-design-system/eslint-plugin — ESLint Plugin
│   │   ├── src/
│   │   │   ├── rules/
│   │   │   │   ├── no-hardcoded-colors.ts
│   │   │   │   ├── no-hardcoded-spacing.ts
│   │   │   │   ├── no-inline-styles.ts
│   │   │   │   ├── use-design-tokens.ts
│   │   │   │   └── valid-component-props.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── codemod/                       # @zzem-design-system/codemod — Migration Scripts
│       ├── src/
│       │   └── transforms/
│       └── package.json
│
├── docs/                              # 문서화 (Agent 참조용)
│   ├── foundations/
│   │   ├── color.md
│   │   ├── typography.md
│   │   ├── spacing.md
│   │   ├── elevation.md
│   │   └── iconography.md
│   ├── components/
│   │   └── [component-name].md
│   ├── patterns/
│   │   ├── form-patterns.md
│   │   ├── list-patterns.md
│   │   └── navigation-patterns.md
│   └── guidelines/
│       ├── accessibility.md
│       ├── animation.md
│       └── platform-specific.md
│
├── figma/                             # Figma 연동
│   ├── figma.config.json
│   └── scripts/
│       ├── sync-tokens.ts
│       └── export-icons.ts
│
├── scripts/                           # 유틸리티 스크립트
│   ├── generate-component.ts
│   ├── build-tokens.ts
│   └── validate-all.ts
│
├── tests/
│   ├── visual/
│   ├── a11y/
│   └── integration/
│
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── nx.json
└── package.json
```

### 3.2 패키지 의존성 그래프

```
@zzem-design-system/tokens          ← Source of Truth (의존성 없음)
    ↓
@zzem-design-system/engine          ← tokens에 의존
    ↓
@zzem-design-system/components      ← engine + tokens에 의존
    ↓
@zzem-design-system/icons           ← engine에 의존

@zzem-design-system/mcp-server      ← tokens + docs를 참조 (런타임 의존 없음)
@zzem-design-system/eslint-plugin   ← tokens의 키 목록을 참조
@zzem-design-system/codemod         ← 독립 실행
```

### 3.3 Design Token 3-Tier 구조

```
┌─────────────────────────────────────────────────┐
│  Tier 1: Primitive Tokens (What it IS)          │
│  blue-500: #3366FF                              │
│  font-size-16: 16                               │
│  spacing-4: 4                                   │
├─────────────────────────────────────────────────┤
│  Tier 2: Semantic Tokens (What it MEANS)        │
│  color.interactive.primary → blue-500           │
│  text.body.medium → font-size-16                │
│  spacing.component.gap → spacing-4              │
├─────────────────────────────────────────────────┤
│  Tier 3: Component Tokens (WHERE it's used)     │
│  button.primary.background → interactive.primary│
│  button.primary.text → text.on-primary          │
│  button.padding.horizontal → spacing.component  │
└─────────────────────────────────────────────────┘
```

### 3.4 Agent가 이해하는 컴포넌트 스펙 포맷

각 컴포넌트 문서(`docs/components/*.md`)는 아래 구조를 따라 Agent가 정확히 파싱할 수 있게 한다:

```yaml
# Component: Button
# Package: @zzem-design-system/components
# Category: inputs
# Status: stable
# Platforms: ios, android

## Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| variant | 'primary' | 'secondary' | 'ghost' | 'danger' | 'primary' | false | 버튼 스타일 변형 |
| size | 'sm' | 'md' | 'lg' | 'md' | false | 버튼 크기 |
| disabled | boolean | false | false | 비활성화 상태 |
| loading | boolean | false | false | 로딩 상태 |
| icon | IconName | undefined | false | 좌측 아이콘 |
| fullWidth | boolean | false | false | 전체 너비 |

## Design Tokens Used
- button.{variant}.background
- button.{variant}.text
- button.{variant}.border
- button.{size}.height
- button.{size}.paddingHorizontal
- button.{size}.fontSize
- button.radius

## Behavior
- Press: opacity 0.7 (150ms ease-out)
- Disabled: opacity 0.4, no press feedback
- Loading: spinner replaces text, press disabled

## Do / Don't
- DO: 화면당 primary 버튼은 1개만 사용
- DO: 텍스트는 동사형으로 시작 (e.g., "지원하기")
- DON'T: 아이콘만 있는 버튼에 Button 사용 (→ IconButton 사용)
- DON'T: ghost 버튼을 단독 CTA로 사용

## Platform Notes
- iOS: haptic feedback (UIImpactFeedbackGenerator.medium)
- Android: ripple effect (android_ripple prop)

## Code Example
\`\`\`tsx
import { Button } from '@zzem-design-system/components';

<Button variant="primary" size="md" onPress={handlePress}>
  지원하기
</Button>
\`\`\`
```

---

## 4. Agent 운용 시스템 설계

### 4.1 CLAUDE.md

```markdown
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
```

### 4.2 AGENTS.md

```markdown
# zzem-design-system — Agent Orchestration

## Available Agents

### 1. component-generator

- **Purpose**: 스펙 문서 기반 컴포넌트 생성
- **Location**: `.claude/agents/component-generator.md`
- **When to use**: 새 컴포넌트를 만들거나, 기존 컴포넌트에 variant를 추가할 때
- **Tools**: Read, Write, Bash, Glob, Grep

### 2. token-sync

- **Purpose**: Figma Variables ↔ Design Tokens 동기화
- **Location**: `.claude/agents/token-sync.md`
- **When to use**: 디자이너가 Figma에서 토큰을 변경했을 때
- **Tools**: Read, Write, Bash, WebFetch, mcp**figma**get_variable_defs

### 3. design-verifier

- **Purpose**: 구현과 디자인 스펙의 일치 검증
- **Location**: `.claude/agents/design-verifier.md`
- **When to use**: PR 리뷰 시, 또는 컴포넌트 구현 완료 후
- **Tools**: Read, Grep, Glob, WebFetch, mcp**figma**get_screenshot

### 4. a11y-auditor

- **Purpose**: 접근성 감사 (WCAG 2.1 AA)
- **Location**: `.claude/agents/a11y-auditor.md`
- **When to use**: 컴포넌트 생성/수정 후, 또는 정기 감사 시
- **Tools**: Read, Grep, Bash

### 5. migration-assistant

- **Purpose**: Breaking change 발생 시 codemod 작성 및 적용
- **Location**: `.claude/agents/migration-assistant.md`
- **When to use**: 토큰 이름 변경, 컴포넌트 API 변경 시
- **Tools**: Read, Write, Bash, Grep, Glob

## Orchestration Rules

- component-generator 완료 후 → design-verifier 자동 호출
- token-sync 완료 후 → 영향 컴포넌트에 design-verifier 호출
- 모든 agent 완료 후 → a11y-auditor 호출
- breaking change 감지 시 → migration-assistant 호출 + human review 요청
```

### 4.3 Sub-Agent 상세 정의

#### 4.3.1 Component Generator Agent

```markdown
---
name: component-generator
description:
  zzem-design-system 디자인 시스템 컴포넌트를 스펙 문서 기반으로 생성하는 Agent.
  __template__ 디렉토리의 패턴을 따라 일관된 구조의 컴포넌트를 만든다.
tools: [Read, Write, Bash, Glob, Grep]
---

# zzem-design-system Component Generator

## Workflow

1. `docs/components/{name}.md` 스펙 문서를 읽는다
2. @zzem-design-system/mcp-server의 get_component로 유사 컴포넌트 확인
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
```

#### 4.3.2 Token Sync Agent

```markdown
---
name: token-sync
description: Figma Variables ↔ @zzem-design-system/tokens JSON의 동기화를 담당.
  변경 감지 시 자동으로 RN 토큰 파일을 재생성한다.
tools: [Read, Write, Bash, WebFetch, mcp__figma__get_variable_defs]
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
```

#### 4.3.3 Design Verifier Agent

```markdown
---
name: design-verifier
description: @zzem-design-system/components 구현이 디자인 스펙과 일치하는지 검증.
  Figma 스크린샷과 토큰 참조의 정합성을 비교한다.
tools: [Read, Grep, Glob, WebFetch, mcp__figma__get_screenshot, mcp__figma__get_code]
---

# zzem-design-system Design Verifier

## Workflow

1. Figma에서 컴포넌트 스크린샷 추출
2. 구현된 컴포넌트의 Storybook 렌더링과 비교
3. @zzem-design-system/tokens 참조 정합성 검증
4. spacing, radius, color 값 일치 확인
5. 불일치 항목 리포트 생성

## Verification Checklist

- [ ] 모든 variant의 색상이 @zzem-design-system/tokens와 일치
- [ ] spacing이 디자인 스펙과 일치
- [ ] border-radius가 토큰과 일치
- [ ] typography (font-size, line-height, font-weight) 일치
- [ ] 각 state (default, pressed, disabled, focused) 스타일 일치
- [ ] iOS/Android 플랫폼별 차이가 의도된 것인지 확인
```

### 4.4 MCP Server 설계 (`@zzem-design-system/mcp-server`)

```typescript
// packages/mcp-server/src/tools/

// Tool 1: zds_get_component
{
  name: "zds_get_component",
  description: "zzem-design-system 컴포넌트의 props, 토큰, 가이드라인, 코드 예제를 반환합니다.",
  inputSchema: {
    type: "object",
    properties: {
      name: { type: "string", description: "컴포넌트 이름 (e.g., Button, TextInput)" },
      section: {
        type: "string",
        enum: ["all", "props", "tokens", "guidelines", "examples", "dos-donts"],
        description: "조회할 섹션"
      }
    },
    required: ["name"]
  }
}

// Tool 2: zds_get_tokens
{
  name: "zds_get_tokens",
  description: "zzem-design-system 디자인 토큰 값을 조회합니다. 카테고리 또는 컴포넌트별 필터링 가능.",
  inputSchema: {
    type: "object",
    properties: {
      category: { type: "string", enum: ["color", "typography", "spacing", "radius", "elevation"] },
      tier: { type: "string", enum: ["primitive", "semantic", "component"] },
      component: { type: "string", description: "컴포넌트 이름 (component tier 조회 시)" }
    }
  }
}

// Tool 3: zds_validate_usage
{
  name: "zds_validate_usage",
  description: "코드 스니펫이 zzem-design-system 디자인 시스템 규칙을 준수하는지 검증합니다.",
  inputSchema: {
    type: "object",
    properties: {
      code: { type: "string", description: "검증할 코드 스니펫" },
      componentName: { type: "string", description: "사용 중인 컴포넌트 이름" }
    },
    required: ["code"]
  }
}

// Tool 4: zds_generate_snippet
{
  name: "zds_generate_snippet",
  description: "특정 시나리오에 맞는 zzem-design-system 컴포넌트 코드를 생성합니다.",
  inputSchema: {
    type: "object",
    properties: {
      scenario: { type: "string", description: "사용 시나리오 설명" },
      components: {
        type: "array",
        items: { type: "string" },
        description: "사용할 @zzem-design-system/components 컴포넌트 목록"
      }
    },
    required: ["scenario"]
  }
}

// Tool 5: zds_search_guidelines
{
  name: "zds_search_guidelines",
  description: "zzem-design-system 디자인 가이드라인과 패턴을 키워드로 검색합니다.",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "검색 키워드" },
      category: {
        type: "string",
        enum: ["foundations", "components", "patterns", "accessibility"],
        description: "검색 범위"
      }
    },
    required: ["query"]
  }
}
```

### 4.5 ESLint Plugin 규칙 (`@zzem-design-system/eslint-plugin`)

```typescript
// 플러그인 설정: extends: ['plugin:@zzem-design-system/recommended']

// Rule: @zzem-design-system/no-hardcoded-colors
// ❌ style={{ color: '#FF0000' }}
// ✅ style={{ color: tokens.color.danger.default }}

// Rule: @zzem-design-system/no-hardcoded-spacing
// ❌ style={{ padding: 16 }}
// ✅ style={{ padding: tokens.spacing.md }}

// Rule: @zzem-design-system/use-design-tokens
// ❌ style={{ borderRadius: 8, fontSize: 14 }}
// ✅ style={{ borderRadius: tokens.radius.md, fontSize: tokens.typography.body.md.fontSize }}

// Rule: @zzem-design-system/no-inline-styles
// ❌ <View style={{ flex: 1, backgroundColor: tokens.color.bg.primary }} />
// ✅ <View style={styles.container} />  (createStyles 사용)

// Rule: @zzem-design-system/valid-component-props
// ❌ <Button variant="custom" />
// ✅ <Button variant="primary" />
```

---

## 5. 구현 로드맵

### Phase 1: Foundation (2주)

- [ ] pnpm workspace 모노레포 세팅 (`zzem-design-system/`)
- [ ] `@zzem-design-system/tokens`: Design Token JSON 구조 정의 (3-tier)
- [ ] Style Dictionary 설정 (JSON → TypeScript 변환)
- [ ] `@zzem-design-system/engine`: ZDSProvider + useTheme + createStyles 구현
- [ ] `@zzem-design-system/engine`: platform.ts (iOS/Android 추상화)
- [ ] CLAUDE.md / AGENTS.md 초기 작성
- [ ] `packages/components/src/__template__/` 작성

### Phase 2: Core Components (3주)

- [ ] Primitives: Box, Text, Pressable, Stack, Spacer, Divider
- [ ] Inputs: Button, IconButton, TextInput, Checkbox, Switch, Radio
- [ ] Display: Avatar, Badge, Tag, Card
- [ ] Feedback: Toast, Dialog, BottomSheet, Snackbar
- [ ] `docs/components/*.md` 스펙 문서 (Agent-readable 포맷)
- [ ] Storybook React Native 세팅 + 전체 stories

### Phase 3: Agent Infrastructure (2주)

- [ ] `@zzem-design-system/mcp-server` 구현 (5 tools)
- [ ] `.claude/agents/` Sub-Agent 정의 5종
- [ ] `.claude/commands/` Slash Commands 3종
- [ ] `@zzem-design-system/eslint-plugin` 구현 (5 rules)
- [ ] AGENTS.md 완성 + orchestration 규칙

### Phase 4: Automation & Governance (2주)

- [ ] Figma Variables ↔ `@zzem-design-system/tokens` 동기화 파이프라인
- [ ] CI/CD: PR마다 visual regression + a11y audit + lint
- [ ] 컴포넌트 사용률 추적 메트릭
- [ ] 문서 자동 생성 (컴포넌트 소스 → `docs/components/`)
- [ ] `@zzem-design-system/codemod` 스크립트 (breaking change 대응)

---

## 6. Agent Prompt 라이브러리

### 6.1 새 컴포넌트 생성 프롬프트

```
/new-component

너는 zzem-design-system 디자인 시스템의 컴포넌트 생성 전문가야.

## 작업 순서
1. 먼저 @zzem-design-system/mcp-server의 zds_get_component로 유사 컴포넌트가 있는지 확인해.
2. `docs/components/{name}.md`에 스펙 문서를 먼저 작성해.
   - YAML frontmatter: name, package(@zzem-design-system/components), category, status, platforms
   - Props 테이블, Design Tokens Used, Behavior, Do/Don't, Code Example 섹션 필수
3. `packages/tokens/src/component/{name}.tokens.json` 생성.
   - 기존 @zzem-design-system/tokens의 semantic 토큰을 참조하되, 컴포넌트 전용이 필요한 경우만 추가.
4. `packages/components/src/{category}/{Name}/` 아래에 __template__ 구조로 생성:
   - {Name}.types.ts: Props interface (forwardRef용 ref 포함)
   - {Name}.tsx: 구현 (forwardRef, accessibilityRole 필수)
   - {Name}.styles.ts: createStyles() 사용, 모든 variant/state 커버
   - {Name}.stories.tsx: 모든 variant 조합
   - {Name}.test.tsx: 렌더링 + 접근성 + props 테스트
   - index.ts: named export

## 필수 규칙
- 색상/간격/타이포 하드코딩 절대 금지 → @zzem-design-system/tokens만 사용
- Platform.OS 직접 분기 금지 → @zzem-design-system/engine의 platform.ts 사용
- any 타입 금지
- default export 금지
- 접근성 props 필수 (accessibilityLabel, accessibilityRole)

## import 패턴
\`\`\`tsx
import { createStyles, useTheme, platform } from '@zzem-design-system/engine';
import { tokens } from '@zzem-design-system/tokens';
import type { ButtonProps } from './Button.types';
\`\`\`
```

### 6.2 토큰 동기화 프롬프트

```
/sync-tokens

Figma Variables와 @zzem-design-system/tokens의 동기화를 수행해.

## 작업 순서
1. Figma MCP로 최신 Variables 가져오기
2. `packages/tokens/src/` 의 JSON 파일과 diff 비교
3. 변경사항 요약 리포트:
   - 추가된 토큰
   - 수정된 토큰 (이전값 → 새값)
   - 삭제된 토큰 (⚠️ breaking change 경고)
4. 확인 후 로컬 JSON 업데이트
5. `pnpm build:tokens` 실행
6. 영향받는 @zzem-design-system/components 목록 출력
7. 색상 변경 시 WCAG 대비율 검증 (4.5:1 이상)

## 주의사항
- Primitive 토큰 삭제 시 semantic 참조 체인 확인 필수
- Breaking change는 사람의 확인 없이 진행하지 않음
- Breaking change 확인 시 @zzem-design-system/codemod transform 자동 생성
```

### 6.3 디자인 검증 프롬프트

```
/audit-component {component-name}

{component-name} @zzem-design-system/components의 구현이 디자인 스펙과 일치하는지 검증해.

## 검증 항목
1. 토큰 정합성: @zzem-design-system/tokens 참조가 스펙 문서와 일치하는가?
2. Props 완전성: 스펙의 모든 Props가 구현되어 있는가?
3. State 커버리지: default, pressed, disabled, focused, loading 등 모든 state 처리
4. 접근성: accessibilityRole, accessibilityLabel, accessibilityState 적용
5. Platform 분기: @zzem-design-system/engine의 platform.ts를 통한 iOS/Android 차이
6. ESLint: @zzem-design-system/eslint-plugin 규칙 위반 없는가?
7. 테스트 커버리지: 모든 variant/state에 대한 테스트 존재?

## 결과 형식
✅ 통과 / ⚠️ 경고 / ❌ 실패 로 항목별 리포트
```

### 6.4 앱 화면 구현 가이드 프롬프트 (앱 개발자용)

```
나는 zzem-design-system 디자인 시스템을 사용하여 React Native 앱 화면을 만들고 있어.
다음 화면을 구현할 때 @zzem-design-system/components를 어떻게 조합해야 하는지 알려줘.

## 규칙
1. 먼저 zds_search_guidelines로 관련 패턴을 검색해.
2. 사용할 컴포넌트를 zds_get_component로 조회하여 정확한 props를 확인해.
3. zds_validate_usage로 생성한 코드를 검증해.
4. 하드코딩 값이 하나도 없어야 함. 모든 값은 @zzem-design-system/tokens.
5. 접근성 props 누락 없이.

## import 패턴
\`\`\`tsx
import { Button, TextInput, Card, Text } from '@zzem-design-system/components';
import { ZDSProvider, useTheme, createStyles } from '@zzem-design-system/engine';
import { tokens } from '@zzem-design-system/tokens';
import { SearchIcon, ArrowRightIcon } from '@zzem-design-system/icons';
\`\`\`

## 화면 설명
{사용자가 화면 설명을 입력}
```

---

## 7. 거버넌스 & 메트릭

### 7.1 자동화된 품질 게이트

| 게이트 | 도구                              | 기준                          |
| ------ | --------------------------------- | ----------------------------- |
| Lint   | @zzem-design-system/eslint-plugin | 디자인 토큰 규칙 0 violations |
| Type   | TypeScript                        | strict mode, 0 errors         |
| Test   | Jest + RNTL                       | 80%+ coverage                 |
| A11y   | axe-core RN                       | 0 critical/serious            |
| Visual | Storybook snapshot                | 0 unexpected changes          |
| Bundle | size-limit                        | 컴포넌트당 5KB 미만           |

### 7.2 사용률 추적

- `@zzem-design-system/components` 컴포넌트별 import 횟수 (앱 코드 내)
- 하드코딩 토큰 비율 (`@zzem-design-system/eslint-plugin` violations / total lines)
- Agent 생성 코드의 lint pass rate
- 커스텀 스타일 오버라이드 비율 (`style` prop 사용 빈도)

---

## 8. 참고 레퍼런스

| 출처                | URL                                          | 참고 포인트                           |
| ------------------- | -------------------------------------------- | ------------------------------------- |
| Montage 문서 사이트 | montage.wanted.co.kr                         | 전체 구조, Foundation/Component 계층  |
| Montage GitHub      | github.com/wanteddev/montage-web             | 패키지 구조, MCP 서버, CLAUDE.md      |
| Montage Figma       | figma.com/community/file/1355516515676178246 | 컴포넌트 구조, 토큰 네이밍            |
| Montage 제작기      | brunch.co.kr/@wanteddesign/37                | 70개 컴포넌트 제작 과정, Variant 설계 |
| Montage 오픈기      | brunch.co.kr/@wanteddesign/39                | AX 전환, Machine-Readable DS          |

---

## 부록 A: 컴포넌트 **template** 상세

### A.1 {Name}.types.ts

```typescript
import type { ViewStyle, TextStyle } from "react-native";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  /** 버튼 스타일 변형 */
  variant?: ButtonVariant;
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 전체 너비 */
  fullWidth?: boolean;
  /** 좌측 아이콘 */
  iconLeft?: React.ReactNode;
  /** 우측 아이콘 */
  iconRight?: React.ReactNode;
  /** 클릭 핸들러 */
  onPress?: () => void;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
  /** 자식 요소 (버튼 텍스트) */
  children: React.ReactNode;
  /** 스타일 오버라이드 (권장하지 않음) */
  style?: ViewStyle;
  /** 텍스트 스타일 오버라이드 (권장하지 않음) */
  textStyle?: TextStyle;
  /** 테스트 ID */
  testID?: string;
}
```

### A.2 {Name}.tsx

```typescript
import React, { forwardRef } from 'react';
import { Pressable, View, ActivityIndicator } from 'react-native';
import { useTheme } from '@zzem-design-system/engine';
import { Text } from '../primitives/Text';
import { useStyles } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      iconLeft,
      iconRight,
      onPress,
      accessibilityLabel,
      children,
      style,
      textStyle,
      testID,
    },
    ref,
  ) => {
    const theme = useTheme();
    const styles = useStyles({ variant, size, disabled, fullWidth });

    const isDisabled = disabled || loading;

    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => [
          styles.container,
          pressed && !isDisabled && styles.pressed,
          style,
        ]}
        disabled={isDisabled}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        testID={testID}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={styles.loaderColor}
          />
        ) : (
          <>
            {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
            <Text style={[styles.label, textStyle]}>{children}</Text>
            {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
          </>
        )}
      </Pressable>
    );
  },
);

Button.displayName = 'Button';
```

### A.3 {Name}.styles.ts

```typescript
import { createStyles } from "@zzem-design-system/engine";
import type { ButtonVariant, ButtonSize } from "./Button.types";

interface StyleParams {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  fullWidth: boolean;
}

export const useStyles = createStyles(
  (tokens, { variant, size, disabled, fullWidth }: StyleParams) => {
    const variantTokens = tokens.component.button[variant];
    const sizeTokens = tokens.component.button.size[size];

    return {
      container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: sizeTokens.height,
        paddingHorizontal: sizeTokens.paddingHorizontal,
        backgroundColor: variantTokens.background.default,
        borderRadius: tokens.component.button.radius,
        borderWidth: variantTokens.border.width,
        borderColor: variantTokens.border.color,
        opacity: disabled ? tokens.opacity.disabled : 1,
        ...(fullWidth && { width: "100%" }),
      },
      pressed: {
        backgroundColor: variantTokens.background.pressed,
        opacity: tokens.opacity.pressed,
      },
      label: {
        fontSize: sizeTokens.fontSize,
        fontWeight: tokens.typography.weight.semibold,
        lineHeight: sizeTokens.lineHeight,
        color: variantTokens.label.default,
      },
      iconLeft: {
        marginRight: tokens.spacing.xs,
      },
      iconRight: {
        marginLeft: tokens.spacing.xs,
      },
      loaderColor: variantTokens.label.default,
    };
  },
);
```

---

## 부록 B: pnpm-workspace.yaml

```yaml
packages:
  - "packages/*"
```

## 부록 C: 핵심 프롬프트 체크리스트

Agent에게 zzem-design-system 관련 작업을 요청할 때 아래 항목이 반드시 충족되어야 한다:

```
□ CLAUDE.md 읽었는가?
□ @zzem-design-system/mcp-server로 관련 토큰/컴포넌트 조회했는가?
□ __template__ 구조를 따르는가?
□ 하드코딩 값이 0개인가? (모두 @zzem-design-system/tokens 참조)
□ 접근성 props가 포함되어 있는가?
□ Platform 분기가 @zzem-design-system/engine을 통하는가?
□ @zzem-design-system/eslint-plugin 통과하는가?
□ 스펙 문서(docs/components/)가 먼저 작성되어 있는가?
□ import는 @zzem-design-system/* 패키지에서만 하는가?
```
