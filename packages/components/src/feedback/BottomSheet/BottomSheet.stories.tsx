import React from 'react';
import { Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet } from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Feedback/BottomSheet',
  component: BottomSheet,
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  args: {
    visible: true,
    title: 'Bottom Sheet Title',
    showHandle: true,
    onDismiss: () => {},
    children: <Text>Bottom sheet content goes here.</Text>,
  },
};

export const WithoutHandle: Story = {
  args: {
    visible: true,
    title: 'No Handle',
    showHandle: false,
    onDismiss: () => {},
    children: <Text>Bottom sheet without a handle.</Text>,
  },
};
