function findUniqueDeliveryId(deliveryIds) {
  return deliveryIds.reduce((carry, id) => carry ^= id, 0)
}

// Tests
let desc = 'one drone';
let actual = findUniqueDeliveryId([1]);
let expected = 1;
assertEquals(actual, expected, desc);

desc = 'unique ID comes first';
actual = findUniqueDeliveryId([1, 2, 2]);
expected = 1;
assertEquals(actual, expected, desc);

desc = 'unique ID comes last';
actual = findUniqueDeliveryId([3, 3, 2, 2, 1]);
expected = 1;
assertEquals(actual, expected, desc);

desc = 'unique ID in middle';
actual = findUniqueDeliveryId([3, 2, 1, 2, 3]);
expected = 1;
assertEquals(actual, expected, desc);

desc = 'many drones';
actual = findUniqueDeliveryId([2, 5, 4, 8, 6, 3, 1, 4, 2, 3, 6, 5, 1]);
expected = 8;
assertEquals(actual, expected, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
