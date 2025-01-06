const { NotImplementedError } = require('../extensions/index.js');

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

    if (this._root === null) {
      this._root = newNode;
      return;
    }

    let current = this._root;
    while (true) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this._root;
    
    while (current !== null) {
      if (data === current.data) {
        return current;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    
    return null;
  }

  remove(data) {
    const removeNode = (node, value) => {
      if (node === null) {
          return null;
      }

      if (value === node.data) {
          if (node.left === null && node.right === null) {
              return null;
          }

          if (node.left === null) return node.right;
          if (node.right === null) return node.left;
          
          let current = node.right;
          while (current.left !== null) {
              current = current.left;
          }
          node.data = current.data;
          node.right = removeNode(node.right, current.data);
          return node;
      }

      if (value < node.data) {
          node.left = removeNode(node.left, value);
      } else {
          node.right = removeNode(node.right, value);
      }
      return node;
    };

    this._root = removeNode(this._root, data);
  }

  min() {
    if (!this._root) return null;
    
    let current = this._root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this._root) return null;
    
    let current = this._root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};