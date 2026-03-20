import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgIconProps } from '../types';

export const SearchIcon = ({ width = 24, height = 24, color = '#000' }: SvgIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 21L15.5 15.5M17 10C17 13.866 13.866 17 10 17C6.134 17 3 13.866 3 10C3 6.134 6.134 3 10 3C13.866 3 17 6.134 17 10Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
