import React from 'react';

import { createPureOverlay } from 'react-native-pure-overlay';
import DefaultModal from './components/DefaultModal';
import { SampleBottomSheet } from './components/SampleBottomSheet';
import type { ProjectOverlayPropList } from './screens/MainScreen';
import MainScreen from './screens/MainScreen';

const PureOverlay = createPureOverlay<ProjectOverlayPropList>();

const App = () => {
  return (
    <PureOverlay.Provider>
      <MainScreen />
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
export default App;
