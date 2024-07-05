import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useAndroidBackHandler = ({
  onBackPress,
}: {
  onBackPress: () => boolean;
}) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [onBackPress]);
};
export default useAndroidBackHandler;
