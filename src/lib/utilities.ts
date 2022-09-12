/*
 * randInt
 * Returns a random integer between min (inclusive) and max (exclusive)
*/
export const randInt = (min: number = 0, max: number = 100) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
