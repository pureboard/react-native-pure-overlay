import type { PureOverlayResolveType } from '../common/PureOverlayResolveType';

type BasePureBottomSheetResolveType = 'pressedBackButton' | 'pressedBackDrop';

export type PureBottomSheetResolveType<T = undefined> = PureOverlayResolveType<
  BasePureBottomSheetResolveType,
  T
>;
