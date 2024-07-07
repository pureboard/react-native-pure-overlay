import type { Deferred } from '../../../utils/deferred';
import type { Key } from '../../utils/Key';
import type { BasePureModalProps } from './BasePureModalProps';
import type { PureModalResolveType } from './PureModalResolveType';

export interface PureModalInterface<
  OverlayProps extends Record<Key, any>,
  ResolveKeys extends any = undefined,
> {
  openModal: (props: OverlayProps & BasePureModalProps) => void;
  openDeferredModal: <P extends any = undefined>(
    _props:
      | (OverlayProps & BasePureModalProps)
      | ((
          d: Deferred<
            ResolveKeys extends undefined
              ? PureModalResolveType<P>
              : PureModalResolveType<P> | ResolveKeys
          >
        ) => OverlayProps & BasePureModalProps)
  ) => Promise<
    ResolveKeys extends undefined
      ? PureModalResolveType<P>
      : PureModalResolveType<P> | ResolveKeys
  >;
  closeModal: () => void;
}
