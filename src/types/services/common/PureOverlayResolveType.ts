export type PureOverlayResolveType<
  BaseResolveType extends string,
  T = undefined,
> = T extends undefined ? BaseResolveType : T | BaseResolveType;
