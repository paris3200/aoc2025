import run from "aocrunner";

const parseInput = (rawInput: string) => {
	const input = rawInput.split(",");
	return input;
};

const pattern = (s: string) => {
	const n = s.length;
	for (let i = 1; i <= n / 2; i++) {
		if (n % i === 0) {
			const substring = s.slice(0, i);
			let repeated = "";
			for (let j = 0; j < n / i; j++) {
				repeated += substring;
			}
			if (repeated === s) {
				const front = repeated.slice(0, repeated.length / 2);
				const back = repeated.slice(repeated.length / 2, repeated.length);
				if (front === back) {
					return repeated;
				}
			}
		}
	}
	return false;
};

const pattern2 = (s: string) => {
	const n = s.length;
	for (let i = 1; i <= n / 2; i++) {
		if (n % i === 0) {
			const substring = s.slice(0, i);
			let repeated = "";
			for (let j = 0; j < n / i; j++) {
				repeated += substring;
			}
			if (repeated === s) {
				return repeated;
			}
		}
	}
	return false;
};
const range = (start: number, end: number) => {
	const range = [];
	for (let i = start; i <= end; i++) {
		range.push(i);
	}
	return range;
};

const string_to_range = (s: string) => {
	const split = s.split("-");
	const n = range(Number(split[0]), Number(split[1]));
	return n;
};

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	const ids = [];
	for (const productRange of input) {
		const expandedRange = string_to_range(productRange);
		for (const id of expandedRange) {
			const match = pattern(String(id));
			if (match) {
				ids.push(match);
			}
		}
	}

	let sum = 0;
	for (const id of ids) {
		sum += Number(id);
	}

	return sum.toString();
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	const ids = [];

	for (const productRange of input) {
		const expandedRange = string_to_range(productRange);
		for (const id of expandedRange) {
			const match = pattern2(String(id));
			if (match) {
				ids.push(match);
			}
		}
	}

	let sum = 0;
	for (const id of ids) {
		sum += Number(id);
	}

	return sum.toString();
};

run({
	part1: {
		tests: [
			{
				input: `
        11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
				expected: "1227775554",
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `
        11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
				expected: "4174379265",
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
});
