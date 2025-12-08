import run from "aocrunner";

type Operation = '*' | '+';

interface ParsedProblems {
  problems: number[][];
  operations: Operation[];
}

const parseInput1 = (rawInput: string): ParsedProblems => {
  let lines = rawInput.split("\n");
  let operations: Operation[] = []

  let problems: number[][] = []
  lines.forEach((input, index) => {
    let normalizedLine = input.replace(/\s+/g, ' ').trim();
    let tokens = normalizedLine.split(" ")

    if (index === lines.length - 1) {
      operations = tokens as Operation[]
    } else {
      let numberRow: number[] = []
      tokens.forEach(token => {
        numberRow.push(Number(token))

      })
      problems.push(numberRow)
    }
  })

  return { problems, operations }
}

const parseInput2 = (rawInput: string): ParsedProblems => {
  const lines = rawInput.split("\n");
  const operationLine = lines[lines.length - 1];
  const numberLines = lines.slice(0, -1);

  const operations = operationLine.trim().split(/\s+/) as Operation[];
  const maxWidth = Math.max(...numberLines.map(line => line.length));

  const problems: number[][] = [];
  let currentProblem: number[] = [];

  // Read columns from right to left
  for (let col = maxWidth - 1; col >= 0; col--) {
    let digitString = "";

    // Read top to bottom in this column
    for (const line of numberLines) {
      digitString += line[col] || " ";
    }

    if (digitString.trim() === "") {
      // Empty column = problem boundary
      if (currentProblem.length > 0) {
        problems.push(currentProblem);
        currentProblem = [];
      }
    } else {
      currentProblem.push(Number(digitString));
    }
  }

  if (currentProblem.length > 0) {
    problems.push(currentProblem);
  }

  return { problems, operations };
}

const translateProblems = (problems: number[][]) => {
  let transposed: number[][] = [];

  let count = problems[0].length
  for (let i = 0; i < count; i++) {
    transposed.push([])
  }

  for (let i = 0; i < problems.length; i++) {
    for (let j = 0; j < problems[i].length; j++) {
      transposed[j].push(problems[i][j])
    }
  }
  // console.log("reducedOperands", reducedOperands)
  return transposed
}


const mathOperands = (problems: number[][], operations: Operation[]) => {
  return problems.map((problem, i) => {
    const operation = operations[i];
    return operation === "*"
      ? problem.reduce((product, num) => product * num, 1)
      : problem.reduce((sum, num) => sum + num, 0);
  });
}

const part1 = (rawInput: string) => {
  const { problems, operations } = parseInput1(rawInput);

  let translatedProblems = translateProblems(problems)
  let answers = mathOperands(translatedProblems, operations)
  const grandTotal = answers.reduce(
    (sum, num) => sum + num,
    0,
  );

  return grandTotal.toString()
};

const part2 = (rawInput: string) => {
  const { problems, operations } = parseInput2(rawInput);

  let answers = mathOperands(problems, operations.reverse())
  // console.log(reduced)
  const grandTotal = answers.reduce(
    (sum, num) => sum + num,
    0,
  );

  return grandTotal.toString()
};

run({
  part1: {
    tests: [
      {
        input: `
        123 328  51 64
        45 64  387 23
          6 98  215 314
        *   +   *   +
       `,
        expected: "4277556",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +`,
        expected: "3263827",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
