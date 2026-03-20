import React from 'react';
import { View, Text as RNText } from 'react-native';
import { render, screen, fireEvent } from '../../test-utils';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('renders with testID', () => {
    render(<TextInput testID="text-input" />);
    expect(screen.getByTestId('text-input')).toBeTruthy();
  });

  it('renders label text', () => {
    render(<TextInput label="Email" testID="text-input" />);
    expect(screen.getByText('Email')).toBeTruthy();
  });

  it('renders error message', () => {
    render(<TextInput error="Required field" testID="text-input" />);
    expect(screen.getByText('Required field')).toBeTruthy();
  });

  it('renders helper text', () => {
    render(<TextInput helperText="Enter your email" testID="text-input" />);
    expect(screen.getByText('Enter your email')).toBeTruthy();
  });

  it('does not render helper text when error exists', () => {
    render(
      <TextInput
        helperText="Enter your email"
        error="Required field"
        testID="text-input"
      />,
    );
    expect(screen.getByText('Required field')).toBeTruthy();
    expect(screen.queryByText('Enter your email')).toBeNull();
  });

  it('renders in disabled state', () => {
    render(<TextInput disabled testID="text-input" />);
    const input = screen.getByTestId('text-input');
    expect(input).toBeTruthy();
  });

  describe('focus and blur events', () => {
    it('calls onFocus when input is focused', () => {
      const onFocus = jest.fn();
      render(<TextInput onFocus={onFocus} label="Email" testID="text-input" />);
      const input = screen.getByLabelText('Email');
      fireEvent(input, 'focus');
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when input loses focus', () => {
      const onBlur = jest.fn();
      render(<TextInput onBlur={onBlur} label="Email" testID="text-input" />);
      const input = screen.getByLabelText('Email');
      fireEvent(input, 'blur');
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('error and helper text', () => {
    it('error message overrides helper text', () => {
      render(
        <TextInput
          helperText="Some help"
          error="This is required"
          testID="text-input"
        />,
      );
      expect(screen.getByText('This is required')).toBeTruthy();
      expect(screen.queryByText('Some help')).toBeNull();
    });

    it('shows helper text when no error', () => {
      render(
        <TextInput helperText="Helpful info" testID="text-input" />,
      );
      expect(screen.getByText('Helpful info')).toBeTruthy();
    });
  });

  describe('icons', () => {
    it('renders iconLeft', () => {
      render(
        <TextInput
          iconLeft={<View testID="icon-left" />}
          testID="text-input"
        />,
      );
      expect(screen.getByTestId('icon-left')).toBeTruthy();
    });

    it('renders iconRight', () => {
      render(
        <TextInput
          iconRight={<View testID="icon-right" />}
          testID="text-input"
        />,
      );
      expect(screen.getByTestId('icon-right')).toBeTruthy();
    });

    it('renders both icons simultaneously', () => {
      render(
        <TextInput
          iconLeft={<View testID="icon-left" />}
          iconRight={<View testID="icon-right" />}
          testID="text-input"
        />,
      );
      expect(screen.getByTestId('icon-left')).toBeTruthy();
      expect(screen.getByTestId('icon-right')).toBeTruthy();
    });
  });

  describe('placeholder', () => {
    it('renders placeholder text', () => {
      render(
        <TextInput
          placeholder="Enter your email"
          testID="text-input"
        />,
      );
      expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy();
    });
  });

  describe('text change', () => {
    it('calls onChangeText when text is entered', () => {
      const onChangeText = jest.fn();
      render(
        <TextInput
          onChangeText={onChangeText}
          label="Name"
          testID="text-input"
        />,
      );
      const input = screen.getByLabelText('Name');
      fireEvent.changeText(input, 'Hello');
      expect(onChangeText).toHaveBeenCalledWith('Hello');
    });
  });

  describe('accessibility', () => {
    it('sets accessibilityState disabled when disabled', () => {
      render(
        <TextInput disabled label="Email" testID="text-input" />,
      );
      const input = screen.getByLabelText('Email');
      expect(input.props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: true }),
      );
    });

    it('sets accessibilityState not disabled by default', () => {
      render(
        <TextInput label="Email" testID="text-input" />,
      );
      const input = screen.getByLabelText('Email');
      expect(input.props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: false }),
      );
    });

    it('uses label as accessibilityLabel', () => {
      render(
        <TextInput label="Username" testID="text-input" />,
      );
      const input = screen.getByLabelText('Username');
      expect(input).toBeTruthy();
    });
  });

  describe('disabled state', () => {
    it('input is not editable when disabled', () => {
      render(
        <TextInput disabled label="Email" testID="text-input" />,
      );
      const input = screen.getByLabelText('Email');
      expect(input.props.editable).toBe(false);
    });
  });
});
