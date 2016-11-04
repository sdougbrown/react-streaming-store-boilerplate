/**
 * isDefined
 *
 * if it's anything other than `undefined` we're good
 *
 * @param {Any} val
 * @returns {Boolean}
 */
export function isDefined(val) {
  return val !== void 0; // eslint-disable-line no-void
}

/**
 * isNil
 *
 * Not strictly null: could also be undefined, but lazy
 * type-checking can result in unexpected consequences.
 *
 * It's a pretty common occurence that by 'null' we may
 * also mean 'undefined' - 'nil' is in-between without
 * being totally confusing or ambiguous.
 *
 * @param {Any} val
 * @returns {Boolean}
 */
export function isNil(val) {
  return !isDefined(val) || val === null;
}

/**
 * isIs
 *
 * Determines if the value begins with 'is'.
 * Useful for filtering utilities from a mapped list.
 *
 * @param {string} val
 * @returns {Boolean}
 */
export function isIs(val) {
  return val.charAt(0) === 'i' && val.charAt(1) === 's';
}

/**
 * isObject
 *
 * np
 *
 * @param {Any} val
 * @returns {Boolean}
 */
export function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}


export function getIs(string) {
  return `is${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}
