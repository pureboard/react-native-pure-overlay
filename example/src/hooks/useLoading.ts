import { usePureLoading } from '@pureboard/react-native-pure-overlay';
import type { ProjectOverlayPropList } from '../screens/MainScreen';

export const useLoading = () =>
  usePureLoading<ProjectOverlayPropList, 'loading'>('loading');
