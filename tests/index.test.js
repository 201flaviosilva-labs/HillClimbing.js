import HillClimbing from "../src/index.js";
import Package from "../package.json";

const mockTargets = [
	{ name: "myTarget1", value: 50, min: 0, max: 100, precision: 0 },
	{ name: "myTarget2", value: -2, min: -100, max: 10, },
	{ name: "myTarget3", value: 764, min: 100, max: 1250, precision: 10 },
];

describe("Instantiate", () => {
	test("Should fail if no targets are passed", () => {
		expect(() => { new HillClimbing(); }).toThrowError("You must pass a list of targets");
	});

	test("Should fail if is passed a empty array", () => {
		expect(() => { new HillClimbing([]); }).toThrowError("You must pass at least one target");
	});

	test("Add mocked targets", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(mockTargets);
		expect(hillClimbing.currentSolution).toEqual(mockTargets);

		expect(hillClimbing.lastTargetChanged).toBeNull();
		expect(hillClimbing.lastScore).toBe(-Infinity);

		expect(hillClimbing.numberOfIterations).toBe(0);
		expect(hillClimbing.bestScore).toBe(-Infinity);
	});
});

test("addTarget -> Add a new target to the list of targets", () => {
	const mockNewTarget = { name: "myNewTarget", value: -1234, min: -2000, max: 0 };
	const finalMockTargets = [...mockTargets, mockNewTarget];

	const hillClimbing = new HillClimbing(mockTargets);
	hillClimbing.addTarget(mockNewTarget);

	expect(hillClimbing.targets).toEqual(finalMockTargets);
	expect(hillClimbing.bestSolution).toEqual(finalMockTargets);
	expect(hillClimbing.currentSolution).toEqual(finalMockTargets);
});


describe("setAllTargets", () => {
	test("Should fail if no targets are passed", () => {
		expect(() => {
			const hc = new HillClimbing(mockTargets);
			hc.setAllTargets();
		}).toThrowError("You must pass a list of targets");
	});

	test("Should fail if is passed a empty array", () => {
		expect(() => {
			const hc = new HillClimbing(mockTargets);
			hc.setAllTargets([]);
		}).toThrowError("You must pass at least one target");
	});

	test("Change all targets to the new targets", () => {
		const mockNewTargets = [
			{ name: "myNewTarget1", value: 0, min: 0, max: 5 },
			{ name: "myNewTarget2", value: -100, min: -500, max: -100 },
			{ name: "myNewTarget3", value: 0, min: 0, max: 1 },
		];

		const hillClimbing = new HillClimbing(mockTargets);
		hillClimbing.setAllTargets(mockNewTargets);

		expect(hillClimbing.targets).toEqual(mockNewTargets);
		expect(hillClimbing.bestSolution).toEqual(mockNewTargets);
		expect(hillClimbing.currentSolution).toEqual(mockNewTargets);
	});
});

describe("removeTarget", () => {
	test("Remove a target from the list of targets", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		hillClimbing.removeTarget("myTarget1");

		const finalMockTargets = [...mockTargets];
		finalMockTargets.splice(0, 1);

		expect(hillClimbing.targets).toEqual(finalMockTargets);
		expect(hillClimbing.bestSolution).toEqual(finalMockTargets);
		expect(hillClimbing.currentSolution).toEqual(finalMockTargets);
	});
});

describe("getNumberOfIterations", () => {
	test("Should return the number of iterations", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(hillClimbing.getNumberOfIterations()).toBe(0);

		hillClimbing.run();
		expect(hillClimbing.getNumberOfIterations()).toBe(1);

		hillClimbing.run(100);
		expect(hillClimbing.getNumberOfIterations()).toBe(2);
	});
});

describe("getBestScore", () => {
	test("Should return the best score", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(hillClimbing.getBestScore()).toBe(-Infinity);

		hillClimbing.run();
		expect(hillClimbing.getBestScore()).toBe(-Infinity);

		hillClimbing.run(100);
		expect(hillClimbing.getBestScore()).toBe(100);

		hillClimbing.run(99);
		expect(hillClimbing.getBestScore()).toBe(100);

		hillClimbing.run(101);
		expect(hillClimbing.getBestScore()).toBe(101);

		hillClimbing.run(-1);
		expect(hillClimbing.getBestScore()).toBe(101);
	});
});

describe("getTargets", () => {
	const mockNewTarget = { name: "myNewTarget", value: -1234, min: -2000, max: 0 };

	test("Should return the initial targets", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(hillClimbing.getTargets()).toEqual(mockTargets);
	});

	test("Should add a new target and return the targets", () => {
		const hillClimbing = new HillClimbing(mockTargets);

		expect(hillClimbing.getTargets()).toEqual(mockTargets);

		hillClimbing.addTarget(mockNewTarget);
		expect(hillClimbing.getTargets()).toEqual([...mockTargets, mockNewTarget]);
	});

	test("Should add a new target, remove a target and return the targets", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		const finalTargets = mockTargets.filter(target => target.name !== "myTarget1");

		expect(hillClimbing.getTargets()).toEqual(mockTargets);

		hillClimbing.addTarget(mockNewTarget);
		expect(hillClimbing.getTargets()).toEqual([...mockTargets, mockNewTarget]);

		hillClimbing.removeTarget("myTarget1");
		expect(hillClimbing.getTargets()).toEqual([...finalTargets, mockNewTarget]);
	});
});

describe("getBestSolution", () => {
	test("Should return the best solution", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(hillClimbing.getBestSolution()).toEqual(mockTargets);

		const solution1 = hillClimbing.run(); // NOT new best solution!
		expect(hillClimbing.getBestSolution()).not.toEqual(solution1);
		expect(hillClimbing.getBestSolution()).toEqual(mockTargets);

		const solution2 = hillClimbing.run(100); // new best solution
		expect(hillClimbing.getBestSolution()).toEqual(solution1);
		expect(hillClimbing.getBestSolution()).not.toEqual(mockTargets);

		const solution3 = hillClimbing.run(99); // NOT new best solution!
		expect(hillClimbing.getBestSolution()).toEqual(solution1);
		expect(hillClimbing.getBestSolution()).not.toEqual(solution3);

		const solution4 = hillClimbing.run(101); // new best solution
		expect(hillClimbing.getBestSolution()).toEqual(solution3);
		expect(hillClimbing.getBestSolution()).not.toEqual(solution2);
	});
});

describe("getBestSolutionValues", () => {
	test("Should only return the values of the best solution", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(hillClimbing.getBestSolutionValues()).toEqual(mockTargets.map(target => target.value));

		const solution1 = hillClimbing.run(); // NOT new best solution!
		expect(hillClimbing.getBestSolutionValues()).not.toEqual(solution1.map(target => target.value));
		expect(hillClimbing.getBestSolutionValues()).toEqual(mockTargets.map(target => target.value));

		const solution2 = hillClimbing.run(100); // new best solution
		expect(hillClimbing.getBestSolutionValues()).toEqual(solution1.map(target => target.value));
		expect(hillClimbing.getBestSolutionValues()).not.toEqual(mockTargets.map(target => target.value));
		expect(hillClimbing.getBestSolutionValues()).not.toEqual(solution2.map(target => target.value));

		const solution3 = hillClimbing.run(99); // NOT new best solution!
		expect(hillClimbing.getBestSolutionValues()).toEqual(solution1.map(target => target.value));
		expect(hillClimbing.getBestSolutionValues()).not.toEqual(solution2.map(target => target.value));
		expect(hillClimbing.getBestSolutionValues()).not.toEqual(solution3.map(target => target.value));

		const solution4 = hillClimbing.run(101); // new best solution
		expect(hillClimbing.getBestSolutionValues()).toEqual(solution3.map(target => target.value));
		expect(hillClimbing.getBestSolutionValues()).not.toEqual(mockTargets.map(target => target.value));
		expect(hillClimbing.getBestSolutionValues()).not.toEqual(solution1.map(target => target.value));
		expect(hillClimbing.getBestSolutionValues()).not.toEqual(solution2.map(target => target.value));
		expect(hillClimbing.getBestSolutionValues()).not.toEqual(solution4.map(target => target.value));
	});
});

describe("getCurrentSolution", () => {
	test("Should return the current solution", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(hillClimbing.getCurrentSolution()).toEqual(mockTargets);

		const solution1 = hillClimbing.run(); // NOT new best solution!
		expect(hillClimbing.getCurrentSolution()).toEqual(solution1);
		expect(hillClimbing.getCurrentSolution()).not.toEqual(mockTargets);

		const solution2 = hillClimbing.run(100); // new best solution
		expect(hillClimbing.getCurrentSolution()).toEqual(solution2);
		expect(hillClimbing.getCurrentSolution()).not.toEqual(solution1);
	});
});

describe("getCurrentSolutionValues", () => {
	test("Should only return the values of the current solution", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(hillClimbing.getCurrentSolutionValues()).toEqual(mockTargets.map(target => target.value));

		const solution1 = hillClimbing.run(); // NOT new best solution!
		expect(hillClimbing.getCurrentSolutionValues()).toEqual(solution1.map(target => target.value));
		expect(hillClimbing.getCurrentSolutionValues()).not.toEqual(mockTargets.map(target => target.value));

		const solution2 = hillClimbing.run(100); // new best solution
		expect(hillClimbing.getCurrentSolutionValues()).toEqual(solution2.map(target => target.value));
		expect(hillClimbing.getCurrentSolutionValues()).not.toEqual(solution1.map(target => target.value));
	});
});

describe("getCurrentTargetValueSolutionByName", () => {
	test("Should return the value of the current solution for the given target name", () => {
		const hillClimbing = new HillClimbing(mockTargets);

		expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget1")).toEqual(mockTargets[0].value);
		expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget2")).toEqual(mockTargets[1].value);
		expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget3")).toEqual(mockTargets[2].value);

		const solution1 = hillClimbing.run(); // NOT new best solution!
		if (hillClimbing.lastTargetChanged.name === "myTarget1") {
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget1")).not.toEqual(mockTargets[0].value);
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget2")).toEqual(mockTargets[1].value);
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget3")).toEqual(mockTargets[2].value);
		} else if (hillClimbing.lastTargetChanged.name === "myTarget2") {
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget1")).toEqual(mockTargets[0].value);
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget2")).not.toEqual(mockTargets[1].value);
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget3")).toEqual(mockTargets[2].value);
		} else if (hillClimbing.lastTargetChanged.name === "myTarget3") {
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget1")).toEqual(mockTargets[0].value);
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget2")).toEqual(mockTargets[1].value);
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget3")).not.toEqual(mockTargets[2].value);
		}
	});
});

describe("getBestTargetValueSolutionByName", () => {
	test("Should return the value of the best solution for the given target name", () => {
		const hillClimbing = new HillClimbing(mockTargets);

		expect(hillClimbing.getBestTargetValueSolutionByName("myTarget1")).toEqual(mockTargets[0].value);
		expect(hillClimbing.getBestTargetValueSolutionByName("myTarget2")).toEqual(mockTargets[1].value);
		expect(hillClimbing.getBestTargetValueSolutionByName("myTarget3")).toEqual(mockTargets[2].value);

		const solution1 = hillClimbing.run(); // NOT new best solution!
		expect(hillClimbing.getBestTargetValueSolutionByName("myTarget1")).toEqual(mockTargets[0].value);
		expect(hillClimbing.getBestTargetValueSolutionByName("myTarget2")).toEqual(mockTargets[1].value);
		expect(hillClimbing.getBestTargetValueSolutionByName("myTarget3")).toEqual(mockTargets[2].value);

		const solution2 = hillClimbing.run(); // new best solution
		expect(hillClimbing.getBestTargetValueSolutionByName("myTarget1")).toEqual(mockTargets[0].value);
		expect(hillClimbing.getBestTargetValueSolutionByName("myTarget2")).toEqual(mockTargets[1].value);
		expect(hillClimbing.getBestTargetValueSolutionByName("myTarget3")).toEqual(mockTargets[2].value);
	});
});

describe("getLastTargetChanged", () => {
	test("Should return the last target that changed", () => {
		const hillClimbing = new HillClimbing(mockTargets);

		expect(hillClimbing.getLastTargetChanged()).toBeNull(); // no target changed yet

		const solution1 = hillClimbing.run();
		expect(hillClimbing.getLastTargetChanged()).not.toEqual(null);
	});
});

describe("run", () => {
	test("1 run with a new best solution", () => {
		const hillClimbing = new HillClimbing(mockTargets);

		const solution1 = hillClimbing.run(100);

		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(mockTargets);
		expect(hillClimbing.currentSolution).toEqual(solution1);

		expect(hillClimbing.numberOfIterations).toBe(1);
		expect(hillClimbing.lastTargetChanged).not.toBeNull();

		expect(hillClimbing.lastScore).toBe(100);
		expect(hillClimbing.bestScore).toBe(100);
	});


	test("Should not break :)", () => {
		const hillClimbing = new HillClimbing(mockTargets);

		// Run 1
		const solution1 = hillClimbing.run(); // NOT new best solution!
		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(mockTargets);
		expect(hillClimbing.currentSolution).toEqual(solution1);

		expect(hillClimbing.numberOfIterations).toBe(1);
		expect(hillClimbing.lastTargetChanged).not.toBeNull();

		expect(hillClimbing.lastScore).toBe(-Infinity);
		expect(hillClimbing.bestScore).toBe(-Infinity);


		// Run 2
		const solution2 = hillClimbing.run(100); // new best solution
		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(solution1);
		expect(hillClimbing.currentSolution).toEqual(solution2);

		expect(hillClimbing.numberOfIterations).toBe(2);
		expect(hillClimbing.lastTargetChanged).not.toBeNull();

		expect(hillClimbing.lastScore).toBe(100);
		expect(hillClimbing.bestScore).toBe(100);

		// Run 3
		const solution3 = hillClimbing.run(-1000); // NOT new best solution!
		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(solution1);
		expect(hillClimbing.currentSolution).toEqual(solution3);

		expect(hillClimbing.numberOfIterations).toBe(3);
		expect(hillClimbing.lastTargetChanged).not.toBeNull();

		expect(hillClimbing.lastScore).toBe(-1000);
		expect(hillClimbing.bestScore).toBe(100);

		// Run 4
		const solution4 = hillClimbing.run(200); // new best solution
		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(solution3);
		expect(hillClimbing.currentSolution).toEqual(solution4);

		expect(hillClimbing.numberOfIterations).toBe(4);
		expect(hillClimbing.lastTargetChanged).not.toBeNull();

		expect(hillClimbing.lastScore).toBe(200);
		expect(hillClimbing.bestScore).toBe(200);

		// Run 5
		const solution5 = hillClimbing.run(); // NOT new best solution!
		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(solution3);
		expect(hillClimbing.currentSolution).toEqual(solution5);

		expect(hillClimbing.numberOfIterations).toBe(5);
		expect(hillClimbing.lastTargetChanged).not.toBeNull();

		expect(hillClimbing.lastScore).toBe(-Infinity);
		expect(hillClimbing.bestScore).toBe(200);
	});
});

describe("reset", () => {
	test("Should reset all values", () => {
		const hillClimbing = new HillClimbing(mockTargets);

		const solution1 = hillClimbing.run(1); // new best solution!
		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(mockTargets);
		expect(hillClimbing.currentSolution).toEqual(solution1);

		expect(hillClimbing.numberOfIterations).toBe(1);
		expect(hillClimbing.lastTargetChanged).not.toBeNull();

		expect(hillClimbing.lastScore).toBe(1);
		expect(hillClimbing.bestScore).toBe(1);

		hillClimbing.reset();

		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(mockTargets);
		expect(hillClimbing.currentSolution).toEqual(mockTargets);

		expect(hillClimbing.numberOfIterations).toBe(0);
		expect(hillClimbing.lastTargetChanged).toBeNull();

		expect(hillClimbing.lastScore).toBe(-Infinity);
		expect(hillClimbing.bestScore).toBe(-Infinity);
	});
});

describe("getVersion", () => {
	test("Should return a string", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(typeof hillClimbing.getVersion()).toBe("string");
		expect(hillClimbing.getVersion()).toBe(Package.version);
	});
});

describe("randomNumber", () => {
	test("Should return a random number between 0 and 1 (no arg)", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(typeof hillClimbing.randomNumber()).toBe("number");

		// Empty parameters
		expect(hillClimbing.randomNumber()).toBeGreaterThanOrEqual(0);
		expect(hillClimbing.randomNumber()).toBeLessThanOrEqual(1);
	});

	// Zero
	test("Should return 0 (0 and 0)", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(typeof hillClimbing.randomNumber()).toBe("number");

		expect(hillClimbing.randomNumber(0, 0)).toBe(0);
	});

	// Positive Numbers
	test("Should return a positive number (0 and 10)", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(typeof hillClimbing.randomNumber()).toBe("number");

		expect(hillClimbing.randomNumber(0, 10)).toBeLessThanOrEqual(10);
		expect(hillClimbing.randomNumber(0, 10)).toBeGreaterThanOrEqual(0);
	});

	// Negative Numbers
	test("Should return a negative number (-10 and 0)", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(typeof hillClimbing.randomNumber()).toBe("number");

		expect(hillClimbing.randomNumber(-10, 0)).toBeLessThanOrEqual(-0);
		expect(hillClimbing.randomNumber(-10, 0)).toBeGreaterThanOrEqual(-10);
	});

	// Positive and Negative Numbers
	test("Should return a random number (-10, 10)", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(typeof hillClimbing.randomNumber()).toBe("number");

		expect(hillClimbing.randomNumber(-10, 10)).toBeLessThanOrEqual(10);
		expect(hillClimbing.randomNumber(-10, 10)).toBeGreaterThanOrEqual(-10);
	});
});
