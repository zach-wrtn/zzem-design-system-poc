import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from './Snackbar';

const meta: Meta<typeof Snackbar> = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  args: {
    message: 'This is a snackbar message',
    visible: true,
    onDismiss: () => {},
  },
};

export const WithAction: Story = {
  args: {
    message: 'Item deleted',
    visible: true,
    actionLabel: 'Undo',
    onAction: () => {},
    onDismiss: () => {},
  },
};
