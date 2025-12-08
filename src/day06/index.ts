import run from "aocrunner";

const parseInput1 = (rawInput: string) => {
  let lines = rawInput.split("\n");
  let operators: string[] = []

  let operands: number[][] = []
  lines.forEach((input, index) => {
    let normalizedLine = input.replace(/\s+/g, ' ').trim();
    let tokens = normalizedLine.split(" ")

    if (index === lines.length - 1) {
      operators = tokens
    } else {
      let numberRow: number[] = []
      tokens.forEach(token => {
        numberRow.push(Number(token))

      })
      operands.push(numberRow)
    }
  })

  return { operands, operators }
}

const parseInput2 = (rawInput: string) => {
  let rawLines = rawInput.split("\n");
  // console.log("Raw Lines:", rawLines)
  let operators: string[] = []
  let operandStrings: string[] = []
  let maxLength = 0;

  rawLines.forEach((line, index) => {
    if (index === rawLines.length - 1) {
      let normalizedLine = line.replace(/\s+/g, ' ').trim();
      let tokens = normalizedLine.split(" ")
      operators = tokens;
    } else {
      operandStrings.push(line)
      if (line.length > maxLength) {
        maxLength = line.length;
      }
    }
  })


  const filteredOperands = [];
  let currentProblem: number[] = [];

  for (let j = maxLength - 1; j >= 0; j--) {
    let number = "";
    for (let i = 0; i < operandStrings.length; i++) {
      number += operandStrings[i].charAt(j)
    }

    if (number.trim() === "") {
      if (currentProblem.length > 0) {
        filteredOperands.push(currentProblem);
        currentProblem = [];
      }
    } else {
      currentProblem.push(Number(number));
    }
  }

  if (currentProblem.length > 0) {
    filteredOperands.push(currentProblem);
  }

  // console.log("Filtered Operands", filteredOperands)
  // console.log("Max Length", maxLength)


  return { operands: filteredOperands, operators };
}

const translateOperands = (operands: number[][]) => {
  let reducedOperands: number[][] = [];

  let count = operands[0].length
  for (let i = 0; i < count + 1; i++) {
    reducedOperands.push([])
  }

  for (let i = 0; i < operands.length; i++) {
    for (let j = 0; j < operands[i].length; j++) {
      reducedOperands[j].push(operands[i][j])
    }
  }
  // console.log("reducedOperands", reducedOperands)
  return reducedOperands
}


const mathOperands = (operands: number[][], operators: string[]) => {
  operators.reverse()

  // console.log("operands", operands)
  let reducedOperands: number[] = []
  for (let i = 0; i < operands.length; i++) {

    let operator = operators.pop();
    if (operator == "*") {
      const product = operands[i].reduce(
        (product, num) => product * num,
        1,
      );
      reducedOperands.push(product)
    } else {
      const count = operands[i].reduce(
        (sum, num) => sum + num,
        0,
      );
      reducedOperands.push(count)
    }
  }

  // console.log("reducedOperands", reducedOperands)
  return reducedOperands;
}

const part1 = (rawInput: string) => {
  const { operands, operators } = parseInput1(rawInput);

  let translatedOperands = translateOperands(operands)
  let reduced = mathOperands(translatedOperands, operators)
  const count = reduced.reduce(
    (sum, num) => sum + num,
    0,
  );

  return count.toString()
};

const part2 = (rawInput: string) => {
  const { operands, operators } = parseInput2(rawInput);

  let reduced = mathOperands(operands, operators.reverse())
  // console.log(reduced)
  const count = reduced.reduce(
    (sum, num) => sum + num,
    0,
  );

  return count.toString()
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
