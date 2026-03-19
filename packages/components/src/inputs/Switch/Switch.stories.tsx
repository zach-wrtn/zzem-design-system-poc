import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Inputs/Switch',
  component: Switch,
  argTypes: {
    value: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    value: false,
    disabled: false,
    onValueChange: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const On: Story = {
  args: {
    value: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Disabled: Story = {
  args: {
    value: true,
    label: 'Disabled switch',
    disabled: true,
  },
};
