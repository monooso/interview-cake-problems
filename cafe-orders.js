function isFirstComeFirstServed(takeOutOrders, dineInOrders, servedOrders) {
  let takeOutIndex = 0
  let dineInIndex = 0

  if (takeOutOrders.length + dineInOrders.length !== servedOrders.length) {
    return false
  }

  for (let servedIndex = 0; servedIndex < servedOrders.length; servedIndex++) {
    const takeOutOrder = takeOutOrders[takeOutIndex]
    const dineInOrder = dineInOrders[dineInIndex]
    const servedOrder = servedOrders[servedIndex]

    if (takeOutOrder !== servedOrder && dineInOrder !== servedOrder) {
      return false
    }

    (takeOutOrder === servedOrder) ? takeOutIndex++ : dineInIndex++
  }

  return true;
}


// Tests
let desc = 'both registers have same number of orders';
let actual = isFirstComeFirstServed([1, 4, 5], [2, 3, 6], [1, 2, 3, 4, 5, 6]);
assertEquals(actual, true, desc);

desc = 'registers have different lengths';
actual = isFirstComeFirstServed([1, 5], [2, 3, 6], [1, 2, 6, 3, 5]);
assertEquals(actual, false, desc);

desc = 'one register is empty';
actual = isFirstComeFirstServed([], [2, 3, 6], [2, 3, 6]);
assertEquals(actual, true, desc);

desc = 'served orders is missing orders';
actual = isFirstComeFirstServed([1, 5], [2, 3, 6], [1, 6, 3, 5]);
assertEquals(actual, false, desc);

desc = 'served orders has extra orders';
actual = isFirstComeFirstServed([1, 5], [2, 3, 6], [1, 2, 3, 5, 6, 8]);
assertEquals(actual, false, desc);

desc = 'one register has extra orders';
actual = isFirstComeFirstServed([1, 9], [7, 8], [1, 7, 8]);
assertEquals(actual, false, desc);

desc = 'one register has unserved orders';
actual = isFirstComeFirstServed([55, 9], [7, 8], [1, 7, 8, 9]);
assertEquals(actual, false, desc);

desc = 'order numbers are not sequential';
actual = isFirstComeFirstServed([27, 12, 18], [55, 31, 8], [55, 31, 8, 27, 12, 18]);
assertEquals(actual, true, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}