import { Maybe, MaybeType } from "./base.ts";
import NoneImpl from "./none.ts";
import SomeImpl from "./some.ts";

export { MaybeType };
export type Some<T> = Maybe<MaybeType.Some, T>;
export type None<T = any> = Maybe<MaybeType.None, T>;

export const some = <T>(value: T): Some<T> => new SomeImpl(value);
export const none: None = new NoneImpl();
