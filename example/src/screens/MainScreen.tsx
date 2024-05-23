import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

import {
  usePureBottomSheet,
  usePureLoading,
  usePureModal,
} from "../../../pureOverlay";
import { CustomModalProps } from "../components/CustomModal";
import { DefaultModalProps } from "../components/DefaultModal";
import { SampleBottomSheetProps } from "../components/SampleBottomSheet";

export type ProjectOverlayPropList = {
  default: DefaultModalProps;
  custom: CustomModalProps;
  sample: SampleBottomSheetProps;
  defaultLoading: {};
  loading: ViewProps;
};

const MainScreen = () => {
  const { openModal, openDeferredModal, closeModal } = usePureModal<
    ProjectOverlayPropList,
    "default"
  >("default");
  const {
    openModal: openCustomModal,
    openDeferredModal: openCustomDeferredModal,
    closeModal: closeCustomModal,
  } = usePureModal<ProjectOverlayPropList, "custom">("custom");

  const { openBottomSheet, openDeferredBottomSheet, closeBottomSheet } =
    usePureBottomSheet<ProjectOverlayPropList, "sample">("sample");

  const { showLoading, hideLoading } = usePureLoading<
    ProjectOverlayPropList,
    "defaultLoading"
  >("defaultLoading");
  const { showLoading: showViewLoading, hideLoading: hideViewLoading } =
    usePureLoading<ProjectOverlayPropList, "loading">("loading");

  const openDefaultModal = () => {
    openModal({
      title: "Hello, PureModal!",
      content: "nice to meet you!",
      mainButtonLabel: "confirm",
      onPressMainButton: closeModal,
    });
  };

  const openDefaultDeferredModal = async () => {
    const action = await openDeferredModal((d) => {
      return {
        title: "Hello, PureDeferredModal!",
        content: "nice to meet you!",
        mainButtonLabel: "confirm",
        onPressMainButton: closeModal,
        subButtonLabel: "cancel",
        onPressSubButton: closeModal,
        onPressBackDrop: closeModal,
      };
    });

    Alert.alert(action);
  };

  const openDefaultDeferredModalWithCustomContent = async () => {
    const action = await openDeferredModal<{ action: "call" }>((d) => {
      return {
        title: "Hello, PureDeferredModal!",
        content: (
          <TouchableOpacity
            onPress={() => {
              d.resolve({ action: "call" });
              closeModal();
            }}
          >
            <Text>Make Call!</Text>
          </TouchableOpacity>
        ),
        mainButtonLabel: "confirm",
        onPressMainButton: closeModal,
        subButtonLabel: "cancel",
        onPressSubButton: closeModal,
        onPressBackDrop: closeModal,
      };
    });

    Alert.alert(JSON.stringify(action));
  };

  const openTestCustomModal = () => {
    openCustomModal({
      title: "Hello, PureModal!",
      body: "nice to meet you!",
      rightButtonLabel: "confirm",
      onPressRightButton: closeCustomModal,
      onPressBackDrop: closeCustomModal,
      onPressLeftButton: closeCustomModal,
    });
  };

  const openTestCustomDeferredModal = async () => {
    const action = await openCustomDeferredModal({
      title: "Hello, PureDeferredModal!",
      body: "nice to meet you!",
      rightButtonLabel: "confirm",
      onPressRightButton: closeCustomModal,
      leftButtonLabel: "cancel",
      onPressLeftButton: closeCustomModal,
      onPressBackDrop: closeCustomModal,
    });

    Alert.alert(action);
  };

  const openSampleBottomSheet = () => {
    openBottomSheet({
      title: "Hello, Pure!",
      onPressBackDrop: closeBottomSheet,
      onPressClose: closeBottomSheet,
      content: "this is normal bottom sheet",
    });
  };

  const openSampleDeferredBottomSheet = async () => {
    const action = await openDeferredBottomSheet({
      title: "Hello, PureDeferredBottomSheet!",
      onPressBackDrop: closeBottomSheet,
      onPressBackButton: closeBottomSheet,
      buttonLabel: "resolve!",
      onPressButton: closeBottomSheet,
    });

    Alert.alert(action);
  };

  const showDefaultLoading = () => {
    showLoading();
    setTimeout(hideLoading, 5000);
  };

  const showCustomLoading = () => {
    showViewLoading({
      style: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "green",
      },
    });
    setTimeout(hideViewLoading, 5000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDefaultModal} style={styles.button}>
        <Text>Hello, PureModal!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openDefaultDeferredModal}
        style={styles.button}
      >
        <Text>Hello, PureDeferredModal!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openDefaultDeferredModalWithCustomContent}
        style={styles.button}
      >
        <Text>Hello, PureDeferredModalWithCustomContent!</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openTestCustomModal} style={styles.button}>
        <Text>Hello, PureCustomModal!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openTestCustomDeferredModal}
        style={styles.button}
      >
        <Text>Hello, PureCustomDeferredModal!</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openSampleBottomSheet} style={styles.button}>
        <Text>Hello, PureBottomSheet!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openSampleDeferredBottomSheet}
        style={styles.button}
      >
        <Text>Hello, PureDeferredBottomSheet!</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={showDefaultLoading} style={styles.button}>
        <Text>Hello, PureDefaultLoading!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showCustomLoading} style={styles.button}>
        <Text>Hello, PureLoading!</Text>
      </TouchableOpacity>
    </View>
  );
};
export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
});
