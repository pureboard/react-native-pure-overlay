import type { BasePureModalProps } from './BasePureModalProps';

export type PureModalProps<T extends React.ComponentProps<any>> = T &
  BasePureModalProps;
