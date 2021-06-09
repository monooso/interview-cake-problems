function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

function shuffle(items) {
  const itemsCount = items.length

  if (itemsCount <= 1) {
    return
  }

  for (let index = 0; index < itemsCount; index++) {
    const swapIndex = getRandom(index, itemsCount - 1)
    const tempValue = items[swapIndex]

    items[swapIndex] = items[index]
    items[index] = tempValue
  }
}

const sample = [1, 2, 3, 4, 5];
console.log('Initial array: ', sample);
shuffle(sample);
console.log('Shuffled array: ', sample);
