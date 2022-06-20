export default HillClimbing;
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
 * const options = {startScore: -100, numberOfMutations:2};
 *
 * const myHillClimbing = new HillClimbing(targets); // Create a new instance and pass the initial data (targets)
 *
 * @param {Object[]} targets - a list of targets
 * @param {Object} options - options for the algorithm
 * @param {number} [options.startScore=-Infinity] - the starting score for the algorithm
 * @param {number} [options.numberOfMutations=1] - number of mutations per run (not targets)
 * @constructor
 * @see {@link https://en.wikipedia.org/wiki/Hill_climbing}
 */
declare class HillClimbing {
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
    static getVersion(): string;
    constructor(targets: any, options?: {
        startScore: number;
        numberOfMutations: number;
    });
    targets: any;
    bestSolution: any;
    currentSolution: any;
    lastTargetsChanged: any[];
    lastScore: number;
    numberOfIterations: number;
    bestScore: number;
    numberOfMutations: number;
    iterationsData: {
        iteration: number;
        score: number;
        changedTargets: any[];
        solution: any;
    }[];
    _startScore: number;
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
     * @param {Object[]} targets - A list of new targets
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
    setTargetProperty(targetName: string, property: string, value: string | number): void;
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
    setTargetName(oldName: string, newName: string): void;
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
    setTargetMin(targetName: string, min: number): void;
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
    setTargetMax(targetName: string, max: number): void;
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
    setTargetPrecision(targetName: string, precision: number): void;
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
    getNumberOfIterations(): number;
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
    getBestScore(): number;
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
    getTargets(): any[];
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
    getBestSolution(): any[];
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
    getBestSolutionValues(): number[];
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
    getCurrentSolution(): any[];
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
    getCurrentSolutionValues(): number[];
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
    getCurrentTargetValueSolutionByName(name: string): number;
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
    getBestTargetValueSolutionByName(name: string): number;
    /**
     * @description
     * Returns the last target that has been changed
     *
     * @example
     * console.log(myHillClimbing.getLastTargetsChanged()); // [Target]
     *
     * @returns {Object[]} The last target that has been changed
     * @memberof HillClimbing
     */
    getLastTargetsChanged(): any[];
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
    run(score?: number): any[];
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
    exportData(json?: boolean): any[] | string;
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
    reset(): void;
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
    randomNumber(min?: number, max?: number, precision?: number): number;
}
