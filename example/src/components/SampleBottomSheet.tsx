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
    <View style={{ width: '100%', padding: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 18 }}>{title}</Text>
        <TouchableOpacity onPress={onPressClose}>
          <Text>close</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 12, flex: 1 }}>
        {React.isValidElement(content) ? content : <Text>{content}</Text>}
      </View>

      {buttonLabel ? (
        <TouchableOpacity
          onPress={onPressButton}
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
            borderRadius: 12,
            paddingVertical: 12,
            marginTop: 12,
            marginBottom: 24,
          }}
        >
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
            {buttonLabel}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
