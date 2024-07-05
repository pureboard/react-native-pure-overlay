import React, { useState } from 'react';
import { Animated, type StyleProp, type ViewStyle } from 'react-native';
import { useIsFirstRender } from '../../../hooks/useIsFirstRender';
import { usePureTransition } from './usePureTransition';

export type TransitionType =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'fade-slide-up'
  | 'fade-slide-down';

interface PureTransitionProps {
  isVisible: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  enteringDuration?: number;
  exitingDuration?: number;
  entering?: TransitionType;
  exiting?: TransitionType;
  enteringDelay?: number;
  exitingDelay?: number;
  slideOffset?: number;
}

const Transition = ({
  isVisible,
  children,
  entering,
  exiting,
  duration,
  enteringDuration = entering ? duration || 300 : 0,
  exitingDuration = exiting ? duration || 300 : 0,
  style,
  enteringDelay = 0,
  exitingDelay = 0,
  slideOffset,
}: PureTransitionProps) => {
  const [childrenVisible, setChildrenVisible] = useState(isVisible);
  const isFirstRender = useIsFirstRender();

  const { fadeAnim, slideStyle, enter, exit } = usePureTransition({
    entering,
    exiting,
    hide: () => setChildrenVisible(false),
    show: () => setChildrenVisible(true),
    enteringDuration,
    exitingDuration,
    enteringDelay,
    exitingDelay,
    slideOffset,
  });

  const [prevIsVisibleProp, setPrevIsVisibleProp] = useState(isVisible);

  if (isFirstRender || isVisible !== prevIsVisibleProp) {
    isVisible ? enter() : exit();

    setPrevIsVisibleProp(isVisible);
  }

  return (
    <Animated.View
      style={[
        {
          display: childrenVisible ? 'flex' : 'none',
          opacity: fadeAnim,
        },
        slideStyle,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};
export default Transition;
