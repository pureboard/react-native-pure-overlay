import React from 'react';

import { createPureOverlay } from '@pureboard/react-native-pure-overlay';
import { type ProjectOverlayPropList } from '../screens/MainScreen';
import DefaultModal from './DefaultModal';
import { SampleBottomSheet } from './SampleBottomSheet';

const PureOverlay = createPureOverlay<ProjectOverlayPropList>();

const OverlayProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PureOverlay.Provider>
      {children}
      <PureOverlay.Modal
        Component={DefaultModal}
        resolveKeys={{
          onPressMainButton: 'pressedMainButton',
          onPressSubButton: 'pressedSubButton',
        }}
        overlayId={'default'}
      />
      <PureOverlay.BottomSheet
        Component={SampleBottomSheet}
        resolveKeys={{
          onPressButton: 'pressedButton',
          onPressClose: 'pressedCloseButton',
        }}
        overlayId={'sample'}
      />
      <PureOverlay.Loading overlayId={'loading'} />
    </PureOverlay.Provider>
  );
};
export default OverlayProvider;
