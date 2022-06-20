import HillClimbing from "../src/index.js";
import Package from "../package.json";

const mockTargets = [
	{ name: "myTarget1", value: 50, min: 0, max: 100, precision: 0 },
	{ name: "myTarget2", value: -2, min: -100, max: 10, },
	{ name: "myTarget3", value: 764, min: 100, max: 1250, precision: 10 },
];

describe("Instantiate", () => {
	// Fails Cases
	test("Should fail if no targets are passed", () => {
		expect(() => { new HillClimbing(); }).toThrowError("You must pass a list of targets");
	});

	test("Should fail if is passed a empty array", () => {
		expect(() => { new HillClimbing([]); }).toThrowError("You must pass at least one target");
	});

	test("Should fail if a target is no a Object", () => {
		expect(() => {
			new HillClimbing(["myTarget1", "myTarget2", "myTarget3"]);
		}).toThrowError("You must pass a list of targets");
	});

	test("Should fail if one of the targets does not have a name or is not a string", () => {
		expect(() => {
			new HillClimbing([{ value: 50, min: 0, max: 100 }]);
		}).toThrowError("You must pass a name (String) for each target");

		expect(() => {
			new HillClimbing([{ name: 100, value: 50, min: 0, max: 100 }]);
		}).toThrowError("You must pass a name (String) for each target");
	});

	test("Should fail if one of the targets does not have a value or is not a number", () => {
		expect(() => {
			new HillClimbing([{ name: "myTarget1", min: 0, max: 100 }]);
		}).toThrowError("You must pass a value (Number) for each target");

		expect(() => {
			new HillClimbing([{ name: "myTarget1", value: "50", min: 0, max: 100 }]);
		}).toThrowError("You must pass a value (Number) for each target");
	});

	test("Should fail if one of the targets does not have a min or is not a number", () => {
		expect(() => {
			new HillClimbing([{ name: "myTarget1", value: 50, max: 100 }]);
		}).toThrowError("You must pass a minimum (Number) value for each target");

		expect(() => {
			new HillClimbing([{ name: "myTarget1", value: 50, min: "0", max: 100 }]);
		}).toThrowError("You must pass a minimum (Number) value for each target");
	});

	test("Should fail if one of the targets does not have a max or is not a number", () => {
		expect(() => {
			new HillClimbing([{ name: "myTarget1", value: 50, min: 0 }]);
		}).toThrowError("You must pass a maximum (Number) value for each target");

		expect(() => {
			new HillClimbing([{ name: "myTarget1", value: 50, min: 0, max: "100" }]);
		}).toThrowError("You must pass a maximum (Number) value for each target");
	});

	test("Should fail options is not an object", () => {
		expect(() => { new HillClimbing(mockTargets, "options"); }).toThrowError("You must pass an options object");
	});


	// Normal Cases
	test("Add mocked targets", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(mockTargets);
		expect(hillClimbing.currentSolution).toEqual(mockTargets);

		expect(hillClimbing.lastTargetsChanged).toEqual([]);
		expect(hillClimbing.lastScore).toBe(-Infinity);

		expect(hillClimbing.numberOfIterations).toBe(0);
		expect(hillClimbing.bestScore).toBe(-Infinity);
	});

	test("Add mocked targets and a positive start score", () => {
		const hillClimbing = new HillClimbing(mockTargets, { startScore: 100 });
		expect(hillClimbing.lastScore).toBe(100);
		expect(hillClimbing.bestScore).toBe(100);
	});

	test("Add mocked targets and a negative start score", () => {
		const hillClimbing = new HillClimbing(mockTargets, { startScore: -100 });
		expect(hillClimbing.lastScore).toBe(-100);
		expect(hillClimbing.bestScore).toBe(-100);
	});
});

describe("addTarget", () => {
	// Fails Cases
	test("Should fail if no target is passed", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(() => { hillClimbing.addTarget(); }).toThrowError("You must pass a target");
	});

	test("Should fail if target is not an Object", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(() => { hillClimbing.addTarget("myTarget1"); }).toThrowError("You must pass a target");
	});

	test("Should fail if target does not have a name or is not a string", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(() => { hillClimbing.addTarget({ value: 50, min: 0, max: 100 }); }).toThrowError("You must pass a name with the type String");
		expect(() => { hillClimbing.addTarget({ name: 100, value: 50, min: 0, max: 100 }); }).toThrowError("You must pass a name with the type String");
	});

	test("Should fail if target does not have a value or is not a number", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(() => { hillClimbing.addTarget({ name: "myTarget1", min: 0, max: 100 }); }).toThrowError("You must pass a value with the type Number");
		expect(() => { hillClimbing.addTarget({ name: "myTarget1", value: "50", min: 0, max: 100 }); }).toThrowError("You must pass a value with the type Number");
	});

	test("Should fail if target does not have a min or is not a number", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(() => { hillClimbing.addTarget({ name: "myTarget1", value: 50, max: 100 }); }).toThrowError("You must pass a minimum with the type Number");
		expect(() => { hillClimbing.addTarget({ name: "myTarget1", value: 50, min: "0", max: 100 }); }).toThrowError("You must pass a minimum with the type Number");
	});

	test("Should fail if target does not have a max or is not a number", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(() => { hillClimbing.addTarget({ name: "myTarget1", value: 50, min: 0 }); }).toThrowError("You must pass a maximum with the type Number");
		expect(() => { hillClimbing.addTarget({ name: "myTarget1", value: 50, min: 0, max: "100" }); }).toThrowError("You must pass a maximum with the type Number");
	});

	// Normal Cases
	test("Add a new target to the list of targets", () => {
		const mockNewTarget = { name: "myNewTarget", value: -1234, min: -2000, max: 0 };
		const finalMockTargets = [...mockTargets, mockNewTarget];

		const hillClimbing = new HillClimbing(mockTargets);
		hillClimbing.addTarget(mockNewTarget);

		expect(hillClimbing.targets).toEqual(finalMockTargets);
		expect(hillClimbing.bestSolution).toEqual(finalMockTargets);
		expect(hillClimbing.currentSolution).toEqual(finalMockTargets);
	});
});

describe("setAllTargets", () => {
	// Fails Cases
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

	test("Should fail if is passed a target that is not an Object", () => {
		expect(() => {
			const hc = new HillClimbing(mockTargets);
			hc.setAllTargets(["myTarget1"]);
		}).toThrowError("You must pass a list of targets");
	});

	test("Should fail if is passed a target that does not have a name or is not a string", () => {
		const hc = new HillClimbing(mockTargets);
		expect(() => { hc.setAllTargets([{ value: 50, min: 0, max: 100 }]); }).toThrowError("You must pass a name (String) for each target");
		expect(() => { hc.setAllTargets([{ name: 100, value: 50, min: 0, max: 100 }]); }).toThrowError("You must pass a name (String) for each target");
	});

	test("Should fail if is passed a target that does not have a value or is not a number", () => {
		const hc = new HillClimbing(mockTargets);
		expect(() => { hc.setAllTargets([{ name: "myTarget1", min: 0, max: 100 }]); }).toThrowError("You must pass a value (Number) for each target");
		expect(() => { hc.setAllTargets([{ name: "myTarget1", value: "50", min: 0, max: 100 }]); }).toThrowError("You must pass a value (Number) for each target");
	});

	test("Should fail if is passed a target that does not have a min or is not a number", () => {
		const hc = new HillClimbing(mockTargets);
		expect(() => { hc.setAllTargets([{ name: "myTarget1", value: 50, max: 100 }]); }).toThrowError("You must pass a minimum (Number) value for each target");
		expect(() => { hc.setAllTargets([{ name: "myTarget1", value: 50, min: "0", max: 100 }]); }).toThrowError("You must pass a minimum (Number) value for each target");
	});

	test("Should fail if is passed a target that does not have a max or is not a number", () => {
		const hc = new HillClimbing(mockTargets);
		expect(() => { hc.setAllTargets([{ name: "myTarget1", value: 50, min: 0 }]); }).toThrowError("You must pass a maximum (Number) value for each target");
		expect(() => { hc.setAllTargets([{ name: "myTarget1", value: 50, min: 0, max: "100" }]); }).toThrowError("You must pass a maximum (Number) value for each target");
	});

	// Normal Cases
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
	// Fails Cases
	test("Should fail if no name of a target is passed", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(() => { hillClimbing.removeTarget(); }).toThrowError("You must pass a name");
	});

	test("Should fail if is passed a name of a target that is not a string", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(() => { hillClimbing.removeTarget(100); }).toThrowError("You must pass a name with the type String");
	});

	// Normal Cases
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

describe("setTargetProperty", () => {
	// Fails Cases
	test("Should fail if no target name are passed", () => {
		expect(() => {
			const hc = new HillClimbing(mockTargets);
			hc.setTargetProperty();
		}).toThrowError("You must pass a target name");
	});

	test("Should fail if no target property are passed", () => {
		expect(() => {
			const hc = new HillClimbing(mockTargets);
			hc.setTargetProperty("myTarget1");
		}).toThrowError("You must pass a property name to change");
	});

	test("Should fail if no target value are passed", () => {
		expect(() => {
			const hc = new HillClimbing(mockTargets);
			hc.setTargetProperty("myTarget1", "min");
		}).toThrowError("You must pass a value to change");
	});

	test("Should fail if no target founded", () => {
		expect(() => {
			const hc = new HillClimbing(mockTargets);
			hc.setTargetProperty("myTarget4", "min", 0);
		}).toThrowError("Target myTarget4 not found");
	});

	// Normal Cases
	test("Set name property", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		hillClimbing.setTargetProperty("myTarget1", "name", "myNewTarget1");

		const finalMockTargets = mockTargets.map(target => ({ ...target }));
		finalMockTargets[0].name = "myNewTarget1";

		expect(hillClimbing.targets).toEqual(finalMockTargets);
		expect(hillClimbing.bestSolution).toEqual(finalMockTargets);
		expect(hillClimbing.currentSolution).toEqual(finalMockTargets);
	});

	test("Set min property", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		hillClimbing.setTargetProperty("myTarget1", "min", -100);

		const finalMockTargets = mockTargets.map(target => ({ ...target }));
		finalMockTargets[0].min = -100;

		expect(hillClimbing.targets).toEqual(finalMockTargets);
		expect(hillClimbing.bestSolution).toEqual(finalMockTargets);
		expect(hillClimbing.currentSolution).toEqual(finalMockTargets);
	});

	test("Set max property", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		hillClimbing.setTargetProperty("myTarget1", "max", 100);

		const finalMockTargets = mockTargets.map(target => ({ ...target }));
		finalMockTargets[0].max = 100;

		expect(hillClimbing.targets).toEqual(finalMockTargets);
		expect(hillClimbing.bestSolution).toEqual(finalMockTargets);
		expect(hillClimbing.currentSolution).toEqual(finalMockTargets);
	});

	test("Set precision property", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		hillClimbing.setTargetProperty("myTarget1", "precision", 3);

		const finalMockTargets = mockTargets.map(target => ({ ...target }));
		finalMockTargets[0].precision = 3;

		expect(hillClimbing.targets).toEqual(finalMockTargets);
		expect(hillClimbing.bestSolution).toEqual(finalMockTargets);
		expect(hillClimbing.currentSolution).toEqual(finalMockTargets);
	});
});

describe("setTargetName", () => {
	test("Set name property", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		hillClimbing.setTargetName("myTarget1", "myNewTarget1");

		const finalMockTargets = mockTargets.map(target => ({ ...target }));
		finalMockTargets[0].name = "myNewTarget1";

		expect(hillClimbing.targets).toEqual(finalMockTargets);
		expect(hillClimbing.bestSolution).toEqual(finalMockTargets);
		expect(hillClimbing.currentSolution).toEqual(finalMockTargets);
	});
});

describe("setTargetMin", () => {
	test("Set min property", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		hillClimbing.setTargetMin("myTarget1", -100);

		const finalMockTargets = mockTargets.map(target => ({ ...target }));
		finalMockTargets[0].min = -100;

		expect(hillClimbing.targets).toEqual(finalMockTargets);
		expect(hillClimbing.bestSolution).toEqual(finalMockTargets);
		expect(hillClimbing.currentSolution).toEqual(finalMockTargets);
	});
});

describe("setTargetMax", () => {
	test("Set max property", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		hillClimbing.setTargetMax("myTarget1", 100);

		const finalMockTargets = mockTargets.map(target => ({ ...target }));
		finalMockTargets[0].max = 100;

		expect(hillClimbing.targets).toEqual(finalMockTargets);
		expect(hillClimbing.bestSolution).toEqual(finalMockTargets);
		expect(hillClimbing.currentSolution).toEqual(finalMockTargets);
	});
});

describe("setTargetPrecision", () => {
	test("Set precision property", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		hillClimbing.setTargetPrecision("myTarget1", 3);

		const finalMockTargets = mockTargets.map(target => ({ ...target }));
		finalMockTargets[0].precision = 3;

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
	// Fails Cases
	test("Should fail if no name of a target is passed", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(() => { hillClimbing.getCurrentTargetValueSolutionByName(); }).toThrowError("You must pass a target name");
	});

	test("Should fail if is passed a name of a target that is not a string", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(() => { hillClimbing.getCurrentTargetValueSolutionByName(100); }).toThrowError("The target name must be a string");
	});

	// Normal cases
	test("Should return the value of the current solution for the given target name", () => {
		const hillClimbing = new HillClimbing(mockTargets);

		expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget1")).toEqual(mockTargets[0].value);
		expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget2")).toEqual(mockTargets[1].value);
		expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget3")).toEqual(mockTargets[2].value);

		hillClimbing.run(); // NOT new best solution!
		if (hillClimbing.lastTargetsChanged.name === "myTarget1") {
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget1")).not.toEqual(mockTargets[0].value);
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget2")).toEqual(mockTargets[1].value);
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget3")).toEqual(mockTargets[2].value);
		} else if (hillClimbing.lastTargetsChanged.name === "myTarget2") {
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget1")).toEqual(mockTargets[0].value);
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget2")).not.toEqual(mockTargets[1].value);
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget3")).toEqual(mockTargets[2].value);
		} else if (hillClimbing.lastTargetsChanged.name === "myTarget3") {
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget1")).toEqual(mockTargets[0].value);
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget2")).toEqual(mockTargets[1].value);
			expect(hillClimbing.getCurrentTargetValueSolutionByName("myTarget3")).not.toEqual(mockTargets[2].value);
		}
	});
});

describe("getBestTargetValueSolutionByName", () => {
	// Fails Cases
	test("Should fail if no name of a target is passed", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(() => { hillClimbing.getBestTargetValueSolutionByName(); }).toThrowError("You must pass a target name");
	});

	test("Should fail if is passed a name of a target that is not a string", () => {
		const hillClimbing = new HillClimbing(mockTargets);
		expect(() => { hillClimbing.getBestTargetValueSolutionByName(100); }).toThrowError("The target name must be a string");
	});

	// Normal cases
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

describe("getLastTargetsChanged", () => {
	test("Should return the last targets that changed (no options)", () => {
		const hillClimbing = new HillClimbing(mockTargets);

		expect(hillClimbing.getLastTargetsChanged()).toEqual([]); // no target changed yet

		const solution1 = hillClimbing.run();
		expect(hillClimbing.getLastTargetsChanged()).not.toEqual(null);
		expect(hillClimbing.getLastTargetsChanged().length).toEqual(1);
	});

	test("Should return the last targets that changed (3 mutations per run)", () => {
		const hillClimbing = new HillClimbing(mockTargets, { numberOfMutations: 3 });

		expect(hillClimbing.getLastTargetsChanged()).toEqual([]); // no target changed yet

		const solution1 = hillClimbing.run();
		expect(hillClimbing.getLastTargetsChanged()).not.toEqual(null);
		expect(hillClimbing.getLastTargetsChanged().length).toEqual(3);
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
		expect(hillClimbing.lastTargetsChanged).not.toBeNull();

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
		expect(hillClimbing.lastTargetsChanged).not.toBeNull();

		expect(hillClimbing.lastScore).toBe(-Infinity);
		expect(hillClimbing.bestScore).toBe(-Infinity);


		// Run 2
		const solution2 = hillClimbing.run(100); // new best solution
		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(solution1);
		expect(hillClimbing.currentSolution).toEqual(solution2);

		expect(hillClimbing.numberOfIterations).toBe(2);
		expect(hillClimbing.lastTargetsChanged).not.toBeNull();

		expect(hillClimbing.lastScore).toBe(100);
		expect(hillClimbing.bestScore).toBe(100);

		// Run 3
		const solution3 = hillClimbing.run(-1000); // NOT new best solution!
		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(solution1);
		expect(hillClimbing.currentSolution).toEqual(solution3);

		expect(hillClimbing.numberOfIterations).toBe(3);
		expect(hillClimbing.lastTargetsChanged).not.toBeNull();

		expect(hillClimbing.lastScore).toBe(-1000);
		expect(hillClimbing.bestScore).toBe(100);

		// Run 4
		const solution4 = hillClimbing.run(200); // new best solution
		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(solution3);
		expect(hillClimbing.currentSolution).toEqual(solution4);

		expect(hillClimbing.numberOfIterations).toBe(4);
		expect(hillClimbing.lastTargetsChanged).not.toBeNull();

		expect(hillClimbing.lastScore).toBe(200);
		expect(hillClimbing.bestScore).toBe(200);

		// Run 5
		const solution5 = hillClimbing.run(); // NOT new best solution!
		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(solution3);
		expect(hillClimbing.currentSolution).toEqual(solution5);

		expect(hillClimbing.numberOfIterations).toBe(5);
		expect(hillClimbing.lastTargetsChanged).not.toBeNull();

		expect(hillClimbing.lastScore).toBe(-Infinity);
		expect(hillClimbing.bestScore).toBe(200);
	});
});

describe("exportData", () => {
	test("Should return an array with all iterations", () => {
		const hillClimbing = new HillClimbing(mockTargets);

		expect(hillClimbing.exportData().length).toBe(1);

		hillClimbing.run(100);
		hillClimbing.run(200);
		hillClimbing.run(300);

		const data = hillClimbing.exportData();

		expect(data.length).toBe(4);
		expect(data[1].iteration).toBe(1);
		expect(data[1].score).toBe(100);
		expect(typeof data[1].changedTarget).toBe("object");
		expect(typeof data[1].solution).toBe("object");

		expect(data[2].iteration).toBe(2);
		expect(data[2].score).toBe(200);
		expect(typeof data[2].changedTarget).toBe("object");
		expect(typeof data[2].solution).toBe("object");
	});

	test("Should return an JSON string with all iterations", () => {
		const hillClimbing = new HillClimbing(mockTargets);

		expect(hillClimbing.exportData(true)).toContain(JSON.stringify(mockTargets));

		hillClimbing.run(100);
		hillClimbing.run(200);
		hillClimbing.run(300);

		const data = hillClimbing.exportData(true);

		expect(typeof data).toBe("string");
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
		expect(hillClimbing.lastTargetsChanged).not.toBeNull();
		expect(hillClimbing.lastTargetsChanged.length).toBe(1);

		expect(hillClimbing.lastScore).toBe(1);
		expect(hillClimbing.bestScore).toBe(1);

		hillClimbing.reset();

		expect(hillClimbing.targets).toEqual(mockTargets);
		expect(hillClimbing.bestSolution).toEqual(mockTargets);
		expect(hillClimbing.currentSolution).toEqual(mockTargets);

		expect(hillClimbing.numberOfIterations).toBe(0);
		expect(hillClimbing.lastTargetsChanged).toEqual([]);

		expect(hillClimbing.lastScore).toBe(-Infinity);
		expect(hillClimbing.bestScore).toBe(-Infinity);
		expect(hillClimbing.iterationsData).toEqual([]);
	});

	test("Should reset all values, with a start value", () => {
		const hillClimbing = new HillClimbing(mockTargets, { startScore: 100 });
		expect(hillClimbing.lastScore).toBe(100);
		expect(hillClimbing.bestScore).toBe(100);

		hillClimbing.run(101); // new best score!
		expect(hillClimbing.lastScore).toBe(101);
		expect(hillClimbing.bestScore).toBe(101);

		hillClimbing.reset();
		expect(hillClimbing.lastScore).toBe(100);
		expect(hillClimbing.bestScore).toBe(100);
	});
});

describe("randomNumber", () => {
	// Fails Cases
	const hillClimbing = new HillClimbing(mockTargets);
	test("Should fail if min is not a number", () => {
		expect(() => { hillClimbing.randomNumber("a", 1); }).toThrowError("The minimum number must be a number");
	});

	test("Should fail if max is not a number", () => {
		expect(() => { hillClimbing.randomNumber(1, "a"); }).toThrowError("The maximum number must be a number");
	});

	test("Should fail if precision is not a number", () => {
		expect(() => { hillClimbing.randomNumber(1, 1, "a"); }).toThrowError("The precision number must be a number");
	});

	test("Should fail if min is greater than max", () => {
		expect(() => { hillClimbing.randomNumber(2, 1); }).toThrowError("The minimum number must be less than the maximum number");
	});

	// Normal cases
	test("Should return a random number between 0 and 1 (no arg)", () => {
		expect(typeof hillClimbing.randomNumber()).toBe("number");

		// Empty parameters
		expect(hillClimbing.randomNumber()).toBeGreaterThanOrEqual(0);
		expect(hillClimbing.randomNumber()).toBeLessThanOrEqual(1);
	});

	// Zero
	test("Should return 0 (0 and 0)", () => {
		expect(typeof hillClimbing.randomNumber()).toBe("number");

		expect(hillClimbing.randomNumber(0, 0)).toBe(0);
	});

	// Positive Numbers
	test("Should return a positive number (0 and 10)", () => {
		expect(typeof hillClimbing.randomNumber()).toBe("number");

		expect(hillClimbing.randomNumber(0, 10)).toBeLessThanOrEqual(10);
		expect(hillClimbing.randomNumber(0, 10)).toBeGreaterThanOrEqual(0);
	});

	// Negative Numbers
	test("Should return a negative number (-10 and 0)", () => {
		expect(typeof hillClimbing.randomNumber()).toBe("number");

		expect(hillClimbing.randomNumber(-10, 0)).toBeLessThanOrEqual(-0);
		expect(hillClimbing.randomNumber(-10, 0)).toBeGreaterThanOrEqual(-10);
	});

	// Positive and Negative Numbers
	test("Should return a random number (-10, 10)", () => {
		expect(typeof hillClimbing.randomNumber()).toBe("number");

		expect(hillClimbing.randomNumber(-10, 10)).toBeLessThanOrEqual(10);
		expect(hillClimbing.randomNumber(-10, 10)).toBeGreaterThanOrEqual(-10);
	});
});

describe("getVersion", () => {
	test("Should return a string", () => {
		expect(typeof HillClimbing.getVersion()).toBe("string");
	});

	test("Should return the same package version", () => {
		expect(HillClimbing.getVersion()).toBe(Package.version);
	});
});
