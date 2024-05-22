import {BasePureBottomSheetProps} from './BasePureBottomSheetProps';

export type PureBottomSheetProps<T extends React.ComponentProps<any>> = T &
  BasePureBottomSheetProps;
