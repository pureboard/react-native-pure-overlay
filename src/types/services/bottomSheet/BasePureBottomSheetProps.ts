import type { StyleProp, ViewStyle } from 'react-native';

export interface BasePureBottomSheetProps {
  onPressBackDrop?: () => void;
  onPressBackButton?: () => void;
  backgroundOpacity?: number;
  fullScreen?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}
