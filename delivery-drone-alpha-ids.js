function findUniqueDeliveryId(deliveryIds) {
  const duplicateId = deliveryIds.reduce((carry, id) => carry ^= id.codePointAt(0), 0)
  return String.fromCodePoint(duplicateId)
}

// Tests
let desc = 'one drone';
let actual = findUniqueDeliveryId(['a']);
let expected = 'a';
assertEquals(actual, expected, desc);

desc = 'unique ID comes first';
actual = findUniqueDeliveryId(['a', 'b', 'b']);
expected = 'a';
assertEquals(actual, expected, desc);

desc = 'unique ID comes last';
actual = findUniqueDeliveryId(['a', 'a', 'b', 'b', 'c']);
expected = 'c';
assertEquals(actual, expected, desc);

desc = 'unique ID in middle';
actual = findUniqueDeliveryId(['c', 'b', 'a', 'b', 'c']);
expected = 'a';
assertEquals(actual, expected, desc);

desc = 'many drones';
actual = findUniqueDeliveryId('abcdefghabcdefg'.split(''))
expected = 'h';
assertEquals(actual, expected, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
