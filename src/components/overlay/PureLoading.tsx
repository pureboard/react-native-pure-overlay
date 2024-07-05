import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import OverlayBackground from '../shared/OverlayBackground';

import { useSetPureLoadingHandler } from '../../providers/Provider';
import type { OverlayPropList } from '../../types/services/common/OverlayParamList';
import type { PureLoadingProps } from '../../types/services/loading/PureLoadingProps';

const DefaultSpinner = () => <ActivityIndicator color={'white'} />;

export const getPureLoading = <PropList extends OverlayPropList>() => {
  const PureLoading = <Id extends keyof PropList>({
    Component = DefaultSpinner,
    overlayId,
  }: {
    Component?: React.ComponentType<any>;
    overlayId: Id;
  }) => {
    type OverlayProps = PureLoadingProps<PropList[Id]>;

    const [overlayProps, setOverlayProps] = useState<OverlayProps | null>(null);
    const setLoadingHandler = useSetPureLoadingHandler();

    const showLoading = useCallback(
      (props: OverlayProps) => setOverlayProps({ ...props }),
      []
    );

    const hideLoading = useCallback(() => setOverlayProps(null), []);

    useEffect(() => {
      setLoadingHandler({ showLoading, hideLoading }, overlayId);
    }, []);

    return overlayProps ? (
      <OverlayBackground opacity={overlayProps?.backgroundOpacity}>
        <Component {...overlayProps} />
      </OverlayBackground>
    ) : null;
  };
  return PureLoading;
};
