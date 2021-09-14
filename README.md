# Fluffy IDs

Fluffy and fun IDs for humans.

Example: *55-fluffy-mushroom-dancing-happily*

The full id form is of: `<count>-<adjective>-<noun>-<verb>-<adverb>`

## Version

0.1.0

## Requirements

- [Node](http://github/ry/node)

## Installation

Via npm:

    npm install fluffy-ids

## Usage

    const fluffy = require("fluffy-ids");
    id = fluffy.generate();

### Config

Change the props on the config object:

    const fluffy = require("fluffy-ids");
    fluffy.config.separator = "~";

- `maxCount` - the max number to precede the id (as in 55-fluffy-mushroom-dancing-happily)
- `separator` -  the separator between each word. defaults to "-"
- `withNumber` - defaults to `true`, if `false` removes the number at the start of the id (as in fluffy-mushroom-dancing-happily)
- `isShort` - defaults to `false`, if `true` removes the verb and adverb from the id (as in 55-fluffy-mushroom)
- `funMode` - defaults to `false`, if `true` uses only animals for the noun and only encouraging words for the adjective (as in 11-stunning-mandrill-killed-eventually).

Please note that changing `withNumber`, `isShort`, `funMode` reduce the number of unique ids we can generate - mathematically speaking.
## Credits
This is forked form [this](https://github.com/linus/greg) repo.

Ariel Benichou &lt;videojr3000@gmail.com&gt;