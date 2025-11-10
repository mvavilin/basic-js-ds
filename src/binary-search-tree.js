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
    this._root = this._addNode(this._root, data);
  }

  find(data) {
    return this._findNode(this._root, data);
  }

  has(data) {
    return this._hasNode(this._root, data);
  }

  remove(data) {
    this._root = this._removeNode(this._root, data);
  }

  min() {
    if (!this._root) return null;
    let node = this._root;
    while (node.left) node = node.left;
    return node.data;
  }

  max() {
    if (!this._root) return null;
    let node = this._root;
    while (node.right) node = node.right;
    return node.data;
  }

  _addNode(node, data) {
    if (!node) return new Node(data);
    if (data === node.data) return node;
    if (data < node.data) node.left = this._addNode(node.left, data);
    else node.right = this._addNode(node.right, data);
    return node;
  }

  _hasNode(node, data) {
    if (!node) return false;
    if (data === node.data) return true;
    if (data < node.data) return this._hasNode(node.left, data);
    else return this._hasNode(node.right, data);
  }

  _findNode(node, data) {
    if (!node) return null;
    if (data === node.data) return node;
    if (data < node.data) return this._findNode(node.left, data);
    else return this._findNode(node.right, data);
  }

  _removeNode(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (node.data < data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let minFromRight = node.right;
      while (minFromRight.left) minFromRight = minFromRight.left;
      node.data = minFromRight.data;
      node.right = this._removeNode(node.right, minFromRight.data);
      return node;
    }
  }
}

module.exports = {
  BinarySearchTree
};