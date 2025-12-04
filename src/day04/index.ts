import run from "aocrunner";

const parseInput = (rawInput: string) => {
	return rawInput.split("\n").map((row) => row.split(""));
};

const getNeighbors = (
	grid: string[][],
	point: number[],
	directions: number[][],
) => {
	let neighbors = [];

	for (let i = 0; i < directions.length; i++) {
		let targetRow = directions[i][0] + point[0];
		let targetCol = directions[i][1] + point[1];

		if (
			0 <= targetRow &&
			targetRow < grid.length &&
			0 <= targetCol &&
			targetCol < grid[0].length
		) {
			neighbors.push(grid[targetRow][targetCol]);
		}
	}

	return neighbors;
};

const processGrid = (grid: string[][]): [string[][], number] => {
	const directions = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	let rows = grid.length;
	let cols = grid[0].length;
	let count = 0;
	let removed = [];

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (grid[i][j] === "@") {
				let neighbors = getNeighbors(grid, [i, j], directions);
				let rolls = 0;
				for (let point of neighbors) {
					if (point === "@") {
						rolls++;
					}
				}
				if (rolls < 4) {
					count++;
					removed.push([i, j]);
				}
			}
		}
	}
	for (let point of removed) {
		grid[point[0]][point[1]] = ".";
	}

	return [grid, count];
};

const part1 = (rawInput: string) => {
	const inputGrid = parseInput(rawInput);

	const [_grid, count] = processGrid(inputGrid);
	return count.toString();
};

const part2 = (rawInput: string) => {
	let grid = parseInput(rawInput);
	let sum = 0;
	let count;

	do {
		[grid, count] = processGrid(grid);
		sum += count;
	} while (count !== 0);

	return sum.toString();
};

run({
	part1: {
		tests: [
			{
				input: `
        ..@@.@@@@.
        @@@.@.@.@@
        @@@@@.@.@@
        @.@@@@..@.
        @@.@@@@.@@
        .@@@@@@@.@
        .@.@.@.@@@
        @.@@@.@@@@
        .@@@@@@@@.
        @.@.@@@.@.
`,
				expected: "13",
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `
        ..@@.@@@@.
        @@@.@.@.@@
        @@@@@.@.@@
        @.@@@@..@.
        @@.@@@@.@@
        .@@@@@@@.@
        .@.@.@.@@@
        @.@@@.@@@@
        .@@@@@@@@.
        @.@.@@@.@.

`,
				expected: "43",
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
});
