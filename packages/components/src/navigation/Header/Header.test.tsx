import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Header } from './Header';

describe('Header', () => {
  it('renders with testID', () => {
    render(<Header title="Title" testID="header" />);
    expect(screen.getByTestId('header')).toBeTruthy();
  });

  it('renders title text', () => {
    render(<Header title="My Header" testID="header" />);
    expect(screen.getByText('My Header')).toBeTruthy();
  });

  it('renders left content', () => {
    const { getByText } = render(
      <Header title="Title" left={<React.Fragment>Back</React.Fragment>} testID="header" />,
    );
    expect(getByText('Back')).toBeTruthy();
  });

  it('renders right content', () => {
    const { getByText } = render(
      <Header title="Title" right={<React.Fragment>Menu</React.Fragment>} testID="header" />,
    );
    expect(getByText('Menu')).toBeTruthy();
  });

  it('applies accessibility role header', () => {
    render(<Header title="Title" testID="header" />);
    expect(screen.getByRole('header')).toBeTruthy();
  });
});
