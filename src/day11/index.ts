import run from "aocrunner";

type RoutesMap = Map<string, string[]>;

const DEBUG = true;
const TESTS_ONLY = false;

const log = (...args: any[]) => {
  if (DEBUG) console.log(...args);
};

const parseInput = (rawInput: string): RoutesMap => {
  const rack = new Map<string, string[]>();
  rawInput.split("\n").forEach(line => {
    const [key, values] = line.split(":");
    rack.set(key.trim(), values.trim().split(" "));
  });
  return rack;
}

const nextPath = (routes: RoutesMap, currentState: string, path: string[], endState: string): string[][] => {
  let results: string[][] = []
  path.push(currentState)

  if (currentState == endState) {
    return [path]
  }

  let next = routes.get(currentState)
  if (!next) {
    return []
  }

  for (let state of next) {
    results.push(...nextPath(routes, state, [...path], endState))
  }
  return results
}

const nextPath2 = (routes: RoutesMap, currentState: string, fft: boolean, dac: boolean, endState: string): number => {
  let count = 0

  if (currentState == "fft") {
    fft = true
  }

  if (currentState == "dac") {
    dac = true
  }

  if (currentState == endState) {
    if (fft && dac) {
      return 1
    } else {
      return 0
    }
  }

  let next = routes.get(currentState)
  if (!next) {
    return 0
  }

  for (let state of next) {
    count += nextPath2(routes, state, fft, dac, endState)
  }
  return count
}

const part1 = (rawInput: string) => {
  const routes = parseInput(rawInput);
  let currentState = 'you'
  let goal = 'out'

  let result = nextPath(routes, currentState, [], goal)
  return result.length.toString();
};

const part2 = (rawInput: string) => {
  const routes = parseInput(rawInput);
  let currentState = 'svr'
  let goal = 'out'

  let fftPath = nextPath(routes, currentState, [], "fft")
  log(fftPath)
  let dacPath = nextPath(routes, currentState, [], "dac")
  log(dacPath)
  // let count = nextPath2(routes, currentState, false, false, goal)

  // return count.toString()
};

run({
  part1: {
    tests: [
      {
        input: `
        aaa: you hhh
        you: bbb ccc
        bbb: ddd eee
        ccc: ddd eee fff
        ddd: ggg
        eee: out
        fff: out
        ggg: out
        hhh: ccc fff iii
        iii: out
`,
        expected: "5",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        svr: aaa bbb
        aaa: fft
        fft: ccc
        bbb: tty
        tty: ccc
        ccc: ddd eee
        ddd: hub
        hub: fff
        eee: dac
        dac: fff
        fff: ggg hhh
        ggg: out
        hhh: out
`,
        expected: "2",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: TESTS_ONLY,
});
