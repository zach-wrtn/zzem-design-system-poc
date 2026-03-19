import React from 'react';
import { render, screen } from '../../test-utils';
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
});
