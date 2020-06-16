import { assertStrictEquals, assertThrows } from "https://deno.land/std/testing/asserts.ts";
import { Maybe, MaybeType, some, none } from "../../models/maybe.ts";

const MAYBE_STRING = "🔥";
const MAYBE_NUMBER = 1776;

const SOME_TESTS = () => {
  const maybeGetString = (): Maybe<string> => some(MAYBE_STRING);
  const maybeGetNumber = (): Maybe<number> => some(MAYBE_NUMBER);

  Deno.test("[Some][unwrap] can get underlying values from a maybe", () => {
    const str = maybeGetString();
    const num = maybeGetNumber();
    if (str.type === MaybeType.Some && num.type === MaybeType.Some) {
      assertStrictEquals(str.unwrap(), MAYBE_STRING);
      assertStrictEquals(num.unwrap(), MAYBE_NUMBER);
    } else {
      throw new Error("Expected Some for both number and string");
    }
  });

  Deno.test("[Some][forceUnwrap] can get underlying values from a maybe (without error)", () => {
    assertStrictEquals(maybeGetString().forceUnwrap(), MAYBE_STRING);
    assertStrictEquals(maybeGetNumber().forceUnwrap(), MAYBE_NUMBER);
  });

  Deno.test("[Some][map] can manipulate value", () => {
    assertStrictEquals(
      maybeGetString().map((s) => s + "👍").forceUnwrap(),
      MAYBE_STRING + "👍",
    );
    assertStrictEquals(
      maybeGetNumber().map((n) => n + 100).forceUnwrap(),
      MAYBE_NUMBER + 100,
    );
  });

  Deno.test("[Some][flatMap] can manipulate maybe", () => {
    assertStrictEquals(maybeGetString().flatMap(() => none), none);
  });

  Deno.test("[Some][ifSome] calls callback with value", () => {
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
};

const NONE_TESTS = () => {
  const maybeGetString = (): Maybe<string> => none;
  const maybeGetNumber = (): Maybe<number> => none;

  Deno.test("[None][unwrap] Does not have an unwrrap function", () => {
    const str = maybeGetString();
    const num = maybeGetNumber();
    // @ts-expect-error
    assertStrictEquals(str.unwrap, undefined);
    // @ts-expect-error
    assertStrictEquals(num.unwrap, undefined);
  });

  Deno.test("[None][forceUnwrap] will throw an error when called", () => {
    assertThrows(() => maybeGetString().forceUnwrap());
    assertThrows(() => maybeGetNumber().forceUnwrap());
  });

  Deno.test("[None][map] does not call callback", () => {
    let calls = 0;
    const callback = () => calls++;
    maybeGetString().map(callback);
    maybeGetNumber().map(callback);

    assertStrictEquals(calls, 0);
  });

  Deno.test("[None][flatMap] does not call callback", () => {
    let calls = 0;
    const callback = () => some(calls++);
    maybeGetString().flatMap(callback);
    maybeGetNumber().flatMap(callback);

    assertStrictEquals(calls, 0);
  });

  Deno.test("[None][ifSome] does not call callback", () => {
    let calls = 0;
    const callback = () => calls++;
    maybeGetString().ifSome(callback);

    assertStrictEquals(calls, 0);
  });
};

SOME_TESTS();
NONE_TESTS();
