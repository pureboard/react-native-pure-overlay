import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';

const useAndroidBackHandler = ({
  onBackPress,
}: {
  onBackPress: () => boolean;
}) => {
  useEffect(() => {
    const listener = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return listener.remove;
  }, [onBackPress]);
};
export default useAndroidBackHandler;
