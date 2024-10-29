import { Indexed } from '../types/indexed.ts';
import { merge } from './merge.ts';

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any,
  );
  return merge(object as Indexed, result);
};
