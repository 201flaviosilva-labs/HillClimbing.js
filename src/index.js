import Package from "../package.json";

/**
 * @classdesc 
 * A entry point for the Hill Climbing algorithm.
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
 * @class HillClimbing

 * @param {Object[]} targets - a list of targets
 * @constructor
 * @see {@link https://en.wikipedia.org/wiki/Hill_climbing}
 */
class HillClimbing {
	constructor(targets) {
		if (targets === undefined) throw new Error("You must pass a list of targets");
		else if (targets.length === 0) throw new Error("You must pass at least one target");

		this.targets = targets.map(target => ({ ...target }));
		this.bestSolution = targets.map(target => ({ ...target }));
		this.currentSolution = targets.map(target => ({ ...target }));

		this.lastTargetChanged = null;
		this.lastScore = -Infinity;

		this.numberOfIterations = 0;
		this.bestScore = -Infinity;
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
		const index = this.targets.findIndex(target => target.name === name);
		if (index > -1) {
			this.targets.splice(index, 1);
			this.bestSolution.splice(index, 1);
			this.currentSolution.splice(index, 1);
		}
	}

	/**
	 * @description
	 * Returns the number of iterations that have been run
	 * 
	 * @example
	 * console.log(myHillClimbing.getNumberOfIterations());
	 * 
	 * @returns {Number} - The number of iterations that have been run
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
	 * @returns {Number} - The best score that has been found so far
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
	 * @returns {Object[]} - The list of targets
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
	 * @returns {Object[]} - The best solution
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
	 * @returns {number[]} - The values of the targets with the best solution
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
	 * @returns {Object[]} - The current solution
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
	 * @returns {number[]} - The values of the targets with the current solution
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
	 * @returns {Number} - The current solution value of the given target name
	 * @memberof HillClimbing
	 */
	getCurrentTargetValueSolutionByName(name) { return this.currentSolution.find(target => target.name === name).value; }

	/**
	 * @description
	 * Returns the best solution value of the given target name
	 * 
	 * @example
	 * console.log(myHillClimbing.getBestSolutionValue("myValue1"));
	 * 
	 * @param {String} name - The name of the target
	 * @returns {Number} - The best solution value of the given target name
	 * @memberof HillClimbing
	 */
	getBestTargetValueSolutionByName(name) { return this.bestSolution.find(target => target.name === name).value; }

	/**
	 * @description
	 * Returns the last target that has been changed
	 * 
	 * @example
	 * console.log(myHillClimbing.getLastTargetChanged());
	 * 
	 * @returns {Object} - The last target that has been changed
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
	 * @returns {Object[]} - The new current solution
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

		return this.currentSolution.map(target => ({ ...target }));
	}

	/**
	 * @description
	 * Resets the algorithm
	 * 
	 * @example
	 * myHillClimbing.reset();
	 * 
	 * @memberof HillClimbing
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
	 * Returns teh current version of the library
	 * 
	 * @example
	 * console.log(HillClimbing.getVersion()); // "0.0.2"
	 * 
	 * @returns {String}
	 * @memberof HillClimbing
	 * @method getVersion
	 */
	getVersion() { return Package.version; }

	/**
	 * @description 
	 * Get a random number between two numbers
	 * 
	 * @example
	 * myHillClimbing.randomNumber(0, 100);
	 * 
	 * @param {Number} min - The minimum number
	 * @param {Number} max - The maximum number
	 * @returns {Number} - The random number
	 * @memberof HillClimbing
	 * @method randomNumber
	 */
	randomNumber(min = 0, max = 1, precision = 0) { return parseFloat((Math.random() * (max - min) + min).toFixed(precision)) }
}

export default HillClimbing;
