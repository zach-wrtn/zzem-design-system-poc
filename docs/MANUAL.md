# zzem-design-system 운용 매뉴얼

> AI Agent와 사람이 함께 운용하는 React Native 디자인 시스템

---

## 목차

1. [시스템 개요](#1-시스템-개요)
2. [아키텍처 전체 도식](#2-아키텍처-전체-도식)
3. [패키지 구조 및 의존성](#3-패키지-구조-및-의존성)
4. [Design Token 시스템](#4-design-token-시스템)
5. [Styling Engine](#5-styling-engine)
6. [컴포넌트 시스템](#6-컴포넌트-시스템)
7. [아이콘 시스템](#7-아이콘-시스템)
8. [Agent 오케스트레이션](#8-agent-오케스트레이션)
9. [MCP Server](#9-mcp-server)
10. [ESLint Plugin](#10-eslint-plugin)
11. [Figma 연동](#11-figma-연동)
12. [테스트 전략](#12-테스트-전략)
13. [워크플로우: 컴포넌트 생성](#13-워크플로우-컴포넌트-생성)
14. [워크플로우: 토큰 동기화](#14-워크플로우-토큰-동기화)
15. [워크플로우: 디자인 검증](#15-워크플로우-디자인-검증)
16. [워크플로우: Breaking Change 대응](#16-워크플로우-breaking-change-대응)
17. [CLI 명령어 레퍼런스](#17-cli-명령어-레퍼런스)
18. [금지 패턴 및 대체 방법](#18-금지-패턴-및-대체-방법)
19. [트러블슈팅](#19-트러블슈팅)

---

## 1. 시스템 개요

### 1.1 zzem-design-system이란

zzem-design-system은 **"사람과 Agent가 함께 만드는 UI"**를 목표로 하는 React Native 디자인 시스템이다.
디자이너가 Figma에서 설계하고, AI Agent가 토큰과 가이드라인을 기반으로 정확히 구현하는 협업 체계를 제공한다.

### 1.2 핵심 원칙

| 원칙 | 설명 |
|------|------|
| **Machine-Readable First** | Agent가 파싱하기 좋은 구조 우선 |
| **Single Source of Truth** | Design Token → Figma Variables → RN StyleSheet 단방향 흐름 |
| **Composable Architecture** | Primitive → Semantic → Component 3-tier 토큰 |
| **Platform-Aware** | iOS/Android 네이티브 특성을 존중하는 cross-platform 설계 |
| **Docs-First** | 스펙 문서를 먼저 작성하고, 코드를 구현한다 |

### 1.3 기술 스택

```
React Native 0.76+  │  TypeScript 5.x (strict)  │  pnpm workspace
Jest + RNTL          │  Storybook RN              │  MCP Protocol
```

---

## 2. 아키텍처 전체 도식

### 2.1 시스템 전체 흐름

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        zzem-design-system                               │
│                                                                         │
│  ┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  Figma   │───▶│  Tokens  │───▶│    Engine     │───▶│  Components  │  │
│  │ Variables│    │  (SSOT)  │    │ (Theme/Style)│    │  (24 UI)     │  │
│  └──────────┘    └────┬─────┘    └──────┬───────┘    └──────┬───────┘  │
│                       │                 │                    │          │
│                       ▼                 ▼                    ▼          │
│              ┌────────────────────────────────────────────────────┐     │
│              │              앱 (App Layer)                         │     │
│              │  ZDSProvider ─▶ useTheme ─▶ createStyles ─▶ UI    │     │
│              └────────────────────────────────────────────────────┘     │
│                                                                         │
│  ┌───────────────────── Agent Infrastructure ──────────────────────┐   │
│  │                                                                  │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────────────┐  │   │
│  │  │  MCP    │  │ ESLint  │  │ Agents  │  │ Slash Commands   │  │   │
│  │  │ Server  │  │ Plugin  │  │ (5종)   │  │ (3종)            │  │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └──────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 런타임 데이터 흐름

```
┌──────────────────────────────────────────────────────────────┐
│                    런타임 데이터 흐름                          │
│                                                              │
│  tokens.json ──build──▶ tokens.ts ──import──▶ ZDSProvider    │
│  (22 JSON files)         (generated)          │               │
│                                               ▼               │
│                                          ThemeContext          │
│                                          { tokens, mode }     │
│                                               │               │
│                          ┌────────────────────┼──────┐        │
│                          ▼                    ▼      ▼        │
│                     useTheme()          createStyles()        │
│                     ↓                        ↓                │
│                  컴포넌트 내              스타일 팩토리        │
│                  직접 참조               (tokens, params)     │
│                                          → memoized styles    │
│                                               │               │
│                                               ▼               │
│                                     ┌─────────────────┐       │
│                                     │  Rendered UI    │       │
│                                     │  (iOS/Android)  │       │
│                                     └─────────────────┘       │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. 패키지 구조 및 의존성

### 3.1 패키지 맵

```
zzem-design-system/
├── packages/
│   ├── tokens/          @zzem-design-system/tokens         ← SSOT
│   ├── engine/          @zzem-design-system/engine         ← 스타일 엔진
│   ├── components/      @zzem-design-system/components     ← UI 컴포넌트
│   ├── icons/           @zzem-design-system/icons          ← 아이콘
│   ├── mcp-server/      @zzem-design-system/mcp-server     ← AI 도구
│   ├── eslint-plugin/   @zzem-design-system/eslint-plugin  ← 린트 규칙
│   ├── codemod/         @zzem-design-system/codemod        ← 마이그레이션
│   └── storybook/       @zzem-design-system/storybook      ← 문서화
├── docs/                                                    ← 스펙 문서
├── figma/                                                   ← Figma 연동
├── scripts/                                                 ← 유틸리티
└── tests/                                                   ← 통합 테스트
```

### 3.2 의존성 그래프

```
@zzem-design-system/tokens          ← 의존성 없음 (Source of Truth)
         │
         ▼
@zzem-design-system/engine          ← tokens에 의존
         │
         ├──────────────────┐
         ▼                  ▼
@zzem-design-system/     @zzem-design-system/
   components                icons
         │                   │
         └────────┬──────────┘
                  ▼
           앱 (Consumer)

@zzem-design-system/mcp-server      ← tokens + docs 참조 (런타임 의존 없음)
@zzem-design-system/eslint-plugin   ← tokens 키 목록 참조
@zzem-design-system/codemod         ← 독립 실행
```

### 3.3 각 패키지의 역할

| 패키지 | 역할 | 주요 Export |
|--------|------|------------|
| **tokens** | 디자인 값의 유일한 원천 | `tokens`, `Tokens` (type) |
| **engine** | 테마 컨텍스트 + 스타일링 도구 | `ZDSProvider`, `useTheme`, `createStyles`, `platform`, `responsive` |
| **components** | 재사용 가능한 UI 컴포넌트 | `Button`, `TextInput`, `Dialog` 등 24종 |
| **icons** | SVG 기반 아이콘 컴포넌트 | `Icon`, `SearchIcon`, `CloseIcon` 등 10종 |
| **mcp-server** | AI Agent용 도구 서버 | MCP 5 tools (stdio transport) |
| **eslint-plugin** | 디자인 시스템 규칙 검증 | 5 ESLint rules |
| **codemod** | 마이그레이션 자동화 | token-rename transform |

---

## 4. Design Token 시스템

### 4.1 3-Tier 토큰 구조

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Tier 1: Primitive Tokens ─── "값이 무엇인가 (What)"       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  color.blue.600: #2563EB                            │    │
│  │  typography.fontSize.md: 16                         │    │
│  │  spacing.8: 32                                      │    │
│  │  radius.md: 8                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│           │                                                  │
│           ▼  참조                                            │
│  Tier 2: Semantic Tokens ─── "의미가 무엇인가 (Why)"       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  color.interactive.primary → {color.blue.600}       │    │
│  │  color.text.primary → {color.gray.900}              │    │
│  │  color.border.default → {color.gray.200}            │    │
│  └─────────────────────────────────────────────────────┘    │
│           │                                                  │
│           ▼  참조                                            │
│  Tier 3: Component Tokens ─── "어디서 쓰이는가 (Where)"   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  button.primary.background → {color.interactive...} │    │
│  │  button.primary.label → {color.white}               │    │
│  │  button.radius → {radius.md}                        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 토큰 빌드 파이프라인

```
┌──────────────────────────────────────────────────────────────┐
│                    토큰 빌드 파이프라인                        │
│                                                              │
│  src/primitive/*.json ──┐                                    │
│  (6 files: colors,     │                                     │
│   typography, spacing, │    ┌──────────────────┐             │
│   radius, elevation,   ├───▶│  react-native.ts │             │
│   opacity)             │    │  (Transformer)   │             │
│                        │    │                  │             │
│  src/semantic/*.json ──┤    │  1. Read JSON    │  output/    │
│  (3 files: color,      │    │  2. Deep merge   │  ┌────────┐│
│   typography, spacing) ├───▶│  3. Resolve refs ├─▶│tokens.ts││
│                        │    │     (per-tier)   │  │tokens.json│
│  src/component/*.json ─┘    │  4. Flatten vals │  └────────┘│
│  (19 files: button,         │  5. Generate TS  │             │
│   input, card, ...)          └──────────────────┘             │
│                                                              │
│  참조 해석 순서: primitive → semantic → component             │
│  (각 tier가 이전 tier의 해석된 값을 참조)                     │
└──────────────────────────────────────────────────────────────┘
```

### 4.3 토큰 네이밍 컨벤션

| Tier | 패턴 | 예시 |
|------|------|------|
| Primitive | `{category}.{scale}` | `color.blue.500`, `spacing.4` |
| Semantic | `{category}.{usage}.{variant}` | `color.interactive.primary` |
| Component | `{component}.{element}.{property}.{state}` | `button.label.color.pressed` |

### 4.4 토큰 파일 구조

```json
// packages/tokens/src/component/button.tokens.json
{
  "component": {
    "button": {
      "radius": { "value": "{radius.md}" },
      "primary": {
        "background": {
          "default": { "value": "{color.interactive.primary}" },
          "pressed": { "value": "{color.interactive.primaryPressed}" }
        },
        "label": {
          "default": { "value": "{color.white}" }
        }
      },
      "size": {
        "sm": { "height": { "value": 32 }, "fontSize": { "value": "{typography.fontSize.sm}" } },
        "md": { "height": { "value": 40 }, "fontSize": { "value": "{typography.fontSize.md}" } },
        "lg": { "height": { "value": 48 }, "fontSize": { "value": "{typography.fontSize.lg}" } }
      }
    }
  }
}
```

### 4.5 Primitive 토큰 상세

**Color Palette:**

```
Gray    ░░░▒▒▒▓▓▓███  50 → 100 → 200 → 300 → 400 → 500 → 600 → 700 → 800 → 900
Blue    ░░░▒▒▒▓▓▓███  Primary 계열 (#EFF6FF → #1E3A8A)
Red     ░░░▒▒▒▓▓▓███  Danger 계열  (#FEF2F2 → #7F1D1D)
Green   ░░░▒▒▒▓▓▓███  Success 계열 (#F0FDF4 → #14532D)
Yellow  ░░░▒▒▒▓▓▓███  Warning 계열 (#FEFCE8 → #713F12)
+ white (#FFFFFF), black (#000000)
```

**Spacing Scale (4px 기반):**

```
0    1    2    3    4    5    6    8    10   12   16   20   24   32   40
0px  2px  4px  6px  8px  10px 12px 16px 20px 24px 32px 40px 48px 64px 80px
```

**Typography Scale:**

```
xs:12  sm:14  md:16  lg:18  xl:20  2xl:24  3xl:30  4xl:36
```

---

## 5. Styling Engine

### 5.1 Engine 모듈 구성

```
packages/engine/src/
├── index.ts          ← 모든 export의 진입점
├── ZDSProvider.tsx   ← 테마 컨텍스트 Provider
├── useTheme.ts       ← 테마 훅
├── createStyles.ts   ← 스타일 팩토리
├── platform.ts       ← 플랫폼 유틸리티
└── responsive.ts     ← 반응형 유틸리티
```

### 5.2 ZDSProvider — 테마 컨텍스트

**역할:** 앱 전체에 디자인 토큰과 테마 모드를 제공한다.

```
┌─────────────────────────────────────────┐
│  ZDSProvider                            │
│  ┌───────────────────────────────────┐  │
│  │  Props                            │  │
│  │  ├── mode: 'light' | 'dark'      │  │
│  │  └── children: ReactNode         │  │
│  ├───────────────────────────────────┤  │
│  │  Provides (via ThemeContext)       │  │
│  │  ├── tokens: Tokens              │  │
│  │  └── mode: ThemeMode             │  │
│  └───────────────────────────────────┘  │
│                                         │
│  사용:                                   │
│  <ZDSProvider mode="light">             │
│    <App />                              │
│  </ZDSProvider>                         │
└─────────────────────────────────────────┘
```

### 5.3 useTheme — 테마 접근 훅

**역할:** 컴포넌트 내에서 토큰과 테마 모드에 접근한다.

```typescript
const { tokens, mode } = useTheme();
// tokens.color.interactive.primary → '#2563EB'
// mode → 'light'
```

- ZDSProvider 외부에서 호출하면 에러 throw
- 반환값: `{ tokens: Tokens, mode: 'light' | 'dark' }`

### 5.4 createStyles — 스타일 팩토리

**역할:** 토큰 기반 + 파라미터 기반의 메모이즈된 스타일을 생성한다.

```
┌──────────────────────────────────────────────────────────┐
│  createStyles 동작 흐름                                   │
│                                                          │
│  개발자 정의:                                             │
│  const useStyles = createStyles((tokens, params) => ({   │
│    container: {                                          │
│      backgroundColor: tokens.component.button[variant],  │
│      height: tokens.component.button.size[size].height,  │
│    }                                                     │
│  }));                                                    │
│                                                          │
│  컴포넌트 내 사용:                                        │
│  const styles = useStyles({ variant: 'primary', ... });  │
│                                                          │
│  내부 동작:                                               │
│  ┌───────────┐     ┌──────────────┐     ┌──────────┐    │
│  │ useTheme()│────▶│ factory()    │────▶│ useMemo  │    │
│  │ {tokens,  │     │ (tokens,     │     │ deps:    │    │
│  │  mode}    │     │  params)     │     │ [paramsKey│    │
│  └───────────┘     └──────────────┘     │  mode]   │    │
│                                         └─────┬────┘    │
│                                               ▼         │
│                                         Memoized Styles  │
│                                                          │
│  메모이제이션 키: JSON.stringify(params) + mode           │
│  → params 객체 참조가 바뀌어도 값이 같으면 재계산 안 함   │
└──────────────────────────────────────────────────────────┘
```

### 5.5 platform — 플랫폼 유틸리티

**역할:** iOS/Android 플랫폼 분기를 추상화한다.

| API | 타입 | 설명 |
|-----|------|------|
| `platform.os` | `'ios' \| 'android'` | 현재 플랫폼 |
| `platform.isIOS` | `boolean` | iOS 여부 |
| `platform.isAndroid` | `boolean` | Android 여부 |
| `platform.select(opts)` | `<T>(opts) => T` | 플랫폼별 값 선택 |
| `platform.version` | `number` | OS 버전 |
| `platform.haptic(style)` | `void` | iOS 햅틱 피드백 |

```typescript
// 사용 예시
const elevation = platform.select({
  ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 },
  android: { elevation: 3 },
});
```

### 5.6 responsive — 반응형 유틸리티

**역할:** 디바이스 크기에 따른 스케일링을 제공한다.

기준 디바이스: iPhone 14 Pro (393 × 852pt)

| API | 설명 |
|-----|------|
| `responsive.horizontalScale(size)` | 화면 너비 기준 선형 스케일링 |
| `responsive.verticalScale(size)` | 화면 높이 기준 선형 스케일링 |
| `responsive.scale(size, factor?)` | 완만한 스케일링 (기본 factor: 0.5) |
| `responsive.normalizeFont(size)` | 폰트 크기 정규화 |
| `responsive.isSmallDevice` | 너비 < 375pt |
| `responsive.isLargeDevice` | 너비 >= 428pt |

---

## 6. 컴포넌트 시스템

### 6.1 컴포넌트 카탈로그

```
┌────────────────────────────────────────────────────────────────┐
│                    컴포넌트 카탈로그 (24종)                     │
│                                                                │
│  ┌─── Primitives (기초) ────────────────────────────────────┐  │
│  │  Box        Text       Pressable    Stack (HStack/VStack)│  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─── Inputs (입력) ────────────────────────────────────────┐  │
│  │  Button     IconButton  TextInput                        │  │
│  │  Checkbox   Switch      RadioGroup                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─── Display (표시) ───────────────────────────────────────┐  │
│  │  Avatar     Badge       Card         Tag                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─── Feedback (피드백) ────────────────────────────────────┐  │
│  │  Toast      Dialog      BottomSheet   Snackbar           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─── Layout (레이아웃) ────────────────────────────────────┐  │
│  │  Divider    Spacer      SafeArea                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─── Navigation (네비게이션) ──────────────────────────────┐  │
│  │  Header     TabBar      NavigationBar                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

### 6.2 컴포넌트 파일 구조

각 컴포넌트는 아래 **템플릿 구조**를 따른다:

```
packages/components/src/{category}/{Name}/
├── index.ts              ← re-export만 (로직 금지)
├── {Name}.tsx            ← 컴포넌트 구현 (forwardRef 필수)
├── {Name}.types.ts       ← Props 인터페이스 + 타입
├── {Name}.styles.ts      ← createStyles 기반 스타일
├── {Name}.stories.tsx    ← Storybook 스토리 (전체 variant)
└── {Name}.test.tsx       ← Jest 테스트
```

**각 파일의 역할:**

| 파일 | 역할 | 핵심 규칙 |
|------|------|----------|
| `index.ts` | 외부 노출 진입점 | re-export만, 로직 금지 |
| `{Name}.tsx` | UI 렌더링 로직 | forwardRef, a11y props 필수 |
| `{Name}.types.ts` | 타입 정의 | Props interface, Variant union types |
| `{Name}.styles.ts` | 스타일 정의 | createStyles 사용, 토큰만 참조 |
| `{Name}.stories.tsx` | 시각적 문서 | 모든 variant/size/state 커버 |
| `{Name}.test.tsx` | 자동 테스트 | 렌더링 + 이벤트 + 접근성 |

### 6.3 컴포넌트 구현 패턴

```typescript
// ── {Name}.types.ts ──
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  children: React.ReactNode;
  testID?: string;
}

// ── {Name}.styles.ts ──
import { createStyles } from '@zzem-design-system/engine';

export const useStyles = createStyles((tokens, { variant, size, disabled }) => ({
  container: {
    backgroundColor: tokens.component.button[variant].background.default,
    height: tokens.component.button.size[size].height,
    borderRadius: tokens.component.button.radius,
    opacity: disabled ? tokens.opacity.disabled : 1,
  },
  label: {
    color: tokens.component.button[variant].label.default,
    fontSize: tokens.component.button.size[size].fontSize,
    fontWeight: tokens.typography.fontWeight.semibold,
  },
}));

// ── {Name}.tsx ──
import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import { useStyles } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button = forwardRef<View, ButtonProps>(
  ({ variant = 'primary', size = 'md', disabled, onPress, children, ...props }, ref) => {
    const styles = useStyles({ variant, size, disabled });
    return (
      <Pressable
        ref={ref}
        style={styles.container}
        disabled={disabled}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        {...props}
      >
        {children}
      </Pressable>
    );
  },
);
Button.displayName = 'Button';

// ── index.ts ──
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';
```

---

## 7. 아이콘 시스템

### 7.1 구조

```
packages/icons/src/
├── index.ts          ← 전체 export
├── Icon.tsx          ← 범용 Icon 컴포넌트 (name → SVG 매핑)
├── types.ts          ← SvgIconProps 타입
├── registry.ts       ← 아이콘 이름 → 컴포넌트 레지스트리
└── generated/        ← SVG 기반 아이콘 컴포넌트 (10종)
    ├── SearchIcon.tsx
    ├── CloseIcon.tsx
    ├── CheckIcon.tsx
    ├── ChevronLeftIcon.tsx
    ├── ChevronRightIcon.tsx
    ├── ArrowLeftIcon.tsx
    ├── ArrowRightIcon.tsx
    ├── PlusIcon.tsx
    ├── InfoIcon.tsx
    └── AlertIcon.tsx
```

### 7.2 사용 방법

```typescript
// 방법 1: 범용 Icon 컴포넌트 (name prop)
import { Icon } from '@zzem-design-system/icons';
<Icon name="search" size={24} color={tokens.color.text.primary} />

// 방법 2: 개별 아이콘 직접 import
import { SearchIcon, CloseIcon } from '@zzem-design-system/icons';
<SearchIcon width={24} height={24} color="#000" />
```

### 7.3 레지스트리 매핑

| name | 컴포넌트 | 용도 |
|------|---------|------|
| `search` | SearchIcon | 검색 |
| `close` | CloseIcon | 닫기, 삭제 |
| `check` | CheckIcon | 확인, 체크 |
| `chevron-left` | ChevronLeftIcon | 뒤로 가기 |
| `chevron-right` | ChevronRightIcon | 다음, 상세 |
| `arrow-left` | ArrowLeftIcon | 좌측 이동 |
| `arrow-right` | ArrowRightIcon | 우측 이동 |
| `plus` | PlusIcon | 추가 |
| `info` | InfoIcon | 정보 |
| `alert` | AlertIcon | 경고 |

---

## 8. Agent 오케스트레이션

### 8.1 Agent 시스템 전체 흐름

```
┌──────────────────────────────────────────────────────────────────────┐
│                     Agent 오케스트레이션 흐름                          │
│                                                                      │
│  사용자 요청                                                          │
│       │                                                              │
│       ▼                                                              │
│  ┌──────────────────┐                                                │
│  │ Slash Command    │  /new-component, /sync-tokens, /audit-component│
│  └────────┬─────────┘                                                │
│           │                                                          │
│           ▼                                                          │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │                     Agent 실행                                │    │
│  │                                                              │    │
│  │  ┌─────────────────┐    ┌─────────────────┐                  │    │
│  │  │ component-      │───▶│ design-         │                  │    │
│  │  │ generator       │    │ verifier        │                  │    │
│  │  │ (스펙→코드)     │    │ (Figma 검증)    │                  │    │
│  │  └─────────────────┘    └────────┬────────┘                  │    │
│  │                                  │                            │    │
│  │  ┌─────────────────┐            │                            │    │
│  │  │ token-sync      │────────────┤  영향받는 컴포넌트          │    │
│  │  │ (Figma↔Token)   │            │  재검증                    │    │
│  │  └─────────────────┘            │                            │    │
│  │                                  ▼                            │    │
│  │                         ┌─────────────────┐                  │    │
│  │                         │ a11y-auditor    │ ← 모든 Agent 후  │    │
│  │                         │ (접근성 감사)    │    자동 호출      │    │
│  │                         └─────────────────┘                  │    │
│  │                                                              │    │
│  │  ┌─────────────────┐                                         │    │
│  │  │ migration-      │ ← Breaking change 감지 시               │    │
│  │  │ assistant       │    자동 호출 + human review 요청         │    │
│  │  │ (codemod)       │                                         │    │
│  │  └─────────────────┘                                         │    │
│  └──────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

### 8.2 Agent 상세 명세

| Agent | 목적 | 입력 | 출력 | 도구 |
|-------|------|------|------|------|
| **component-generator** | 스펙 기반 컴포넌트 생성 | `docs/components/{name}.md` | 컴포넌트 파일 6종 | Read, Write, Bash, Glob, Grep |
| **token-sync** | Figma ↔ Token 동기화 | Figma Variables API | 업데이트된 JSON + 빌드 | Read, Write, Bash, WebFetch |
| **design-verifier** | 구현-디자인 일치 검증 | 컴포넌트 소스 + Figma | 검증 리포트 (✅/⚠️/❌) | Read, Grep, Glob, WebFetch |
| **a11y-auditor** | 접근성 WCAG 2.1 AA 감사 | 컴포넌트 소스 | 감사 리포트 | Read, Grep, Bash |
| **migration-assistant** | Breaking change 대응 | 변경 전후 diff | codemod transform | Read, Write, Bash, Grep, Glob |

### 8.3 오케스트레이션 규칙

```
1. component-generator 완료 ──▶ design-verifier 자동 호출
2. token-sync 완료 ──▶ 영향 컴포넌트 목록 ──▶ design-verifier
3. 모든 agent 완료 ──▶ a11y-auditor 최종 검증
4. breaking change 감지 ──▶ migration-assistant + human review 필수
```

### 8.4 Slash Command 명세

| 명령어 | 파일 | 동작 |
|--------|------|------|
| `/new-component` | `.claude/commands/new-component.md` | 새 컴포넌트 생성 (스펙→토큰→코드→테스트) |
| `/sync-tokens` | `.claude/commands/sync-tokens.md` | Figma Variables ↔ Token 동기화 |
| `/audit-component {name}` | `.claude/commands/audit-component.md` | 컴포넌트 디자인/접근성/코드 감사 |

---

## 9. MCP Server

### 9.1 서버 구성

```
┌────────────────────────────────────────────────────────────────┐
│  @zzem-design-system/mcp-server                                │
│                                                                │
│  Transport: stdio (JSON-RPC)                                   │
│  SDK: @modelcontextprotocol/sdk                                │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Available Tools (5)                                     │  │
│  │                                                          │  │
│  │  ┌────────────────────┐  ┌────────────────────┐         │  │
│  │  │ zds_get_component  │  │ zds_get_tokens     │         │  │
│  │  │ 컴포넌트 정보 조회  │  │ 토큰 값 조회       │         │  │
│  │  └────────────────────┘  └────────────────────┘         │  │
│  │                                                          │  │
│  │  ┌────────────────────┐  ┌────────────────────┐         │  │
│  │  │ zds_validate_usage │  │ zds_generate_snippet│         │  │
│  │  │ 코드 규칙 검증     │  │ 코드 스니펫 생성    │         │  │
│  │  └────────────────────┘  └────────────────────┘         │  │
│  │                                                          │  │
│  │  ┌────────────────────┐                                  │  │
│  │  │zds_search_guidelines│                                  │  │
│  │  │ 가이드라인 검색     │                                  │  │
│  │  └────────────────────┘                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

### 9.2 Tool 상세

#### zds_get_component — 컴포넌트 정보 조회

| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| `name` | string | O | 컴포넌트 이름 (Button, TextInput 등) |
| `section` | enum | X | all, props, tokens, guidelines, examples, dos-donts |

**동작:** `docs/components/{name}.md` 파일을 읽어서 반환. section 지정 시 해당 섹션만 추출.

#### zds_get_tokens — 토큰 값 조회

| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| `category` | enum | X | color, typography, spacing, radius, elevation |
| `tier` | enum | X | primitive, semantic, component |
| `component` | string | X | 컴포넌트 이름 (component tier 시) |

**동작:** `tokens/output/tokens.json`에서 필터링하여 JSON 반환.

#### zds_validate_usage — 코드 규칙 검증

| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| `code` | string | O | 검증할 코드 스니펫 |
| `componentName` | string | X | 사용 중인 컴포넌트 |

**검증 항목:** 하드코딩 색상, 하드코딩 스페이싱, StyleSheet.create 사용, Platform.OS 직접 사용, default export

#### zds_generate_snippet — 코드 생성

| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| `scenario` | string | O | 사용 시나리오 설명 |
| `components` | string[] | X | 사용할 컴포넌트 목록 |

#### zds_search_guidelines — 가이드라인 검색

| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| `query` | string | O | 검색 키워드 |
| `category` | enum | X | foundations, components, patterns, accessibility |

### 9.3 MCP 서버 실행

```bash
# 직접 실행
pnpm --filter @zzem-design-system/mcp-server start

# Claude Code 설정 (.claude/settings.json)
{
  "mcpServers": {
    "zzem-design-system": {
      "command": "tsx",
      "args": ["packages/mcp-server/src/server.ts"]
    }
  }
}
```

---

## 10. ESLint Plugin

### 10.1 규칙 목록

```
┌────────────────────────────────────────────────────────────────────┐
│  @zzem-design-system/eslint-plugin                                 │
│                                                                    │
│  ┌──────────────────────────────────────┬──────────┬────────────┐  │
│  │ Rule                                 │ Severity │ 역할       │  │
│  ├──────────────────────────────────────┼──────────┼────────────┤  │
│  │ @zzem-design-system/                │          │            │  │
│  │   no-hardcoded-colors               │ error    │ HEX 금지   │  │
│  │   no-hardcoded-spacing              │ warn     │ 수치 금지  │  │
│  │   no-inline-styles                  │ warn     │ 인라인 금지│  │
│  │   use-design-tokens                 │ error    │ 토큰 강제  │  │
│  │   valid-component-props             │ error    │ Props 검증 │  │
│  └──────────────────────────────────────┴──────────┴────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

### 10.2 각 규칙 상세

| 규칙 | 감지 패턴 | 올바른 사용 |
|------|----------|------------|
| **no-hardcoded-colors** | `color: '#FF0000'` | `color: tokens.color.danger.default` |
| **no-hardcoded-spacing** | `padding: 16` | `padding: tokens.spacing[8]` |
| **no-inline-styles** | `style={{ color: 'red' }}` | `style={styles.container}` (createStyles) |
| **use-design-tokens** | `fontSize: 14, borderRadius: 8` | `fontSize: tokens.typography.fontSize.sm` |
| **valid-component-props** | `<Button variant="custom">` | `<Button variant="primary">` |

### 10.3 설정 방법

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['@zzem-design-system'],
  extends: ['plugin:@zzem-design-system/recommended'],
};
```

---

## 11. Figma 연동

### 11.1 동기화 흐름

```
┌───────────────────────────────────────────────────────────────┐
│                   Figma ↔ Code 동기화 흐름                    │
│                                                               │
│  ┌────────────┐                        ┌──────────────────┐  │
│  │   Figma    │                        │   Code (tokens)  │  │
│  │            │                        │                  │  │
│  │ Variables  │──── sync-tokens.ts ───▶│ src/primitive/   │  │
│  │ (색상, 간격│     (figma-to-code)    │ src/semantic/    │  │
│  │  타이포)   │                        │ src/component/   │  │
│  └────────────┘                        └────────┬─────────┘  │
│                                                 │             │
│                                                 ▼             │
│  ┌────────────┐                        ┌──────────────────┐  │
│  │   Figma    │                        │   build:tokens   │  │
│  │            │                        │                  │  │
│  │ Components │──── export-icons.ts ──▶│ output/tokens.ts │  │
│  │ (아이콘)   │     (SVG export)       │ output/tokens.json│ │
│  └────────────┘                        └──────────────────┘  │
│                                                               │
│  설정: figma/figma.config.json                                │
│  ├── fileId: Figma 파일 ID                                    │
│  ├── personalAccessToken: API 토큰                            │
│  └── syncConfig.direction: 'figma-to-code'                    │
└───────────────────────────────────────────────────────────────┘
```

### 11.2 설정 파일

```json
// figma/figma.config.json
{
  "fileId": "<Figma-File-ID>",
  "personalAccessToken": "<Figma-PAT>",
  "tokenCollections": {
    "primitive": "Primitive Tokens",
    "semantic": "Semantic Tokens",
    "component": "Component Tokens"
  },
  "syncConfig": {
    "direction": "figma-to-code",
    "autoSync": false,
    "outputDir": "../packages/tokens/src"
  }
}
```

---

## 12. 테스트 전략

### 12.1 테스트 계층

```
┌──────────────────────────────────────────────────────────────┐
│                      테스트 피라미드                           │
│                                                              │
│                        ╱╲                                    │
│                       ╱  ╲                                   │
│                      ╱ E2E╲         tests/integration/       │
│                     ╱______╲        (미구현)                  │
│                    ╱        ╲                                 │
│                   ╱ 접근성   ╲       tests/a11y/             │
│                  ╱ (jest-axe) ╲      24 컴포넌트 a11y 검증    │
│                 ╱______________╲                              │
│                ╱                ╲                             │
│               ╱   컴포넌트 단위  ╲    src/**/*.test.tsx       │
│              ╱   (Jest + RNTL)   ╲   426 tests, 25 suites   │
│             ╱____________________╲                           │
│                                                              │
│  커버리지 기준: branches 80% / functions 80% / lines 80%     │
└──────────────────────────────────────────────────────────────┘
```

### 12.2 테스트 커버리지 항목

각 컴포넌트의 테스트가 커버하는 항목:

| 카테고리 | 테스트 항목 |
|---------|-----------|
| **렌더링** | 기본 props, testID, children, 조건부 UI |
| **Variant/Size** | 모든 variant 조합, 모든 size 조합 |
| **상태 변화** | disabled, loading, focus/blur, checked |
| **이벤트** | onPress, onChange, onDismiss + payload 검증 |
| **접근성** | accessibilityRole, accessibilityLabel, accessibilityState |
| **엣지 케이스** | 빈 콘텐츠, 긴 텍스트, 누락 props |

### 12.3 테스트 인프라

```typescript
// packages/components/src/test-utils.tsx
import { render } from '@testing-library/react-native';
import { ZDSProvider } from '@zzem-design-system/engine';

// 모든 테스트에서 ZDSProvider 자동 래핑
const customRender = (ui, options?) =>
  render(ui, { wrapper: ({ children }) => <ZDSProvider>{children}</ZDSProvider>, ...options });

export { customRender as render };
```

---

## 13. 워크플로우: 컴포넌트 생성

### 13.1 전체 흐름도

```
┌──────────────────────────────────────────────────────────────────────┐
│               컴포넌트 생성 워크플로우 (Docs-First)                   │
│                                                                      │
│  Step 1                Step 2               Step 3                   │
│  ┌──────────┐          ┌──────────┐         ┌──────────┐            │
│  │ 스펙 작성 │─────────▶│ 토큰 정의│────────▶│ 스캐폴딩 │            │
│  │          │          │          │         │          │            │
│  │ docs/    │          │ tokens/  │         │ pnpm     │            │
│  │ components│         │ src/     │         │ new-     │            │
│  │ /{name}.md│         │ component│         │ component│            │
│  └──────────┘          │ /{name}  │         │ {Name}   │            │
│                        │ .tokens  │         │ {category}│           │
│                        │ .json    │         └─────┬────┘            │
│                        └──────────┘               │                  │
│                                                   ▼                  │
│  Step 6                Step 5               Step 4                   │
│  ┌──────────┐          ┌──────────┐         ┌──────────┐            │
│  │ 검증     │◀─────────│ 테스트   │◀────────│ 구현     │            │
│  │          │          │          │         │          │            │
│  │ pnpm lint│          │ .test.tsx│         │ .tsx     │            │
│  │ pnpm test│          │ .stories │         │ .types.ts│            │
│  │          │          │ .tsx     │         │ .styles.ts│           │
│  └──────────┘          └──────────┘         └──────────┘            │
│       │                                                              │
│       ▼                                                              │
│  Step 7                                                              │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │ Agent 자동 검증                                               │    │
│  │ component-generator → design-verifier → a11y-auditor         │    │
│  └──────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

### 13.2 각 Step 상세

#### Step 1: 스펙 문서 작성 (Docs-First)

**위치:** `docs/components/{name}.md`

스펙 문서는 Agent가 파싱 가능한 구조를 따른다:

```markdown
# Component: {Name}
# Package: @zzem-design-system/components
# Category: inputs | display | feedback | navigation | layout
# Status: draft | stable
# Platforms: ios, android

## Props
| Prop | Type | Default | Required | Description |

## Design Tokens Used
- {component}.{element}.{property}

## Behavior
- Press: ...
- Disabled: ...

## Do / Don't
- DO: ...
- DON'T: ...

## Platform Notes
- iOS: ...
- Android: ...

## Code Example
```

#### Step 2: 토큰 정의

**위치:** `packages/tokens/src/component/{name}.tokens.json`

- Semantic 토큰 참조: `{ "value": "{color.interactive.primary}" }`
- 하드코딩 값은 크기/치수에만 허용: `{ "value": 40 }`
- 빌드 후 확인: `pnpm build:tokens`

#### Step 3: 스캐폴딩

```bash
pnpm new-component {Name} {category}
# 예: pnpm new-component Chip display
```

`__template__/` 기반으로 6개 파일 자동 생성.

#### Step 4: 구현

- `.types.ts` → Props interface, Variant union type 정의
- `.tsx` → forwardRef + accessibilityRole/Label/State 필수
- `.styles.ts` → createStyles 사용, 모든 값은 토큰 참조

#### Step 5: 테스트/스토리

- `.test.tsx` → 렌더링 + variant + 이벤트 + 접근성
- `.stories.tsx` → 모든 variant/size/state Storybook 스토리

#### Step 6: 검증

```bash
pnpm lint     # ESLint 규칙 통과
pnpm test     # 426+ tests 통과
```

#### Step 7: index.ts에 export 추가

```typescript
// packages/components/src/index.ts
export { Chip } from './display/Chip';
export type { ChipProps } from './display/Chip';
```

---

## 14. 워크플로우: 토큰 동기화

```
┌──────────────────────────────────────────────────────────────────────┐
│                   토큰 동기화 워크플로우                               │
│                                                                      │
│  ┌─────────────┐     ┌──────────────┐     ┌──────────────────┐      │
│  │  1. Figma   │     │ 2. Diff 비교 │     │ 3. 변경 리포트   │      │
│  │  Variables  │────▶│              │────▶│                  │      │
│  │  API 호출   │     │  로컬 JSON과 │     │  추가/수정/삭제  │      │
│  │             │     │  최신값 비교  │     │  목록 출력       │      │
│  └─────────────┘     └──────────────┘     └────────┬─────────┘      │
│                                                     │                │
│                                                     ▼                │
│  ┌─────────────┐     ┌──────────────┐     ┌──────────────────┐      │
│  │  6. 스냅샷  │     │ 5. 영향 분석 │     │ 4. JSON 업데이트 │      │
│  │  테스트     │◀────│              │◀────│                  │      │
│  │  업데이트   │     │  영향받는     │     │  primitive →     │      │
│  │             │     │  컴포넌트 목록│     │  semantic →      │      │
│  └─────────────┘     └──────────────┘     │  component 순서  │      │
│                                            └──────────────────┘      │
│                                                                      │
│  ⚠️  Breaking change 감지 시:                                        │
│  ├── Human review 필수 요청                                          │
│  ├── @zzem-design-system/codemod transform 자동 생성                 │
│  └── 색상 변경 시 WCAG 대비율 검증 (4.5:1 이상)                     │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 15. 워크플로우: 디자인 검증

```
┌──────────────────────────────────────────────────────────────────────┐
│                    디자인 검증 워크플로우                              │
│                                                                      │
│  ┌─────────────┐     ┌──────────────┐     ┌──────────────────┐      │
│  │ 1. Figma    │     │ 2. 코드 분석 │     │ 3. 비교 검증     │      │
│  │ 스크린샷    │     │              │     │                  │      │
│  │ 추출       │     │  컴포넌트     │     │  색상 일치?      │      │
│  │            │────▶│  소스 코드    │────▶│  spacing 일치?   │      │
│  │ (variant별)│     │  + 토큰 참조  │     │  radius 일치?    │      │
│  └─────────────┘     └──────────────┘     │  typography 일치?│      │
│                                            │  state별 스타일? │      │
│                                            └────────┬─────────┘      │
│                                                     │                │
│                                                     ▼                │
│                                            ┌──────────────────┐      │
│                                            │ 4. 검증 리포트   │      │
│                                            │                  │      │
│                                            │ ✅ 통과          │      │
│                                            │ ⚠️ 경고          │      │
│                                            │ ❌ 실패          │      │
│                                            └──────────────────┘      │
│                                                                      │
│  검증 체크리스트:                                                     │
│  ☐ 모든 variant 색상이 토큰과 일치                                   │
│  ☐ spacing이 디자인 스펙과 일치                                      │
│  ☐ border-radius가 토큰과 일치                                       │
│  ☐ typography (size, lineHeight, weight) 일치                        │
│  ☐ 각 state (default, pressed, disabled, focused) 스타일 일치        │
│  ☐ iOS/Android 플랫폼별 차이가 의도된 것인지 확인                    │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 16. 워크플로우: Breaking Change 대응

```
┌──────────────────────────────────────────────────────────────────────┐
│               Breaking Change 대응 워크플로우                         │
│                                                                      │
│  ┌─────────────┐     ┌──────────────┐     ┌──────────────────┐      │
│  │ 1. 변경     │     │ 2. 영향 분석 │     │ 3. Codemod 작성  │      │
│  │ 감지        │────▶│              │────▶│                  │      │
│  │             │     │  토큰 이름   │     │  packages/       │      │
│  │ 토큰 이름   │     │  변경 추적   │     │  codemod/src/    │      │
│  │ API 변경    │     │  컴포넌트 API│     │  transforms/     │      │
│  │ Props 변경  │     │  Props 변경  │     │  {name}.ts       │      │
│  └─────────────┘     └──────────────┘     └────────┬─────────┘      │
│                                                     │                │
│                                                     ▼                │
│  ┌─────────────┐     ┌──────────────┐     ┌──────────────────┐      │
│  │ 6. 배포     │     │ 5. 검증      │     │ 4. Human Review  │      │
│  │             │◀────│              │◀────│                  │      │
│  │ CHANGELOG   │     │  lint 통과   │     │  ⚠️ 자동 진행    │      │
│  │ 업데이트    │     │  test 통과   │     │  금지            │      │
│  │ 버전 범프   │     │  typecheck   │     │  반드시 승인 필요│      │
│  └─────────────┘     └──────────────┘     └──────────────────┘      │
│                                                                      │
│  Codemod 예시 (토큰 이름 변경):                                      │
│  이전: tokens.color.primary → 이후: tokens.color.interactive.primary │
│  → jscodeshift transform이 전체 코드베이스 자동 변환                 │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 17. CLI 명령어 레퍼런스

### 17.1 빌드 & 개발

| 명령어 | 설명 | 실행 위치 |
|--------|------|----------|
| `pnpm build` | 전체 모노레포 빌드 | root |
| `pnpm build:tokens` | 토큰 빌드 (JSON → TS) | root |
| `pnpm storybook` | Storybook 실행 | root |

### 17.2 테스트 & 검증

| 명령어 | 설명 | 실행 위치 |
|--------|------|----------|
| `pnpm test` | 전체 테스트 실행 (426 tests) | root |
| `pnpm test:a11y` | 접근성 테스트만 실행 | root |
| `pnpm lint` | ESLint (zzem-design-system 규칙 포함) | root |
| `pnpm typecheck` | TypeScript 타입 검사 | root |

### 17.3 컴포넌트 관리

| 명령어 | 설명 | 예시 |
|--------|------|------|
| `pnpm new-component {Name} [category]` | 새 컴포넌트 스캐폴딩 | `pnpm new-component Chip display` |

### 17.4 유지보수

| 명령어 | 설명 |
|--------|------|
| `pnpm clean` | 빌드 결과물 삭제 |

---

## 18. 금지 패턴 및 대체 방법

```
┌──────────────────────────────────────────────────────────────────┐
│                     금지 패턴 Quick Reference                     │
│                                                                  │
│  ❌ 금지                              ✅ 대체                    │
│  ─────────────────────────────────────────────────────────────── │
│  color: '#FF0000'                     tokens.color.danger.default│
│  padding: 16                          tokens.spacing[8]          │
│  fontSize: 14                         tokens.typography.fontSize.sm│
│  borderRadius: 8                      tokens.radius.md           │
│  fontWeight: '600'                    tokens.typography.fontWeight│
│                                         .semibold                │
│  ─────────────────────────────────────────────────────────────── │
│  StyleSheet.create({})                createStyles((tokens) => {})│
│  Platform.OS === 'ios'                platform.select({ios, and})│
│  style={{ color: 'red' }}             style={styles.container}   │
│  export default Component             export { Component }       │
│  index.ts에 로직 작성                  re-export만 허용          │
│  any 타입 사용                         strict TypeScript 준수    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 19. 트러블슈팅

### 19.1 토큰 빌드 관련

| 증상 | 원인 | 해결 |
|------|------|------|
| `tokens.ts` 비어있음 | 빌드 미실행 | `pnpm build:tokens` |
| 토큰 값이 `{color.blue.600}` (문자열) | 참조 미해석 | tier별 해석 순서 확인 (primitive → semantic → component) |
| 새 토큰이 반영 안 됨 | 빌드 캐시 | `pnpm clean && pnpm build:tokens` |

### 19.2 스타일 관련

| 증상 | 원인 | 해결 |
|------|------|------|
| 다크모드 전환 안 됨 | ZDSProvider 미설정 | `<ZDSProvider mode="dark">` 확인 |
| 스타일 매 렌더링 재계산 | createStyles 미사용 | createStyles + JSON.stringify 메모이제이션 확인 |
| `useTheme` 에러 | Provider 외부 사용 | 컴포넌트가 ZDSProvider 하위에 있는지 확인 |

### 19.3 컴포넌트 관련

| 증상 | 원인 | 해결 |
|------|------|------|
| ESLint 위반 | 하드코딩 값 사용 | 토큰으로 교체 |
| forwardRef 경고 | ref 미전달 | `forwardRef<View, Props>` 패턴 사용 |
| Platform 분기 오류 | Platform.OS 직접 사용 | `platform.select()` 사용 |

### 19.4 테스트 관련

| 증상 | 원인 | 해결 |
|------|------|------|
| `useTheme` 에러 | ZDSProvider 미래핑 | `test-utils.tsx`의 `render` 사용 |
| `getByRole` 실패 | RNTL 13 변경 | `getByTestId` + `props.accessibilityRole` 확인 |
| Modal 내부 테스트 실패 | Modal 미모킹 | `jest-setup.ts`에 Modal mock 확인 |
