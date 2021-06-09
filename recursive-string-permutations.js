function getPermutations(string) {
  const permutations = new Set()

  if (string.length <= 1) {
    permutations.add(string)
    return permutations
  }

  for (let index = 0; index < string.length; index++) {
    const char = string[index]
    const remainder = string.substring(0, index) + string.substring(index + 1)
    getPermutations(remainder).forEach(p => permutations.add(char + p))
  }

  return permutations
}

// Tests
let desc = 'empty string'
let input = ''
let actual = getPermutations(input)
let expected = new Set([''])
assert(isSetsEqual(actual, expected), desc)

desc = 'one character string'
input = 'a'
actual = getPermutations(input)
expected = new Set(['a'])
assert(isSetsEqual(actual, expected), desc)

desc = 'two character string'
input = 'ab'
actual = getPermutations(input)
expected = new Set(['ab', 'ba'])
assert(isSetsEqual(actual, expected), desc)

desc = 'three character string'
input = 'abc'
actual = getPermutations(input)
expected = new Set(['abc', 'acb', 'bac', 'bca', 'cab', 'cba'])
assert(isSetsEqual(actual, expected), desc)

function isSetsEqual(as, bs) {
  if (as.size !== bs.size) {
    return false
  }
  for (let a of as) {
    if (!bs.has(a)) return false
  }
  return true
}

function assert(condition, desc) {
  if (condition) {
    console.log(`${desc} ... PASS`)
  } else {
    console.log(`${desc} ... FAIL`)
  }
}
