import { usePureBottomSheet } from '@pureboard/react-native-pure-overlay';
import type { ProjectOverlayPropList } from '../screens/MainScreen';

export const useSampleBottomSheet = () =>
  usePureBottomSheet<
    ProjectOverlayPropList,
    'sample',
    'pressedButton' | 'pressedCloseButton'
  >('sample');
