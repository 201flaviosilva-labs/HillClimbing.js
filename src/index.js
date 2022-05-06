class HillClimbing {
	constructor(targets) {
		this.targets = targets;
		this.bestSolution = targets;
		this.currentSolution = targets;

		this.lastTargetChanged = null;
		this.lastScore = -Infinity;

		this.numberOfIterations = 0;
		this.bestScore = -Infinity;
	}

	addTarget(target) {
		this.targets.push(target);
		this.bestSolution.push(target);
		this.currentSolution.push(target);
	}
	setAllTargets(targets) {
		this.targets = targets;
		this.bestSolution = targets;
		this.currentSolution = targets;
	}
	removeTarget(target) {
		this.targets.splice(this.bestSolution.indexOf(target), 1);
		this.bestSolution.splice(this.bestSolution.indexOf(target), 1);
		this.currentSolution.splice(this.currentSolution.indexOf(target), 1);
	}

	getNumberOfIterations() { return this.numberOfIterations; }
	getBestScore() { return this.bestScore; }

	getTargets() { return this.targets; }
	getBestSolution() { return this.bestSolution; }
	getBestSolutionValues() { return this.bestSolution.map(target => target.value); }
	getCurrentSolution() { return this.currentSolution; }
	getCurrentSolutionValues() { return this.currentSolution.map(target => target.value); }

	getCurrentTargetValueSolutionByName(name) { return this.currentSolution.find(target => target.name === name).value; }
	getBestTargetValueSolutionByName(name) { return this.bestSolution.find(target => target.name === name).value; }

	getLastTargetChanged() { return this.lastTargetChanged; }

	run(score) {
		this.numberOfIterations++;
		this.lastScore = score;

		// If the current solution is better than the best solution, update the best solution
		if (score > this.bestScore) {
			this.bestScore = score;
			this.bestSolution = [...this.currentSolution];
		} else this.currentSolution = this.bestSolution.map(target => ({ ...target }));
		// console.log(this.bestSolution);

		// Get a new random target to change
		let targetIndex = this.randomNumber(0, this.bestSolution.length - 1);
		const target = { ...this.bestSolution[targetIndex] };

		// Change the value of the target
		this.lastTargetChanged = target;
		this.currentSolution[targetIndex].value = this.randomNumber(target.min, target.max);

		return this.currentSolution;
	}

	reset() {
		this.numberOfIterations = 0;
		this.bestSolution = this.targets;
		this.currentSolution = this.targets;
		this.lastTargetChanged = null;
		this.bestScore = -Infinity;
	}

	getVersion() { return "0.0.0"; }

	// --- Utils
	randomNumber(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
}

export default HillClimbing;
