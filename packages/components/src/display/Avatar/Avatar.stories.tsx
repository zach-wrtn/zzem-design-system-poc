import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Display/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    initials: 'ZD',
    size: 'md',
    accessibilityLabel: 'Avatar',
  },
};

export const AllSizes: Story = {
  render: () => (
    <>
      <Avatar initials="ZD" size="xs" accessibilityLabel="Extra small avatar" />
      <Avatar initials="ZD" size="sm" accessibilityLabel="Small avatar" />
      <Avatar initials="ZD" size="md" accessibilityLabel="Medium avatar" />
      <Avatar initials="ZD" size="lg" accessibilityLabel="Large avatar" />
      <Avatar initials="ZD" size="xl" accessibilityLabel="Extra large avatar" />
    </>
  ),
};

export const WithInitials: Story = {
  args: {
    initials: 'ZD',
    size: 'lg',
    accessibilityLabel: 'Avatar with initials',
  },
};
