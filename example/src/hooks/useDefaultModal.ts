import { usePureModal } from '@pureboard/react-native-pure-overlay';
import type { ProjectOverlayPropList } from '../screens/MainScreen';

export const useDefaultModal = () =>
  usePureModal<
    ProjectOverlayPropList,
    'default',
    'pressedMainButton' | 'pressedSubButton'
  >('default');
