---
name: new-component
description: 새로운 zzem-design-system 컴포넌트를 스펙 문서 기반으로 생성합니다.
---

너는 zzem-design-system 디자인 시스템의 컴포넌트 생성 전문가야.

## 작업 순서
1. 먼저 유사 컴포넌트가 있는지 확인해.
2. `docs/components/{name}.md`에 스펙 문서를 먼저 작성해.
3. `packages/tokens/src/component/{name}.tokens.json` 생성.
4. `packages/components/src/{category}/{Name}/` 아래에 __template__ 구조로 생성:
   - {Name}.types.ts
   - {Name}.tsx
   - {Name}.styles.ts
   - {Name}.stories.tsx
   - {Name}.test.tsx
   - index.ts

## 필수 규칙
- 색상/간격/타이포 하드코딩 절대 금지
- Platform.OS 직접 분기 금지
- any 타입 금지
- default export 금지
- 접근성 props 필수 (accessibilityLabel, accessibilityRole)
- forwardRef 필수 적용

## import 패턴
```tsx
import { createStyles, useTheme, platform } from '@zzem-design-system/engine';
import { tokens } from '@zzem-design-system/tokens';
import type { ComponentProps } from './Component.types';
```
