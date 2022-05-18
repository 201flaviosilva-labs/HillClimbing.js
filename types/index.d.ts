export default HillClimbing;
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
 * },
 * { name: "myValue2", value: -2, min: -100, max: 10 },
 * { name: "myValue3", value: 764, min: 100, max: 1250 },
 * ];
 *
 * const myHillClimbing = new HillClimbing(targets); // Create a new instance and pass the initial data (targets)
 *
 * @class HillClimbing

 * @param {Array} targets - a list of targets
 * @constructor
 * @see {@link https://en.wikipedia.org/wiki/Hill_climbing}
 */
declare class HillClimbing {
    constructor(targets: any);
    targets: any;
    bestSolution: any;
    currentSolution: any;
    lastTargetChanged: any;
    lastScore: number;
    numberOfIterations: number;
    bestScore: number;
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
    addTarget(target: any): void;
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
     * @param {Array} targets - A list of new targets
     * @returns {void}
     * @memberof HillClimbing
     */
    setAllTargets(targets: any[]): void;
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
    removeTarget(name: string): void;
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
    getNumberOfIterations(): number;
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
    getBestScore(): number;
    /**
     * @description
     * Returns all targets from the list
     *
     * @example
     * console.log(myHillClimbing.getTargets());
     *
     * @returns {Array} - The list of targets
     * @memberof HillClimbing
     */
    getTargets(): any[];
    /**
     * @description
     * Returns the current best solution. The best solution is the solution that has the highest score
     *
     * @example
     * console.log(myHillClimbing.getBestSolution());
     *
     * @returns {Array} - The best solution
     * @memberof HillClimbing
     */
    getBestSolution(): any[];
    /**
     * @description
     * Returns a array with the values of the targets with the best solution
     *
     * @example
     * console.log(myHillClimbing.getBestSolutionValues());
     *
     * @returns {Array} - The values of the targets with the best solution
     * @memberof HillClimbing
     */
    getBestSolutionValues(): any[];
    /**
     * @description
     * Returns the current solution
     *
     * @example
     * console.log(myHillClimbing.getCurrentSolution());
     *
     * @returns {Array} - The current solution
     * @memberof HillClimbing
     */
    getCurrentSolution(): any[];
    /**
     * @description
     * Returns a array with the values of the targets with the current solution
     *
     * @example
     * console.log(myHillClimbing.getCurrentSolutionValues());
     *
     * @returns {Array} - The values of the targets with the current solution
     * @memberof HillClimbing
     */
    getCurrentSolutionValues(): any[];
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
    getCurrentTargetValueSolutionByName(name: string): number;
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
    getBestTargetValueSolutionByName(name: string): number;
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
    getLastTargetChanged(): any;
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
     * @returns {Array} - The new current solution
     * @memberof HillClimbing
     */
    run(score?: number): any[];
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
    reset(): void;
    /**
     * @description
     * Returns teh current version of the library
     *
     * @example
     * console.log(HillClimbing.getVersion()); // "0.0.1"
     *
     * @returns {String}
     * @memberof HillClimbing
     * @method getVersion
     */
    getVersion(): string;
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
    randomNumber(min?: number, max?: number): number;
}
