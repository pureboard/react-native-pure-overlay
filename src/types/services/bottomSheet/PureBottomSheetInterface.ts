import type { Deferred } from '../../../utils/deferred';
import type { Key } from '../../utils/Key';
import type { BasePureBottomSheetProps } from './BasePureBottomSheetProps';
import type { PureBottomSheetResolveType } from './PureBottomSheetResolveType';

export interface PureBottomSheetInterface<
  OverlayProps extends Record<Key, any> = any,
  ResolveKeys extends any = undefined,
> {
  openBottomSheet: (props: OverlayProps & BasePureBottomSheetProps) => void;
  openDeferredBottomSheet: <P extends any = undefined>(
    _props:
      | (OverlayProps & BasePureBottomSheetProps)
      | ((
          d: Deferred<
            ResolveKeys extends undefined
              ? PureBottomSheetResolveType<P>
              : PureBottomSheetResolveType<P> | ResolveKeys
          >
        ) => OverlayProps & BasePureBottomSheetProps)
  ) => Promise<
    ResolveKeys extends undefined
      ? PureBottomSheetResolveType<P>
      : PureBottomSheetResolveType<P> | ResolveKeys
  >;
  closeBottomSheet: () => void;
}
