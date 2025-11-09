const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this._root) {
      this._root = newNode;
      return;
    }

    let currentNode = this._root;
    while (currentNode) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  find(data) {
    let currentNode = this._root;
    while (currentNode) {
      if (data === currentNode.data) return currentNode;
      else if (data < currentNode.data) currentNode = currentNode.left;
      else currentNode = currentNode.right;
    }

    return null;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let currentNode = node.right;
        while (currentNode.left !== null) currentNode = currentNode.left;
        node.data = currentNode.data;
        node.right = removeNode(node.right, currentNode.data);
      }

      return node;
    };

    this._root = removeNode(this._root, data);    
  }

  min() {
    if (!this._root) return null;

    let currentNode = this._root;
    while(currentNode.left) currentNode = currentNode.left;

    return currentNode.data;
  }

  max() {
    if (!this._root) return null;

    let currentNode = this._root;
    while(currentNode.right) currentNode = currentNode.right;

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};