import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface DefaultModalProps {
  title?: string;
  content?: React.ReactNode;
  mainButtonLabel: string;
  onPressMainButton?: () => void;
  subButtonLabel?: string;
  onPressSubButton?: () => void;
  disabled?: boolean;
}

const DefaultModal = (props: DefaultModalProps) => {
  return (
    <View style={styles.background}>
      <View style={styles.modalContainer}>
        <View style={styles.titleContainer}>
          <Text>{props.title}</Text>
        </View>
        <View style={styles.contentContainer}>
          {React.isValidElement(props.content) ? (
            props.content
          ) : (
            <Text>{props.content}</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {props.onPressSubButton ? (
            <TouchableOpacity
              style={styles.button}
              onPress={props.onPressSubButton}
            >
              <Text>{props.subButtonLabel}</Text>
            </TouchableOpacity>
          ) : null}
          {props.onPressMainButton ? (
            <TouchableOpacity
              style={styles.button}
              onPress={props.onPressMainButton}
              disabled={props.disabled}
            >
              <Text>{props.mainButtonLabel}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default DefaultModal;

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
