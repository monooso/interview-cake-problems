function binarySearch(target, items) {
  let lowerBound = 0
  let upperBound = items.length - 1

  while (lowerBound <= upperBound) {
    const midpoint = Math.floor(lowerBound + ((upperBound - lowerBound) / 2))
    const midValue = items[midpoint]

    if (midValue === target) {
      return midpoint
    }

    if (midValue < target) {
      lowerBound = midpoint + 1
    } else {
      upperBound = midpoint - 1
    }
  }

  return -1
}

module.exports = binarySearch

function checkResult(testName, expected, actual) {
  if (expected === actual) {
    console.info(`👍 ${testName}`)
  } else {
    console.error(`🚨 ${testName}. Expected ${expected}, got ${actual}`)
  }
}

checkResult('One item array', 0, binarySearch('a', ['a']))
checkResult('Two item array, first index', 0, binarySearch('a', ['a', 'b']))
checkResult('Two item arrayo, second index', 1, binarySearch('b', ['a', 'b']))
checkResult('Long array, first item', 0, binarySearch('a', ['a', 'b', 'c', 'd']))
checkResult('Long array, second item', 1, binarySearch('b', ['a', 'b', 'c', 'd']))
checkResult('Long array, third item', 2, binarySearch('c', ['a', 'b', 'c', 'd']))
checkResult('Long array, fourth item', 3, binarySearch('d', ['a', 'b', 'c', 'd']))
checkResult('Item not present', -1, binarySearch('e', ['a', 'b', 'c', 'd']))