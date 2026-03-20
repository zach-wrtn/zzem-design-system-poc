import { createStyles } from '@zzem-design-system/engine';

export const useStyles = createStyles((tokens) => ({
  card: {
    backgroundColor: tokens.component.card.background,
    borderRadius: tokens.component.card.radius,
    borderWidth: tokens.component.card.border.width,
    borderColor: tokens.component.card.border.color,
    padding: tokens.component.card.padding,
    ...tokens.component.card.elevation,
  },
  pressed: {
    opacity: tokens.opacity.pressed,
  },
}));
