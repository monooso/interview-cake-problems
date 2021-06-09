function mergeArrays(alfa, bravo) {
  let alfaIndex = 0
  let bravoIndex = 0
  const merged = []

  while (alfaIndex < alfa.length || bravoIndex < bravo.length) {
    const alfaId = alfa[alfaIndex] || Number.POSITIVE_INFINITY
    const bravoId = bravo[bravoIndex] || Number.POSITIVE_INFINITY

    if (alfaId < bravoId) {
      merged.push(alfaId)
      alfaIndex++
    } else {
      merged.push(bravoId)
      bravoIndex++
    }
  }

  return merged
}

const myArray = [3, 4, 6, 10, 11, 15, 16, 20];
const alicesArray = [1, 5, 8, 12, 14, 19];

console.log(mergeArrays(myArray, alicesArray));
// logs [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]