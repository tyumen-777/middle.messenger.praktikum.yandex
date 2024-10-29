import { Indexed } from '../types/indexed.ts';

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
};
