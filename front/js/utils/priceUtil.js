// @ts-check

/**
 *
 * @param {number | string} price
 * @returns {string}
 */
export function formatPrice(price) {
  if (typeof price !== "number") price = parseFloat(price);

  price = price.toFixed(2);

  let [integer, decimal] = price.split(".");

  integer = parseInt(integer).toLocaleString();

  return `${integer}.${decimal}`;
}
