import { useContext } from 'react';
import { ThemeContext } from './ZDSProvider';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ZDSProvider');
  }
  return context;
};
