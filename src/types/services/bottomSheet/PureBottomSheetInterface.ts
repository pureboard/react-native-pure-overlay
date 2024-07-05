import type { Deferred } from '../../../utils/deferred';
import type { Key } from '../../utils/Key';
import type { BasePureBottomSheetProps } from './BasePureBottomSheetProps';
import type { PureBottomSheetResolveType } from './PureBottomSheetResolveType';

export interface PureBottomSheetInterface<
  OverlayProps extends Record<Key, any> = any,
> {
  openBottomSheet: (props: OverlayProps & BasePureBottomSheetProps) => void;
  openDeferredBottomSheet: <P extends any = undefined>(
    _props:
      | (OverlayProps & BasePureBottomSheetProps)
      | ((
          d: Deferred<PureBottomSheetResolveType<P>>
        ) => OverlayProps & BasePureBottomSheetProps)
  ) => Promise<PureBottomSheetResolveType<P>>;
  closeBottomSheet: () => void;
}
