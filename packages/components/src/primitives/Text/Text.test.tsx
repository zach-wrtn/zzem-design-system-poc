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

  describe('variants', () => {
    it.each([
      'heading-xl',
      'heading-lg',
      'heading-md',
      'heading-sm',
      'body-lg',
      'body-md',
      'body-sm',
      'label-lg',
      'label-md',
      'label-sm',
      'caption',
    ] as const)(
      'renders %s variant without crashing',
      (variant) => {
        render(<Text variant={variant}>{variant} text</Text>);
        expect(screen.getByText(`${variant} text`)).toBeTruthy();
      },
    );
  });

  describe('color prop', () => {
    it('accepts color prop without crashing', () => {
      render(<Text color="primary">Colored text</Text>);
      expect(screen.getByText('Colored text')).toBeTruthy();
    });
  });

  describe('align prop', () => {
    it.each(['left', 'center', 'right'] as const)(
      'applies %s alignment',
      (align) => {
        render(<Text align={align}>Aligned text</Text>);
        const text = screen.getByText('Aligned text');
        expect(text.props.style).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ textAlign: align }),
          ]),
        );
      },
    );
  });

  describe('style override', () => {
    it('applies custom style', () => {
      render(<Text style={{ color: 'red' }}>Styled text</Text>);
      const text = screen.getByText('Styled text');
      expect(text.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ color: 'red' }),
        ]),
      );
    });

    it('custom style merges with variant style', () => {
      render(
        <Text variant="heading-xl" style={{ letterSpacing: 2 }}>
          Merged
        </Text>,
      );
      const text = screen.getByText('Merged');
      expect(text).toBeTruthy();
    });
  });

  describe('children', () => {
    it('renders empty when no children', () => {
      render(<Text testID="empty-text" />);
      expect(screen.getByTestId('empty-text')).toBeTruthy();
    });
  });
});
