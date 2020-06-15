enum MaybeType {
  Some = "SOME",
  None = "NONE",
}

export type Some<T> = {
  type: MaybeType.Some;
  value: T;
};

export type None = {
  type: MaybeType.None;
};

export type Maybe<T> = Some<T> | None;

export const some = <T>(value: T) => ({
  type: MaybeType.Some,
  value,
} as Some<T>);

export const none: None = { type: MaybeType.None };

export const isSome = <T>(maybe: Maybe<T>): maybe is Some<T> =>
  maybe.type === MaybeType.Some;
export const unwrap = <T>(maybe: Some<T>) => maybe.value;
export const unwrapOrDefault = <T>(maybe: Some<T>, fallback: T) =>
isSome(maybe) ? maybe.value : fallback;
export const forceUnwrap = <T>(maybe: Maybe<T>) => {
  if (isSome(maybe)) {
    return maybe.value;
  } else {
    throw new TypeError("Failed to force unwrap Maybe");
  }
};
