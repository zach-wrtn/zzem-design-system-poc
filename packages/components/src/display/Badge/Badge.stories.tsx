import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Display/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: 'Badge',
    variant: 'default',
    size: 'md',
    accessibilityLabel: 'Badge',
  },
};

export const AllVariants: Story = {
  render: () => (
    <>
      <Badge label="Default" variant="default" accessibilityLabel="Default badge" />
      <Badge label="Success" variant="success" accessibilityLabel="Success badge" />
      <Badge label="Warning" variant="warning" accessibilityLabel="Warning badge" />
      <Badge label="Danger" variant="danger" accessibilityLabel="Danger badge" />
      <Badge label="Info" variant="info" accessibilityLabel="Info badge" />
    </>
  ),
};

export const Small: Story = {
  args: {
    label: 'Small',
    variant: 'default',
    size: 'sm',
    accessibilityLabel: 'Small badge',
  },
};
