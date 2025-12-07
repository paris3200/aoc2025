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
  // console.log(grid.print())

  return count.toString();
};

const part2 = (rawInput: string) => {
  let rawGrids = [];
  rawGrids.push(rawInput)
  let count = 0;
  let divergents = new Map()
  while (rawGrids.length > 0) {
    let rawGrid = rawGrids.pop();
    const { start, grid } = parseInput(rawGrid);
    grid.print()

    let points = [];
    points.push(start)
    grid.delete(start[0], start[1])

    while (points.length > 0) {
      let point = points.pop()

      if (point != undefined) {

        if (grid.has(point[0], point[1] + 1)) {
          let char = grid.get(point[0], point[1] + 1)
          if (char === "^") {

            const keyValue = key(point[0], point[1] + 1)
            if (divergents.get(keyValue) === undefined) {
              divergents.set(keyValue, 1);
              count += 1
            } else {
              let current = divergents.get(keyValue);
              divergents.set(keyValue, current + 1)
            }


            grid.set(point[0] - 1, point[1] + 1, "S")
            // console.log(grid.print())
            // break;
            rawGrids.push(grid.print())
            grid.delete(point[0] - 1, point[1])

            grid.set(point[0] + 1, point[1] + 1, "S")
            rawGrids.push(grid.print())
            grid.delete(point[0] + 1, point[1])

            points.push([point[0] - 1, point[1] + 1])
            points.push([point[0] + 1, point[1] + 1])
          }
        } else {
          let nextY = point[1] + 1;
          if (nextY < grid.size) {
            grid.set(point[0], point[1] + 1, "|")
            points.push([point[0], point[1] + 1])
          } else {

          }
        }
      }
    }
  }

  return count;

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
  onlyTests: true,
});
