"use strict";

// Generate a Greg sentence
exports.sentence = function sentence() {
    function random(max) {
        return Math.floor(Math.random() * max);
    }

    function randomItem(array) {
        return array[random(array.length)];
    }

    var count       = random(32) + 2,
        adjective   = randomItem(exports.adjectives),
        noun        = randomItem(exports.nouns),
        verb        = randomItem(exports.verbs),
        adverb      = randomItem(exports.adverbs);

    return [count, adjective, noun, verb, adverb].join(" ");
};

// Parse a Greg sentence and return it's corresponding id
exports.parse = function parse(sentence) {
    var words = sentence.split(" "),
        adjectiveFactor = 32,
        nounFactor = adjectiveFactor * exports.adjectives.length,
        verbFactor = nounFactor * exports.nouns.length,
        adverbFactor = verbFactor * exports.verbs.length,
        count = parseInt(words[0], 10),
        adjective = exports.adjectives.indexOf(words[1]),
        noun = exports.nouns.indexOf(words[2]),
        verb = exports.verbs.indexOf(words[3]),
        adverb = exports.adverbs.indexOf(words[4]);

    return count + 
        adjective * adjectiveFactor +
        noun * nounFactor +
        verb * verbFactor +
        adverb * adverbFactor;
};

// Generate a Greg sentence from an id. 
// Inverse of parse: greg.parse(greg.fromId(id)) === id for valid ids.
// Valid range for ids is currently roughly between -5549438 and 22197761.
// Warning: ids change if you change the number of adjectives, nouns, or verbs.
exports.fromId = function(targetId) {
    var     adjectiveFactor = 32,
            nounFactor = adjectiveFactor * exports.adjectives.length,
            verbFactor = nounFactor * exports.nouns.length,
            adverbFactor = verbFactor * exports.verbs.length,
            id = targetId - 2,
            adverb = 0,
            verb = 0,
            noun = 0,
            adjective = 0,
            count = 0,
            phrase = "",
            limit = exports.adverbs.length - 1;
            
    adverb = Math.floor(id / adverbFactor);

    if (adverb > limit) {
        if (typeof console === "object" && console.warn) {
            console.warn("Over the limit", id, count, adverb);
        }
        count += (adverb - limit - 1)*adverbFactor + (id % adverbFactor) + 1 ;
        adverb = limit;
        id -= count;
        // console.log(id, count, adverb)
    }

    id -= adverb * adverbFactor;

    verb = Math.floor(id / verbFactor);
    id -= verb * verbFactor;

    noun = Math.floor(id / nounFactor);
    id -= noun * nounFactor;

    adjective = Math.floor(id / adjectiveFactor);
    id -= adjective * adjectiveFactor;

    count += id + 2;

    phrase = [count, exports.adjectives[adjective], exports.nouns[noun], exports.verbs[verb], exports.adverbs[adverb]].join(" ");

    if (typeof console === "object" && console.warn) {
        id = exports.parse(phrase);
        if (id !== targetId) {
            console.warn("does not match targetId", targetId, "!==", id);
        }
    }

    return phrase;
};

// Confirm that Greg sentence is valid and corresponds to optional id
exports.confirm = function(sentence, id) {
    if (null == id) {
        id = exports.parse(sentence);
    }
    return exports.parse(sentence) === id && exports.fromId(id) === sentence;
};

// English adjectives
exports.adjectives = [
    "cute", "dapper", "large", "small", "long", "short", "thick", "narrow",
    "deep", "flat", "whole", "low", "high", "near", "far", "fast",
    "quick", "slow", "early", "late", "bright", "dark", "cloudy", "warm",
    "cool", "cold", "windy", "noisy", "loud", "quiet", "dry", "clear",
    "hard", "soft", "heavy", "light", "strong", "weak", "tidy", "clean",
    "dirty", "empty", "full", "close", "thirsty", "hungry", "fat", "old",
    "fresh", "dead", "healthy", "sweet", "sour", "bitter", "salty", "good",
    "bad", "great", "important", "useful", "expensive", "cheap", "free", "difficult",
    "strong", "weak", "able", "free", "rich", "afraid", "brave", "fine",
    "sad", "proud", "comfortable", "happy", "clever", "interesting", "famous", "exciting",
    "funny", "kind", "polite", "fair", "share", "busy", "free", "lazy",
    "lucky", "careful", "safe", "dangerous"
];

// English plural nouns (all animals)
exports.nouns = [
    "rabbits", "badgers", "foxes", "chickens", "bats", "deer", "snakes", "hares",
    "hedgehogs", "platypuses", "moles", "mice", "otters", "rats", "squirrels", "stoats",
    "weasels", "crows", "doves", "ducks", "geese", "hawks", "herons", "kingfishers",
    "owls", "peafowl", "pheasants", "pigeons", "robins", "rooks", "sparrows", "starlings",
    "swans", "ants", "bees", "butterflies", "dragonflies", "flies", "moths", "spiders",
    "pikes", "salmons", "trouts", "frogs", "newts", "toads", "crabs", "lobsters",
    "clams", "cockles", "mussles", "oysters", "snails", "cattle", "dogs", "donkeys",
    "goats", "horses", "pigs", "sheep", "ferrets", "gerbils", "guinea pigs", "parrots",
    "greg"
];

// English verbs, past tense
exports.verbs = [
    "sang", "played", "knitted", "floundered", "danced", "played", "listened", "ran",
    "talked", "cuddled", "sat", "kissed", "hugged", "whimpered", "hid", "fought",
    "whispered", "cried", "snuggled", "walked", "drove", "loitered", "whimpered", "felt",
    "jumped", "hopped", "went", "married", "engaged"
];

// English adverbs
exports.adverbs = [
    "jovially", "merrily", "cordially", "easily", "carefully", "correctly",
    "eagerly", "easily", "fast", "loudly", "patiently", "quickly", "quietly"
];
