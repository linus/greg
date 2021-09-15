const corpora = require("corpora-project");

const config = {
  maxCount:   100,
  separator:  "-",
  template: ["count", "adjective", "noun", "verb", "adverb"]
};

function loadWords(path, accessor=null) {
  return corpora.getFile(...path)[accessor || path.slice(-1)];
}

exports.setMaxCount = (maxCount) => config.maxCount = maxCount;
exports.setSeparator = (separator) => config.separator = separator;
exports.setTemplate = (template) => config.template = template;
exports.setMode = (mode) => {
  switch (mode) {
    case "fun":
      config.template = [
        "count",
        "animal",
        "encouraging_word",
        "verb",
        "adverb",
      ];
      break;
    case "dino":
      config.template = [
        "prefix",
        "dinosaur",
      ];
      break;
    case "vanilla":
    default:
      config.template = [
        "count",
        "adjective",
        "noun",
        "verb",
        "adverb",
      ];
      break;
  }
};



// Generate a Fluffy ID
exports.generate = function generate() {
  function random(max) {
    return Math.floor(Math.random() * max);
  }

  function randomItem(array) {
    return array[random(array.length)];
  }

  const { maxCount, template, separator } = config;

  if (maxCount <= 2)
    throw new Error("maxCount must be greater than 2");

  const words = template.map((el) => {
    switch (el) {
      case "count":
        return random(maxCount - 2) + 2;
      case "adjective":
        return randomItem(loadWords(["words", "adjs"]));
      case "noun":
        return randomItem(loadWords(["words", "nouns"]));
      case "verb":
        return randomItem(
          loadWords(["words", "verbs"]).map((verb) => verb.past)
        );
      case "adverb":
        return randomItem(loadWords(["words", "adverbs"]));
      case "encouraging_word":
        return randomItem(loadWords(["words", "encouraging_words"]));
      case "animal":
        return randomItem(loadWords(["animals", "common"], "animals"));
      case "prefix":
        return randomItem(loadWords(["humans", "prefixes"]));
      case "dinosaur":
        return randomItem(loadWords(["animals", "dinosaurs"]));
      default:
        return null;
    }
  });

  return words
    .filter(el=>el)
    .join(separator)
    .replace(/\./g, "")
    .replace(/ /g, separator)
    .toLowerCase();
};

console.log(exports.generate());