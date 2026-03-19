import React from 'react';
import { render, screen } from '../../test-utils';
import { Text } from './Text';

describe('Text', () => {
  it('renders with default variant', () => {
    render(<Text>Default text</Text>);
    expect(screen.getByText('Default text')).toBeTruthy();
  });

  it('renders children text', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('applies variant', () => {
    render(<Text variant="heading-xl">Heading</Text>);
    const text = screen.getByText('Heading');
    expect(text).toBeTruthy();
  });
});
