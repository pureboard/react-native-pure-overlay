import {BasePureMoalProps} from './BasePureModalProps';

export type PureModalProps<T extends React.ComponentProps<any>> = T &
  BasePureMoalProps;
