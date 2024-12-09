import { mergeSort } from "./mergeSort.js";
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
  isEqual(node) {
    if (this.root.data === node.data) {
      if (
        this.root.right.data === node.right.data &&
        this.root.left.data === node.left.data
      ) {
        return true;
      }
    }
    return false;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }
  tree(array) {
    let sorrtedArray = mergeSort(array);
    this.root = sortedArrayToBST(sorrtedArray, 0, sorrtedArray.length - 1);
    return this.root;
  }
  preOrder(root) {
    if (root === null) return;
    console.log(root.data);
    preOrder(root.left);
    preOrder(root.right);
  }

  insert(value, temp = this.root) {
    if (!temp) {
      temp = value;
      return;
    }
    if (temp.data === value) {
      return;
    } else if (temp.data > value) {
      if (!temp.left) {
        temp.left = new Node(value);
        return;
      }
      this.insert(value, temp.left);
    } else {
      if (!temp.right) {
        temp.right = new Node(value);
        return;
      }
      this.insert(value, temp.right);
    }
  }
  delete(value, temp = this.root, toBeMoved = null) {
    if (!temp) {
      return;
    }
    if (temp.data === value && temp.left && temp.right) {
      let smallest = this.findTheSmallest(temp.right);
      temp.data = smallest.data;
      if (smallest.right) {
        smallest.data = smallest.right.data;
        smallest.left = smallest.right.left;
        smallest.right = null;
      }
      return;
    }
    if (temp.data > value) {
      if (temp.left && !temp.left.left && !temp.left.right) {
        if (temp.left.data === value) {
          temp.left = null;
          return;
        } else {
          console.log("hello");
        }
      }
      this.delete(value, temp.left, toBeMoved);
    } else {
      if (
        temp.right &&
        temp.right.data === value &&
        !temp.right.right &&
        !temp.right.left
      ) {
        temp.right = null;
        return;
      }
      this.delete(value, temp.right, toBeMoved);
    }
  }
  findTheSmallest(temp = this.root.right, smallest = null) {
    if (!temp) {
      return smallest;
    }
    if (!smallest || temp.data < smallest.data) {
      smallest = temp;
    }
    return this.findTheSmallest(temp.left, smallest);
  }
  find(value, temp = this.root) {
    if (!temp) return false;
    if (temp.data === value) {
      return temp;
    }
    if (temp.data > value) {
      return this.find(value, temp.left);
    } else {
      return this.find(value, temp.right);
    }
  }

  levelOrderCall(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }
    let result = [];
    let level = 0;
    let node = this.root;
    function levelOrder(temp, level) {
      if (!temp) {
        return;
      }
      if (!result[level]) {
        result[level] = [];
      }
      result[level].push(temp.data);
      levelOrder(temp.left, level + 1);
      levelOrder(temp.right, level + 1);
    }
    levelOrder(node, level);
    for (let levelNodes of result) {
      for (let node of levelNodes) {
        callback(node);
      }
    }
  }
  inorderCall(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }
    let result = [];
    let nodes = this.root;

    function inorder(temp = nodes) {
      if (temp !== null) {
        inorder(temp.left);
        result.push(temp.data);
        //console.log(temp.data + " ");
        inorder(temp.right);
      }
    }
    inorder();
    for (let node of result) {
      callback(node);
    }
  }
  preOrderCall(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }
    let result = [];
    let nodes = this.root;

    function preOrder(temp = nodes) {
      if (temp !== null) {
        result.push(temp.data);
        preOrder(temp.left);
        //console.log(temp.data + " ");
        preOrder(temp.right);
      }
    }
    preOrder();
    for (let node of result) {
      callback(node);
    }
  }
  postOrderCall(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }
    let result = [];
    let nodes = this.root;

    function postOrder(temp = nodes) {
      if (temp !== null) {
        postOrder(temp.left);
        //console.log(temp.data + " ");
        postOrder(temp.right);
        result.push(temp.data);
      }
    }
    postOrder();
    for (let node of result) {
      callback(node);
    }
  }
  height(node = this.root) {
    let level = 0;
    let result = 0;

    function helperMethod(node, level) {
      if (result <= level) {
        result = level - 1;
      }
      if (!node) {
        //console.log(result);
        return result;
      }
      helperMethod(node.left, level + 1);
      helperMethod(node.right, level + 1);
      return result;
    }

    return helperMethod(node, level);
  }
  depth(node = this.root) {
    let level = 0;
    let result = 0;
    let root = this.root;

    function helperMethod(temp, level) {
      if (!temp) {
        result = -1;
        return result;
      }
      if (temp.data === node.data) {
        result = level;
        return result;
      }
      let left = helperMethod(temp.left, level + 1);
      if (left !== -1) {
        return result;
      }
      helperMethod(temp.right, level + 1);
      return result;
    }
    return helperMethod(root, level);
  }
  isBalanced(temp = this.root) {
    if (!temp) {
      return true;
    }
    let left = this.height(this.root.left);
    let right = this.height(this.root.right);

    if (
      Math.abs(left - right) <= 1 &&
      this.isBalanced(temp.right) &&
      this.isBalanced(temp.right)
    ) {
      return true;
    }
    return false;
  }
  reBalence() {
    if (!this.isBalanced()) {
      let newArray = [];
      this.inorderCall((node) => {
        newArray.push(node);
      });
      console.log(newArray);
      this.tree(newArray);
    }
  }
}

function sortedArrayToBST(array, start, end) {
  if (start > end) return null;

  // Find the middle element
  let mid = start + Math.floor((end - start) / 2);

  let root = new Node(array[mid]);

  root.left = sortedArrayToBST(array, start, mid - 1);
  root.right = sortedArrayToBST(array, mid + 1, end);

  return root;
}

export {Tree,Node}
