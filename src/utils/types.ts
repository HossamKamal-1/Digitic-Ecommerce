export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;

export type NonEmptyArray<T> = [T, ...T[]];
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
export type AtLeastOneRequired<
  T,
  U = { [K in keyof T]-?: { [P in K]: T[K] } }
> = Partial<T> & U[keyof U];
