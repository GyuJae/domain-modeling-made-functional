import { describe, expect, it } from 'vitest';
import { type Option, none, some, fromNullable } from 'fp-ts/Option';
import { type Either, tryCatch } from 'fp-ts/Either';
import * as E from 'fp-ts/Either';
import type { IO } from 'fp-ts/IO';

describe('Eq', () => {
  it('Option', () => {
    function findIndex<A>(as: Iterable<A>, predicate: (a: A) => boolean): Option<number> {
      let index: number = 0;
      let found: boolean = false;
      for (const a of as) {
        if (predicate(a)) {
          found = true;
          break;
        }
        index++;
      }
      return found ? some(index) : none;
    }

    expect(findIndex(Array.of(1, 2, 3), (num: number) => num === 2)).toStrictEqual(some(1));
    expect(findIndex(Array.of(1, 2, 3), (num: number) => num === 4)).toStrictEqual(none);
  });

  it('undefined and null', () => {
    function find<A>(as: Iterable<A>, predicate: (a: A) => boolean): Option<A> {
      let item: A | null = null;
      for (const a of as) {
        if (predicate(a)) {
          item = a;
          break;
        }
      }
      return fromNullable(item);
    }

    expect(find(Array.of(1, 2, 3), (num: number) => num === 2)).toStrictEqual(some(2));
    expect(find(Array.of(1, 2, 3), (num: number) => num === 4)).toStrictEqual(none);
  });

  it('Exception', () => {
    function parse(s: string): Either<Error, unknown> {
      return tryCatch(
        () => JSON.parse(s),
        (reason) => new Error(String(reason)),
      );
    }

    const result: Either<Error, unknown> = parse('message');

    expect(E.isLeft(result)).toBe(true);
    if (E.isLeft(result)) {
      expect(result.left).toBeInstanceOf(Error);
      expect(result.left.message).toContain('Unexpected token');
    }
  });

  it('IO - random range', () => {
    const random: IO<number> = () => Math.random();

    const n = random();
    expect(n).toBeGreaterThanOrEqual(0);
    expect(n).toBeLessThan(1);
  });
});
