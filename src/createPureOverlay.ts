import { getPureBottomSheet } from './components/overlay/PureBottomSheet';
import { getPureLoading } from './components/overlay/PureLoading';
import { getPureModal } from './components/overlay/PureModal';
import { Provider } from './providers/Provider';
import type { OverlayPropList } from './types/services/common/OverlayParamList';

export const createPureOverlay = <PropList extends OverlayPropList>() => ({
  Provider: Provider<PropList>,
  Modal: getPureModal<PropList>(),
  BottomSheet: getPureBottomSheet<PropList>(),
  Loading: getPureLoading<PropList>(),
});
