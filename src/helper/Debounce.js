//* Taken from https://www.freecodecamp.org/news/javascript-debounce-example/
export default function debounce(func, delay) {
	let timeoutId;
	return function (...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
}
