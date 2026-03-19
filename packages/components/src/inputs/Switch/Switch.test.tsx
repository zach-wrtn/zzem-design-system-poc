import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders with testID', () => {
    render(
      <Switch value={false} onValueChange={jest.fn()} testID="switch" />,
    );
    expect(screen.getByTestId('switch')).toBeTruthy();
  });

  it('renders label', () => {
    render(
      <Switch
        value={false}
        onValueChange={jest.fn()}
        label="Enable notifications"
        testID="switch"
      />,
    );
    expect(screen.getByText('Enable notifications')).toBeTruthy();
  });

  it('calls onValueChange on press', () => {
    const onValueChange = jest.fn();
    render(
      <Switch value={false} onValueChange={onValueChange} testID="switch" />,
    );
    fireEvent.press(screen.getByTestId('switch'));
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onValueChange when disabled', () => {
    const onValueChange = jest.fn();
    render(
      <Switch
        value={false}
        onValueChange={onValueChange}
        disabled
        testID="switch"
      />,
    );
    fireEvent.press(screen.getByTestId('switch'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('applies accessibility role switch', () => {
    render(
      <Switch value={false} onValueChange={jest.fn()} testID="switch" />,
    );
    const switchEl = screen.getByTestId('switch');
    expect(switchEl.props.accessibilityRole).toBe('switch');
  });
});
