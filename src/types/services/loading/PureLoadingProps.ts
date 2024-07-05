import type { BasePureLoadingProps } from './BasePureLoadingProps';

export type PureLoadingProps<T extends React.ComponentProps<any>> = T &
  BasePureLoadingProps;
