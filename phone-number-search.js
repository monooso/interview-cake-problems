function solution(names, numbers, fragment) {
  let contactName

  for (let index = 0; index < numbers.length; index++) {
    const currentNumber = numbers[index]
    const currentName = names[index]

    if (!currentNumber.includes(fragment)) {
      continue
    }

    // We could store all of the contact names in an array, sort them at the end,
    // and select the first one. This is a bit more efficient in terms of time
    // and space.
    if (contactName === undefined || currentName < contactName) {
      contactName = currentName
    }
  }

  return contactName || 'NO CONTACT'
}

console.log(solution(['alfa', 'bravo'], ['12345', '23456'], '456'))
console.log(solution(['alfa', 'bravo'], ['12345', '23456'], '123'))
console.log(solution(['alfa', 'bravo'], ['12345', '23456'], '567'))
