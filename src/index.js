import Package from "../package.json";

/**
 * @class HillClimbing
 * @classdesc A entry point for the Hill Climbing algorithm.
 * 
 * @example
 * const targets = [
 * {
 * 	name: "myValue1", // The name of the value
 * 	value: 50, // The initial value
 * 	min: 0, // The minimum value that the value can be
 * 	max: 100, // The maximum value that the value can be
 *  precision: 0, // The number of decimal places to round to
 * },
 * { name: "myValue2", value: -2, min: -100, max: 10 },
 * { name: "myValue3", value: 764, min: 100, max: 1250, precision: 10 },
 * ];
 * 
 * const myHillClimbing = new HillClimbing(targets); // Create a new instance and pass the initial data (targets)
 * 
 * @param {Object[]} targets - a list of targets
 * @constructor
 * @see {@link https://en.wikipedia.org/wiki/Hill_climbing}
 */
class HillClimbing {
	constructor(targets, startScore = -Infinity) {
		if (targets === undefined) throw new Error("You must pass a list of targets");
		else if (targets.length === 0) throw new Error("You must pass at least one target");

		targets.forEach(target => {
			if (typeof target !== "object") throw new Error("You must pass a list of targets");
			else if (target.name === undefined || typeof target.name !== "string") throw new Error("You must pass a name (String) for each target");
			else if (target.value === undefined || typeof target.value !== "number") throw new Error("You must pass a value (Number) for each target");
			else if (target.min === undefined || typeof target.min !== "number") throw new Error("You must pass a minimum (Number) value for each target");
			else if (target.max === undefined || typeof target.max !== "number") throw new Error("You must pass a maximum (Number) value for each target");
		});

		if (typeof startScore !== "number") throw new Error("You must pass a start score (Number)");

		this.targets = targets.map(target => ({ ...target }));
		this.bestSolution = targets.map(target => ({ ...target }));
		this.currentSolution = targets.map(target => ({ ...target }));

		this.lastTargetChanged = null;
		this.lastScore = startScore;

		this.numberOfIterations = 0;
		this.bestScore = startScore;

		this.iterationsData = [{
			iteration: this.numberOfIterations,
			score: startScore,
			changedTarget: this.lastTargetChanged,
			solution: this.currentSolution,
		}];
	}

	/**
	 * @description 
	 * Add a new target to the list of targets
	 * 
	 * @example
	 * myHillClimbing.addTarget({ name: "myNewValue", value: 50, min: 0, max: 100 });
	 * 
	 * @param {Object} target - A new target to calculate in the new solution
	 * @returns {void}
	 * @memberof HillClimbing
	 */
	addTarget(target) {
		if (target === undefined) throw new Error("You must pass a target");
		else if (typeof target !== "object") throw new Error("You must pass a target");
		else if (target.name === undefined || typeof target.name !== "string") throw new Error("You must pass a name with the type String");
		else if (target.value === undefined || typeof target.value !== "number") throw new Error("You must pass a value with the type Number");
		else if (target.min === undefined || typeof target.min !== "number") throw new Error("You must pass a minimum with the type Number");
		else if (target.max === undefined || typeof target.max !== "number") throw new Error("You must pass a maximum with the type Number");

		this.targets.push(target);
		this.bestSolution.push(target);
		this.currentSolution.push(target);
	}

	/**
	 * @description 
	 * Change all targets to the new targets
	 * 
	 * @example
	 * myHillClimbing.setAllTargets([
	 * { name: "myNewValue1", value: 0, min: 0, max: 5 },
	 * { name: "myNewValue2", value: -100, min: -500, max: -100 },
	 * { name: "myNewValue3", value: 0, min: 0, max: 1 },
	 * ]);
	 * 
	 * @param {Object[]} targets - A list of new targets
	 * @returns {void}
	 * @memberof HillClimbing
	 */
	setAllTargets(targets) {
		if (targets === undefined) throw new Error("You must pass a list of targets");
		else if (targets.length === 0) throw new Error("You must pass at least one target");

		targets.forEach(target => {
			if (typeof target !== "object") throw new Error("You must pass a list of targets");
			else if (target.name === undefined || typeof target.name !== "string") throw new Error("You must pass a name (String) for each target");
			else if (target.value === undefined || typeof target.value !== "number") throw new Error("You must pass a value (Number) for each target");
			else if (target.min === undefined || typeof target.min !== "number") throw new Error("You must pass a minimum (Number) value for each target");
			else if (target.max === undefined || typeof target.max !== "number") throw new Error("You must pass a maximum (Number) value for each target");
		});

		this.targets = targets;
		this.bestSolution = targets;
		this.currentSolution = targets;
	}

	/**
	 * @description
	 * Remove a target from the list of targets
	 * 
	 * @example
	 * myHillClimbing.removeTarget("myValue1");
	 * 
	 * @param {String} name - The name of the target to remove
	 * @returns {void}
	 * @memberof HillClimbing
	 */
	removeTarget(name) {
		if (name === undefined) throw new Error("You must pass a name");
		else if (typeof name !== "string") throw new Error("You must pass a name with the type String");

		const index = this.targets.findIndex(target => target.name === name);
		if (index > -1) {
			this.targets.splice(index, 1);
			this.bestSolution.splice(index, 1);
			this.currentSolution.splice(index, 1);
		}
	}

	/**
	 * @description
	 * Change a target property (name, min, max, precision)
	 * 
	 * @example myHillClimbing.setTargetProperty("myTargetName", "name", "myNewName");
	 * @example myHillClimbing.setTargetProperty("myNewName", "min", -100);
	 * 
	 * @param {string} targetName - The name of the target to change
	 * @param {string} property - The property to change
	 * @param {string|number} value - The new value
	 * @returns {void}
	 * @memberof HillClimbing
	 */
	setTargetProperty(targetName, property, value) {
		if (targetName === undefined) throw new Error("You must pass a target name");
		else if (property === undefined) throw new Error("You must pass a property name to change");
		else if (value === undefined) throw new Error("You must pass a value to change");

		const targetIndex = this.targets.findIndex(target => target.name === targetName);
		if (targetIndex < 0) throw new Error(`Target ${targetName} not found`);

		if (targetIndex > -1) {
			this.targets[targetIndex][property] = value;
			this.bestSolution[targetIndex][property] = value;
			this.currentSolution[targetIndex][property] = value;
		}
	}

	/**
	 * @description
	 * Change a target name
	 * 
	 * @example
	 * myHillClimbing.setTargetName("myTargetName", "myNewName");
	 * 
	 * @param {string} oldName - The name of the target to change
	 * @param {string} newName - The new name of the target
	 * @returns {void}
	 * @memberof HillClimbing
	 */
	setTargetName(oldName, newName) { this.setTargetProperty(oldName, "name", newName); }

	/**
	 * @description
	 * Change a target minimum value
	 * 
	 * @example
	 * myHillClimbing.setTargetMin("myTargetName", -100);
	 * 
	 * @param {string} targetName - The name of the target to change
	 * @param {number} min - The new minimum value
	 * @returns {void}
	 * @memberof HillClimbing
	 */
	setTargetMin(targetName, min) { this.setTargetProperty(targetName, "min", min); }

	/**
	 * @description
	 * Change a target maximum value
	 * 
	 * @example
	 * myHillClimbing.setTargetMax("myTargetName", 100);
	 * 
	 * @param {string} targetName - The name of the target to change
	 * @param {number} max - The new maximum value
	 * @returns {void}
	 * @memberof HillClimbing
	 */
	setTargetMax(targetName, max) { this.setTargetProperty(targetName, "max", max); }

	/**
	 * @description
	 * Change a target precision
	 * 
	 * @example
	 * myHillClimbing.setTargetPrecision("myTargetName", 5);
	 * 
	 * @param {string} targetName - The name of the target to change
	 * @param {number} precision - The new precision value
	 * @returns {void}
	 * @memberof HillClimbing
	 */
	setTargetPrecision(targetName, precision) { this.setTargetProperty(targetName, "precision", precision); }

	/**
	 * @description
	 * Returns the number of iterations that have been run
	 * 
	 * @example
	 * console.log(myHillClimbing.getNumberOfIterations());
	 * 
	 * @returns {Number} The number of iterations that have been run
	 * @memberof HillClimbing
	 */
	getNumberOfIterations() { return this.numberOfIterations; }

	/**
	 * @description
	 * Get the best score that has been found so far
	 * 
	 * @example
	 * console.log(myHillClimbing.getBestScore());
	 * 
	 * @returns {Number} The best score that has been found so far
	 * @memberof HillClimbing
	 */
	getBestScore() { return this.bestScore; }

	/**
	 * @description
	 * Returns all targets from the list
	 * 
	 * @example
	 * console.log(myHillClimbing.getTargets());
	 * 
	 * @returns {Object[]} The list of targets
	 * @memberof HillClimbing
	 */
	getTargets() { return this.targets.map(target => ({ ...target })); }

	/**
	 * @description
	 * Returns the current best solution. The best solution is the solution that has the highest score
	 * 
	 * @example
	 * console.log(myHillClimbing.getBestSolution());
	 * 
	 * @returns {Object[]} The best solution
	 * @memberof HillClimbing
	 */
	getBestSolution() { return this.bestSolution.map(target => ({ ...target })); }

	/**
	 * @description
	 * Returns a array with the values of the targets with the best solution
	 * 
	 * @example
	 * console.log(myHillClimbing.getBestSolutionValues());
	 * 
	 * @returns {number[]} The values of the targets with the best solution
	 * @memberof HillClimbing
	 */
	getBestSolutionValues() { return this.bestSolution.map(target => target.value); }

	/**
	 * @description
	 * Returns the current solution
	 * 
	 * @example
	 * console.log(myHillClimbing.getCurrentSolution());
	 * 
	 * @returns {Object[]} The current solution
	 * @memberof HillClimbing
	 */
	getCurrentSolution() { return this.currentSolution.map(target => ({ ...target })); }

	/**
	 * @description
	 * Returns a array with the values of the targets with the current solution
	 * 
	 * @example
	 * console.log(myHillClimbing.getCurrentSolutionValues());
	 * 
	 * @returns {number[]} The values of the targets with the current solution
	 * @memberof HillClimbing
	 */
	getCurrentSolutionValues() { return this.currentSolution.map(target => target.value); }

	/**
	 * @description
	 * Returns the current solution value of the given target name
	 * 
	 * @example
	 * console.log(myHillClimbing.getCurrentSolutionValue("myValue1"));
	 * 
	 * @param {String} name - The name of the target
	 * @returns {Number} The current solution value of the given target name
	 * @memberof HillClimbing
	 */
	getCurrentTargetValueSolutionByName(name) {
		if (name === undefined) throw new Error("You must pass a target name");
		else if (typeof name !== "string") throw new Error("The target name must be a string");

		return this.currentSolution.find(target => target.name === name).value;
	}

	/**
	 * @description
	 * Returns the best solution value of the given target name
	 * 
	 * @example
	 * console.log(myHillClimbing.getBestSolutionValue("myValue1"));
	 * 
	 * @param {String} name - The name of the target
	 * @returns {Number} The best solution value of the given target name
	 * @memberof HillClimbing
	 */
	getBestTargetValueSolutionByName(name) {
		if (name === undefined) throw new Error("You must pass a target name");
		else if (typeof name !== "string") throw new Error("The target name must be a string");

		return this.bestSolution.find(target => target.name === name).value;
	}

	/**
	 * @description
	 * Returns the last target that has been changed
	 * 
	 * @example
	 * console.log(myHillClimbing.getLastTargetChanged());
	 * 
	 * @returns {Object} The last target that has been changed
	 * @memberof HillClimbing
	 */
	getLastTargetChanged() { return this.lastTargetChanged ? { ...this.lastTargetChanged } : null; }

	/**
	 * @description
	 * This function its the main function of the algorithm.
	 * This function will calculate a new solution based on the best solution and will return the new solution.
	 * 
	 * Based in the given score, the algorithm will change randomly the value of a random target.
	 *
	 * @example
	 * const myNewScore = 10;
	 * myHillClimbing.run(myNewScore);
	 * 
	 * @param {Number} score - The score that will be used to calculate the new solution
	 * @returns {Object[]} The new current solution
	 * @memberof HillClimbing
	 */
	run(score = -Infinity) {
		this.numberOfIterations++;
		this.lastScore = score;

		// If the current solution is better than the bestSolution, update the best solution
		if (score > this.bestScore) {
			this.bestScore = score;
			this.bestSolution = this.currentSolution.map(target => ({ ...target }));
		} else this.currentSolution = this.bestSolution.map(target => ({ ...target }));

		// Get a new random target to change
		let targetIndex = this.randomNumber(0, this.bestSolution.length - 1);
		const target = { ...this.bestSolution[targetIndex] };

		// Change the value of the target
		this.lastTargetChanged = target;
		this.currentSolution[targetIndex].value = this.randomNumber(target.min, target.max, target.precision);

		const newSolution = this.currentSolution.map(target => ({ ...target }));
		this.iterationsData.push({
			iteration: this.numberOfIterations,
			score: score,
			changedTarget: target,
			solution: newSolution,
		});

		return newSolution;
	}

	/**
	 * @description
	 * Returns the data of all iterations
	 * 
	 * @example
	 * console.log(myHillClimbing.exportData());
	 * 
	 * @param {boolean} json - true if the exported data should be in JSON format
	 * @returns {Object[]|string} The data of all iterations
	 * @memberof HillClimbing
	 */
	exportData(json = false) {
		if (json) return JSON.stringify(this.iterationsData);
		return this.iterationsData;
	}

	/**
	 * @description
	 * Resets the algorithm
	 * 
	 * @example
	 * myHillClimbing.reset();
	 * 
	 * @returns {void}
	 * @memberof HillClimbing
	 */
	reset() {
		this.numberOfIterations = 0;
		this.bestSolution = this.targets.map(target => ({ ...target }));
		this.currentSolution = this.targets.map(target => ({ ...target }));
		this.lastTargetChanged = null;
		this.bestScore = -Infinity;
		this.lastScore = -Infinity;
	}

	/**
	 * @description 
	 * Get a random number between two numbers
	 * 
	 * @example
	 * myHillClimbing.randomNumber(0, 100);
	 * 
	 * @param {Number} min - The minimum number
	 * @param {Number} max - The maximum number
	 * @returns {Number} The random number
	 * @memberof HillClimbing
	 */
	randomNumber(min = 0, max = 1, precision = 0) {
		if (typeof min !== "number") throw new Error("The minimum number must be a number");
		else if (typeof max !== "number") throw new Error("The maximum number must be a number");
		else if (typeof precision !== "number") throw new Error("The precision number must be a number");
		else if (min > max) throw new Error("The minimum number must be less than the maximum number");

		return parseFloat((Math.random() * (max - min) + min).toFixed(precision))
	}

	/**
	 * @description 
	 * Returns the current version of the library
	 * 
	 * @example
	 * console.log(HillClimbing.getVersion()); // "0.0.2"
	 * 
	 * @returns {String}
	 * @memberof HillClimbing
	 * @static
	 */
	static getVersion() { return Package.version; }
}

export default HillClimbing;
