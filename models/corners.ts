import {
  Either,
  isLeft,
  getLeft,
  getRight,
  right,
  left,
  Right,
} from "./either.ts";
export type Corner = number;
export type Corners = [Corner, Corner, Corner, Corner];

type RawArg = string | number;
type RawInput = RawArg[];

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
