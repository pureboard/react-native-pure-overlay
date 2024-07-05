import React, { useContext, useState } from 'react';
import { usePreservedCallback } from '../hooks/usePreservedCallback';
import type { PureBottomSheetInterface } from '../types/services/bottomSheet/PureBottomSheetInterface';
import type { OverlayPropList } from '../types/services/common/OverlayParamList';
import type { PureLoadingInterface } from '../types/services/loading/PureLoadingInterface';
import type { PureModalInterface } from '../types/services/modal/PureModalInterface';
import type { Key } from '../types/utils/Key';
import type { ValueOf } from '../types/utils/valueOf';

export interface ProviderProps {
  children: React.ReactNode;
}

const Context = React.createContext<any>(null);

const defaultModalHandler = {
  openModal: () => {},
  openDeferredModal: () => {},
  closeModal: () => {},
};

const defaultBottomSheetHandler = {
  openBottomSheet: () => {},
  openDeferredBottomSheet: () => {},
  closeBottomSheet: () => {},
};

const defaultLoadingHandler = {
  showLoading: () => {},
  hideLoading: () => {},
};

export const useSetPureModalHandler = () => {
  const { setModalHandler } = useContext(Context);
  return setModalHandler;
};
export const usePureModal = <
  PropList extends OverlayPropList,
  K extends keyof PropList,
>(
  overlayId: K
) => {
  const { getModalHandler } = useContext(Context);
  return getModalHandler(overlayId) as PureModalInterface<PropList[K]>;
};

export const useSetPureBottomSheetHandler = () => {
  const { setBottomSheetHandler } = useContext(Context);
  return setBottomSheetHandler;
};
export const usePureBottomSheet = <
  PropList extends OverlayPropList,
  K extends keyof PropList,
>(
  overlayId: K
) => {
  const { getBottomSheetHandler } = useContext(Context);
  return getBottomSheetHandler(overlayId) as PureBottomSheetInterface<
    PropList[K]
  >;
};

export const useSetPureLoadingHandler = () => {
  const { setLoadingHandler } = useContext(Context);
  return setLoadingHandler;
};
export const usePureLoading = <
  PropList extends OverlayPropList,
  K extends keyof PropList,
>(
  overlayId: K
) => {
  const { getLoadingHandler } = useContext(Context);
  return getLoadingHandler(overlayId) as PureLoadingInterface<PropList[K]>;
};

export const Provider = <PropList extends OverlayPropList>({
  children,
}: ProviderProps) => {
  const [pureOverlayHandlers, setPureOverlayHandlers] = useState<
    Partial<
      Record<
        Key,
        | PureModalInterface<ValueOf<PropList>>
        | PureBottomSheetInterface<ValueOf<PropList>>
        | PureLoadingInterface<ValueOf<PropList>>
      >
    >
  >({});

  const setModalHandler = usePreservedCallback(
    <K extends keyof PropList>(
      handler: PureModalInterface<PropList[K]>,
      overlayId: K
    ) => {
      setPureOverlayHandlers((prev) => ({
        ...prev,
        [overlayId]: handler as PureModalInterface<ValueOf<PropList>>,
      }));
    }
  );

  const getModalHandler = usePreservedCallback(
    (overlayId: keyof PropList) =>
      pureOverlayHandlers[overlayId] ?? defaultModalHandler
  );

  const setBottomSheetHandler = usePreservedCallback(
    <K extends keyof PropList>(
      handler: PureBottomSheetInterface<PropList[K]>,
      overlayId: K
    ) => {
      setPureOverlayHandlers((prev) => ({
        ...prev,
        [overlayId]: handler as PureBottomSheetInterface<ValueOf<PropList>>,
      }));
    }
  );

  const getBottomSheetHandler = usePreservedCallback(
    (overlayId: keyof PropList) =>
      pureOverlayHandlers[overlayId] ?? defaultBottomSheetHandler
  );

  const setLoadingHandler = usePreservedCallback(
    <K extends keyof PropList>(
      handler: PureLoadingInterface<PropList[K]>,
      overlayId: K
    ) => {
      setPureOverlayHandlers((prev) => ({
        ...prev,
        [overlayId]: handler as PureLoadingInterface<ValueOf<PropList>>,
      }));
    }
  );

  const getLoadingHandler = usePreservedCallback(
    (overlayId: keyof PropList) =>
      pureOverlayHandlers[overlayId] ?? defaultLoadingHandler
  );

  return (
    <Context.Provider
      value={{
        setModalHandler,
        getModalHandler,
        getBottomSheetHandler,
        setBottomSheetHandler,
        setLoadingHandler,
        getLoadingHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};
