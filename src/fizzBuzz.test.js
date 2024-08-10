import { expect, test } from 'vitest';
import { fizzBuzz } from './fizzBuzz';

test('3 で割り切れる場合は `Fizz!` を返す', () => {
  expect(fizzBuzz(3)).toBe('Fizz!');
});

test('5 で割り切れる場合は `Buzz!` を返す', () => {
  expect(fizzBuzz(5)).toBe('Buzz!');
});

test('3 または 5 で割り切れる場合は `Fizz Buzz!!` を返す', () => {
  expect(fizzBuzz(15)).toBe('Fizz Buzz!!');
});

test('3 または 5 で割り切れない場合は `Not FizzBuzz.` を返す', () => {
  expect(fizzBuzz(2)).toBe('Not FizzBuzz.');
});
