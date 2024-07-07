import React, { useCallback, useEffect, useState } from 'react';
import { Pressable } from 'react-native';

import OverlayBackground from '../shared/OverlayBackground';

import { useSetPureModalHandler } from '../../providers/Provider';
import type { OverlayPropList } from '../../types/services/common/OverlayParamList';
import type { PureOverlayProviderProps } from '../../types/services/common/PureOverlayProviderProps';
import type { PureModalProps } from '../../types/services/modal/PureModalProps';
import type { PureModalResolveType } from '../../types/services/modal/PureModalResolveType';
import { deferred, type Deferred } from '../../utils/deferred';

export const getPureModal = <PropList extends OverlayPropList>() => {
  const PureModal = <Id extends keyof PropList>({
    Component,
    resolveKeys,
    overlayId,
  }: PureOverlayProviderProps<PropList, Id>) => {
    type OverlayProps = PureModalProps<PropList[Id]>;

    const [overlayProps, setOverlayProps] = useState<OverlayProps | null>(null);

    const setModalHandler = useSetPureModalHandler();

    const openModal = useCallback((props: OverlayProps) => {
      setOverlayProps(props);
    }, []);

    const openDeferredModal = useCallback(function <P = undefined>(
      _props:
        | OverlayProps
        | ((d: Deferred<PureModalResolveType<P>>) => OverlayProps)
    ) {
      const d = deferred<PureModalResolveType<P>>();

      const props = typeof _props === 'function' ? _props(d) : { ..._props };

      const onPressBackButton = () => {
        if (props.onPressBackButton) {
          props.onPressBackButton();
          d.resolve('pressedBackButton' as PureModalResolveType<P>);
        }
      };
      const onPressBackDrop = () => {
        if (props.onPressBackDrop) {
          props.onPressBackDrop();
          d.resolve('pressedBackDrop' as PureModalResolveType<P>);
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
                  ] as PureModalResolveType<P>
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

    const closeModal = useCallback(() => {
      setOverlayProps(null);
    }, []);

    useEffect(() => {
      setModalHandler({ openModal, openDeferredModal, closeModal }, overlayId);
    }, []);

    return overlayProps ? (
      <OverlayBackground
        onPressBackButton={overlayProps?.onPressBackButton}
        onPressBackDrop={overlayProps?.onPressBackDrop}
        opacity={overlayProps?.backgroundOpacity}
      >
        <Pressable>
          <Component {...overlayProps} />
        </Pressable>
      </OverlayBackground>
    ) : null;
  };
  return PureModal;
};
