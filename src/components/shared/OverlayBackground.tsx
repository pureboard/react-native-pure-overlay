import React, { useCallback } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import useAndroidBackHandler from '../../hooks/useAndroidBackHandler';

interface OverlayBackgroundProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPressBackButton?: () => void;
  onPressBackDrop?: () => void;
  opacity?: number;
}

const OverlayBackground = ({
  children,
  style,
  onPressBackButton,
  onPressBackDrop,
  opacity = 0.3,
}: OverlayBackgroundProps) => {
  const { width, height } = useWindowDimensions();

  const onBackPress = useCallback(() => {
    onPressBackButton?.();
    return true;
  }, [onPressBackButton]);

  //안드로이드 물리버튼 핸들링을 위해 listener 등록
  useAndroidBackHandler({ onBackPress });

  return (
    <Pressable
      style={[styles.container, { width, height }, style]}
      onPress={onPressBackDrop}
    >
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: `rgba(0, 0, 0, ${opacity})` },
        ]}
      />
      {children}
    </Pressable>
  );
};

export default OverlayBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
