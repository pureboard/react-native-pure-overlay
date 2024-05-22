import {Deferred} from '../../../utils/deferred';
import {Key} from '../../utils/Key';
import {BasePureMoalProps} from './BasePureModalProps';
import {PureModalResolveType} from './PureModalResolveType';

export interface PureModalInterface<
  OverlayProps extends Record<Key, any> = any,
> {
  openModal: (props: OverlayProps & BasePureMoalProps) => void;
  openDeferredModal: <P extends any = undefined>(
    _props:
      | (OverlayProps & BasePureMoalProps)
      | ((
          d: Deferred<PureModalResolveType<P>>,
        ) => OverlayProps & BasePureMoalProps),
  ) => Promise<PureModalResolveType<P>>;
  closeModal: () => void;
}
