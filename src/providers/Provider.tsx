import React, { Children, useContext, useState } from 'react';
import { useIsFirstRender } from '../hooks/useIsFirstRender';
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

const pureOverlayComponentNames = [
  'PureModal',
  'PureBottomSheet',
  'PureLoading',
];

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
  ResolveKeys extends any = undefined,
>(
  overlayId: K
) => {
  const { getModalHandler } = useContext(Context);
  return getModalHandler(overlayId) as PureModalInterface<
    PropList[K],
    ResolveKeys
  >;
};

export const useSetPureBottomSheetHandler = () => {
  const { setBottomSheetHandler } = useContext(Context);
  return setBottomSheetHandler;
};
export const usePureBottomSheet = <
  PropList extends OverlayPropList,
  K extends keyof PropList,
  ResolveKeys extends any = undefined,
>(
  overlayId: K
) => {
  const { getBottomSheetHandler } = useContext(Context);
  return getBottomSheetHandler(overlayId) as PureBottomSheetInterface<
    PropList[K],
    ResolveKeys
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
  const isFirstRender = useIsFirstRender();
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

  // PureOverlay components 내부에서 useEffect를 통해 Handler를 할당하기 때문에
  // Handler를 모두 할당한 후에 children을 렌더링해주기 위해 최초 렌더시에는 PureOverlay components만 렌더링 해줌
  const renderingChildren = Children.toArray(children)
    .filter(
      (it) =>
        !isFirstRender ||
        pureOverlayComponentNames.includes(
          (it as { type: { name: string } })?.type?.name
        )
    )
    .map((it) => (
      <React.Fragment key={(it as { type: { name: string } })?.type?.name}>
        {it}
      </React.Fragment>
    ));

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
      {renderingChildren}
    </Context.Provider>
  );
};
