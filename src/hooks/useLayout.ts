import { useState } from 'react';
import { type LayoutChangeEvent, type LayoutRectangle } from 'react-native';

export const useLayout = () => {
  const [layout, setLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onLayout = (e: LayoutChangeEvent) => setLayout(e.nativeEvent.layout);

  return {
    onLayout,
    ...layout,
  };
};
