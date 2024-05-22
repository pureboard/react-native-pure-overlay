import {Deferred} from '../../../utils/deferred';
import {Key} from '../../utils/Key';
import {BasePureBottomSheetProps} from './BasePureBottomSheetProps';

import {PureBottomSheetResolveType} from './PureBottomSheetResolveType';

export interface PureBottomSheetInterface<
  OverlayProps extends Record<Key, any> = any,
> {
  openBottomSheet: (props: OverlayProps & BasePureBottomSheetProps) => void;
  openDeferredBottomSheet: <P extends any = undefined>(
    _props:
      | (OverlayProps & BasePureBottomSheetProps)
      | ((
          d: Deferred<PureBottomSheetResolveType<P>>,
        ) => OverlayProps & BasePureBottomSheetProps),
  ) => Promise<PureBottomSheetResolveType<P>>;
  closeBottomSheet: () => void;
}
