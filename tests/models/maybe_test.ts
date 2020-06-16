import { assertStrictEquals } from "https://deno.land/std/testing/asserts.ts";
import { Maybe, MaybeType, some, none } from "../../models/maybe.ts";

let RETURN_SOME = true;
const MAYBE_STRING = "🔥";
const MAYBE_NUMBER = 1776;
const maybeGetString = (): Maybe<string> =>
  RETURN_SOME ? some(MAYBE_STRING) : none;
const maybeGetNumber = (): Maybe<number> =>
  RETURN_SOME ? some(MAYBE_NUMBER) : none;

Deno.test('[Some][unwrap] can get underlying values from a maybe', () => {
  const str = maybeGetString();
  const num = maybeGetNumber();
  if (str.type === MaybeType.Some && num.type === MaybeType.Some) {
    assertStrictEquals(str.unwrap(), MAYBE_STRING)
    assertStrictEquals(num.unwrap(), MAYBE_NUMBER)
  } else {
    throw new Error('Expected Some for both number and string')
  }
});

Deno.test('[Some][forceUnwrap] can get underlying values from a maybe (without error)', () => {
  assertStrictEquals(maybeGetString().forceUnwrap(), MAYBE_STRING)
  assertStrictEquals(some(MAYBE_NUMBER).forceUnwrap(), MAYBE_NUMBER)
});

Deno.test('[Some][map] can manipulate value', () => {
  assertStrictEquals(maybeGetString().map(s => s + '👍').forceUnwrap(), MAYBE_STRING + '👍')
  assertStrictEquals(some(MAYBE_NUMBER).map(n => n + 100).forceUnwrap(), MAYBE_NUMBER + 100)
});

Deno.test('[Some][flatMap] can manipulate maybe', () => {
  assertStrictEquals(maybeGetString().flatMap(() => none), none);
});

Deno.test('[Some][ifSome] calls callback with value', () => {
  let calls = 0;
  let arg: string;
  const callback = (value: string) => {
    arg = value;
    calls++;
  };

  maybeGetString().ifSome(callback);

  assertStrictEquals(calls, 1);
  assertStrictEquals(arg!, MAYBE_STRING);
});
