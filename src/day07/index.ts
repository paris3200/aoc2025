import run from "aocrunner";
import { Grid } from "../utils/grid.js";

const key = (x: number, y: number) => {
  return `${x}, ${y}`;
}

const parseInput = (rawInput: string) => {
  let lines = rawInput.split("\n");
  let grid = new Grid(lines.length);
  let start: number[] = []

  lines.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      let char = lines[y][x];
      if (char === "S" || char === "^") {
        if (char === "S") {
          start = [x, y]
        }
        grid.set(x, y, char);
      }
    }
  });

  return { start, grid };
}

const part1 = (rawInput: string) => {
  const { start, grid } = parseInput(rawInput);
  let count = 0;
  // console.log(grid.print())

  let points = [];
  points.push(start)

  while (points.length > 0) {
    let point = points.pop()
    if (point != undefined) {

      if (grid.has(point[0], point[1] + 1)) {
        let char = grid.get(point[0], point[1] + 1)
        if (char === "^") {
          count += 1
          points.push([point[0] - 1, point[1] + 1])
          points.push([point[0] + 1, point[1] + 1])
        }
      } else {
        grid.set(point[0], point[1] + 1, "|")
        let nextY = point[1] + 1;
        if (nextY < grid.size) {
          points.push([point[0], point[1] + 1])
        }
      }
    }
  }
  // console.log(grid.print())

  return count.toString();
};

const countPaths = (
  x: number,
  y: number,
  grid: Grid,
  visited: Map<string, number>
): number => {
  const cacheKey = key(x, y);

  // Check if already computed paths from this position
  if (visited.has(cacheKey)) {
    return visited.get(cacheKey)!;
  }

  const nextY = y + 1;

  // Grid is solved
  if (nextY >= grid.size) {
    visited.set(cacheKey, 1);
    return 1;
  }

  // Grid is not solved
  let pathCount = 0;

  if (grid.has(x, nextY)) {
    let char = grid.get(x, nextY)
    if (char === "^") {
      pathCount = countPaths(x - 1, nextY, grid, visited) + countPaths(x + 1, nextY, grid, visited);
    } else {
      pathCount = countPaths(x, nextY, grid, visited);
    }
  } else {
    pathCount = countPaths(x, nextY, grid, visited);
  }
  visited.set(cacheKey, pathCount);
  return pathCount;
};

const part2 = (rawInput: string) => {
  const { start, grid } = parseInput(rawInput);

  const memo = new Map<string, number>();
  const count = countPaths(start[0], start[1], grid, memo);
  return count.toString();

};

run({
  part1: {
    tests: [
      {
        input: `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............
`,
        expected: "21",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............

`,
        expected: "40",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
