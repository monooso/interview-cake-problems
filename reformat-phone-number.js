function solution(unformatted) {
  // Remove anything that is not a digit
  const digits = unformatted.replace(/\D/g, '')
  const digitCount = digits.length
  let head = ''
  let tail = ''
  let endIndex = digitCount

  if (digitCount < 2) {
    throw new Error('Input must contain at least two digits.')
  }

  if (digitCount % 3 === 1) {
    // Must end in 2 blocks of 2 numbers
    tail = digits.substring(digitCount - 4, digitCount - 2) + '-' + digits.substring(digitCount - 2)
    endIndex = digitCount - 4
  }

  if (digitCount % 3 === 2) {
    // Must end in 1 block of 2 numbers
    tail = digits.substring(digitCount - 2)
    endIndex = digitCount - 2
  }

  if (endIndex === 0) {
    return tail
  }

  // We've dealt with the tricky end part. Now split the rest into chunks of 3.
  // We could be fancy and do this with a regex, but this is a bit clearer.
  for (let index = 0; index < endIndex; index++) {
    head += digits[index]

    if ((index + 1) % 3 === 0) {
      head += '-'
    }
  }

  return tail === '' ? head.substring(0, head.length - 1) : head + tail
}

console.log(solution('12'))
console.log(solution('123'))
console.log(solution('1234'))
console.log(solution('123456'))
console.log(solution('00-44  48 5555 8361'))
