const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addWithin(this.rootNode, data);

    function addWithin(params, value) {
      if (!params) return new Node(value);
      if (params.value === value) return params;

      value < params.value
        ? params.left = addWithin(params.left, value)
        : params.right = addWithin(params.right, value);

      return params;
    }
  }

  has(data) {
    return searchWithin(this.rootNode, data);

    function searchWithin(params, value) {
      if (!params) {
        return false;
      }
      if (params.value === value) {
        return true;
      }

      return (value < params.value)
        ? searchWithin(params.left, value)
        : searchWithin(params.right, value);
    }
  }

  find(data) {
    return findWithin(this.rootNode, data);

    function findWithin(params, value) {
      if (!params) {
        return null;
      }
      if (params.value === value) {
        return params;
      }
      return (value < params.value)
        ? findWithin(params.left, value)
        : findWithin(params.right, value);
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(params, value) {
      if (!params) return null;

      if (value < params.value) {
        params.left = removeNode(params.left, value);
        return params;
      } else if (value > params.value) {
        params.right = removeNode(params.right, value);
        return params;
      } else {
        if (!params.right && !params.left) {
          return null;
        }
        if (!params.left) {
          params = params.right;
          return params;
        }
        if (!params.right) {
          params = params.left;
          return params;
        }
        let minFormRight = params.right;
        while (minFormRight.left) {
          minFormRight = minFormRight.left
        }
        params.value = minFormRight.value;
        params.right = removeNode(params.right, minFormRight.value);
        return params;
      }
    }
  }

  min() {
    if (!this.rootNode) {
      return;
    }
    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }
    return node.value;
  }

  max() {
    if (!this.rootNode) {
      return;
    }
    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }
    return node.value;
  }
}

module.exports = {
  BinarySearchTree
};