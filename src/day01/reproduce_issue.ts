const run = () => {
	console.log("--- Reproduction Case: Start at 0, Move R150 ---");
	const current_index = 0; // Started at 0
	const combination = 150; // R150

	// Current Logic
	let passes = 0;
	let new_position = current_index + combination;
	const started_at_zero = current_index === 0;
	const wrappedFromNegative = new_position < 0;

	while (new_position >= 100) {
		passes++;
		new_position -= 100;
	}
	while (new_position < 0) {
		passes++;
		new_position += 100;
	}

	if (
		new_position === 0 &&
		wrappedFromNegative &&
		passes > 0 &&
		!started_at_zero
	) {
		passes++;
	}
	if (started_at_zero && passes > 0 && new_position !== 0) {
		passes--;
	}
	if (new_position === 0 && passes === 0 && combination !== 0) {
		passes = 1;
	}

	console.log("Current Logic Result:", passes);

	// New Logic
	const abs_current = 0;
	const abs_next = 150;
	let new_passes = 0;
	if (abs_next > abs_current) {
		new_passes = Math.floor(abs_next / 100) - Math.floor(abs_current / 100);
	} else {
		new_passes = Math.ceil(abs_current / 100) - Math.ceil(abs_next / 100);
	}
	console.log("New Logic Result:    ", new_passes);
};
run();
