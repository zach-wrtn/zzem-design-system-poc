import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgIconProps } from '../types';

export const AlertIcon = ({ width = 24, height = 24, color = '#000' }: SvgIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.36 18.79 1.91 19.78 2.82 19.78H21.18C22.09 19.78 22.64 18.79 22.18 18L13.71 3.86C13.25 3.07 12.13 3.07 11.67 3.86H10.29Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
