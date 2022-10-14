# Hill Climbing JavaScript 

[![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/hillclimbing)

## Table of Contents

- [Hill Climbing JavaScript](#hill-climbing-javascript)
	- [Table of Contents](#table-of-contents)
	- [Introduction](#introduction)
	- [Simple Get Started](#simple-get-started)
		- [Import the library from npm](#import-the-library-from-npm)
		- [Load the library in your project](#load-the-library-in-your-project)
		- [Create a new instance of the library](#create-a-new-instance-of-the-library)
		- [Update iterations](#update-iterations)
		- [Full Code](#full-code)
	- [Community](#community)

## Introduction
A [hill climbing](https://en.wikipedia.org/wiki/Hill_climbing) algorithm implemented in javascript. The algorithm is used to find the best solution to a problem. Most commonly used in the context of a Artificial Intelligence in [genetic algorithm](https://en.wikipedia.org/wiki/Genetic_algorithm).

## Simple Get Started

This is a simple example of how to use the library. For a more complete example, check the [Wiki](https://github.com/201flaviosilva-labs/HillClimbing.js/wiki).

### Import the library from npm

```sh
npm install hillclimbing
```

### Load the library in your project

```js
import HillClimbing from "hillclimbing";
```

### Create a new instance of the library

```js
const targets = [
	{
		name: "myValue1", // The name of the value
		value: 50, // The initial value
		min: 0, // The minimum value that the value can be
		max: 100, // The maximum value that the value can be
		precision: 0, // The number of decimal places to round to
	},
	{ name: "myValue2", value: -2, min: -100, max: 10 },
	{ name: "myValue3", value: 764, min: 100, max: 1250, precision: 10 },
];

const options = { // if you want, you can specify some default options
	startScore: -100, // The score that the algorithm starts with, (on reset it will be set to this value)
	numberOfMutations: 2, // The number of mutations that the algorithm will run every iteration
	}

const myHillClimbing = new HillClimbing(targets, options); // Create a new instance and pass the initial data (targets)
```

### Update iterations
```js
const myScore = 10;
const myNewSolution = myHillClimbing.run(myScore); // Run the algorithm and get the new solution based on the score
```

### Full Code

```js
import HillClimbing from "hillclimbing";

const targets = [
	{ name: "myValue1", value: 50, min: 0, max: 100, precision: 0 },
	{ name: "myValue2", value: -2, min: -100, max: 10 },
	{ name: "myValue3", value: 764, min: 100, max: 1250, precision: 10 },
];

const options = {startScore: -100, numberOfMutations: 2};

const myHillClimbing = new HillClimbing(targets, options);

const myScore = 10;
const myNewSolution = myHillClimbing.run(myScore);
```

For more information, examples and a better understanding, check the [Wiki](https://github.com/201flaviosilva-labs/HillClimbing.js/wiki).

## Community
- [NPM package page](https://www.npmjs.com/package/hillclimbing);
- [Wiki (Documentation)](https://github.com/201flaviosilva-labs/HillClimbing.js/wiki);
- [JS Docs API](https://201flaviosilva-labs.github.io/HillClimbing.js/);
- [GitHub](https://github.com/201flaviosilva-labs/HillClimbing.js);
  - [Issues](https://github.com/201flaviosilva-labs/HillClimbing.js/issues);
  - [Pull Requests](https://github.com/201flaviosilva-labs/HillClimbing.js/pulls);
