import React from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Display/Card',
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    accessibilityLabel: 'Card',
    children: (
      <View>
        <Text>Card Content</Text>
      </View>
    ),
  },
};

export const Pressable: Story = {
  args: {
    accessibilityLabel: 'Pressable card',
    onPress: () => {},
    children: (
      <View>
        <Text>Pressable Card Content</Text>
      </View>
    ),
  },
};
