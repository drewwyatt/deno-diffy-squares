import { Maybe, MaybeType } from "./base.ts";

class None<ValueType> implements Maybe<MaybeType.None, ValueType> {
  public readonly type = MaybeType.None;
  unwrap: undefined;

  forceUnwrap() {
    throw new TypeError("Cannot unwrap None");
    return null as never;
  }

  map<NewValueType>(_: (a: ValueType) => NewValueType): None<NewValueType> {
    return this as unknown as None<NewValueType>;
  }

  flatMap<NewValueType>(
    _: (a: ValueType) => Maybe<MaybeType, NewValueType>,
  ) {
    return this as unknown as Maybe<MaybeType.None, NewValueType>;
  }

  ifSome(_: (v: ValueType) => unknown) {}
}

export default None;
