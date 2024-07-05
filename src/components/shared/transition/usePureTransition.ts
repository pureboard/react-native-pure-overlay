import { type TransitionType } from './PureTransition';
import { useFadeTransition } from './useFadeTransition';
import { useSlideTransition } from './useSlideTransition';

export interface PureTransitionHookParams {
  entering?: TransitionType;
  exiting?: TransitionType;
  enteringDuration?: number;
  exitingDuration?: number;
  hide: () => void;
  show: () => void;
  enteringDelay: number;
  exitingDelay: number;
  slideOffset?: number;
}

export const usePureTransition = (params: PureTransitionHookParams) => {
  const { fadeAnim, enterFade, exitFade } = useFadeTransition(params);
  const { slideStyle, enterSlide, exitSlide } = useSlideTransition(params);
  const enter = () => {
    setTimeout(() => {
      enterFade();
      enterSlide();
    }, params.enteringDelay);
  };
  const exit = () => {
    setTimeout(() => {
      exitFade();
      exitSlide();
    }, params.exitingDelay);
  };

  return { fadeAnim, slideStyle, enter, exit };
};
