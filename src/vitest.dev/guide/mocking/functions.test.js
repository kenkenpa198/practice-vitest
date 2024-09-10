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
 *   - 特定の関数が呼び出されたかどうか / どの引数が渡されたかどうか のみを検証する際に使用する。
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
 * @see https://vitest.dev/guide/mocking.html#functions
 */
const note = "";
