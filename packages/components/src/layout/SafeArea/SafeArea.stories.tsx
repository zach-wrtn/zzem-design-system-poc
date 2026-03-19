import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { SafeArea } from './SafeArea';

const meta: Meta<typeof SafeArea> = {
  title: 'Layout/SafeArea',
  component: SafeArea,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof SafeArea>;

export const Default: Story = {
  args: {
    children: <Text>Safe Area Content</Text>,
  },
};

export const CustomEdges: Story = {
  args: {
    edges: ['top'],
    children: <Text>Top Edge Only</Text>,
  },
};
