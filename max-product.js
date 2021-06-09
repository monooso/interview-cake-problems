function highestProductOf3(arrayOfInts) {
  if (arrayOfInts.length < 3) {
    throw new Error('Must have at least 3 items')
  }

  const firstNumber = arrayOfInts[0]
  const secondNumber = arrayOfInts[1]
  const thirdNumber = arrayOfInts[2]

  let highestInt = Math.max(firstNumber, secondNumber)
  let lowestInt = Math.min(firstNumber, secondNumber)
  let highestProductOf2 = firstNumber * secondNumber
  let lowestProductOf2 = firstNumber * secondNumber
  let highestProductOf3 = firstNumber * secondNumber * thirdNumber

  for (let index = 2; index < arrayOfInts.length; index++) {
    const currentInt = arrayOfInts[index]

    highestProductOf3 = Math.max(
      highestProductOf3,
      lowestProductOf2 * currentInt,
      highestProductOf2 * currentInt
    )

    highestProductOf2 = Math.max(
      highestProductOf2,
      highestInt * currentInt,
      lowestInt * currentInt,
    )

    lowestProductOf2 = Math.min(
      lowestProductOf2,
      highestInt * currentInt,
      lowestInt * currentInt,
    )

    highestInt = Math.max(highestInt, currentInt)
    lowestInt = Math.min(lowestInt, currentInt)
  }

  return highestProductOf3
}



// Tests
let desc = 'short array';
let actual = highestProductOf3([1, 2, 3, 4]);
let expected = 24;
assertEqual(actual, expected, desc);

desc = 'longer array';
actual = highestProductOf3([6, 1, 3, 5, 7, 8, 2]);
expected = 336;
assertEqual(actual, expected, desc);

desc = 'array has one negative';
actual = highestProductOf3([-5, 4, 8, 2, 3]);
expected = 96;
assertEqual(actual, expected, desc);

desc = 'array has two negatives';
actual = highestProductOf3([-10, 1, 3, 2, -10]);
expected = 300;
assertEqual(actual, expected, desc);

desc = 'array is all negatives';
actual = highestProductOf3([-5, -1, -3, -2]);
expected = -6;
assertEqual(actual, expected, desc);

desc = 'error with empty array';
const emptyArray = () => (highestProductOf3([]));
assertThrowsError(emptyArray, desc);

desc = 'error with one number';
const oneNumber = () => (highestProductOf3([1]));
assertThrowsError(oneNumber, desc);

desc = 'error with two numbers';
const twoNumber = () => (highestProductOf3([1, 1]));
assertThrowsError(twoNumber, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}

function assertThrowsError(func, desc) {
  try {
    func();
    console.log(`${desc} ... FAIL`);
  } catch (e) {
    console.log(`${desc} ... PASS`);
  }
}