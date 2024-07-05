import React from 'react';
import { Animated } from 'react-native';
import { type TransitionType } from './PureTransition';
import { type PureTransitionHookParams } from './usePureTransition';

const isSlideDownTransition = (animation?: TransitionType) => {
  return animation === 'slide-down' || animation === 'fade-slide-down';
};

const isSlideUpTransition = (animation?: TransitionType) => {
  return animation === 'slide-up' || animation === 'fade-slide-up';
};

const isSlideTransition = (animation?: TransitionType) => {
  return isSlideDownTransition(animation) || isSlideUpTransition(animation);
};

export const useSlideTransition = ({
  enteringDuration,
  exitingDuration,
  entering,
  exiting,
  hide,
  show,
  slideOffset = 1000,
}: PureTransitionHookParams) => {
  const positionY = React.useRef(new Animated.Value(0)).current;

  const isSlideEntering = isSlideTransition(entering);
  const isSlideExiting = isSlideTransition(exiting);

  const currentAnimation = React.useRef<Animated.CompositeAnimation | null>(
    null
  );

  const enterSlide = () => {
    currentAnimation.current?.stop();
    const animation = Animated.timing(positionY, {
      toValue: 1,
      duration: enteringDuration,
      useNativeDriver: true,
    });

    show();

    currentAnimation.current = animation;

    if (isSlideEntering) {
      animation.start(() => (currentAnimation.current = null));
    } else {
      currentAnimation.current = null;
      positionY.setValue(1);
    }
  };

  const exitSlide = () => {
    currentAnimation.current?.stop();
    const animation = Animated.timing(positionY, {
      toValue: 0,
      duration: exitingDuration,
      useNativeDriver: true,
    });

    currentAnimation.current = animation;

    if (isSlideExiting) {
      animation.start(() => {
        hide();
        currentAnimation.current = null;
      });
    } else {
      positionY.setValue(0);
      currentAnimation.current = null;
      setTimeout(hide, exitingDuration);
    }
  };

  const interpolateY = positionY.interpolate({
    inputRange: [0, 1],
    outputRange: [
      isSlideDownTransition(entering) || isSlideDownTransition(exiting)
        ? slideOffset
        : -slideOffset,
      0,
    ],
    extrapolate: 'clamp',
  });

  const slideStyle = {
    transform: [
      {
        translateY: isSlideEntering || isSlideExiting ? interpolateY : 0,
      },
    ],
  };

  return {
    slideStyle,
    enterSlide,
    exitSlide,
  };
};
