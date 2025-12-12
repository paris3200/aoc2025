import run from "aocrunner";

const DEBUG = true;
const TESTS_ONLY = false;

type Point = {
	x: number;
	y: number;
	z: number;
};

type Circuit = Point[];

type DistanceMap = Map<string, Map<string, number>>;

const log = (...args: any[]) => {
	if (DEBUG) console.log(...args);
};

const pointKey = (p: Point): string => `${p.x},${p.y},${p.z}`;

const _connectionKey = (p1: Point, p2: Point): string => {
	const [k1, k2] = [pointKey(p1), pointKey(p2)].sort();
	return `${k1}-${k2}`;
};

const connectionKeyFromKeys = (k1: string, k2: string): string => {
	return k1 < k2 ? `${k1}-${k2}` : `${k2}-${k1}`;
};

const parseInput = (rawInput: string) => {
	const lines = rawInput.split("\n");
	const points: Point[] = [];
	lines.forEach((line) => {
		const coords = line.split(",").map(Number);
		points.push({ x: coords[0], y: coords[1], z: coords[2] } as Point);
	});

	return points;
};

const distance = (p1: Point, p2: Point): number => {
	const dx = p1.x - p2.x;
	const dy = p1.y - p2.y;
	const dz = p1.z - p2.z;
	return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const mapDistance = (points: Point[]): DistanceMap => {
	const distanceMap = new Map<string, Map<string, number>>();

	for (const p1 of points) {
		const neighbors = new Map<string, number>();

		for (const p2 of points) {
			if (p1 !== p2) {
				neighbors.set(pointKey(p2), distance(p1, p2));
			}
		}

		distanceMap.set(pointKey(p1), neighbors);
	}

	return distanceMap;
};

// Union-Find helper functions
const find = (key: string, parent: Map<string, string>): string => {
	if (parent.get(key) !== key) {
		// Path compression
		parent.set(key, find(parent.get(key)!, parent));
	}
	return parent.get(key)!;
};

const union = (
	key1: string,
	key2: string,
	parent: Map<string, string>,
	rank: Map<string, number>,
): void => {
	const root1 = find(key1, parent);
	const root2 = find(key2, parent);

	if (root1 === root2) return;

	// Union by rank
	const rank1 = rank.get(root1)!;
	const rank2 = rank.get(root2)!;

	if (rank1 < rank2) {
		parent.set(root1, root2);
	} else if (rank1 > rank2) {
		parent.set(root2, root1);
	} else {
		parent.set(root2, root1);
		rank.set(root1, rank1 + 1);
	}
};

const closestPoint = (
	points: Point[],
	distanceMap: DistanceMap,
	directConnections: Set<string>,
) => {
	let shortest_distance = Infinity;
	let key1!: string;
	let key2!: string;

	for (const point of points) {
		const pointK = pointKey(point);
		const neighbors = distanceMap.get(pointK);

		neighbors?.forEach((distance, point2Key) => {
			// Quick check: if already connected, skip expensive operations
			if (distance >= shortest_distance) return;

			const connKey = connectionKeyFromKeys(pointK, point2Key);
			if (directConnections.has(connKey)) return;

			key1 = pointK;
			key2 = point2Key;
			shortest_distance = distance;
		});
	}
	return { key1, key2, distance: shortest_distance };
};

const part1 = (rawInput: string) => {
	const points = parseInput(rawInput);
	// log("Points", points)
	// log("Distance:", distance({ x: 425, y: 690, z: 689 } as Point, { x: 906, y: 360, z: 560 } as Point))
	// log("Distance Map", mapDistance(points))
	const distanceMap = mapDistance(points);
	let circuits: Circuit[] = [];
	const directConnections = new Set<string>();

	// Initialize Union-Find for all points
	const parent = new Map<string, string>();
	const rank = new Map<string, number>();

	points.forEach((p) => {
		const key = pointKey(p);
		parent.set(key, key);
		rank.set(key, 0);
	});

	// Find connections and union the points
	for (let i = 0; i < 1000; i++) {
		const { key1, key2 } = closestPoint(points, distanceMap, directConnections);
		const connKey = connectionKeyFromKeys(key1, key2);
		directConnections.add(connKey);
		union(key1, key2, parent, rank);
	}

	// Group points by their root to create circuits
	const circuitMap = new Map<string, Point[]>();

	points.forEach((point) => {
		const root = find(pointKey(point), parent);
		if (!circuitMap.has(root)) {
			circuitMap.set(root, []);
		}
		circuitMap.get(root)?.push(point);
	});

	circuits = Array.from(circuitMap.values());

	log("Circuits", circuits);
	const sortedByLength = circuits.sort((a, b) => b.length - a.length);
	const top3 = sortedByLength.slice(0, 3);
	log("Top 3", top3);

	let product = 1;
	for (const circuit of top3) {
		product = circuit.length * product;
	}

	return product.toString();
};

const part2 = (_rawInput: string) => {
	return;
};

run({
	part1: {
		tests: [
			// {
			//   input: `
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
			//   expected: "40",
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
