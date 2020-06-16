import { Maybe, MaybeType } from "./base.ts";

class Some<ValueType> implements Maybe<MaybeType.Some, ValueType> {
  public readonly type = MaybeType.Some;
  constructor(private readonly value: ValueType) {}

  unwrap() {
    return this.value;
  }

  forceUnwrap() {
    return this.value;
  }

  map<NewValueType>(
    mapper: (a: ValueType) => NewValueType,
  ): Some<NewValueType> {
    return new Some(mapper(this.value));
  }

  flatMap<NewValueType>(
    mapper: (a: ValueType) => Maybe<MaybeType, NewValueType>,
  ) {
    return mapper(this.value);
  }

  ifSome(callback: (value: ValueType) => unknown) {
    callback(this.value);
  }
}

export default Some;
