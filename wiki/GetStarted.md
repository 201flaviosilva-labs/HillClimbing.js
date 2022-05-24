# Simple Get Started

This is a simple example of how to use the library. If you want to check the API documentation -> [JS Docs API](https://201flaviosilva.github.io/HillClimbing.js/).

## Import the library from npm

```sh
npm install hillclimbing
```

## Load the library in your project

```js
import HillClimbing from "hillclimbing";
```

## Create a new instance of the library

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

const myHillClimbing = new HillClimbing(targets); // Create a new instance and pass the initial data (targets)
```

## Update iterations
```js
const myScore = 10;
const myNewSolution = myHillClimbing.run(myScore); // Run the algorithm and get the new solution based on the score
```

## Full Code

```js
import HillClimbing from "hillclimbing";

const targets = [
	{ name: "myValue1", value: 50, min: 0, max: 100, precision: 0 },
	{ name: "myValue2", value: -2, min: -100, max: 10 },
	{ name: "myValue3", value: 764, min: 100, max: 1250, precision: 10 },
];

const myHillClimbing = new HillClimbing(targets);

const myScore = 10;
const myNewSolution = myHillClimbing.run(myScore);
```

For more information, examples and a better understanding, check the here -> [JS Docs API](https://201flaviosilva.github.io/HillClimbing.js/).
