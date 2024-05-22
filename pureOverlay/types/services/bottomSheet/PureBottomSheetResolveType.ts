type BasePureBottomSheetResolveType = 'pressedBackButton' | 'pressedBackDrop';

export type PureBottomSheetResolveType<T = undefined> = PureOverlayResolveType<
  BasePureBottomSheetResolveType,
  T
>;
