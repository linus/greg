# Fluffy IDs

Fluffy and fun IDs for humans.

Example: *55-fluffy-mushroom-dancing-happily*

The full id form is of: `<count>-<adjective>-<noun>-<verb>-<adverb>`

Tested to have 99% unique ids out of 10 million generated.
Best not to count on it if you need lots of uuid.

## Sample
Here 10 random ids this lib generated:

* 67-altruistic-opposition-groaned-mechanically
* 18-impassive-advertisement-harmed-knowingly
* 55-succeeding-tavern-bubbled-soon
* 7-theistic-retention-blinded-annually
* 9-problem-radiance-hovered-regularly
* 38-guaranteed-inauguration-zoomed-questioningly
* 20-filling-allocation-tempted-frenetically
* 75-monarch-radiance-presented-swiftly
* 89-sunset-redundancy-treated-enormously
* 64-mixed-embodiment-sawed-commonly
## Version

1.0.0

## Requirements

- [Node](http://github/ry/node)

## Installation

Via npm:

    npm install fluffy-ids

## Usage
require syntax:

    const fluffy = require("fluffy-ids");
    id = fluffy.generate();

es6 syntax:

    import * as fluffy from "fluffy-ids";
    id = fluffy.generate();
### Config

on the exported object we have some function to change the inner config of the generator:
 - `setMaxCount` - set the max number to precede the id (as in 55-fluffy-mushroom-dancing-happily)
- `setSeparator` -  set the separator between each word. defaults to "-"
- `setMode` - defaults to `vanilla`.
    - `fun` uses only animals for the noun and only encouraging-words for the adjective (as in 11-stunning-mandrill-killed-eventually).
    - `dino` produce ids of the form: `<prefix>-<dino>` (as in rabbi-achillobator).
- `setTemplate` - set a custom template for the generator. this function expects an array of string, each string will be transformed to one of the words in this category. the categories is as follow:
    - `count` - a number from 2 to maxCount (100 by default)
    - `noun` - a noun from all the nouns in english
    - `verb` - a verb from all the verbs in english
    - `adjective` - an adjective from all the adjectives in english
    - `adverb` - an adverb from all the adverbs in english
    - `animal` - an animal name from all the common animals
    - `dinosaur` - a dinosaur name
    - `encouraging_word` - an encouraging word
    - `prefix` - a prefix like (e.g. mr, mme, lord, etc...)

Please note that changing the longer the template the more - mathematically speaking - we can generate uniques ids.

## Credits
This is forked form [this](https://github.com/linus/greg) repo.

Ariel Benichou &lt;videojr3000@gmail.com&gt;