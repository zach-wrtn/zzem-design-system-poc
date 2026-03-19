# Component: TabBar

# Package: @zzem-design-system/components
# Category: navigation
# Status: stable
# Platforms: ios, android

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| items | TabBarItem[] | - | true | 탭 목록 |
| activeKey | string | - | true | 활성 탭 |
| onChange | (key: string) => void | - | true | 탭 변경 핸들러 |

## Rules

- 최대 5개 탭
- 활성 탭: primary 색상
- 비활성 탭: tertiary 색상

## Code Example

```tsx
import { TabBar } from '@zzem-design-system/components';

<TabBar
  items={[
    { key: 'home', label: '홈', icon: <HomeIcon /> },
    { key: 'search', label: '검색', icon: <SearchIcon /> },
    { key: 'profile', label: '프로필', icon: <ProfileIcon />, badge: 3 },
  ]}
  activeKey={activeTab}
  onChange={setActiveTab}
/>
```
