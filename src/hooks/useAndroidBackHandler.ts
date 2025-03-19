import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';

const useAndroidBackHandler = ({
  onBackPress,
}: {
  onBackPress: () => boolean;
}) => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      return;
    }
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [onBackPress]);
};
export default useAndroidBackHandler;
