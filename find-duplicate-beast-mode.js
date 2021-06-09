function findDuplicate(intArray) {
  const n = intArray.length

  // We treat the array as a linked list, where intArray[i] is a pointer. Just
  // to make life difficult, it's 1-indexed, not 0-indexed.
  //
  // We know that a linked list with a repeated pointer must contain a loop. The
  // first step in to get inside the loop. We can do that by walking `n` steps
  // into the loop, where `n` is the length of the input array.
  let positionInCycle = n

  for (let i = 0; i <= n; i++) {
    positionInCycle = intArray[positionInCycle - 1]
  }

  // We're now inside the loop. The next step is to figure out how long it is.
  // Follow the linked list until we array back at the start. Count the steps.
  const rememberedPositionInCycle = positionInCycle
  let stepsInCycle = 1
  let currentPositionInCycle = intArray[positionInCycle - 1]

  while (currentPositionInCycle !== rememberedPositionInCycle) {
    currentPositionInCycle = intArray[currentPositionInCycle - 1]
    stepsInCycle += 1
  }

  // Now for the horribly tricky part. We know how long the loop is, so we can
  // create two pointers. One pointer starts at the end of the list, the other
  // pointer starts `x` steps ahead, where `x` is the length of the loop.
  //
  // We then walk the list with both pointers, until they point to the same
  // node. That's the start / end of the loop, and the repeated number.
  let pointerStart = n
  let pointerAhead = n
  for (let i = 0; i < stepsInCycle; i++) {
    pointerAhead = intArray[pointerAhead - 1]
  }

  while (pointerStart !== pointerAhead) {
    pointerStart = intArray[pointerStart - 1]
    pointerAhead = intArray[pointerAhead - 1]
  }

  return pointerStart
}

// Tests
let desc = 'just the repeated number';
let actual = findDuplicate([1, 1]);
let expected = 1;
assertEqual(actual, expected, desc);

desc = 'short array';
actual = findDuplicate([1, 2, 3, 2]);
expected = 2;
assertEqual(actual, expected, desc);

desc = 'medium array';
actual = findDuplicate([1, 2, 5, 5, 5, 5]);
expected = 5;
assertEqual(actual, expected, desc);

desc = 'long array';
actual = findDuplicate([4, 1, 4, 8, 3, 2, 7, 6, 5]);
expected = 4;
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}