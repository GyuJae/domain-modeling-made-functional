import { describe, expect, it } from 'vitest';
import type { Option } from 'fp-ts/lib/Option';
import { match, P } from 'ts-pattern';

describe('Example', () => {
  it('1+1 = 2', () => {
    const result: number = 2;
    expect(1 + 1).toBe(result);
  });

  it('fp-ts', () => {
    const SomeP = { _tag: 'Some' as const };
    const NoneP = { _tag: 'None' as const };

    const printOption = (x: Option<number>) =>
      match(x)
        .with(SomeP, ({ value }) => console.log('The int is', value))
        .with(NoneP, () => console.log('No value'))
        .exhaustive();
  });
});
