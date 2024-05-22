import React, { useCallback, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { PureModalProps } from "../../types/services/modal/PureModalProps";
import OverlayBackground from "../shared/OverlayBackground";

import { useSetPureModalHanlder } from "../../providers/Provider";
import { OverlayPropList } from "../../types/services/common/OverlayParamList";
import { PureOverlayProviderProps } from "../../types/services/common/PureOverlayProviderProps";
import { PureModalResolveType } from "../../types/services/modal/PureModalResolveType";
import { Deferred, deferred } from "../../utils/deferred";

export const getPureModal = <PropList extends OverlayPropList>() => {
  const PureModal = <Id extends keyof PropList>({
    Component,
    resolveKeys,
    overlayId,
  }: PureOverlayProviderProps<PropList, Id>) => {
    type OverlayProps = PureModalProps<PropList[Id]>;

    const [overlayProps, setOverlayProps] = useState<OverlayProps | null>(null);

    const setModalHandler = useSetPureModalHanlder();

    const openModal = useCallback(
      (props: OverlayProps) => setOverlayProps(props),
      []
    );

    const openDeferredModal = useCallback(function <P = undefined>(
      _props:
        | OverlayProps
        | ((d: Deferred<PureModalResolveType<P>>) => OverlayProps)
    ) {
      const d = deferred<PureModalResolveType<P>>();

      const props = typeof _props === "function" ? _props(d) : { ..._props };

      const onBackButtonPress = () => {
        if (props.onBackButtonPress) {
          props.onBackButtonPress();
          d.resolve("pressedBackButton" as PureModalResolveType<P>);
        }
      };
      const onBackdropPress = () => {
        if (props.onBackdropPress) {
          props.onBackdropPress();
          d.resolve("pressedBackDrop" as PureModalResolveType<P>);
        }
      };

      const customKeys = resolveKeys
        ? Object.keys(resolveKeys).reduce((acc, cur) => {
            if (typeof props[cur] !== "function") {
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
        onBackButtonPress,
        onBackdropPress,
        ...customKeys,
      });
      return d.promise;
    },
    []);

    const closeModal = useCallback(() => setOverlayProps(null), []);

    useEffect(() => {
      setModalHandler({ openModal, openDeferredModal, closeModal }, overlayId);
    }, []);

    return overlayProps ? (
      <OverlayBackground
        onBackButtonPress={overlayProps?.onBackButtonPress}
        onBackDropPress={overlayProps?.onBackdropPress}
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
