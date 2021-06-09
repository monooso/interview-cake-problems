class GraphNode {
  constructor(label) {
    this.label = label
    this.neighbors = new Set()
    this.color = null
  }
}

function colorGraph(graph, colors) {
  for (node of graph) {
    const usedColors = new Set()

    for (neighbor of node.neighbors) {
      if (neighbor === node) throw new Error('Cannot colour a loop graph')
      usedColors.add(neighbor.color)
    }

    for (color of colors) {
      if (!usedColors.has(color)) {
        node.color = color
        break
      }
    }
  }

  return graph
}


// Tests
const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'white']

let graph = []
{
  const nodeA = new GraphNode('A')
  const nodeB = new GraphNode('B')
  const nodeC = new GraphNode('C')
  const nodeD = new GraphNode('D')
  nodeA.neighbors.add(nodeB)
  nodeB.neighbors.add(nodeA)
  nodeB.neighbors.add(nodeC)
  nodeC.neighbors.add(nodeB)
  nodeC.neighbors.add(nodeD)
  nodeD.neighbors.add(nodeC)
  graph = [nodeA, nodeB, nodeC, nodeD]
}
colorGraph(graph, colors)
assertEqual(validateGraphColoring(graph), true, 'line graph')

{
  const nodeA = new GraphNode('A')
  const nodeB = new GraphNode('B')
  const nodeC = new GraphNode('C')
  const nodeD = new GraphNode('D')
  nodeA.neighbors.add(nodeB)
  nodeB.neighbors.add(nodeA)
  nodeC.neighbors.add(nodeD)
  nodeD.neighbors.add(nodeC)
  graph = [nodeA, nodeB, nodeC, nodeD]
}
colorGraph(graph, colors)
assertEqual(validateGraphColoring(graph), true, 'separate graph')

{
  const nodeA = new GraphNode('A')
  const nodeB = new GraphNode('B')
  const nodeC = new GraphNode('C')
  nodeA.neighbors.add(nodeB)
  nodeA.neighbors.add(nodeC)
  nodeB.neighbors.add(nodeA)
  nodeB.neighbors.add(nodeC)
  nodeC.neighbors.add(nodeA)
  nodeC.neighbors.add(nodeB)
  graph = [nodeA, nodeB, nodeC]
}
colorGraph(graph, colors)
assertEqual(validateGraphColoring(graph), true, 'triangle graph')

{
  const nodeA = new GraphNode('A')
  const nodeB = new GraphNode('B')
  const nodeC = new GraphNode('C')
  const nodeD = new GraphNode('D')
  const nodeE = new GraphNode('E')
  nodeA.neighbors.add(nodeB)
  nodeA.neighbors.add(nodeC)
  nodeB.neighbors.add(nodeA)
  nodeB.neighbors.add(nodeC)
  nodeB.neighbors.add(nodeD)
  nodeB.neighbors.add(nodeE)
  nodeC.neighbors.add(nodeA)
  nodeC.neighbors.add(nodeB)
  nodeC.neighbors.add(nodeD)
  nodeC.neighbors.add(nodeE)
  nodeD.neighbors.add(nodeB)
  nodeD.neighbors.add(nodeC)
  nodeD.neighbors.add(nodeE)
  nodeE.neighbors.add(nodeB)
  nodeE.neighbors.add(nodeC)
  nodeE.neighbors.add(nodeD)
  graph = [nodeA, nodeB, nodeC, nodeD, nodeE]
}
colorGraph(graph, colors)
assertEqual(validateGraphColoring(graph), true, 'envelope graph')

{
  const nodeA = new GraphNode('A')
  nodeA.neighbors.add(nodeA)
  graph = [nodeA]
}
assertThrows(() => {
  colorGraph(graph, colors)
}, 'loop graph')

function validateGraphColoring(graph) {

  const maxDegree = Math.max(...graph.map(node => node.neighbors.size))

  const colorsUsed = new Set()

  graph.forEach(node => {
    colorsUsed.add(node.color)
  })

  if (colorsUsed.has(null)) {
    return false
  }

  if (colorsUsed.size > maxDegree + 1) {
    return false
  }

  let badEdges = 0

  graph.forEach(node => {
    node.neighbors.forEach(neighbor => {
      if (neighbor.color === node.color) {
        badEdges += 1
      }
    })
  })

  if (badEdges > 0) {
    return false
  }

  return true
}

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`)
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}

function assertThrows(func, desc) {
  try {
    func()
    console.log(`${desc} ... FAIL`)
  } catch (e) {
    console.log(`${desc} ... PASS`)
  }
}
