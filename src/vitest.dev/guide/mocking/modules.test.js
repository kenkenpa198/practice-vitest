/**
 * # Modules
 *
 * 他のコードで呼び出されるサードパーティライブラリを監視し、
 * 引数をテストしたり、出力したり、その実装を再宣言したりすることができる。
 *
 * - `vi.mock()`
 *   - 指定されたパスからインポートされたすべてのモジュールを別のモジュールに置き換える。
 *   - https://vitest.dev/api/vi.html#vi-mock
 *
 * テストコードがモジュールのモックをインポートした際、次の原則が適用される。
 *
 * - すべての配列が空になる。
 * - すべての基本型と collections は同じままになる。
 * - すべてのオブジェクトが deeply cloned される。
 * - クラスのすべてのインスタンスとそのプロトタイプが deeply cloned される。
 *
 *
 * @see https://vitest.dev/guide/mocking.html#modules
 */
const note = "";
