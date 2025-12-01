import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const input = rawInput.split("\n");
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
  let dial_value = 50;
  let zero_count = 0;

  for (const combination of input) {

    let result = dial_value + combination;
    let wrapped = false;

    if (combination > 0 && result > 99) {
      while (result > 99) {
        zero_count += 1;
        result -= 100;
      }
      wrapped = true;
    }

    if (combination < 0 && result < 0) {
      while (result < 0) {
        zero_count++;
        result += 100;
      }
      wrapped = true;
    }

    dial_value = result;

    if (dial_value == 0 && !wrapped) {
      zero_count += 1;
    }


  };
  return zero_count.toString();
}

run({
  part1: {
    tests: [
      //   {
      //     input: `
      //         L68
      //         L30
      //         R48
      //         L5
      //         R60
      //         L55
      //         L1
      //         L99
      //         R14
      //         L82
      // `,
      //     expected: "3",
      //   },
    ],
    solution: part1,
  },
  part2: {
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
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
