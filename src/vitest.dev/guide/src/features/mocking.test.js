/**
 * Mocking
 *
 * @see https://vitest.dev/guide/features.html#mocking
 */

import { describe, expect, it, vi } from "vitest";

describe.skip("mocking", () => {
  it("sample", () => {
    // モック関数 fn を作成する
    const fn = vi.fn();

    // モック関数へ引数を渡して実行する
    fn("hello", 1);

    // モック関数であること
    expect(vi.isMockFunction(fn)).toBe(true);

    // モックが一回目に呼ばれた際 "hello", 1 が引数として渡されていたこと
    // cf. https://vitest.dev/api/mock.html#mock-calls
    expect(fn.mock.calls[0]).toEqual(["hello", 1]);

    // 引数をひとつだけ受け取り、その引数を返すモック関数を作成する
    // cf. https://vitest.dev/api/mock.html#mockimplementation
    fn.mockImplementation((arg) => arg);

    // モック関数へ引数を渡して実行する
    fn("world", 2);

    // モックが二回目に呼ばれた際 "world" が返されたこと
    // cf. https://vitest.dev/api/mock.html#mock-results
    expect(fn.mock.results[1].value).toBe("world");
  });
});
