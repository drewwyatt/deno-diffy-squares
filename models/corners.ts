import {
  Either,
  isLeft,
  getLeft,
  right,
  left,
} from "./either.ts";
import { Maybe, some, none } from './maybe.ts'

export type Corner = number;
export type Corners = readonly [Corner, Corner, Corner, Corner];

type RawArg = string | number;
type RawInput = readonly RawArg[];

const toEither = (arg: RawArg): Either<string, number> =>
  Number.isNaN(Number(arg)) ? left(arg as string) : right(arg as number);

export function assertValidCorners(
  input: RawInput,
): asserts input is Corners {
  const parsed = input.map(toEither);
  const errors = parsed.filter(isLeft);

  if (errors.length) {
    throw new TypeError(
      `All corner inputs must be numbers. Found: "${getLeft(errors[0])}"`,
    );
  }

  if (parsed.length !== 4) {
    throw new TypeError(
      `You must specify exactly four Corners. Found: ${parsed.length}`,
    );
  }
}

/**
 * Returns None if all new corners are 0, otherwise Some<Corners>
 */
export const from = ([a, b, c, d]: Corners): Maybe<Corners> => [a, b, c, d].every(c => c === 0) ? none : some(
    [a - b, b - c, c - d, d - a].map(Math.abs) as [number, number, number, number]
  )
