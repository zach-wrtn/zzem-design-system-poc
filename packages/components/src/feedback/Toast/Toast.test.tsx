import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders when visible', () => {
    render(<Toast message="Hello" visible testID="toast" />);
    expect(screen.getByTestId('toast')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    render(<Toast message="Hello" visible={false} testID="toast" />);
    expect(screen.queryByTestId('toast')).toBeNull();
  });

  it('renders message', () => {
    render(<Toast message="Operation successful" visible testID="toast" />);
    expect(screen.getByText('Operation successful')).toBeTruthy();
  });

  it('renders action button when actionLabel and onAction provided', () => {
    const onAction = jest.fn();
    render(
      <Toast
        message="Hello"
        visible
        actionLabel="Undo"
        onAction={onAction}
        testID="toast"
      />,
    );
    expect(screen.getByText('Undo')).toBeTruthy();
  });

  it('calls onAction when action button is pressed', () => {
    const onAction = jest.fn();
    render(
      <Toast
        message="Hello"
        visible
        actionLabel="Undo"
        onAction={onAction}
        testID="toast"
      />,
    );
    fireEvent.press(screen.getByText('Undo'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  describe('variant rendering', () => {
    const variants = ['info', 'success', 'warning', 'danger'] as const;

    variants.forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        render(
          <Toast
            message="Notification"
            variant={variant}
            visible
            testID={`toast-${variant}`}
          />,
        );
        expect(screen.getByTestId(`toast-${variant}`)).toBeTruthy();
        expect(screen.getByText('Notification')).toBeTruthy();
      });
    });
  });

  describe('position variants', () => {
    it('renders with position="top"', () => {
      render(
        <Toast message="Top toast" position="top" visible testID="toast" />,
      );
      expect(screen.getByTestId('toast')).toBeTruthy();
    });

    it('renders with position="bottom" (default)', () => {
      render(
        <Toast message="Bottom toast" position="bottom" visible testID="toast" />,
      );
      expect(screen.getByTestId('toast')).toBeTruthy();
    });
  });

  describe('auto-dismiss timer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('calls onDismiss after duration elapses', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          message="Auto dismiss"
          visible
          duration={3000}
          onDismiss={onDismiss}
          testID="toast"
        />,
      );
      expect(onDismiss).not.toHaveBeenCalled();
      jest.advanceTimersByTime(3000);
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('calls onDismiss after custom duration', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          message="Quick"
          visible
          duration={1000}
          onDismiss={onDismiss}
          testID="toast"
        />,
      );
      jest.advanceTimersByTime(999);
      expect(onDismiss).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1);
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('does NOT auto-dismiss when duration is 0', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          message="Persistent"
          visible
          duration={0}
          onDismiss={onDismiss}
          testID="toast"
        />,
      );
      jest.advanceTimersByTime(10000);
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it('does not auto-dismiss when not visible', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          message="Hidden"
          visible={false}
          duration={3000}
          onDismiss={onDismiss}
          testID="toast"
        />,
      );
      jest.advanceTimersByTime(5000);
      expect(onDismiss).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has alert accessibility role', () => {
      render(<Toast message="Alert" visible testID="toast" />);
      expect(screen.getByRole('alert')).toBeTruthy();
    });

    it('has polite accessibilityLiveRegion', () => {
      render(<Toast message="Update" visible testID="toast" />);
      const alert = screen.getByRole('alert');
      expect(alert.props.accessibilityLiveRegion).toBe('polite');
    });
  });

  describe('action button visibility', () => {
    it('does not show action when only actionLabel is provided without onAction', () => {
      render(
        <Toast
          message="Hello"
          visible
          actionLabel="Undo"
          testID="toast"
        />,
      );
      expect(screen.queryByText('Undo')).toBeNull();
    });

    it('does not show action when only onAction is provided without actionLabel', () => {
      const onAction = jest.fn();
      render(
        <Toast
          message="Hello"
          visible
          onAction={onAction}
          testID="toast"
        />,
      );
      // No action text rendered
      expect(screen.getByTestId('toast')).toBeTruthy();
    });
  });

  describe('dismiss on press', () => {
    it('calls onDismiss when toast is pressed', () => {
      const onDismiss = jest.fn();
      render(
        <Toast message="Tap to dismiss" visible onDismiss={onDismiss} testID="toast" />,
      );
      fireEvent.press(screen.getByRole('alert'));
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });
});
