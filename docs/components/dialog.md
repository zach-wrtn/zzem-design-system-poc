# Component: Dialog

# Package: @zzem-design-system/components
# Category: feedback
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| visible | boolean | - | true | 표시 여부 |
| title | string | - | true | 다이얼로그 제목 |
| message | string | undefined | false | 메시지 내용 |
| actions | DialogAction[] | [] | false | 액션 버튼 목록 |

## Behavior

- 백드롭 탭으로 닫기
- 모달로 표시 (다른 콘텐츠 위)
- 최대 너비 320px

## Code Example

```tsx
import { Dialog } from '@zzem-design-system/components';

<Dialog
  visible={showDialog}
  title="삭제 확인"
  message="정말 삭제하시겠습니까?"
  actions={[
    { label: '취소', onPress: handleCancel },
    { label: '삭제', variant: 'danger', onPress: handleDelete },
  ]}
  onDismiss={handleCancel}
/>
```
