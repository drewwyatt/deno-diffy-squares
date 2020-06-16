import { MaybeType } from "./base.ts";
import NoneImpl from "./none.ts";
import SomeImpl from "./some.ts";

export { MaybeType };
export type Some<T> = SomeImpl<T>;
export type None<T = any> = NoneImpl<T>;

export const some = <T>(value: T): Some<T> => new SomeImpl(value);
export const none: None = new NoneImpl();
