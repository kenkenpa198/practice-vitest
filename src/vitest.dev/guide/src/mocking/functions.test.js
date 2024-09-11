import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * # Functions
 *
 * モック関数には「spying」と「mocking」の二種がある。
 *
 * ## spying
 *
 * 特定の関数の動作を監視 (spy) する。
 *
 * - `vi.spyOn()`
 *   - 特定の関数が呼び出されたかどうか / どの引数が渡されたかどうか を記録し、後でテストする際に使用する。
 *   - この記録・監視する行為のことを「spy」と呼ぶ。
 *   - 第一引数へ監視対象のオブジェクト、第二引数へ監視対象の関数名 (第一引数のオブジェクトに含む関数) を指定する。
 *   - https://vitest.dev/api/vi.html#vi-spyon
 *
 * ## mocking
 *
 * モック (mock) を作成する。
 *
 * - `vi.fn()`
 *   - 関数のモックを作成する。
 *   - `spyOn()` は関数の実装を変更することはできないので、実装を変更したい場合に使用する。
 *   - https://vitest.dev/api/vi.html#vi-fn
 *
 * ## spy と mock の違い
 *
 * - spy: 関数の下の実装を保持したまま、その呼び出しを監視する。
 *        関数の動作を変更せず、どのように使われたか (呼び出された回数や引数など) を記録する。
 *
 * - mock: 関数の実装そのものを変更し、テスト用の動作を定義する。
 *         元の関数を置き換え、任意の結果や挙動をテストできる。
 *
 * @see https://vitest.dev/guide/mocking.html#functions
 */
const note = "";

/**
 * messages オブジェクトからデフォルトでは最新 (最後) のメッセージを取得する関数
 *
 * @param {number} index
 * @returns 最新 (最後) のメッセージの値
 */
function getLatest(index = messages.items.length - 1) {
  return messages.items[index];
}

/**
 * テストで使用するメッセージオブジェクト。
 * getLatest 関数で最新のメッセージを取得することができる。
 */
const messages = {
  items: [
    {
      message: "Simple test message",
      from: "Testman",
    },
    {
      message: "Simple test message 2",
      from: "Testman 2",
    },
  ],
  getLatest, // getLatest 関数をオブジェクトに追加
};

describe("reading messages", () => {
  // テストスイート終了ごとにすべてのモックを初期化する
  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * スパイで最後のメッセージを取得すること
   *
   * このテストでは `vi.spyOn()` を使用して `messages` オブジェクトの `getLatest` 関数を監視する。
   *
   * - `spyOn` によって、関数の下の実装を保持しつつ、その呼び出し状況 (回数、引数など) を確認する。
   * - 途中で `mockImplementationOnce` を使って関数の実装を一時的に変更する。
   */
  it("should get the latest message with a spy", () => {
    // messages オブジェクトの getLatest 関数に対して spy を作成する
    const spy = vi.spyOn(messages, "getLatest");

    // spy が正しく getLatest 関数を監視していること
    expect(spy.getMockName()).toEqual("getLatest");

    // getLatest 関数が正しく最後のメッセージを返すこと
    expect(messages.getLatest()).toEqual(
      messages.items[messages.items.length - 1]
    );

    // spy モックが 1 回呼ばれたこと
    expect(spy).toHaveBeenCalledTimes(1);

    // getLatest を 1 度だけモック化し "access-restricted" を返す
    spy.mockImplementationOnce(() => "access-restricted");
    // "access-restricted" を返すこと
    expect(messages.getLatest()).toEqual("access-restricted");

    // spy モックが 2 回呼ばれたこと
    expect(spy).toHaveBeenCalledTimes(2);
  });

  /**
   * モックを取得すること
   *
   * このテストでは `vi.fn()` を使用して関数のモックを作成し、
   * 元の `getLatest` 関数の挙動をモック化している。
   *
   * - `mockImplementation` で元の `getLatest` の動作を模倣する。
   * - 一度だけ別の動作を指定するために `mockImplementationOnce` を使用している。
   */
  it("should get with a mock", () => {
    // vi.fn() でモックを作成する
    // 元の getLatest 関数の実装をモックとして使用する
    const mock = vi.fn().mockImplementation(getLatest);

    // モックが元の getLatest と同じように最新のメッセージを返すこと
    expect(mock()).toEqual(messages.items[messages.items.length - 1]);
    // モックが一度だけ呼ばれていること
    expect(mock).toHaveBeenCalledTimes(1);

    // 次回の呼び出し時、一度だけ "access-restricted" を返すようにする
    mock.mockImplementationOnce(() => "access-restricted");
    // "access-restricted" を返すこと
    expect(mock()).toEqual("access-restricted");
    // モックが二回呼ばれていること
    expect(mock).toHaveBeenCalledTimes(2);

    // 再び元の getLatest と同じ動作に戻り最新のメッセージを返すこと
    expect(mock()).toEqual(messages.items[messages.items.length - 1]);
    // モックが三回呼ばれていること
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
