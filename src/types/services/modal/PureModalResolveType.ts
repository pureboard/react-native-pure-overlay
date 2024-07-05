import type { PureOverlayResolveType } from '../common/PureOverlayResolveType';

type BasePureModalResolveType = 'pressedBackButton' | 'pressedBackDrop';

export type PureModalResolveType<T = undefined> = PureOverlayResolveType<
  BasePureModalResolveType,
  T
>;
