import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import { Pressable } from './Pressable';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Pressable> = {
  title: 'Primitives/Pressable',
  component: Pressable,
};

export default meta;

type Story = StoryObj<typeof Pressable>;

export const Default: Story = {
  render: () => (
    <Pressable
      onPress={action('pressed')}
      style={{
        padding: 16,
        backgroundColor: '#E8F0FE',
        borderRadius: 8,
        alignItems: 'center',
      }}
    >
      <Text>Press me</Text>
    </Pressable>
  ),
};

export const WithFeedback: Story = {
  render: () => (
    <Pressable
      onPress={action('pressed')}
      style={({ pressed }) => ({
        padding: 16,
        backgroundColor: pressed ? '#C4D7F5' : '#E8F0FE',
        borderRadius: 8,
        alignItems: 'center',
        opacity: pressed ? 0.8 : 1,
      })}
    >
      {({ pressed }) => (
        <Text>{pressed ? 'Pressing...' : 'Press me'}</Text>
      )}
    </Pressable>
  ),
};
