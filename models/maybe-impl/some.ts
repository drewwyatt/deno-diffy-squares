import { Maybe, MaybeType } from "./base.ts";

class Some<ValueType> implements Maybe<ValueType> {
  public readonly type = MaybeType.Some;
  constructor(private readonly value: ValueType) {}

  unwrap() {
    return this.value;
  }

  forceUnwrap() {
    return this.value;
  }

  map<NewValueType>(
    mapper: (value: ValueType) => NewValueType,
  ): Maybe<NewValueType> {
    return new Some(mapper(this.value));
  }

  flatMap<NewValueType>(
    mapper: (value: ValueType) => Maybe<NewValueType>,
  ) {
    return mapper(this.value);
  }

  ifSome(callback: (value: ValueType) => unknown) {
    callback(this.value);
  }
}

export default Some;
