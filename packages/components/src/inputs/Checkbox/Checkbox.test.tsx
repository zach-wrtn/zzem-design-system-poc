import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with testID', () => {
    render(
      <Checkbox checked={false} onChange={jest.fn()} testID="checkbox" />,
    );
    expect(screen.getByTestId('checkbox')).toBeTruthy();
  });

  it('renders label', () => {
    render(
      <Checkbox
        checked={false}
        onChange={jest.fn()}
        label="Accept terms"
        testID="checkbox"
      />,
    );
    expect(screen.getByText('Accept terms')).toBeTruthy();
  });

  it('calls onChange on press', () => {
    const onChange = jest.fn();
    render(
      <Checkbox checked={false} onChange={onChange} testID="checkbox" />,
    );
    fireEvent.press(screen.getByTestId('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(
      <Checkbox
        checked={false}
        onChange={onChange}
        disabled
        testID="checkbox"
      />,
    );
    fireEvent.press(screen.getByTestId('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies accessibility role checkbox', () => {
    render(
      <Checkbox checked={false} onChange={jest.fn()} testID="checkbox" />,
    );
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox.props.accessibilityRole).toBe('checkbox');
  });

  describe('checked visual state', () => {
    it('renders in checked state', () => {
      render(
        <Checkbox checked={true} onChange={jest.fn()} testID="checkbox" />,
      );
      expect(screen.getByTestId('checkbox')).toBeTruthy();
    });

    it('renders in unchecked state', () => {
      render(
        <Checkbox checked={false} onChange={jest.fn()} testID="checkbox" />,
      );
      expect(screen.getByTestId('checkbox')).toBeTruthy();
    });
  });

  describe('onChange argument', () => {
    it('receives true when unchecked checkbox is pressed', () => {
      const onChange = jest.fn();
      render(
        <Checkbox checked={false} onChange={onChange} testID="checkbox" />,
      );
      fireEvent.press(screen.getByTestId('checkbox'));
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('receives false when checked checkbox is pressed', () => {
      const onChange = jest.fn();
      render(
        <Checkbox checked={true} onChange={onChange} testID="checkbox" />,
      );
      fireEvent.press(screen.getByTestId('checkbox'));
      expect(onChange).toHaveBeenCalledWith(false);
    });
  });

  describe('disabled state', () => {
    it('renders disabled checkbox with label', () => {
      render(
        <Checkbox
          checked={false}
          onChange={jest.fn()}
          disabled
          label="Disabled checkbox"
          testID="checkbox"
        />,
      );
      expect(screen.getByText('Disabled checkbox')).toBeTruthy();
    });

    it('does not call onChange when disabled and checked', () => {
      const onChange = jest.fn();
      render(
        <Checkbox
          checked={true}
          onChange={onChange}
          disabled
          testID="checkbox"
        />,
      );
      fireEvent.press(screen.getByTestId('checkbox'));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('sets accessibilityState checked=true when checked', () => {
      render(
        <Checkbox checked={true} onChange={jest.fn()} testID="checkbox" />,
      );
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox.props.accessibilityState).toEqual(
        expect.objectContaining({ checked: true }),
      );
    });

    it('sets accessibilityState checked=false when unchecked', () => {
      render(
        <Checkbox checked={false} onChange={jest.fn()} testID="checkbox" />,
      );
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox.props.accessibilityState).toEqual(
        expect.objectContaining({ checked: false }),
      );
    });

    it('sets accessibilityState disabled when disabled', () => {
      render(
        <Checkbox
          checked={false}
          onChange={jest.fn()}
          disabled
          testID="checkbox"
        />,
      );
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox.props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: true }),
      );
    });

    it('sets accessibilityState not disabled by default', () => {
      render(
        <Checkbox checked={false} onChange={jest.fn()} testID="checkbox" />,
      );
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox.props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: false }),
      );
    });

    it('uses label as accessibilityLabel when no explicit label given', () => {
      render(
        <Checkbox
          checked={false}
          onChange={jest.fn()}
          label="Accept terms"
          testID="checkbox"
        />,
      );
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox.props.accessibilityLabel).toBe('Accept terms');
    });

    it('uses explicit accessibilityLabel over label', () => {
      render(
        <Checkbox
          checked={false}
          onChange={jest.fn()}
          label="Accept terms"
          accessibilityLabel="Accept terms and conditions"
          testID="checkbox"
        />,
      );
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox.props.accessibilityLabel).toBe(
        'Accept terms and conditions',
      );
    });
  });
});
