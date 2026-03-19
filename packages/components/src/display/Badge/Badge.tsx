import React from 'react';
import { View } from 'react-native';
import { tokens } from '@zzem-design-system/tokens/output/tokens';
import { Text } from '../../primitives/Text';
import type { BadgeProps } from './Badge.types';

const variantColors: Record<string, { bg: string; text: string }> = {
  default: { bg: tokens.color.background.tertiary, text: tokens.color.text.primary },
  success: { bg: tokens.color.status.successBg, text: tokens.color.status.success },
  warning: { bg: tokens.color.status.warningBg, text: tokens.color.status.warning },
  danger: { bg: tokens.color.status.dangerBg, text: tokens.color.status.danger },
  info: { bg: tokens.color.status.infoBg, text: tokens.color.status.info },
};

export const Badge = ({
  variant = 'default',
  size = 'md',
  label,
  accessibilityLabel,
  style,
  testID,
}: BadgeProps) => {
  const colors = variantColors[variant];
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        {
          backgroundColor: colors.bg,
          borderRadius: tokens.radius.full,
          paddingHorizontal: isSmall ? tokens.spacing[4] : tokens.spacing[6],
          paddingVertical: isSmall ? tokens.spacing[1] : tokens.spacing[2],
          alignSelf: 'flex-start' as const,
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
    >
      <Text
        variant={isSmall ? 'caption' : 'label-sm'}
        style={{ color: colors.text }}
      >
        {label}
      </Text>
    </View>
  );
};

Badge.displayName = 'Badge';
