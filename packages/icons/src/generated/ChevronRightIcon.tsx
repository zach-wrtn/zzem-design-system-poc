import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgIconProps } from '../types';

export const ChevronRightIcon = ({ width = 24, height = 24, color = '#000' }: SvgIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18L15 12L9 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
