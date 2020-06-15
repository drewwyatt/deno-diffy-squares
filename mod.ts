import { parse } from "https://deno.land/std/flags/mod.ts";
import { assertValidCorners } from "./models/corners.ts";

const main = async () => {
  try {
    const { _: corners } = parse(Deno.args);
    assertValidCorners(corners);
  } catch (e) {
    console.error(e?.message ?? "There was an unknown error");
  }
};

main();
