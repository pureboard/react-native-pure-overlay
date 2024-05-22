import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export interface CustomModalProps {
  title: string;
  body: string;
  rightButtonLabel: string;
  onPressRightButton: () => void;
  leftButtonLabel?: string;
  onPressLeftButton?: () => void;
}

const CustomModal = ({
  title,
  body,
  rightButtonLabel,
  onPressRightButton,
  leftButtonLabel,
  onPressLeftButton,
}: CustomModalProps) => {
  return (
    <View style={styles.background}>
      <View style={styles.modalContainer}>
        <View style={styles.titleContainer}>
          <Text>Custom Modal: {title}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text>{body}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {leftButtonLabel ? (
            <TouchableOpacity style={styles.button} onPress={onPressLeftButton}>
              <Text>{leftButtonLabel}</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={onPressRightButton}>
            <Text>{rightButtonLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  background: {
    padding: 22,
    width: '100%',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  titleContainer: {
    padding: 22,
  },
  contentContainer: {
    paddingHorizontal: 22,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 22,
    paddingHorizontal: 12,
  },
  button: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
