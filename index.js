const fs = require("fs");
var corpora = require("corpora-project");

exports.config = { maxCount: 100, separator: "-" };

// Generate a Greg sentence
exports.sentence = function sentence() {
  function random(max) {
    return Math.floor(Math.random() * max);
  }

  function randomItem(array) {
    return array[random(array.length)];
  }

  if (exports.config.maxCount <= 2)
    throw new Error("maxCount must be greater than 2");

  var count = random(exports.config.maxCount - 2) + 2,
    adjective = randomItem(exports.adjectives),
    noun = randomItem(exports.nouns),
    verb = randomItem(exports.verbs),
    adverb = randomItem(exports.adverbs);

  const result = [count, adjective, noun, verb, adverb].join(
    exports.config.separator
  );
  return result.toLowerCase();
};

// Parse a Greg sentence and return it's corresponding id
exports.parse = function parse(sentence) {
  var words = sentence.split(exports.config.separator),
    adjectiveFactor = 32,
    nounFactor = adjectiveFactor * exports.adjectives.length,
    verbFactor = nounFactor * exports.nouns.length,
    adverbFactor = verbFactor * exports.verbs.length,
    count = parseInt(words[0], 10),
    adjective = exports.adjectives.indexOf(words[1]),
    noun = exports.nouns.indexOf(words[2]);
  verb = exports.verbs.indexOf(words[3]);
  adverb = exports.adverbs.indexOf(words[4]);

  return (
    count +
    adjective * adjectiveFactor +
    noun * nounFactor +
    verb * verbFactor +
    adverb * adverbFactor
  );
};

// English adjectives
exports.adjectives = corpora.getFile("words", "adjs").adjs;

// English nouns
exports.nouns = corpora.getFile("words", "nouns").nouns;

// English verbs, past
exports.verbs = corpora
  .getFile("words", "verbs")
  .verbs.map((verb) => verb.past);

// English adverbs
exports.adverbs = corpora.getFile("words", "adverbs").adverbs;
