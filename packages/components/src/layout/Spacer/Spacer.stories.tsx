import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Spacer } from './Spacer';

const meta: Meta<typeof Spacer> = {
  title: 'Layout/Spacer',
  component: Spacer,
  argTypes: {
    size: { control: 'number' },
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;

type Story = StoryObj<typeof Spacer>;

export const Default: Story = {
  args: {
    size: 16,
    direction: 'vertical',
  },
  decorators: [
    (Story) => (
      <>
        <Text>Before</Text>
        <Story />
        <Text>After</Text>
      </>
    ),
  ],
};

export const Horizontal: Story = {
  args: {
    size: 16,
    direction: 'horizontal',
  },
};
