import { useCallback, useRef } from 'react';

export const usePreservedCallback = <T extends (...args: any[]) => any>(
  callback: T
) => {
  const ref = useRef<T>();
  ref.current = callback;

  return useCallback(
    (...args: Parameters<T>): ReturnType<T> => ref?.current?.(...args),
    []
  );
};
