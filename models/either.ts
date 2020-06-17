enum EitherType {
  Left = "LEFT",
  Right = "RIGHT",
}

export type Left<T> = {
  _tag: EitherType.Left;
  left: T;
};

export type Right<T> = {
  _tag: EitherType.Right;
  right: T;
};

export type Either<E, T> = Left<E> | Right<T>;

export const isLeft = <T>(either: Either<T, unknown>): either is Left<T> =>
  either._tag === EitherType.Left;
export const isRight = <T>(either: Either<unknown, T>): either is Right<T> =>
  !isLeft(either);

export const getLeft = <T>({ left }: Left<T>) => left;
export const getRight = <T>({ right }: Right<T>) => right;

export const left = <T>(left: T): Left<T> => ({
  _tag: EitherType.Left,
  left,
});
export const right = <T>(right: T): Right<T> => ({
  _tag: EitherType.Right,
  right,
});

export const tryCatch = <E, T>(
  fn: () => T,
  onError: (e: unknown) => E,
): Either<E, T> => {
  try {
    return right(fn());
  } catch (e) {
    return left(onError(e));
  }
};
