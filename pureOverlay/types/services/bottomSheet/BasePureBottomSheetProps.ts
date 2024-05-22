import {StyleProp, ViewStyle} from 'react-native';

export interface BasePureBottomSheetProps {
  onBackdropPress?: () => void;
  onBackButtonPress?: () => void;
  backgroundOpacity?: number;
  fullScreen?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}
