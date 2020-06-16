import { None as TNone, Some as TSome } from "./maybe-impl/mod.ts";

export type Some<T> = TSome<T>;
export type None<T> = TNone<T>;
export type Maybe<T> = Some<T> | None<T>;

export { MaybeType, none, some } from "./maybe-impl/mod.ts";
