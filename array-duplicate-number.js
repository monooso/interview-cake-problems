function findRepeat(numbers) {
  const length = numbers.length

  if (length < 2) {
    throw new Error('Cannot find a duplicate in a single item list')
  }

  /**
   * (n * n + n) / 2 gives us the sum of 1..n numbers
   *
   * One of the numbers is repeated, so we must be missing the largest number
   * in the sequence (n).
   */
  const correctTotal = ((length**2 + length) / 2) - length

  // Calculate the actual total
  const actualTotal = numbers.reduce((carry, current) => carry + current, 0)

  // The repeated number is the difference
  return Math.abs(correctTotal - actualTotal)
}

// Tests
let desc = 'short array'
let actual = findRepeat([1, 2, 1])
let expected = 1
assertEqual(actual, expected, desc)

desc = 'medium array'
actual = findRepeat([4, 1, 3, 4, 2])
expected = 4
assertEqual(actual, expected, desc)

desc = 'long array'
actual = findRepeat([1, 5, 9, 7, 2, 6, 3, 8, 2, 4])
expected = 2
assertEqual(actual, expected, desc)

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`)
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}

function assertThrowsError(func, desc) {
  try {
    func()
    console.log(`${desc} ... FAIL`)
  } catch (e) {
    console.log(`${desc} ... PASS`)
  }
}
