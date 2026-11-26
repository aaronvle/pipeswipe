import { expect, test } from "vitest";
import { readAppName } from "../lib/env";

test("uses the default name when the public app name is missing", () => {
  expect(readAppName({})).toBe("pipeswipe");
  expect(readAppName({ NEXT_PUBLIC_APP_NAME: "   " })).toBe("pipeswipe");
});

test("reads a public app name from the environment", () => {
  expect(readAppName({ NEXT_PUBLIC_APP_NAME: "demo" })).toBe("demo");
});
