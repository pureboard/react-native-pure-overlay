import React, { useCallback, useEffect, useState } from 'react';

import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useLayout } from '../../hooks/useLayout';
import { useSetPureBottomSheetHandler } from '../../providers/Provider';

import {
  Fade,
  PureTransition,
  SlideDown,
} from '@pureboard/react-native-pure-transition';
import type { PureBottomSheetProps } from '../../types/services/bottomSheet/PureBottomSheetProps';
import type { PureBottomSheetResolveType } from '../../types/services/bottomSheet/PureBottomSheetResolveType';
import type { OverlayPropList } from '../../types/services/common/OverlayParamList';
import type { PureOverlayProviderProps } from '../../types/services/common/PureOverlayProviderProps';
import { deferred, type Deferred } from '../../utils/deferred';
import OverlayBackground from '../shared/OverlayBackground';

export const getPureBottomSheet = <PropList extends OverlayPropList>() => {
  const PureBottomSheet = <Id extends keyof PropList>({
    Component,
    resolveKeys,
    overlayId,
  }: PureOverlayProviderProps<PropList, Id>) => {
    type OverlayProps = PureBottomSheetProps<PropList[Id]>;

    const [overlayProps, setOverlayProps] = useState<OverlayProps | null>(null);

    const setBottomSheetHandler = useSetPureBottomSheetHandler();

    const openBottomSheet = useCallback(
      (props: OverlayProps) => setOverlayProps(props),
      []
    );

    const openDeferredBottomSheet = useCallback(function <P = undefined>(
      _props:
        | OverlayProps
        | ((d: Deferred<PureBottomSheetResolveType<P>>) => OverlayProps)
    ) {
      const d = deferred<PureBottomSheetResolveType<P>>();

      const props = typeof _props === 'function' ? _props(d) : { ..._props };

      const onPressBackButton = () => {
        if (props.onPressBackButton) {
          props.onPressBackButton();
          d.resolve('pressedBackButton' as PureBottomSheetResolveType<P>);
        }
      };
      const onPressBackDrop = () => {
        if (props.onPressBackDrop) {
          props.onPressBackDrop();
          d.resolve('pressedBackDrop' as PureBottomSheetResolveType<P>);
        }
      };

      const customKeys = resolveKeys
        ? Object.keys(resolveKeys).reduce((acc, cur) => {
            if (typeof props[cur] !== 'function') {
              return acc;
            }
            return {
              ...acc,
              [cur]: () => {
                props[cur]?.();
                d.resolve(
                  resolveKeys[
                    cur as keyof typeof resolveKeys
                  ] as PureBottomSheetResolveType<P>
                );
              },
            };
          }, {})
        : {};

      setOverlayProps({
        ...props,
        onPressBackButton,
        onPressBackDrop,
        ...customKeys,
      });
      return d.promise;
    }, []);

    const closeBottomSheet = useCallback(() => setOverlayProps(null), []);

    useEffect(() => {
      setBottomSheetHandler(
        { openBottomSheet, openDeferredBottomSheet, closeBottomSheet },
        overlayId
      );
    }, []);

    const isVisible = !!overlayProps;
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const { height, onLayout } = useLayout();

    return (
      <PureTransition
        isVisible={isVisible}
        style={styles.outerTransition}
        entering={Fade.duration(300)}
        exiting={Fade.duration(300)}
      >
        <OverlayBackground
          onPressBackButton={overlayProps?.onPressBackButton}
          onPressBackDrop={overlayProps?.onPressBackDrop}
          opacity={overlayProps?.backgroundOpacity}
        />
        <PureTransition
          isVisible={isVisible}
          entering={SlideDown.duration(300)}
          exiting={SlideDown.duration(300)}
          style={[styles.innerTransition, { height: height }]}
        >
          <View
            style={[
              styles.container,
              {
                width: screenWidth,
                height: overlayProps?.fullScreen ? screenHeight : 'auto',
                borderTopLeftRadius: overlayProps?.fullScreen ? 0 : 8,
                borderTopRightRadius: overlayProps?.fullScreen ? 0 : 8,
              },
              overlayProps?.containerStyle,
            ]}
            onLayout={onLayout}
          >
            {overlayProps ? <Component {...overlayProps} /> : null}
          </View>
        </PureTransition>
      </PureTransition>
    );
  };
  return PureBottomSheet;
};

const styles = StyleSheet.create({
  outerTransition: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  innerTransition: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
  container: {
    minHeight: 200,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
});
