class LinkedListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

function reverse(headOfList) {
  let previous = null
  let current = headOfList

  while (current !== null) {
    const oldNext = current.next
    current.next = previous

    previous = current
    current = oldNext
  }

  return previous
}

// Tests
let desc = 'short linked list'
let nodes = valuesToLinkedListNodes([1, 2])
let reversedList = reverse(nodes[0])
assertEquals(isListReversed(reversedList, nodes), true, desc)

desc = 'long linked list'
nodes = valuesToLinkedListNodes([1, 2, 3, 4, 5, 6])
reversedList = reverse(nodes[0])
assertEquals(isListReversed(reversedList, nodes), true, desc)

desc = 'one element linked list'
const node = new LinkedListNode(1)
reversedList = reverse(node)
assertEquals(node.value === reversedList.value && node.next === reversedList.next, true, desc)

desc = 'empty linked list'
reversedList = reverse(null)
assertEquals(reversedList, null, desc)

function valuesToLinkedListNodes(values) {
  const nodes = []
  for (let i = 0; i < values.length; i++) {
    const node = new LinkedListNode(values[i])
    if (i > 0) {
      nodes[i - 1].next = node
    }
    nodes.push(node)
  }
  return nodes
}

function isListReversed(list, originalNodes) {
  let i = originalNodes.length - 1
  while (list != null && i >= 0) {
    if (originalNodes[i] != list) {
      return false
    }
    list = list.next
    i--
  }
  return list == null
}

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`)
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}
