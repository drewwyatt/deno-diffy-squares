import { None, Some } from "./maybe-impl/mod.ts";

export type Maybe<T> = Some<T> | None<T>;
export { MaybeType, None, Some, none, some } from "./maybe-impl/mod.ts";
