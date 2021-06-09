// A simple, somewhat inefficient queue implementation
class Queue {
  constructor() {
    this.queue = [];
    this.size = 0;
  }

  enqueue(item) {
    this.queue.unshift(item);
    this.size += 1;
  }

  dequeue() {
    this.size -= 1;
    return this.queue.pop();
  }
}

function reconstructPath(routes, startNode, endNode) {
  const path = []
  let currentNode = endNode

  while (currentNode !== null) {
    path.push(currentNode)
    currentNode = routes[currentNode]
  }

  return path.reverse()
}

function getPath(graph, startNode, endNode) {
  if (!graph.hasOwnProperty(startNode)) {
    throw new Error(`${startNode} does not exist in graph`)
  }

  if (!graph.hasOwnProperty(endNode)) {
    throw new Error(`${endNode} does not exist in graph`)
  }

  // Keep track of the previous step for each node we visit.
  //
  // This works because we're doing a breadth-first search. Whatever route we
  // take to get to a node is automatically the shortest, so we just need to
  // keep track of the previous step, and then retrace the breadcrumbs.
  const routes = {}
  routes[startNode] = null

  const queue = new Queue()
  queue.enqueue(startNode)

  while (queue.size) {
    const node = queue.dequeue()

    if (node === endNode) {
      // Reconstruct the path using the routes object
      return reconstructPath(routes, startNode, endNode)
    }

    // Add unvisited nearby users
    graph[node].forEach(neighbor => {
      // Check if we've already visited this neighbor
      if (routes.hasOwnProperty(neighbor)) return

      // Make a note of how we got to the neighbor
      routes[neighbor] = node

      // Add the neighbor to the queue
      queue.enqueue(neighbor)
    })
  }

  return null
}


// Tests
const graph = {
  'a': ['b', 'c', 'd'],
  'b': ['a', 'd'],
  'c': ['a', 'e'],
  'd': ['a', 'b'],
  'e': ['c'],
  'f': ['g'],
  'g': ['f']
};

let desc = 'two hop path 1';
let actual = getPath(graph, 'a', 'e');
let expected = ['a', 'c', 'e'];
assertDeepEqual(actual, expected, desc);

desc = 'two hop path 2';
actual = getPath(graph, 'd', 'c');
expected = ['d', 'a', 'c'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 1';
actual = getPath(graph, 'a', 'c');
expected = ['a', 'c'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 2';
actual = getPath(graph, 'f', 'g');
expected = ['f', 'g'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 3';
actual = getPath(graph, 'g', 'f');
expected = ['g', 'f'];
assertDeepEqual(actual, expected, desc);

desc = 'zero hop path';
actual = getPath(graph, 'a', 'a');
expected = ['a'];
assertDeepEqual(actual, expected, desc);

desc = 'no path';
actual = getPath(graph, 'a', 'f');
expected = null;
assertDeepEqual(actual, expected, desc);

desc = 'start node not present';
assertThrowsError(() => {
  getPath(graph, 'h', 'a');
}, desc);

desc = 'end node not present';
assertThrowsError(() => {
  getPath(graph, 'a', 'h');
}, desc);

function assertDeepEqual(a, b, desc) {
  const aStr = JSON.stringify(a);
  const bStr = JSON.stringify(b);
  if (aStr !== bStr) {
    console.log(`${desc} ... FAIL: ${aStr} != ${bStr}`);
  } else {
    console.log(`${desc} ... PASS`);
  }
}

function assertThrowsError(func, desc) {
  try {
    func();
    console.log(`${desc} ... FAIL`);
  } catch (e) {
    console.log(`${desc} ... PASS`);
  }
}
