import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgIconProps } from '../types';

export const ArrowRightIcon = ({ width = 24, height = 24, color = '#000' }: SvgIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
