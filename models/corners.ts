import { Result, left, right, getLeft } from "./result.ts";
export type Corner = number;
export type Corners = [Corner, Corner, Corner, Corner];

export function assertValidCorners(
  maybe: (string | number)[],
): asserts maybe is Corners {
  if (maybe.length !== 4) {
    throw new TypeError(
      `You must specify exactly four Corners. Found: ${maybe.length}`,
    );
  }
}
