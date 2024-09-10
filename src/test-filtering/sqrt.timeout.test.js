import { expect, test } from "vitest";
import { sum } from "./sum";

/**
 * Specifying a Timeout
 *
 * @see https://vitest.dev/guide/filtering.html#specifying-a-timeout
 */
test("should adds 1 + 2 equal 3", async () => {
  expect(sum(1, 2)).toBe(3);
}, 1000);
