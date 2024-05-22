import {Key} from '../../utils/Key';
import {BasePureLoadingProps} from './BasePureLoadingProps';

export interface PureLoadingInterface<
  OverlayProps extends Record<Key, any> = any,
> {
  showLoading: (props?: OverlayProps & BasePureLoadingProps) => void;
  hideLoading: () => void;
}
