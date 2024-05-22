import React from "react";

import { View } from "react-native";
import { createPureOverlay } from "../pureOverlay";
import CustomModal from "./src/components/CustomModal";
import DefaultModal from "./src/components/DefaultModal";
import { SampleBottomSheet } from "./src/components/SampleBottomSheet";
import MainScreen, { ProjectOverlayPropList } from "./src/screens/MainScreen";

const PureOverlay = createPureOverlay<ProjectOverlayPropList>();

const App = () => {
  return (
    <PureOverlay.Provider>
      <MainScreen />
      <PureOverlay.Modal
        Component={CustomModal}
        resolveKeys={{ onPressRightButton: "pressedRightButton" }}
        overlayId={"custom"}
      />
      <PureOverlay.Modal
        Component={DefaultModal}
        resolveKeys={{
          onPressMainButton: "pressedMainButton",
          onPressSubButton: "pressedSubButton",
        }}
        overlayId={"default"}
      />
      <PureOverlay.BottomSheet
        Component={SampleBottomSheet}
        resolveKeys={{
          onPressButton: "pressedButton",
          onPressClose: "pressedCloseButton",
        }}
        overlayId={"sample"}
      />
      <PureOverlay.Loading overlayId={"defaultLoading"} />
      <PureOverlay.Loading Component={View} overlayId={"loading"} />
    </PureOverlay.Provider>
  );
};
export default App;
