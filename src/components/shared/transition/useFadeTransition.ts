import { useRef } from 'react';
import { Animated } from 'react-native';
import { type TransitionType } from './PureTransition';
import { type PureTransitionHookParams } from './usePureTransition';

const isFadeTransition = (animation?: TransitionType) => {
  return (
    animation === 'fade' ||
    animation === 'fade-slide-up' ||
    animation === 'fade-slide-down'
  );
};

export const useFadeTransition = ({
  enteringDuration,
  exitingDuration,
  entering,
  exiting,
  hide,
  show,
}: PureTransitionHookParams) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const currentAnimation = useRef<Animated.CompositeAnimation | null>(null);

  const isFadeEntering = isFadeTransition(entering);
  const isFadeExiting = isFadeTransition(exiting);

  const enterFade = () => {
    currentAnimation.current?.stop();

    const animation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: enteringDuration,
      useNativeDriver: true,
    });

    show();

    currentAnimation.current = animation;

    if (isFadeEntering) {
      animation.start(() => (currentAnimation.current = null));
    } else {
      currentAnimation.current = null;
      fadeAnim.setValue(1);
    }
  };

  const exitFade = () => {
    currentAnimation.current?.stop();
    const animation = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: exitingDuration,
      useNativeDriver: true,
    });

    currentAnimation.current = animation;

    if (isFadeExiting) {
      animation.start(() => {
        hide();
        currentAnimation.current = null;
      });
    } else {
      fadeAnim.setValue(0);
      currentAnimation.current = null;
      setTimeout(hide, exitingDuration);
    }
  };

  return {
    fadeAnim: isFadeEntering || isFadeExiting ? fadeAnim : 1,
    enterFade,
    exitFade,
  };
};
