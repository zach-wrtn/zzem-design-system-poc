import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { NavigationBar } from './NavigationBar';

const meta: Meta<typeof NavigationBar> = {
  title: 'Navigation/NavigationBar',
  component: NavigationBar,
  argTypes: {
    title: { control: 'text' },
    largeTitle: { control: 'boolean' },
    transparent: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
  args: {
    title: 'Navigation Bar',
  },
};

export const LargeTitle: Story = {
  args: {
    title: 'Navigation Bar',
    largeTitle: true,
  },
};

export const WithActions: Story = {
  args: {
    title: 'Navigation Bar',
    leftAction: {
      icon: <Text>←</Text>,
      label: 'Back',
      onPress: () => {},
    },
    rightActions: [
      { label: 'Edit', onPress: () => {} },
      { icon: <Text>⋮</Text>, label: 'More', onPress: () => {} },
    ],
  },
};
