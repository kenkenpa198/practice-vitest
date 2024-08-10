/**
 * Fizz Buzz を評価する関数
 *
 * 3 で割り切れる場合は `Fizz!` を返す。
 * 5 で割り切れる場合は `Buzz!` を返す。
 * 3 または 5 で割り切れる場合は `Fizz Buzz!!` を返す。
 * 3 または 5 で割り切れない場合は `Not FizzBuzz.` を返す。
 *
 * @param {number} num - 評価対象の数値
 * @returns {string} - 評価結果の文字列
 */
const fizzBuzz = (num) => {
  if (num % 3 === 0 && num % 5 === 0) {
    return 'Fizz Buzz!!';
  }
  if (num % 3 === 0) {
    return 'Fizz!';
  }
  if (num % 5 === 0) {
    return 'Buzz!';
  }
  return 'Not FizzBuzz.';
};

export { fizzBuzz };
