import type { Deferred } from '../../../utils/deferred';
import type { Key } from '../../utils/Key';
import type { BasePureModalProps } from './BasePureModalProps';
import type { PureModalResolveType } from './PureModalResolveType';

export interface PureModalInterface<
  OverlayProps extends Record<Key, any> = any,
> {
  openModal: (props: OverlayProps & BasePureModalProps) => void;
  openDeferredModal: <P extends any = undefined>(
    _props:
      | (OverlayProps & BasePureModalProps)
      | ((
          d: Deferred<PureModalResolveType<P>>
        ) => OverlayProps & BasePureModalProps)
  ) => Promise<PureModalResolveType<P>>;
  closeModal: () => void;
}
