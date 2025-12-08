import run from "aocrunner";

const DEBUG = false;
const TESTS_ONLY = false;

type Point = {
  x: number,
  y: number,
  z: number
}

type Connection = { pt1: Point, pt2: Point }
type Circuit = Point[];

type DistanceMap = Map<Point, Map<Point, number>>

const log = (...args: any[]) => {
  if (DEBUG) console.log(...args);
};


const parseInput = (rawInput: string) => {
  let lines = rawInput.split("\n");
  let points: Point[] = [];
  lines.forEach((line) => {
    const coords = line.split(",").map(Number);
    points.push({ x: coords[0], y: coords[1], z: coords[2] } as Point);
  });

  return points;
}

const distance = (p1: Point, p2: Point): number => {
  return Math.abs(Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2)))
}

const mapDistance = (points: Point[]): DistanceMap => {

  let distanceMap = new Map<Point, Map<Point, number>>();

  for (let p1 of points) {
    let neighbors = new Map<Point, number>();

    for (let p2 of points) {
      if (p1 != p2) {
        neighbors.set(p2, distance(p1, p2))
      }
    }

    distanceMap.set(p1, neighbors);
  }

  return distanceMap;
}

const pointsEqual = (p1: Point, p2: Point): boolean => {
  return p1.x === p2.x && p1.y === p2.y && p1.z === p2.z;
}

const isConnected = (pt1: Point, pt2: Point, directConnections: Connection[]): boolean => {
  for (let connection of directConnections) {
    if ((pointsEqual(connection.pt1, pt1) && pointsEqual(connection.pt2, pt2)) ||
      (pointsEqual(connection.pt1, pt2) && pointsEqual(connection.pt2, pt1))) {
      return true
    }
  }
  return false
}

const canMerge = (circuit1: Circuit, circuit2: Circuit): boolean => {
  for (const point1 of circuit1) {
    for (const point2 of circuit2) {
      if (pointsEqual(point1, point2)) {
        return true
      }
    }
  }
  return false
}


const closestPoint = (points: Point[], distanceMap: DistanceMap, directConnections: Connection[]) => {

  let shortest_distance = Infinity;
  let pt1!: Point;
  let pt2!: Point;
  for (const point of points) {

    let neighbors = distanceMap.get(point);
    neighbors?.forEach((distance, point2) => {
      if (distance < shortest_distance && !isConnected(point, point2, directConnections)) {
        pt1 = point;
        pt2 = point2;
        shortest_distance = distance
      }
    }
    )
  }
  return { pt1, pt2, distance: shortest_distance };
}

const part1 = (rawInput: string) => {
  const points = parseInput(rawInput);
  // log("Points", points)
  // log("Distance:", distance({ x: 425, y: 690, z: 689 } as Point, { x: 906, y: 360, z: 560 } as Point))
  // log("Distance Map", mapDistance(points))
  let distanceMap = mapDistance(points)
  let circuits: Circuit[] = [];
  let directConnections: Connection[] = [];

  for (let i = 0; i < 1000; i++) {
    let { pt1, pt2 } = closestPoint(points, distanceMap, directConnections)
    directConnections.push({ pt1, pt2 } as Connection)
  }

  for (let connection of directConnections) {
    // log("Connection", connection)
    const pt1 = connection.pt1
    const pt2 = connection.pt2
    let addedToExistingCircuit = false;

    for (let circuit of circuits) {
      if (circuit.includes(pt1) && !circuit.includes(pt2)) {
        circuit.push(pt2)
        addedToExistingCircuit = true;
        break;
      } else if (circuit.includes(pt2) && !circuit.includes(pt1)) {
        circuit.push(pt1)
        addedToExistingCircuit = true;
        break;
      } else if (circuit.includes(pt2) && circuit.includes(pt1)) {
        // Needed to prevent adding a new circuit
        addedToExistingCircuit = true;
        break;
      }
    }

    if (!addedToExistingCircuit) {
      circuits.push([pt1, pt2])
    }
  }

  let reducedCircuits = [...circuits]
  let changed = true

  while (changed) {
    changed = false
    let newCircuits = []
    let merged = new Set<number>()

    for (let i = 0; i < reducedCircuits.length; i++) {
      if (merged.has(i)) continue

      let current = reducedCircuits[i]

      for (let j = i + 1; j < reducedCircuits.length; j++) {
        if (merged.has(j)) continue

        if (canMerge(current, reducedCircuits[j])) {
          // Merge circuits, avoiding duplicate points
          const newPoints = reducedCircuits[j].filter(p =>
            !current.some(existingP => pointsEqual(existingP, p))
          )
          current = current.concat(newPoints)
          merged.add(j)
          changed = true
        }
      }

      newCircuits.push(current)
    }

    reducedCircuits = newCircuits
  }

  // log("Direction Connections", directConnections)
  log("Circuits", reducedCircuits);
  const sortedByLength = reducedCircuits.sort((a, b) => b.length - a.length);
  const top3 = sortedByLength.slice(0, 3);
  log("Top 3", top3);


  let product = 1
  for (let circuit of top3) {
    product = circuit.length * product

  }


  return product.toString();
};

const part2 = (rawInput: string) => {
  return;
};

run({
  part1: {
    tests: [
      // {
      //         input: `
      // 162,817,812
      // 57,618,57
      // 906,360,560
      // 592,479,940
      // 352,342,300
      // 466,668,158
      // 542,29,236
      // 431,825,988
      // 739,650,466
      // 52,470,668
      // 216,146,977
      // 819,987,18
      // 117,168,530
      // 805,96,715
      // 346,949,466
      // 970,615,88
      // 941,993,340
      // 862,61,35
      // 984,92,344
      // 425,690,689
      // `,
      //         expected: "40",
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
