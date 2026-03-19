import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { NavigationBar } from './NavigationBar';

describe('NavigationBar', () => {
  it('renders with testID', () => {
    render(<NavigationBar title="Page" testID="navbar" />);
    expect(screen.getByTestId('navbar')).toBeTruthy();
  });

  it('renders title', () => {
    render(<NavigationBar title="Settings" testID="navbar" />);
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('renders large title', () => {
    render(<NavigationBar title="Settings" largeTitle testID="navbar" />);
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('calls leftAction onPress', () => {
    const onPress = jest.fn();
    render(
      <NavigationBar
        title="Page"
        leftAction={{ label: 'Back', onPress }}
        testID="navbar"
      />,
    );
    fireEvent.press(screen.getByText('Back'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders right actions', () => {
    const onPress = jest.fn();
    render(
      <NavigationBar
        title="Page"
        rightActions={[
          { label: 'Save', onPress },
          { label: 'Share', onPress },
        ]}
        testID="navbar"
      />,
    );
    expect(screen.getByText('Save')).toBeTruthy();
    expect(screen.getByText('Share')).toBeTruthy();
  });

  it('applies accessibility role header', () => {
    render(<NavigationBar title="Page" testID="navbar" />);
    expect(screen.getByRole('header')).toBeTruthy();
  });
});
