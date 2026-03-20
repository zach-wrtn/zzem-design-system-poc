import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import type { SvgIconProps } from '../types';

export const InfoIcon = ({ width = 24, height = 24, color = '#000' }: SvgIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
    <Path
      d="M12 16V12M12 8H12.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
