/**
 * Calculates the Euclidean distance between two points in a 2D space.
 *
 * @param {number[]} alkupiste - The starting point as an array [x, y].
 * @param {number[]} loppupiste - The ending point as an array [x, y].
 * @returns {number} The Euclidean distance between the two points.
 */
export function distance(alkupiste, loppupiste) {
  return Math.sqrt((loppupiste[0] - alkupiste[0]) ** 2 + (loppupiste[1] - alkupiste[1]) ** 2);
}
