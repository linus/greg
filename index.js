const corpora = require("corpora-project");

exports.config = {
  maxCount:   100,
  separator:  "-",
  withNumber: true,
  isShort: false,
  funMode: false,
};

// Generate a Fluffy ID
exports.generate = function generate() {
  function random(max) {
    return Math.floor(Math.random() * max);
  }

  function randomItem(array) {
    return array[random(array.length)];
  }

  const { maxCount, withNumber, isShort } = exports.config;

  if (maxCount <= 2)
    throw new Error("maxCount must be greater than 2");

  var count     = withNumber ? random(maxCount - 2) + 2 : null,
      adjective = randomItem(exports.adjectives()),
      noun      = randomItem(exports.nouns()),
      verb      = isShort ? null : randomItem(exports.verbs()),
      adverb    = isShort ? null : randomItem(exports.adverbs());

  return [count, adjective, noun, verb, adverb]
    .filter(el=>el)
    .join(exports.config.separator)
    .replace(/ /g, exports.config.separator)
    .toLowerCase();
};

// English adjectives
exports.adjectives = () =>
  exports.config.funMode
    ? corpora.getFile("words", "encouraging_words")["encouraging_words"]
    : corpora.getFile("words", "adjs").adjs;

// English nouns
exports.nouns = () => exports.config.funMode
  ? corpora.getFile("animals", "common").animals
  : corpora.getFile("words", "nouns").nouns;

// English verbs, past
exports.verbs = () => corpora
  .getFile("words", "verbs")
  .verbs.map((verb) => verb.past);

// English adverbs
exports.adverbs = () => corpora.getFile("words", "adverbs").adverbs;
