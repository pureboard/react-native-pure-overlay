import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import type { DefaultModalProps } from '../components/DefaultModal';
import type { SampleBottomSheetProps } from '../components/SampleBottomSheet';
import { useDefaultModal } from '../hooks/useDefaultModal';
import { useLoading } from '../hooks/useLoading';
import { useSampleBottomSheet } from '../hooks/useSampleBottomSheet';

export type ProjectOverlayPropList = {
  default: DefaultModalProps;
  sample: SampleBottomSheetProps;
  loading: {};
};

const MainScreen = () => {
  const { openBottomSheet, openDeferredBottomSheet, closeBottomSheet } =
    useSampleBottomSheet();

  const { openModal, openDeferredModal, closeModal } = useDefaultModal();

  const { showLoading, hideLoading } = useLoading();

  const openDefaultModal = () => {
    openModal({
      title: 'Hello, PureModal!',
      content: 'nice to meet you!',
      mainButtonLabel: 'confirm',
      onPressMainButton: closeModal,
    });
  };

  const openDefaultDeferredModal = async () => {
    const action = await openDeferredModal({
      title: 'Hello, PureDeferredModal!',
      content: 'nice to meet you!',
      mainButtonLabel: 'confirm',
      onPressMainButton: closeModal,
      subButtonLabel: 'cancel',
      onPressSubButton: closeModal,
      onPressBackDrop: closeModal,
    });

    Alert.alert(action);
  };

  const openDefaultDeferredModalWithCustomContent = async () => {
    const action = await openDeferredModal<{ action: 'call' }>((d) => {
      return {
        title: 'Hello, PureDeferredModal!',
        content: (
          <TouchableOpacity
            onPress={() => {
              d.resolve({ action: 'call' });
              closeModal();
            }}
          >
            <Text>Make Call!</Text>
          </TouchableOpacity>
        ),
        mainButtonLabel: 'confirm',
        onPressMainButton: closeModal,
        subButtonLabel: 'cancel',
        onPressSubButton: closeModal,
        onBackdropPress: closeModal,
      };
    });

    Alert.alert(JSON.stringify(action));
  };

  const openSampleBottomSheet = () => {
    openBottomSheet({
      title: 'Hello, Pure!',
      onPressBackDrop: closeBottomSheet,
      onPressClose: closeBottomSheet,
      content: 'this is normal bottom sheet',
    });
  };

  const openSampleDeferredBottomSheet = async () => {
    const action = await openDeferredBottomSheet({
      title: 'Hello, PureDeferredBottomSheet!',
      onPressBackDrop: closeBottomSheet,
      onPressBackButton: closeBottomSheet,
      content: (
        <View>
          <Text>this is</Text>
          <Text style={{ color: 'green' }}>Deferred Bottom Sheet!</Text>
          <Text>Coooooooooool</Text>
          <Text>Coooooooooool</Text>
          <Text>Coooooooooool</Text>
          <Text>Coooooooooool</Text>
          <Text>Coooooooooool</Text>
          <Text>Coooooooooool</Text>
          <Text>Coooooooooool</Text>
          <Text>Coooooooooool</Text>
          <Text>Coooooooooool</Text>
          <Text>Coooooooooool</Text>
        </View>
      ),
      buttonLabel: 'resolve!',
      onPressButton: closeBottomSheet,
      onPressClose: closeBottomSheet,
    });

    Alert.alert(action);
  };

  const handleLoading = () => {
    showLoading();
    setTimeout(hideLoading, 5000);
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

      <TouchableOpacity onPress={openSampleBottomSheet} style={styles.button}>
        <Text>Hello, PureBottomSheet!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openSampleDeferredBottomSheet}
        style={styles.button}
      >
        <Text>Hello, PureDeferredBottomSheet!</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLoading} style={styles.button}>
        <Text>Hello, PureLoading!</Text>
      </TouchableOpacity>
    </View>
  );
};
export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
});
