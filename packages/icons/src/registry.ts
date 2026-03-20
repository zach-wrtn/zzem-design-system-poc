import type { SvgIconProps } from './types';
import { SearchIcon } from './generated/SearchIcon';
import { ChevronLeftIcon } from './generated/ChevronLeftIcon';
import { ChevronRightIcon } from './generated/ChevronRightIcon';
import { CloseIcon } from './generated/CloseIcon';
import { CheckIcon } from './generated/CheckIcon';
import { ArrowLeftIcon } from './generated/ArrowLeftIcon';
import { ArrowRightIcon } from './generated/ArrowRightIcon';
import { PlusIcon } from './generated/PlusIcon';
import { InfoIcon } from './generated/InfoIcon';
import { AlertIcon } from './generated/AlertIcon';

export const iconRegistry: Record<string, React.ComponentType<SvgIconProps>> = {
  search: SearchIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  close: CloseIcon,
  check: CheckIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-right': ArrowRightIcon,
  plus: PlusIcon,
  info: InfoIcon,
  alert: AlertIcon,
};

export type IconName = keyof typeof iconRegistry;
