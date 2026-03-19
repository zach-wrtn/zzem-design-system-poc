import React from 'react';
import { Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Feedback/Dialog',
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    visible: true,
    title: 'Dialog Title',
    message: 'This is a dialog message that provides information to the user.',
    onDismiss: () => {},
  },
};

export const WithActions: Story = {
  args: {
    visible: true,
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    actions: [
      { label: 'Cancel', variant: 'secondary', onPress: () => {} },
      { label: 'Confirm', variant: 'primary', onPress: () => {} },
    ],
    onDismiss: () => {},
  },
};

export const DangerAction: Story = {
  args: {
    visible: true,
    title: 'Delete Item',
    message: 'This action cannot be undone. Are you sure?',
    actions: [
      { label: 'Cancel', variant: 'secondary', onPress: () => {} },
      { label: 'Delete', variant: 'danger', onPress: () => {} },
    ],
    onDismiss: () => {},
  },
};
