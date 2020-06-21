import { parse } from "https://deno.land/std/flags/mod.ts";
import { Corners, assertValidCorners, from } from "./models/corners.ts";
import { Maybe, MaybeType, some, none } from './models/maybe.ts'

const tail = <T>(arr: T[]): Maybe<T> => {
  const t = arr[arr.length - 1];
  return t === undefined ? none : some(t);
}
const main = async () => {
  try {
    const { _: corners } = parse(Deno.args);
    assertValidCorners(corners);

    let loop = true
    const squares: Corners[] = [corners]
    while (loop) {
      loop = false
      tail(squares).flatMap(from).ifSome(next => {
        loop = true
        squares.push(next)
      })
    }
    console.log('diffs', squares)
  } catch (e) {
    console.error(e?.message ?? "There was an unknown error");
  }
};

main();
