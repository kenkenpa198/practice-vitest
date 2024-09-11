import { assert, describe, expect, it, test } from "vitest";

/**
 * Skipping Suites and Tests
 *
 * @see https://vitest.dev/guide/filtering.html#skipping-suites-and-tests
 */
describe.skip("skipped suite", () => {
  it("test", () => {
    // Suite skipped, no error
    assert.equal(Math.sqrt(4), 3);
  });
});

describe("suite", () => {
  it.skip("skipped test", () => {
    // Test skipped, no error
    assert.equal(Math.sqrt(4), 3);
  });
});
