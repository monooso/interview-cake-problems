class WordCloudData {
  constructor(inputString) {
    this.wordsToCounts = new Map();
    this.populateWordsToCounts(inputString);
  }

  populateWordsToCounts(inputString) {
    const stringLength = inputString.length
    let currentWord = []

    for (let index = 0; index < stringLength; index++) {
      const currentChar = inputString[index].toLowerCase()
      const previousChar = inputString[index - 1]
      const nextChar = inputString[index + 1]

      if (
        this.isLetter(currentChar) ||
        (currentChar === '-' && this.isLetter(previousChar) && this.isLetter(nextChar)) ||
        (currentChar === '\'' && this.isLetter(previousChar) && this.isLetter(nextChar))
      ) {
        currentWord.push(currentChar)

        if (index + 1 === stringLength) {
          this.incrementWordCount(currentWord.join(''))
          currentWord = []
        }

        continue
      }

      this.incrementWordCount(currentWord.join(''))
      currentWord = []
    }
  }

  isLetter(char) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    return letters.includes(char)
  }

  incrementWordCount(word) {
    if (word.trim() === '') {
      return
    }
    this.wordsToCounts.set(word, (this.wordsToCounts.get(word) || 0) + 1)
  }
}

// Tests
// There are lots of valid solutions for this one. You
// might have to edit some of these tests if you made
// different design decisions in your solution.

let desc = 'simple sentence';
let actual = new WordCloudData('I like cake').wordsToCounts;
let expected = new Map([['i', 1], ['like', 1], ['cake', 1]]);
assert(isMapsEqual(actual, expected), desc);

desc = 'longer sentence';
actual = new WordCloudData('Chocolate cake for dinner and pound cake for dessert').wordsToCounts;
expected = new Map([['and', 1], ['pound', 1], ['for', 2], ['dessert', 1],
  ['chocolate', 1], ['dinner', 1], ['cake', 2]]);
assert(isMapsEqual(actual, expected), desc);

desc = 'punctuation';
actual = new WordCloudData('Strawberry short cake? Yum!').wordsToCounts;
expected = new Map([['cake', 1], ['strawberry', 1], ['short', 1], ['yum', 1]]);
assert(isMapsEqual(actual, expected), desc);

desc = 'hyphenated Words';
actual = new WordCloudData('Dessert - mille-feuille cake').wordsToCounts;
expected = new Map([['cake', 1], ['dessert', 1], ['mille-feuille', 1]]);
assert(isMapsEqual(actual, expected), desc);

desc = 'ellipses between words';
actual = new WordCloudData('Mmm...mmm...decisions...decisions').wordsToCounts;
expected = new Map([['mmm', 2], ['decisions', 2]]);
assert(isMapsEqual(actual, expected), desc);

desc = 'apostrophes';
actual = new WordCloudData("Allie's Bakery: Sasha's Cakes").wordsToCounts;
expected = new Map([['bakery', 1], ['cakes', 1], ["allie's", 1], ["sasha's", 1]]);
assert(isMapsEqual(actual, expected), desc);

function isMapsEqual(map1, map2) {
  if (map1.size !== map2.size) {
    return false;
  }
  for (let [key, val] of map1) {
    const testVal = map2.get(key);

    // In cases of an undefined value, make sure the key
    // actually exists on the object so there are no false positives
    if (testVal !== val || (testVal === undefined && !map2.has(key))) {
      return false;
    }
  }
  return true;
}

function assert(condition, desc) {
  if (condition) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL`);
  }
}