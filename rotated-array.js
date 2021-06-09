// I hate this code. It's exactly what Interview Cake suggests.

function findRotationPoint(words) {
  let firstWord = words[0]
  let lowerBound = 0
  let upperBound = words.length - 1

  if (words[lowerBound] < words[upperBound]) {
    return 0
  }

  // While we have words to search
  while (lowerBound < upperBound) {
    const midBoundIndex = Math.floor((upperBound - lowerBound) / 2)
    const midpointIndex = lowerBound + midBoundIndex
    const midpointWord = words[midpointIndex]

    if (midpointWord >= firstWord) {
      lowerBound = midpointIndex
    } else {
      upperBound = midpointIndex
    }

    if (lowerBound + 1 === upperBound) {
      break
    }
  }

  return upperBound
}


// Tests
let desc = 'small array';
let actual = findRotationPoint(['cape', 'cake']);
let expected = 1;
assertEquals(actual, expected, desc);

desc = 'medium array';
actual = findRotationPoint(['grape', 'orange', 'plum', 'radish', 'apple']);
expected = 4;
assertEquals(actual, expected, desc);

desc = 'large array';
actual = findRotationPoint(['ptolemaic', 'retrograde', 'supplant',
  'undulate', 'xenoepist', 'asymptote',
  'babka', 'banoffee', 'engender',
  'karpatka', 'othellolagkage']);
expected = 5;
assertEquals(actual, expected, desc);

desc = 'sorted array';
actual = findRotationPoint([
  'asymptote', 'babka', 'banoffee', 'engender', 'karpatka', 'othellolagkage',
  'ptolemaic', 'retrograde', 'supplant', 'undulate', 'xenoepist',
]);
expected = 0;
assertEquals(actual, expected, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}