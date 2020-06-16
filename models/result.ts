import { Maybe, None, Some, some, none, isSome } from "./maybe.ts";

export type Result<T, U = unknown> = [Maybe<T>, Maybe<U>];
export type Left<T extends Result<unknown>> = T extends Result<infer U> ? U
  : never;
export type Right<T extends Result<unknown>> = T extends
  Result<unknown, infer U> ? U : never;
export type LeftResult<T extends Result<unknown>> = [Some<Left<T>>, None];
export type RightResult<T extends Result<unknown>> = [None, Some<Right<T>>];

export const left = <T>(value: T): Result<T, None> => [some(value), none];
export const right = <T>(value: T): Result<None, T> => [none, some(value)];

export const isLeft = <T extends Result<unknown>>(
  result: T,
): result is LeftResult<T> => isSome(result[0]);

export const getLeft = <T extends Result<unknown>>([value]: T) =>
  value as Maybe<Left<T>>;
export const getRight = <T extends Result<unknown>>([, value]: T) =>
  value as Maybe<Right<T>>;
