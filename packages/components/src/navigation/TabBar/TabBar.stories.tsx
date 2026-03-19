import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { TabBar } from './TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'Navigation/TabBar',
  component: TabBar,
};

export default meta;

type Story = StoryObj<typeof TabBar>;

export const Default: Story = {
  args: {
    items: [
      { key: 'home', label: 'Home', icon: <Text>🏠</Text> },
      { key: 'search', label: 'Search', icon: <Text>🔍</Text> },
      { key: 'profile', label: 'Profile', icon: <Text>👤</Text> },
    ],
    activeKey: 'home',
    onChange: () => {},
  },
};

export const WithBadge: Story = {
  args: {
    items: [
      { key: 'home', label: 'Home', icon: <Text>🏠</Text> },
      { key: 'search', label: 'Search', icon: <Text>🔍</Text>, badge: 5 },
      { key: 'profile', label: 'Profile', icon: <Text>👤</Text> },
    ],
    activeKey: 'home',
    onChange: () => {},
  },
};
