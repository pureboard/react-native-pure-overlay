type FunctionProps<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : never;
};
export type OnlyFunctionProps<T> = Pick<
  FunctionProps<T>,
  {
    [K in keyof FunctionProps<T>]: FunctionProps<T>[K] extends never
      ? never
      : K;
  }[keyof FunctionProps<T>]
>;
