export interface Deferred<T> {
  get state(): 'pending' | 'fulfilled' | 'rejected';
  promise: Promise<T>;
  resolve: (value?: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

export const deferred = <T>(): Deferred<T> => {
  let state = 'pending';
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = (value: T | PromiseLike<T>) => {
      state = 'fulfilled';
      res(value);
    };
    reject = (reason?: unknown) => {
      state = 'rejected';
      rej(reason);
    };
  });

  return {
    get state() {
      return state;
    },
    promise,
    resolve,
    reject,
  } as Deferred<T>;
};
