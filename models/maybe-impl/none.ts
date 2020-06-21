import { Maybe, MaybeType } from "./base.ts";

class None<ValueType> implements Maybe<ValueType> {
  public readonly type = MaybeType.None;

  forceUnwrap() {
    throw new TypeError("Cannot unwrap None");
    return null as never;
  }

  map<NewValueType>(_: (value: ValueType) => NewValueType) {
    return this as unknown as Maybe<NewValueType>;
  }

  flatMap<NewValueType>(
    _: (value: ValueType) => Maybe<NewValueType>,
  ) {
    return this as unknown as Maybe<NewValueType>;
  }

  ifSome(_: (v: ValueType) => unknown) {}
  ifNone(callback: () => unknown) {
    callback();
  }
}

export default None;
