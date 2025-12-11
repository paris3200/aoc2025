import run from "aocrunner";

const DEBUG = true;
const TESTS_ONLY = true;

const log = (...args: any[]) => {
  if (DEBUG) console.log(...args);
};

const parseInput = (rawInput: string) => {
  return rawInput;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: TESTS_ONLY,
});
