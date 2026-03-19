# Pattern: List

## Overview

zzem-design-system 리스트 패턴 가이드.

## 기본 리스트

```tsx
import { VStack, Card, Text, Divider } from '@zzem-design-system/components';

<VStack>
  {items.map((item, index) => (
    <React.Fragment key={item.id}>
      <Card onPress={() => handlePress(item)}>
        <Text variant="label-md">{item.title}</Text>
        <Text variant="body-sm" color="secondary">{item.description}</Text>
      </Card>
      {index < items.length - 1 && <Divider />}
    </React.Fragment>
  ))}
</VStack>
```

## Rules

- 리스트 아이템 간 구분은 Divider 사용
- 터치 가능한 리스트는 Card + onPress 사용
- 무한 스크롤은 FlatList 기반으로 구현
