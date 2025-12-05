import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const filterRanges = (rawRanges: number[][]) => {
  let acceptedRanges: number[][] = [];

  for (const inputRange of rawRanges) {
    // console.log("Input Range", inputRange)

    if (acceptedRanges.length === 0) {
      // Push the first range
      acceptedRanges.push(inputRange);
    } else {
      // Create a temp copy so we're not modifying whill iterating
      const updatedRanges: number[][] = [];
      let foundOverlap = false;

      // Check each exisiting processed range
      for (let i = 0; i < acceptedRanges.length; i++) {
        const existingRange = acceptedRanges[i];

        // Check if upper range of inputRange is within bound of an acceptedRange
        if (
          inputRange[1] <= existingRange[1] &&
          inputRange[1] >= existingRange[0]
        ) {
          // console.log(`Range ceiling of ${inputRange} is within an exisitng range ${existingRange}`)
          updatedRanges.push([
            Math.min(inputRange[0], existingRange[0]),
            existingRange[1],
          ]);
          foundOverlap = true;

          // Check if lower range of inputRange is within bound of an acceptedRange
        } else if (
          inputRange[0] >= existingRange[0] &&
          inputRange[0] <= existingRange[1]
        ) {
          updatedRanges.push([
            existingRange[0],
            Math.max(existingRange[1], inputRange[1]),
          ]);
          foundOverlap = true;
        } else {
          updatedRanges.push(existingRange);
        }
      }
      if (!foundOverlap) {
        // console.log(`No overlap found, pushing ${inputRange}`)
        updatedRanges.push(inputRange);
      }
      acceptedRanges = updatedRanges;
    }
  }
  return acceptedRanges;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const rawRanges = [];
  const ids = [];

  for (const line of input) {
    if (line.includes("-")) {
      const [lower, upper] = line.split("-");
      rawRanges.push([Number(lower), Number(upper)]);
    } else {
      ids.push(Number(line));
    }
  }

  // The processed ranges
  let acceptedRanges = filterRanges(rawRanges);
  while (acceptedRanges.length !== filterRanges(acceptedRanges).length) {
    acceptedRanges = filterRanges(acceptedRanges);
  }

  // console.log("  Final Accepted Ranges", acceptedRanges)
  let fresh = 0;

  for (const id of ids) {
    for (const range of acceptedRanges) {
      if (range[0] <= id && id <= range[1]) {
        fresh++;
        break;
      }
    }
  }

  return fresh.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const rawRanges = [];
  const ids = [];

  for (const line of input) {
    if (line.includes("-")) {
      const [lower, upper] = line.split("-");
      rawRanges.push([Number(lower), Number(upper)]);
    } else {
      ids.push(Number(line));
    }
  }

  // The processed ranges
  let acceptedRanges = filterRanges(rawRanges);
  while (acceptedRanges.length !== filterRanges(acceptedRanges).length) {
    acceptedRanges = filterRanges(acceptedRanges);
    acceptedRanges = filterRanges(acceptedRanges.reverse());
  }
  // console.log("Accepted Range", acceptedRanges);

  let count = 0;
  for (const range of acceptedRanges) {
    count += range[1] - range[0] + 1;
  }

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
