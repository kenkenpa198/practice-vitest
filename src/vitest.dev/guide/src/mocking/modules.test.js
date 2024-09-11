import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Client } from "pg";
import { failure, success } from "./handlers.js";

/**
 * # Modules
 *
 * 他のコードで呼び出されるサードパーティライブラリや自作関数を監視し、
 * 引数をテストしたり、出力したり、その実装を再宣言したりすることができる。
 *
 * - `vi.mock()`
 *   - 指定されたパスからインポートされたすべてのモジュールを別のモジュールに置き換える。
 *   - モジュールの元の実装はモックで上書きされ、テスト中にモジュールの依存関係や動作を制御できる。
 *   - https://vitest.dev/api/vi.html#vi-mock
 *
 * テストコードがモジュールのモックをインポートした際、次の原則が適用される。
 *
 * - すべての配列が空になる。
 * - すべての基本型と collections は同じままになる。
 * - すべてのオブジェクトが deeply cloned される。
 * - クラスのすべてのインスタンスとそのプロトタイプが deeply cloned される。
 *
 * @see https://vitest.dev/guide/mocking.html#modules
 */
const note = "";

/**
 * /**
 * データベースから `todos` テーブルの内容を取得する。
 *
 * - 成功時には `success()` を呼び出す。
 * - 失敗時には `failure()` を呼び出す。
 *
 * @param {*} event
 * @param {*} context
 * @returns
 */
export async function getTodos(event, context) {
  const client = new Client({
    // ...clientOptions
  });

  await client.connect();

  try {
    const result = await client.query("SELECT * FROM todos;");

    client.end();

    return success({
      message: `${result.rowCount} item(s) returned`,
      data: result.rows,
      status: true,
    });
  } catch (e) {
    console.error(e.stack);

    client.end();

    return failure({ message: e, status: false });
  }
}

/**
 * `pg` モジュールをモック化する
 *
 * - `Client` クラスのメソッド `connect`, `query`, `end` をすべてモック化
 * - `vi.fn()` を使用してモジュールの実装をモックし、テストで利用可能にする
 */
vi.mock("pg", () => {
  const Client = vi.fn();
  Client.prototype.connect = vi.fn();
  Client.prototype.query = vi.fn();
  Client.prototype.end = vi.fn();

  return { Client };
});

/**
 * `./handlers.js` のモジュールをモック化する
 *
 * - `success` と `failure` の関数を `vi.fn()` でモック化
 * - テスト中にこれらのモック関数を利用し、戻り値や呼び出し回数を検証できる
 */
vi.mock("./handlers.js", () => {
  return {
    success: vi.fn(),
    failure: vi.fn(),
  };
});

describe(`get a list of todo items`, () => {
  let client;

  // テストスイートの実行前に毎回 client をインスタンス化する
  beforeEach(() => {
    client = new Client();
  });

  // テストスイートの実行後に毎回すべてのモックを消去する
  afterEach(() => {
    vi.clearAllMocks();
  });

  /**
   * items を返す処理が成功すること
   *
   * `client.query` が正しく空の結果を返し、
   * `getTodos` 関数が `success` メソッドを正しいデータで呼び出すことを確認する。
   */
  it("should return items successfully", async () => {
    // `client.query` のモックをセットアップ
    // query メソッドが空の結果を返すようにする
    // mockResolvedValueOnce(value) は Promise.resolve(value) と同じ動作を模倣する
    client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });

    // テスト対象の getTodos を実行する
    await getTodos();

    // client の各メソッドがそれぞれ想定回数と想定のクエリを持って呼び出されたこと
    expect(client.connect).toBeCalledTimes(1);
    expect(client.query).toBeCalledWith("SELECT * FROM todos;");
    expect(client.end).toBeCalledTimes(1);

    // success メソッドが想定の引数で呼び出されたこと
    expect(success).toBeCalledWith({
      message: "0 item(s) returned",
      data: [],
      status: true,
    });
  });

  /**
   * 例外を返す処理が成功すること
   *
   * `client.query` が例外を返した場合、
   * `getTodos` 関数が `failure` メソッドを正しいデータで呼び出すことを確認する。
   */
  it("should throw an error", async () => {
    // `client.query` のモックをセットアップ
    // query メソッドがメッセージを伴う例外を返すようにする
    // mockRejectedValueOnce(value) は Promise.reject(value) と同じ動作を模倣する
    const mError = new Error("Unable to retrieve rows");
    client.query.mockRejectedValueOnce(mError);

    // テスト対象の getTodos を実行する
    await getTodos();

    // client の各メソッドがそれぞれ想定回数と想定のクエリを持って呼び出されたこと
    expect(client.connect).toBeCalledTimes(1);
    expect(client.query).toBeCalledWith("SELECT * FROM todos;");
    expect(client.end).toBeCalledTimes(1);

    // failure メソッドが想定の例外を持って呼び出されたこと
    expect(failure).toBeCalledWith({ message: mError, status: false });
  });
});
