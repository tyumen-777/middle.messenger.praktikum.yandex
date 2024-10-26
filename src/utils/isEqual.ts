type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: unknown, rhs: unknown): boolean {
  if (lhs === rhs) return true;

  if (!isArrayOrObject(lhs) || !isArrayOrObject(rhs)) {
    return lhs === rhs;
  }

  const keys1 = Object.keys(lhs);
  const keys2 = Object.keys(rhs);

  if (keys1.length !== keys2.length) return false;

  return keys1
    .map((key) => {
      if (!(key in rhs)) return false;
      return isEqual(
        (lhs as { [key: string]: unknown })[key],
        (rhs as { [key: string]: unknown })[key],
      );
    })
    .every(Boolean);
}
