import {OverlayPropList} from './OverlayParamList';
import {ResolveKeys} from './ResolveKeys';

export interface PureOverlayProviderProps<
  PropList extends OverlayPropList,
  Id extends keyof PropList,
> {
  Component: React.ComponentType<PropList[Id]>;
  resolveKeys?: ResolveKeys<PropList[Id]>;
  overlayId: Id;
}
