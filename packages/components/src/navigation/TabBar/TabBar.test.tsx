import React from 'react';
import { Text as RNText } from 'react-native';
import { render, screen, fireEvent } from '../../test-utils';
import { TabBar } from './TabBar';

const items = [
  { key: 'home', label: 'Home', icon: <RNText>🏠</RNText> },
  { key: 'search', label: 'Search', icon: <RNText>🔍</RNText> },
];

describe('TabBar', () => {
  it('renders with testID', () => {
    render(<TabBar items={items} activeKey="home" onChange={jest.fn()} testID="tabbar" />);
    expect(screen.getByTestId('tabbar')).toBeTruthy();
  });

  it('renders all tab labels', () => {
    render(<TabBar items={items} activeKey="home" onChange={jest.fn()} testID="tabbar" />);
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Search')).toBeTruthy();
  });

  it('calls onChange on tab press', () => {
    const onChange = jest.fn();
    render(<TabBar items={items} activeKey="home" onChange={onChange} testID="tabbar" />);
    fireEvent.press(screen.getByText('Search'));
    expect(onChange).toHaveBeenCalledWith('search');
  });

  it('applies tablist role', () => {
    render(<TabBar items={items} activeKey="home" onChange={jest.fn()} testID="tabbar" />);
    expect(screen.getByRole('tablist')).toBeTruthy();
  });

  it('shows badge when provided', () => {
    const itemsWithBadge = [
      ...items,
      { key: 'notifications', label: 'Notifications', icon: <RNText>🔔</RNText>, badge: 5 },
    ];
    render(<TabBar items={itemsWithBadge} activeKey="home" onChange={jest.fn()} testID="tabbar" />);
    expect(screen.getByText('5')).toBeTruthy();
  });
});
