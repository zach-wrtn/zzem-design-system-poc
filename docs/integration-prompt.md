# ZZEM Design System — React Native 프로젝트 통합 프롬프트

> 이 문서는 AI Agent가 기존 React Native 프로젝트에 ZZEM Design System을 주입하고 적용할 때 사용하는 실행 프롬프트입니다.

---

## 프롬프트

아래 프롬프트를 AI Agent에게 전달하세요.

---

```
당신은 React Native 프로젝트에 ZZEM Design System을 통합하는 전문 에이전트입니다.
아래 명세에 따라 순서대로 작업을 수행하세요.

═══════════════════════════════════════════════════════
1. 의존성 설치
═══════════════════════════════════════════════════════

다음 3개 패키지를 설치합니다:

pnpm add @zzem-design-system/components @zzem-design-system/engine @zzem-design-system/tokens

ESLint 플러그인은 devDependencies로 설치합니다:

pnpm add -D @zzem-design-system/eslint-plugin

═══════════════════════════════════════════════════════
2. ZDSProvider 설정
═══════════════════════════════════════════════════════

앱의 최상위 진입점(App.tsx 또는 _layout.tsx)에 ZDSProvider를 감쌉니다.
기존 Provider 체인이 있다면 가장 안쪽에 추가합니다.

[변경 전]
export default function App() {
  return (
    <OtherProvider>
      <Navigator />
    </OtherProvider>
  );
}

[변경 후]
import { ZDSProvider } from '@zzem-design-system/engine';

export default function App() {
  return (
    <OtherProvider>
      <ZDSProvider mode="light">
        <Navigator />
      </ZDSProvider>
    </OtherProvider>
  );
}

참고:
- mode는 "light" | "dark" 중 선택
- 다크모드 토글이 필요하면 mode를 state로 관리

═══════════════════════════════════════════════════════
3. ESLint 설정
═══════════════════════════════════════════════════════

프로젝트의 ESLint 설정 파일(.eslintrc.* 또는 eslint.config.*)에 추가합니다:

[Legacy .eslintrc 형식]
{
  "plugins": ["@zzem-design-system"],
  "extends": ["plugin:@zzem-design-system/recommended"]
}

[Flat config 형식]
import zzemPlugin from '@zzem-design-system/eslint-plugin';

export default [
  {
    plugins: { '@zzem-design-system': zzemPlugin },
    rules: {
      '@zzem-design-system/no-hardcoded-colors': 'error',
      '@zzem-design-system/no-hardcoded-spacing': 'warn',
      '@zzem-design-system/no-inline-styles': 'warn',
      '@zzem-design-system/use-design-tokens': 'error',
      '@zzem-design-system/valid-component-props': 'error',
    },
  },
];

ESLint 규칙 설명:
- no-hardcoded-colors: HEX 색상 리터럴(#FF0000 등) 금지 → 토큰 사용
- no-hardcoded-spacing: margin/padding에 매직 넘버 금지 → tokens.spacing 사용
- no-inline-styles: style={{ }} 인라인 객체 금지 → createStyles() 사용
- use-design-tokens: borderRadius, fontSize 등에 리터럴 값 금지
- valid-component-props: 컴포넌트 prop 값이 허용 범위 내인지 검증

═══════════════════════════════════════════════════════
4. 기존 코드 마이그레이션
═══════════════════════════════════════════════════════

아래 패턴을 찾아 순차적으로 치환합니다.

4-1. Import 교체
─────────────────────────────────────────────────────
[AS-IS] import { View, Text, Pressable, TextInput, Switch } from 'react-native';
[TO-BE] import { Box, Text, Pressable, TextInput, Switch } from '@zzem-design-system/components';

매핑 테이블:
  View         → Box
  Text         → Text (동일 이름, import 경로만 변경)
  Pressable    → Pressable (동일 이름, import 경로만 변경)
  TouchableOpacity → Pressable (deprecated 교체)
  TextInput    → TextInput (import 경로만 변경)
  Switch       → Switch (import 경로만 변경)

주의: react-native에서 View, Modal, ScrollView, FlatList, Image 등
      ZZEM에 대응 컴포넌트가 없는 것은 그대로 유지합니다.

4-2. 하드코딩 색상 → 토큰
─────────────────────────────────────────────────────
[AS-IS] style={{ color: '#111827' }}
[TO-BE] style={{ color: tokens.color.text.primary }}

[AS-IS] style={{ backgroundColor: '#2563EB' }}
[TO-BE] style={{ backgroundColor: tokens.color.interactive.primary }}

토큰 참조:
  tokens.color.background.primary    = '#FFFFFF' (흰색 배경)
  tokens.color.background.secondary  = '#F9FAFB' (회색 배경)
  tokens.color.background.tertiary   = '#F3F4F6'
  tokens.color.text.primary          = '#111827' (기본 텍스트)
  tokens.color.text.secondary        = '#4B5563' (보조 텍스트)
  tokens.color.text.tertiary         = '#9CA3AF' (약한 텍스트)
  tokens.color.interactive.primary   = '#2563EB' (파란색 CTA)
  tokens.color.border.default        = '#E5E7EB'
  tokens.color.status.success        = '#16A34A'
  tokens.color.status.warning        = '#CA8A04'
  tokens.color.status.danger         = '#DC2626'
  tokens.color.status.info           = '#2563EB'

토큰 import:
  import { tokens } from '@zzem-design-system/tokens/output/tokens';
  또는
  const { tokens } = useTheme(); // 컴포넌트 내부에서

4-3. StyleSheet.create → createStyles
─────────────────────────────────────────────────────
[AS-IS]
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', color: '#111' },
});

[TO-BE]
import { createStyles } from '@zzem-design-system/engine';
const useStyles = createStyles((tokens) => ({
  container: {
    padding: tokens.spacing[16],
    backgroundColor: tokens.color.background.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: tokens.color.text.primary,
  },
}));

// 컴포넌트 내부에서:
const styles = useStyles({});

4-4. Platform.OS → platform
─────────────────────────────────────────────────────
[AS-IS]
import { Platform } from 'react-native';
const padding = Platform.OS === 'ios' ? 44 : 0;

[TO-BE]
import { platform } from '@zzem-design-system/engine';
const padding = platform.select({ ios: 44, android: 0 });

4-5. 커스텀 버튼 → Button 컴포넌트
─────────────────────────────────────────────────────
[AS-IS]
<TouchableOpacity
  style={{ backgroundColor: '#2563EB', padding: 12, borderRadius: 8 }}
  onPress={handlePress}
>
  <Text style={{ color: '#fff', textAlign: 'center' }}>Submit</Text>
</TouchableOpacity>

[TO-BE]
<Button variant="primary" size="md" onPress={handlePress}>
  Submit
</Button>

═══════════════════════════════════════════════════════
5. 사용 가능한 컴포넌트 목록
═══════════════════════════════════════════════════════

모든 컴포넌트는 named export로 import합니다:
import { ComponentName } from '@zzem-design-system/components';

Primitives (기본 빌딩 블록):
  Box          — View 래퍼
  Text         — variant 기반 타이포그래피 (heading-xl/lg/md/sm, body-lg/md/sm, label-lg/md/sm, caption)
  Pressable    — 터치 래퍼 (iOS haptic + Android ripple 자동)
  Stack        — Flex 레이아웃 (direction, gap, align, justify)
  HStack       — Stack direction="horizontal" 단축
  VStack       — Stack direction="vertical" 단축

Inputs (입력):
  Button       — variant: primary/secondary/ghost/danger, size: sm/md/lg
  IconButton   — variant: filled/outlined/ghost, icon + accessibilityLabel 필수
  TextInput    — label, helperText, error, size: sm/md/lg
  Checkbox     — checked, onChange, label
  Switch       — value, onValueChange, label
  RadioGroup   — options, value, onChange, direction: vertical/horizontal

Display (표시):
  Avatar       — source(이미지) 또는 initials(이니셜), size: xs/sm/md/lg/xl
  Badge        — variant: default/success/warning/danger/info, size: sm/md
  Card         — children, onPress(선택적 → pressable 카드)
  Tag          — label, variant: default/primary/success/warning/danger, closable

Feedback (피드백):
  Toast        — message, variant: info/success/warning/danger, visible, position: top/bottom
  Dialog       — visible, title, message, actions: DialogAction[]
  BottomSheet  — visible, onDismiss, title, children, showHandle
  Snackbar     — message, visible, actionLabel, onAction

Layout (레이아웃):
  Divider      — orientation: horizontal/vertical
  Spacer       — size(px), direction: horizontal/vertical
  SafeArea     — edges: ('top'|'bottom'|'left'|'right')[]

Navigation (내비게이션):
  Header       — title, left, right, border
  TabBar       — items: TabBarItem[], activeKey, onChange
  NavigationBar — title, largeTitle, leftAction, rightActions

═══════════════════════════════════════════════════════
6. MCP Server 설정 (AI Agent 전용)
═══════════════════════════════════════════════════════

Claude Desktop 또는 Cursor의 MCP 설정에 추가합니다:

{
  "mcpServers": {
    "zzem-design-system": {
      "command": "node",
      "args": ["<프로젝트경로>/packages/mcp-server/dist/server.js"],
      "env": {
        "ZDS_ROOT": "<프로젝트경로>"
      }
    }
  }
}

MCP 도구:
  zds_get_component   — 컴포넌트 문서 조회 (props, tokens, guidelines, examples)
  zds_get_tokens      — 토큰 값 조회 (category, tier 필터)
  zds_validate_usage  — 코드 검증 (하드코딩 색상/간격, StyleSheet 사용 등)
  zds_generate_snippet — 시나리오 기반 코드 생성
  zds_search_guidelines — 가이드라인 검색

═══════════════════════════════════════════════════════
7. 마이그레이션 실행 순서
═══════════════════════════════════════════════════════

아래 순서로 작업합니다:

Step 1: 의존성 설치 (pnpm add)
Step 2: ZDSProvider를 앱 루트에 감싸기
Step 3: ESLint 플러그인 설정
Step 4: 공통 스타일 파일부터 마이그레이션
        - StyleSheet.create → createStyles
        - 하드코딩 색상 → 토큰
        - Platform.OS → platform.select
Step 5: 화면(Screen) 단위로 컴포넌트 교체
        - View → Box (필요 시)
        - 커스텀 버튼 → Button
        - 커스텀 입력 → TextInput
        - 커스텀 스위치 → Switch / Checkbox
        - 커스텀 헤더 → Header / NavigationBar
Step 6: ESLint 실행하여 잔여 위반 확인
        pnpm lint
Step 7: 사용률 메트릭 확인
        tsx scripts/usage-metrics.ts <앱소스경로>

═══════════════════════════════════════════════════════
8. 금지 패턴 (절대 하지 말 것)
═══════════════════════════════════════════════════════

- StyleSheet.create 직접 사용 금지 → createStyles() 사용
- Platform.OS === 'ios' 직접 분기 금지 → platform.select() 사용
- 컴포넌트 내 HEX 색상 직접 사용 금지 → tokens 사용
- any 타입 사용 금지
- default export 금지 → named export만 사용
- index 파일에서 로직 금지 → re-export만

═══════════════════════════════════════════════════════
9. 검증 체크리스트
═══════════════════════════════════════════════════════

마이그레이션 완료 후 아래를 확인합니다:

[ ] ZDSProvider가 앱 루트에 적용되었는가
[ ] StyleSheet.create가 남아있지 않은가
[ ] HEX 색상 리터럴이 남아있지 않은가 (grep '#[0-9a-fA-F]')
[ ] Platform.OS 직접 사용이 남아있지 않은가
[ ] pnpm lint가 0 violations로 통과하는가
[ ] 모든 import가 @zzem-design-system/* 경로를 사용하는가
[ ] 앱이 정상적으로 빌드 및 실행되는가
```

---

## 예시: 전체 화면 마이그레이션

### Before

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === 'ios' ? 44 : 0 }]}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>ZD</Text>
        </View>
        <Text style={styles.name}>Zach Ryu</Text>
        <Text style={styles.role}>Developer</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => console.log('edit')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 16 },
  card: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 20, alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontSize: 20, fontWeight: '600' },
  name: { fontSize: 18, fontWeight: '600', color: '#111827', marginTop: 12 },
  role: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  button: { backgroundColor: '#2563EB', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
```

### After

```tsx
import React, { useState } from 'react';
import { VStack, Text, Card, Avatar, Button, SafeArea, Spacer } from '@zzem-design-system/components';
import { createStyles, platform } from '@zzem-design-system/engine';

const useStyles = createStyles((tokens) => ({
  container: {
    flex: 1,
    padding: tokens.spacing[16],
    backgroundColor: tokens.color.background.primary,
  },
}));

export function ProfileScreen() {
  const styles = useStyles({});

  return (
    <SafeArea edges={['top']}>
      <VStack gap={16} style={styles.container}>
        <Text variant="heading-md">Profile</Text>
        <Card>
          <VStack gap={12} align="center">
            <Avatar initials="ZD" size="lg" accessibilityLabel="Zach Ryu" />
            <Text variant="label-lg">Zach Ryu</Text>
            <Text variant="body-sm">Developer</Text>
          </VStack>
        </Card>
        <Spacer size={4} />
        <Button variant="primary" fullWidth onPress={() => console.log('edit')}>
          Edit Profile
        </Button>
      </VStack>
    </SafeArea>
  );
}
```
