import run from "aocrunner";

const parseInput = (rawInput: string) => {
	const input = rawInput.split("\n");
	return input;
};

const buildLargestNumber = (bat: number[], count: number): number => {
	const range: number[] = [];
	const result: number[] = [];
	for (let i = count - 1; i >= 0; i--) {
		range.push(i);
		result.push(0);
	}

	let resultIndex = 0;

	let index = 0;
	for (const offset of range) {
		for (let i = index; i < bat.length - offset; i++) {
			if (bat[i] > result[resultIndex]) {
				result[resultIndex] = bat[i];
				index = i;
			}
		}
		index++;
		resultIndex++;
	}

	return Number(result.join(""));
};

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	const jolts = [];
	for (const bank of input) {
		const batt = bank.split("").map(Number);
		jolts.push(buildLargestNumber(batt, 2));
	}

	let sum = 0;
	jolts.forEach((number) => {
		sum += number;
	});

	return sum.toString();
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	const jolts = [];
	for (const bank of input) {
		const batt = bank.split("").map(Number);
		jolts.push(buildLargestNumber(batt, 12));
	}

	let sum = 0;
	jolts.forEach((number) => {
		sum += number;
	});

	return sum.toString();
};

run({
	part1: {
		tests: [
			{
				input: `
          987654321111111
          811111111111119
          234234234234278
          818181911112111
`,
				expected: "357",
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `
          987654321111111
          811111111111119
          234234234234278
          818181911112111
`,
				expected: "3121910778619",
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: true,
});
