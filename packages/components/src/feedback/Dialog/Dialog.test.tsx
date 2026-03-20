import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  const defaultActions = [
    { label: 'Cancel', onPress: jest.fn() },
    { label: 'Confirm', onPress: jest.fn() },
  ];

  beforeEach(() => {
    defaultActions.forEach((action) => action.onPress.mockClear());
  });

  it('renders when visible', () => {
    render(
      <Dialog
        visible
        title="Title"
        message="Message"
        actions={defaultActions}
        testID="dialog"
      />,
    );
    expect(screen.getByTestId('dialog')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    render(
      <Dialog
        visible={false}
        title="Title"
        message="Message"
        actions={defaultActions}
        testID="dialog"
      />,
    );
    expect(screen.queryByTestId('dialog')).toBeNull();
  });

  it('renders title', () => {
    render(
      <Dialog
        visible
        title="Dialog Title"
        message="Message"
        actions={defaultActions}
        testID="dialog"
      />,
    );
    expect(screen.getByText('Dialog Title')).toBeTruthy();
  });

  it('renders message', () => {
    render(
      <Dialog
        visible
        title="Title"
        message="Are you sure?"
        actions={defaultActions}
        testID="dialog"
      />,
    );
    expect(screen.getByText('Are you sure?')).toBeTruthy();
  });

  it('renders action buttons', () => {
    render(
      <Dialog
        visible
        title="Title"
        message="Message"
        actions={defaultActions}
        testID="dialog"
      />,
    );
    expect(screen.getByText('Cancel')).toBeTruthy();
    expect(screen.getByText('Confirm')).toBeTruthy();
  });

  it('calls action onPress when button is pressed', () => {
    render(
      <Dialog
        visible
        title="Title"
        message="Message"
        actions={defaultActions}
        testID="dialog"
      />,
    );
    fireEvent.press(screen.getByText('Confirm'));
    expect(defaultActions[1].onPress).toHaveBeenCalledTimes(1);
  });

  describe('multiple action buttons', () => {
    it('renders three action buttons', () => {
      const threeActions = [
        { label: 'Cancel', onPress: jest.fn() },
        { label: 'Save Draft', onPress: jest.fn() },
        { label: 'Submit', onPress: jest.fn(), variant: 'primary' as const },
      ];
      render(
        <Dialog
          visible
          title="Title"
          actions={threeActions}
          testID="dialog"
        />,
      );
      expect(screen.getByText('Cancel')).toBeTruthy();
      expect(screen.getByText('Save Draft')).toBeTruthy();
      expect(screen.getByText('Submit')).toBeTruthy();
    });

    it('calls correct handler for each action', () => {
      const action1 = jest.fn();
      const action2 = jest.fn();
      const actions = [
        { label: 'Cancel', onPress: action1 },
        { label: 'OK', onPress: action2, variant: 'primary' as const },
      ];
      render(
        <Dialog visible title="Title" actions={actions} testID="dialog" />,
      );
      fireEvent.press(screen.getByText('Cancel'));
      expect(action1).toHaveBeenCalledTimes(1);
      expect(action2).not.toHaveBeenCalled();

      fireEvent.press(screen.getByText('OK'));
      expect(action2).toHaveBeenCalledTimes(1);
    });
  });

  describe('action variant types', () => {
    it('renders primary variant action', () => {
      const actions = [
        { label: 'Confirm', onPress: jest.fn(), variant: 'primary' as const },
      ];
      render(
        <Dialog visible title="Title" actions={actions} testID="dialog" />,
      );
      expect(screen.getByText('Confirm')).toBeTruthy();
    });

    it('renders danger variant action', () => {
      const actions = [
        { label: 'Delete', onPress: jest.fn(), variant: 'danger' as const },
      ];
      render(
        <Dialog visible title="Title" actions={actions} testID="dialog" />,
      );
      expect(screen.getByText('Delete')).toBeTruthy();
    });

    it('renders secondary (default) variant action', () => {
      const actions = [
        { label: 'Cancel', onPress: jest.fn(), variant: 'secondary' as const },
      ];
      render(
        <Dialog visible title="Title" actions={actions} testID="dialog" />,
      );
      expect(screen.getByText('Cancel')).toBeTruthy();
    });

    it('renders action with no explicit variant as secondary', () => {
      const actions = [{ label: 'Skip', onPress: jest.fn() }];
      render(
        <Dialog visible title="Title" actions={actions} testID="dialog" />,
      );
      expect(screen.getByText('Skip')).toBeTruthy();
    });
  });

  describe('title only (no message)', () => {
    it('renders dialog with title but no message', () => {
      render(
        <Dialog visible title="Warning" testID="dialog" />,
      );
      expect(screen.getByText('Warning')).toBeTruthy();
    });

    it('does not render message element when message is undefined', () => {
      render(
        <Dialog visible title="Warning" testID="dialog" />,
      );
      expect(screen.getByText('Warning')).toBeTruthy();
      // Dialog should still be fully functional without message
      expect(screen.getByTestId('dialog')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has alert accessibility role', () => {
      render(
        <Dialog visible title="Alert" testID="dialog" />,
      );
      expect(screen.getByRole('alert')).toBeTruthy();
    });

    it('uses title as accessibility label', () => {
      render(
        <Dialog visible title="Delete item" testID="dialog" />,
      );
      expect(screen.getByLabelText('Delete item')).toBeTruthy();
    });

    it('action buttons have button accessibility role', () => {
      const actions = [
        { label: 'OK', onPress: jest.fn() },
      ];
      render(
        <Dialog visible title="Info" actions={actions} testID="dialog" />,
      );
      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('action buttons have accessibility labels', () => {
      const actions = [
        { label: 'Confirm', onPress: jest.fn() },
      ];
      render(
        <Dialog visible title="Title" actions={actions} testID="dialog" />,
      );
      expect(screen.getByLabelText('Confirm')).toBeTruthy();
    });
  });

  describe('custom children', () => {
    it('renders custom children content', () => {
      const { Text: RNText } = require('react-native');
      render(
        <Dialog visible title="Custom" testID="dialog">
          <RNText>Custom content</RNText>
        </Dialog>,
      );
      expect(screen.getByText('Custom content')).toBeTruthy();
    });
  });

  describe('no actions', () => {
    it('renders without action buttons when actions is empty', () => {
      render(
        <Dialog visible title="Info" actions={[]} testID="dialog" />,
      );
      expect(screen.getByTestId('dialog')).toBeTruthy();
      expect(screen.queryByRole('button')).toBeNull();
    });
  });
});
