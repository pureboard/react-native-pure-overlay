import { PureOverlayResolveType } from "../common/PureOverlayResolveType";

type BasePureBottomSheetResolveType = "pressedBackButton" | "pressedBackDrop";

export type PureModalResolveType<T = undefined> = PureOverlayResolveType<
  BasePureBottomSheetResolveType,
  T
>;
