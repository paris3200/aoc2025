import run from "aocrunner";

type Range = [number, number];

const parseInput = (rawInput: string): { ranges: Range[]; ids: number[] } => {
  const input = rawInput.split("\n");

  const rawRanges: Range[] = [];
  const ids: number[] = [];

  for (const line of input) {
    if (line.includes("-")) {
      const [lower, upper] = line.split("-");
      rawRanges.push([Number(lower), Number(upper)]);
    } else {
      ids.push(Number(line));
    }
  }

  return { ranges: filterRanges(rawRanges), ids };
};

const filterRanges = (rawRanges: Range[]) => {
  const sorted = [...rawRanges].sort((a, b) => a[0] - b[0]);

  const merged: Range[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    if (current[0] <= last[1] + 1) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
};

const isInRange = (id: number, range: Range): boolean => {
  return range[0] <= id && id <= range[1];
};

const part1 = (rawInput: string) => {
  const { ranges, ids } = parseInput(rawInput);

  const fresh = ids.reduce((count, id) => {
    return ranges.some((range) => isInRange(id, range)) ? count + 1 : count;
  }, 0);

  return fresh.toString();
};

const part2 = (rawInput: string) => {
  const { ranges } = parseInput(rawInput);

  const count = ranges.reduce(
    (sum, range) => sum + (range[1] - range[0] + 1),
    0,
  );

  return count.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
          3-5
          10-14
          16-20
          12-18

          1
          5
          8
          11
          17
          32
`,
        expected: "3",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          3-5
          10-14
          16-20
          12-18

          1
          5
          8
          11
          17
          32
`,
        expected: "14",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
