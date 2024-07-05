import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface SampleBottomSheetProps {
  title?: string;
  content?: React.ReactNode;
  onPressClose?: () => void;
  buttonLabel?: string;
  onPressButton?: () => void;
}

export const SampleBottomSheet = ({
  title,
  content,
  onPressClose,
  buttonLabel,
  onPressButton,
}: SampleBottomSheetProps) => {
  return (
    <View style={{ width: '100%' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{title}</Text>
        <TouchableOpacity onPress={onPressClose}>
          <Text>close</Text>
        </TouchableOpacity>
      </View>
      {React.isValidElement(content) ? content : <Text>{content}</Text>}

      <TouchableOpacity onPress={onPressButton}>
        <Text>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};
