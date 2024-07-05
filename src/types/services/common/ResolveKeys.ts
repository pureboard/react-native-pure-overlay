import type { OnlyFunctionProps } from '../../utils/onlyFunctionProps';

export type ResolveKeys<T extends React.ComponentProps<any>> = Partial<
  Record<keyof OnlyFunctionProps<T>, string>
>;
