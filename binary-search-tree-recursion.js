/**
 * Write a function to check that a binary tree is a valid binary search tree.
 */

class BinaryTreeNode {
  constructor(value) {
    this.value = value
    this.left  = null
    this.right = null
  }

  insertLeft(value) {
    this.left = new BinaryTreeNode(value)
    return this.left
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value)
    return this.right
  }
}

function isBinarySearchTree(root, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
  if (root === null) {
    return true
  }

  if (root.value < min || root.value > max) {
    return false
  }

  return (
    isBinarySearchTree(root.left, min, root.value) &&
    isBinarySearchTree(root.right, root.value, max)
  )
}

// Tests
let desc = 'valid full tree'
let treeRoot = new BinaryTreeNode(50)
let leftNode = treeRoot.insertLeft(30)
leftNode.insertLeft(10)
leftNode.insertRight(40)
let rightNode = treeRoot.insertRight(70)
rightNode.insertLeft(60)
rightNode.insertRight(80)
assertEquals(isBinarySearchTree(treeRoot), true, desc)

desc = 'both subtrees valid'
treeRoot = new BinaryTreeNode(50)
leftNode = treeRoot.insertLeft(30)
leftNode.insertLeft(20)
leftNode.insertRight(60)
rightNode = treeRoot.insertRight(80)
rightNode.insertLeft(70)
rightNode.insertRight(90)
assertEquals(isBinarySearchTree(treeRoot), false, desc)

desc = 'deep invalid'
treeRoot = new BinaryTreeNode(50)
leftNode = treeRoot.insertLeft(30)
leftNode.insertLeft(20)
leftNode.insertRight(40)
leftNode.left.insertRight(35);        // Invalid
rightNode = treeRoot.insertRight(80)
rightNode.insertLeft(70)
rightNode.insertRight(90)
assertEquals(isBinarySearchTree(treeRoot), false, desc)

desc = 'descending linked list'
treeRoot = new BinaryTreeNode(50)
leftNode = treeRoot.insertLeft(40)
leftNode = leftNode.insertLeft(30)
leftNode = leftNode.insertLeft(20)
leftNode = leftNode.insertLeft(10)
assertEquals(isBinarySearchTree(treeRoot), true, desc)

desc = 'out of order linked list'
treeRoot = new BinaryTreeNode(50)
rightNode = treeRoot.insertRight(70)
rightNode = rightNode.insertRight(60)
rightNode = rightNode.insertRight(80)
assertEquals(isBinarySearchTree(treeRoot), false, desc)

desc = 'one node tree'
treeRoot = new BinaryTreeNode(50)
assertEquals(isBinarySearchTree(treeRoot), true, desc)

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`)
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}
