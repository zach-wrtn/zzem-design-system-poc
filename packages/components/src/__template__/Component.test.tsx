import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component testID="test-component">Content</Component>);
    expect(screen.getByTestId('test-component')).toBeTruthy();
  });

  it('applies accessibility label', () => {
    render(
      <Component accessibilityLabel="Test label">Content</Component>,
    );
    expect(screen.getByLabelText('Test label')).toBeTruthy();
  });

  it('renders in disabled state', () => {
    render(
      <Component disabled testID="disabled-component">
        Content
      </Component>,
    );
    expect(screen.getByTestId('disabled-component')).toBeTruthy();
  });
});
