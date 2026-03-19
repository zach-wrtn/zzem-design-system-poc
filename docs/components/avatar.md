# Component: Avatar

# Package: @zzem-design-system/components
# Category: display
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| source | ImageSourcePropType | undefined | false | 이미지 소스 |
| initials | string | undefined | false | 폴백 이니셜 (1-2자) |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | false | 아바타 크기 |

## Size Scale

| Size | Value | Usage |
|------|-------|-------|
| xs | 24 | 인라인, 채팅 |
| sm | 32 | 리스트 아이템 |
| md | 40 | 카드, 코멘트 |
| lg | 56 | 프로필 카드 |
| xl | 72 | 프로필 페이지 |

## Behavior

- 이미지가 없으면 이니셜 표시
- 이니셜도 없으면 빈 원형 배경

## Code Example

```tsx
import { Avatar } from '@zzem-design-system/components';

<Avatar source={{ uri: profileUrl }} size="lg" accessibilityLabel="프로필 사진" />
<Avatar initials="ZR" size="md" />
```
