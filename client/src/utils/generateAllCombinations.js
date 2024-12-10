const generateAllCombinations = () => {
	const start = 1;
	const end = 25;
	const length = 15;
	const combinations = [];

	function backtrack(combination, next) {
		if (combination.length === length) {
			combinations.push([...combination]);
			return;
		}

		for (let i = next; i <= end; i++) {
			combination.push(i);
			backtrack(combination, i + 1);
			combination.pop();
		}
	}

	backtrack([], start);
};

export { generateAllCombinations };
