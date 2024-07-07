import React from 'react';

import OverlayProvider from './components/OverlayProvider';
import MainScreen from './screens/MainScreen';

const App = () => {
  return (
    <OverlayProvider>
      <MainScreen />
    </OverlayProvider>
  );
};
export default App;
