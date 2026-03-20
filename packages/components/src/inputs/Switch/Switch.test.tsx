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

  describe('checked visual state', () => {
    it('renders with value=true', () => {
      render(
        <Switch value={true} onValueChange={jest.fn()} testID="switch" />,
      );
      expect(screen.getByTestId('switch')).toBeTruthy();
    });

    it('renders with value=false', () => {
      render(
        <Switch value={false} onValueChange={jest.fn()} testID="switch" />,
      );
      expect(screen.getByTestId('switch')).toBeTruthy();
    });
  });

  describe('onValueChange argument', () => {
    it('receives true when toggling from false', () => {
      const onValueChange = jest.fn();
      render(
        <Switch value={false} onValueChange={onValueChange} testID="switch" />,
      );
      fireEvent.press(screen.getByTestId('switch'));
      expect(onValueChange).toHaveBeenCalledWith(true);
    });

    it('receives false when toggling from true', () => {
      const onValueChange = jest.fn();
      render(
        <Switch value={true} onValueChange={onValueChange} testID="switch" />,
      );
      fireEvent.press(screen.getByTestId('switch'));
      expect(onValueChange).toHaveBeenCalledWith(false);
    });
  });

  describe('disabled appearance', () => {
    it('renders disabled switch with label', () => {
      render(
        <Switch
          value={false}
          onValueChange={jest.fn()}
          disabled
          label="Disabled switch"
          testID="switch"
        />,
      );
      expect(screen.getByText('Disabled switch')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('sets accessibilityState checked=true when value is true', () => {
      render(
        <Switch value={true} onValueChange={jest.fn()} testID="switch" />,
      );
      const switchEl = screen.getByTestId('switch');
      expect(switchEl.props.accessibilityState).toEqual(
        expect.objectContaining({ checked: true }),
      );
    });

    it('sets accessibilityState checked=false when value is false', () => {
      render(
        <Switch value={false} onValueChange={jest.fn()} testID="switch" />,
      );
      const switchEl = screen.getByTestId('switch');
      expect(switchEl.props.accessibilityState).toEqual(
        expect.objectContaining({ checked: false }),
      );
    });

    it('sets accessibilityState disabled when disabled', () => {
      render(
        <Switch
          value={false}
          onValueChange={jest.fn()}
          disabled
          testID="switch"
        />,
      );
      const switchEl = screen.getByTestId('switch');
      expect(switchEl.props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: true }),
      );
    });

    it('sets accessibilityState not disabled by default', () => {
      render(
        <Switch value={false} onValueChange={jest.fn()} testID="switch" />,
      );
      const switchEl = screen.getByTestId('switch');
      expect(switchEl.props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: false }),
      );
    });

    it('uses label as accessibilityLabel when no explicit label given', () => {
      render(
        <Switch
          value={false}
          onValueChange={jest.fn()}
          label="Notifications"
          testID="switch"
        />,
      );
      const switchEl = screen.getByTestId('switch');
      expect(switchEl.props.accessibilityLabel).toBe('Notifications');
    });

    it('uses explicit accessibilityLabel over label', () => {
      render(
        <Switch
          value={false}
          onValueChange={jest.fn()}
          label="Notifications"
          accessibilityLabel="Toggle notifications"
          testID="switch"
        />,
      );
      const switchEl = screen.getByTestId('switch');
      expect(switchEl.props.accessibilityLabel).toBe('Toggle notifications');
    });
  });
});
