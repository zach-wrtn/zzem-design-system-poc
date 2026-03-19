# Pattern: Form

## Overview

zzem-design-system 폼 패턴 가이드.

## 기본 구조

```tsx
import { VStack } from '@zzem-design-system/components';
import { TextInput, Button } from '@zzem-design-system/components';
import { tokens } from '@zzem-design-system/tokens';

<VStack gap={tokens.spacing[8]}>
  <TextInput label="이메일" placeholder="이메일을 입력하세요" />
  <TextInput label="비밀번호" secureTextEntry />
  <Button variant="primary" fullWidth>
    로그인
  </Button>
</VStack>
```

## Rules

- 라벨은 항상 입력 필드 위에 위치
- 에러 메시지는 입력 필드 아래에 빨간색으로 표시
- 제출 버튼은 폼 하단에 fullWidth로 배치
- 필수 필드는 라벨 옆에 * 표시
