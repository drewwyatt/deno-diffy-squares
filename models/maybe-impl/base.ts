export enum MaybeType {
  Some = "SOME",
  None = "NONE",
}

export interface Maybe<Type extends MaybeType, ValueType> {
  readonly type: Type;
  unwrap: Type extends MaybeType.Some ? () => ValueType : undefined;
  forceUnwrap(): Type extends MaybeType.Some ? ValueType : never;

  map<NewValueType>(
    mapper: (a: ValueType) => NewValueType,
  ): Maybe<MaybeType, NewValueType>;
  flatMap<NewValueType>(
    mapper: (a: ValueType) => Maybe<MaybeType, NewValueType>,
  ): Maybe<MaybeType, NewValueType>;

  ifSome(callback: (value: ValueType) => unknown): void;
}
