import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './Radio';

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Inputs/RadioGroup',
  component: RadioGroup,
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    options: defaultOptions,
    value: 'option1',
    direction: 'vertical',
    disabled: false,
    onChange: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Select an option',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled radio group',
    disabled: true,
  },
};
