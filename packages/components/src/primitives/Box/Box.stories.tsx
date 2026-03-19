import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
  title: 'Primitives/Box',
  component: Box,
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  render: () => (
    <Box style={{ padding: 16 }}>
      <Text>Box content</Text>
    </Box>
  ),
};

export const WithStyle: Story = {
  render: () => (
    <Box
      style={{
        padding: 24,
        backgroundColor: '#E8F0FE',
        borderRadius: 8,
      }}
    >
      <Text>Styled Box</Text>
    </Box>
  ),
};
