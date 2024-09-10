import { assert, describe, it } from "vitest";

/**
 * Selecting Suites and Tests to Run
 *
 * @see https://vitest.dev/guide/filtering.html#selecting-suites-and-tests-to-run
 */

// Only this suite (and others marked with only) are run
describe.only("suite", () => {
  it("test", () => {
    assert.equal(Math.sqrt(4), 2);
  });
});

describe("another suite", () => {
  it("skipped test", () => {
    // Test skipped, as tests are running in Only mode
    assert.equal(Math.sqrt(4), 3);
  });

  it.only("test", () => {
    // Only this test (and others marked with only) are run
    assert.equal(Math.sqrt(4), 2);
  });
});
