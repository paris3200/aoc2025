import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const input = rawInput.split("\n").filter(line => line.trim().length > 0);
  let parsedInput = []

  for (const combo of input) {
    const sign = combo[0];
    const value = parseInt(combo.slice(1))
    if (sign == "L") {
      parsedInput.push(value * -1);
    } else {
      parsedInput.push(value);
    }
  }
  return parsedInput;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let dial_value = 50;
  let zero_count = 0;

  for (const combination of input) {
    dial_value = ((dial_value + combination) % 100);

    if (dial_value == 0) {
      zero_count += 1;
    }

  }

  return zero_count.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let current_absolute_pos = 50;
  let zero_count = 0;

  for (const combination of input) {
    const next_absolute_pos = current_absolute_pos + combination;
    let passes = 0;

    if (next_absolute_pos > current_absolute_pos) {
      // Moving positively (Right)
      // We want to count how many multiples of 100 we cross or land on.
      // Example: 0 -> 150. floor(150/100) - floor(0/100) = 1 - 0 = 1. Correct.
      // Example: 99 -> 100. floor(100/100) - floor(99/100) = 1 - 0 = 1. Correct.
      passes = Math.floor(next_absolute_pos / 100) - Math.floor(current_absolute_pos / 100);
    } else {
      // Moving negatively (Left)
      // Example: 100 -> 0. ceil(100/100) - ceil(0/100) = 1 - 0 = 1. Correct.
      // Example: 1 -> -1. ceil(1/100) - ceil(-1/100) = 1 - 0 = 1. Correct.
      passes = Math.ceil(current_absolute_pos / 100) - Math.ceil(next_absolute_pos / 100);
    }

    zero_count += passes;
    current_absolute_pos = next_absolute_pos;
  }
  return zero_count.toString();
}

run({
  part1: {
    tests: [
      {
        input: `
            L68
            L30
            R48
            L5
            R60
            L55
            L1
            L99
            R14
            L82
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
            L49
            L1
      `,
        expected: "1",
      },
      {
        input: `
            L68
      `,
        expected: "1",
      },
      {
        input: `
            L68
            L30
            R48
            L5
            R60
            L55
            L1
            L99
            R14
            L82
      `,
        expected: "6",
      },
      {
        input: `
            R1000
      `,
        expected: "10",
      },
      {
        input: `
            L1000
      `,
        expected: "10",
      },
      {
        input: `
            R50
            R0
      `,
        expected: "1",
      },
      {
        input: `
            L50
            R1
      `,
        expected: "1",
      },
      {
        input: `
            R100
      `,
        expected: "1",
      },
      {
        input: `
            L100
      `,
        expected: "1",
      },
      {
        input: `
            R51
      `,
        expected: "1",
      },
      {
        input: `
            L51
      `,
        expected: "1",
      },
      {
        input: `
            L50
            R100
      `,
        expected: "2",
      },
      {
        input: `
            R25
            R25
      `,
        expected: "1",
      },
      {
        input: `
            R0
      `,
        expected: "0",
      },
      {
        input: `
            R50
      `,
        expected: "1",
      },
      {
        input: `
            L50
      `,
        expected: "1",
      },
      {
        input: `
            R150
      `,
        expected: "2",
      },
      {
        input: `
            L150
      `,
        expected: "2",
      },
      {
        input: `
            R250
      `,
        expected: "3",
      },
      {
        input: `
            R99
            R1
      `,
        expected: "1",
      },
      {
        input: `
            L49
            L1
      `,
        expected: "1",
      },
      {
        input: `
            R60
            L20
            R60
            L20
      `,
        expected: "3",
      },
      {
        input: `
            R10
            R10
            R10
            R10
            R10
            R10
            R10
            R10
            R10
            R10
      `,
        expected: "1",
      },
      {
        input: `
            L50
            R150
      `,
        expected: "2",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
