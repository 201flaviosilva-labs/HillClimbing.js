# Cheat Sheet

[Check a complete API documentation](https://201flaviosilva.github.io/HillClimbing.js/HillClimbing.html).

## Methods
| Name                                | Summary                                                  | param 1                   | param 2              | param 3                 | return        |
| ----------------------------------- | -------------------------------------------------------- | ------------------------- | -------------------- | ----------------------- | ------------- |
| (static) getVersion                 | Library version                                          | -                         | -                    | -                       | String        |
| addTarget                           | Add a new target                                         | * target (Object)         | -                    | -                       | -             |
| getBestScore                        | Return best score so far                                 | -                         | -                    | -                       | Number        |
| getBestSolutionValues               | Returns the value of each target                         | -                         | -                    | -                       | Array[Number] |
| getBestTargetValueSolutionByName    | Returns the best solution value of the given target name | * name (String)           | -                    | -                       | Number        |
| getCurrentSolution                  | Returns the current solution                             | -                         | -                    | -                       | Array[Object] |
| getCurrentSolutionValues            | Returns the current targets values                       | -                         | -                    | -                       | Array[Number] |
| getCurrentTargetValueSolutionByName | Returns the current solution value by target name        | * name (String)           | -                    | -                       | Number        |
| getLastTargetChanged                | Returns the last target that has been changed            | -                         | -                    | -                       | Object        |
| getNumberOfIterations               | Returns the number of iterations that have been run      | -                         | -                    | -                       | Number        |
| getTargets                          | Returns all targets from the list                        | -                         | -                    | -                       | Array[Object] |
| removeTarget                        | Remove a target                                          | * name (String)           | -                    | -                       | -             |
| reset                               | Resets the algorithm                                     | -                         | -                    | -                       | -             |
| run                                 | Mutate a random target                                   | score (Number)            | -                    | -                       | Array[Object] |
| setAllTargets                       | Change all targets to the new targets                    | * targets (Array[Object]) | -                    | -                       | -             |
| setTargetMax                        | Change a target maximum value                            | * targetName (String)     | * max (Number)       | -                       | -             |
| setTargetMin                        | Change a target minimum value                            | * targetName (String)     | * min (Number)       | -                       | -             |
| setTargetName                       | Change a target name                                     | * oldName (String)        | * newName (String)   | -                       | -             |
| setTargetPrecision                  | Change a target precision                                | * targetName (String)     | * precision (Number) | -                       | -             |
| setTargetProperty                   | Change a target property                                 | * targetName (String)     | * property (String)  | * value (String/Number) | -             |
| randomNumber                        | generate random number                                   | * min (Number)            | * max (Number)       | precision (Int)         | Number        |

## Target
| Name      | Summary                 | Type   |
| --------- | ----------------------- | ------ |
| name      | Target name             | String |
| min       | Minimum value           | Number |
| max       | Maximum value           | Number |
| precision | Precision of the target | Number |
| value     | Current value           | Number |
