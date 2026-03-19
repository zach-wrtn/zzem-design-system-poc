import '@testing-library/jest-native/extend-expect';

// Mock react-native Modal
jest.mock('react-native/Libraries/Modal/Modal', () => {
  const React = require('react');
  return ({ children, visible, testID, ...props }: any) => {
    if (!visible) return null;
    return React.createElement('Modal', { testID, ...props }, children);
  };
});
