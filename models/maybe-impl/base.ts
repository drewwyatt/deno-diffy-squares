export enum MaybeType {
  Some = "SOME",
  None = "NONE",
}

export interface Maybe<ValueType> {
  forceUnwrap(): ValueType

  map<NewValueType>(
    mapper: (value: ValueType) => NewValueType,
  ): Maybe<NewValueType>;

  flatMap<NewValueType>(
    mapper: (value: ValueType) => Maybe<NewValueType>,
  ): Maybe<NewValueType>;

  ifSome(callback: (value: ValueType) => unknown): void;
}
