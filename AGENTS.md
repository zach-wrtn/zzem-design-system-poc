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
- **Tools**: Read, Write, Bash, WebFetch, mcp__figma__get_variable_defs

### 3. design-verifier

- **Purpose**: 구현과 디자인 스펙의 일치 검증
- **Location**: `.claude/agents/design-verifier.md`
- **When to use**: PR 리뷰 시, 또는 컴포넌트 구현 완료 후
- **Tools**: Read, Grep, Glob, WebFetch, mcp__figma__get_screenshot

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
