import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Snackbar } from './Snackbar';

describe('Snackbar', () => {
  it('renders when visible', () => {
    render(<Snackbar message="Hello" visible testID="snackbar" />);
    expect(screen.getByTestId('snackbar')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    render(<Snackbar message="Hello" visible={false} testID="snackbar" />);
    expect(screen.queryByTestId('snackbar')).toBeNull();
  });

  it('renders message', () => {
    render(<Snackbar message="Item deleted" visible testID="snackbar" />);
    expect(screen.getByText('Item deleted')).toBeTruthy();
  });

  it('renders action when actionLabel and onAction provided', () => {
    const onAction = jest.fn();
    render(
      <Snackbar
        message="Hello"
        visible
        actionLabel="Undo"
        onAction={onAction}
        testID="snackbar"
      />,
    );
    expect(screen.getByText('Undo')).toBeTruthy();
  });

  it('calls onAction when action is pressed', () => {
    const onAction = jest.fn();
    render(
      <Snackbar
        message="Hello"
        visible
        actionLabel="Undo"
        onAction={onAction}
        testID="snackbar"
      />,
    );
    fireEvent.press(screen.getByText('Undo'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  describe('action button visibility', () => {
    it('does not show action button when actionLabel is missing', () => {
      render(
        <Snackbar message="Hello" visible testID="snackbar" />,
      );
      expect(screen.queryByText('Undo')).toBeNull();
    });

    it('does not show action when only actionLabel is provided without onAction', () => {
      render(
        <Snackbar
          message="Hello"
          visible
          actionLabel="Retry"
          testID="snackbar"
        />,
      );
      expect(screen.queryByText('Retry')).toBeNull();
    });

    it('does not show action when only onAction is provided without actionLabel', () => {
      const onAction = jest.fn();
      render(
        <Snackbar
          message="Hello"
          visible
          onAction={onAction}
          testID="snackbar"
        />,
      );
      expect(screen.getByTestId('snackbar')).toBeTruthy();
    });
  });

  describe('visibility toggle', () => {
    it('shows when visible transitions to true', () => {
      const { rerender } = render(
        <Snackbar message="Hello" visible={false} testID="snackbar" />,
      );
      expect(screen.queryByTestId('snackbar')).toBeNull();

      rerender(<Snackbar message="Hello" visible={true} testID="snackbar" />);
      expect(screen.getByTestId('snackbar')).toBeTruthy();
    });

    it('hides when visible transitions to false', () => {
      const { rerender } = render(
        <Snackbar message="Hello" visible={true} testID="snackbar" />,
      );
      expect(screen.getByTestId('snackbar')).toBeTruthy();

      rerender(<Snackbar message="Hello" visible={false} testID="snackbar" />);
      expect(screen.queryByTestId('snackbar')).toBeNull();
    });
  });

  describe('auto-dismiss timer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('calls onDismiss after default duration (4000ms)', () => {
      const onDismiss = jest.fn();
      render(
        <Snackbar
          message="Auto dismiss"
          visible
          onDismiss={onDismiss}
          testID="snackbar"
        />,
      );
      expect(onDismiss).not.toHaveBeenCalled();
      jest.advanceTimersByTime(4000);
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('does NOT auto-dismiss when duration is 0', () => {
      const onDismiss = jest.fn();
      render(
        <Snackbar
          message="Persistent"
          visible
          duration={0}
          onDismiss={onDismiss}
          testID="snackbar"
        />,
      );
      jest.advanceTimersByTime(10000);
      expect(onDismiss).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has alert accessibility role on inner container', () => {
      const { toJSON } = render(<Snackbar message="Alert" visible testID="snackbar" />);
      const tree = JSON.stringify(toJSON());
      expect(tree).toContain('"accessibilityRole":"alert"');
    });

    it('has polite accessibilityLiveRegion on inner container', () => {
      const { toJSON } = render(<Snackbar message="Update" visible testID="snackbar" />);
      const tree = JSON.stringify(toJSON());
      expect(tree).toContain('"accessibilityLiveRegion":"polite"');
    });
  });
});
