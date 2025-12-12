import run from "aocrunner";

const DEBUG = true;
const TESTS_ONLY = true;

type Point = {
	x: number;
	y: number;
};

type Line = [Point, Point];

type areaMap = Map<string, Map<string, number>>;

const log = (...args: any[]) => {
	if (DEBUG) console.log(...args);
};

const parseInput = (rawInput: string) => {
	const lines = rawInput.split("\n");
	const points: Point[] = [];
	lines.forEach((line) => {
		const coords = line.split(",").map(Number);
		points.push({ x: coords[0], y: coords[1] } as Point);
	});

	points.sort((a, b) => a.y - b.y);
	return points;
};

const pointKey = (p: Point): string => `${p.x},${p.y}`;

const _distance = (p1: Point, p2: Point): number => {
	const dx = p1.x - p2.x;
	const dy = p1.y - p2.y;
	return Math.sqrt(dx * dx + dy * dy);
};

const area = (p1: Point, p2: Point): number => {
	const dx = Math.abs(p1.x - p2.x) + 1;
	const dy = Math.abs(p1.y - p2.y) + 1;
	return dx * dy;
};

const mapArea = (points: Point[]): areaMap => {
	const areaMap = new Map<string, Map<string, number>>();

	for (const p1 of points) {
		const neighbors = new Map<string, number>();

		for (const p2 of points) {
			if (p1 !== p2) {
				neighbors.set(pointKey(p2), area(p1, p2));
			}
		}

		areaMap.set(pointKey(p1), neighbors);
	}

	return areaMap;
};

const furtherstPoint = (points: Point[], distanceMap: areaMap) => {
	let longest_distance = 0;
	let key1!: string;
	let key2!: string;

	for (const point of points) {
		const pointK = pointKey(point);
		const neighbors = distanceMap.get(pointK);

		neighbors?.forEach((distance, point2Key) => {
			if (distance <= longest_distance) return;

			key1 = pointK;
			key2 = point2Key;
			longest_distance = distance;
		});
	}
	return { key1, key2, distance: longest_distance };
};

const isHorizontal = (pt1: Point, pt2: Point): boolean => {
	if (pt1.x === pt2.x) {
		return true;
	}
	return false;
};

const isVertical = (pt1: Point, pt2: Point): boolean => {
	if (pt1.y === pt2.y) {
		return true;
	}
	return false;
};
const part1 = (rawInput: string) => {
	const points = parseInput(rawInput);
	const distanceMap = mapArea(points);
	// log("DistanceMap: ", distanceMap)
	const { key1, key2 } = furtherstPoint(points, distanceMap);
	// log("Key1: ", key1)
	// log("Key2: ", key2)

	const map = distanceMap.get(key1);
	const area = map.get(key2);

	return area?.toString();
};

const getEdges = (points: Point[]) => {
	const verticalLines: [Point, Point][] = [];
	const horizontalLines: [Point, Point][] = [];
	const seenPairs = new Set<string>();

	for (const pt1 of points) {
		for (const pt2 of points) {
			if (pt1 !== pt2) {
				const pairKey = [pointKey(pt1), pointKey(pt2)].sort().join("-");

				if (!seenPairs.has(pairKey)) {
					seenPairs.add(pairKey);

					if (isHorizontal(pt1, pt2)) {
						horizontalLines.push([pt1, pt2]);
					} else if (isVertical(pt1, pt2)) {
						verticalLines.push([pt1, pt2]);
					}
				}
			}
		}
	}
	return { horizontalLines, verticalLines };
};

const _verticalIntersect = (_ln1: Line, _ln2: Line): boolean => {
	return false;
};

const part2 = (rawInput: string) => {
	const points = parseInput(rawInput);
	log("Points", points);

	const { horizontalLines, verticalLines } = getEdges(points);
	log("horizontalLines", horizontalLines);
	log("verticalLines", verticalLines);

	return;
};

run({
	part1: {
		tests: [
			{
				input: `
  7, 1
  11, 1
  11, 7
  9, 7
  9, 5
  2, 5
  2, 3
  7, 3
    `,
				expected: "50",
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `
  7, 1
  11, 1
  11, 7
  9, 7
  9, 5
  2, 5
  2, 3
  7, 3`,

				expected: "",
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: TESTS_ONLY,
});
