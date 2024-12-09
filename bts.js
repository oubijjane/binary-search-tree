import { mergeSort } from "./mergeSort.js";
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
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
  height(node) {
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

let newTree = new Tree();
newTree.tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

function preOrder(root) {
  if (root === null) return;
  console.log(root.data);
  preOrder(root.left);
  preOrder(root.right);
}
function inorder(root) {
  if (root !== null) {
    inorder(root.left);
    console.log(root.data + " ");
    inorder(root.right);
  }
}

//preOrder(newTree.root);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
newTree.insert(10);
newTree.insert(22);
/* newTree.insert(0);
newTree.insert(2); */
newTree.insert(100);
newTree.insert(6346);
newTree.insert(20);
newTree.insert(21);
/* newTree.delete(0);
newTree.delete(2);*/
//newTree.delete(8);
//newTree.delete(4);
inorder(newTree.root);
newTree.delete(23);
console.log("smallest: " + newTree.findTheSmallest(newTree.root.left).data);
inorder(newTree.root);
prettyPrint(newTree.root);
console.log("getting the height: " + newTree.height(newTree.root));

console.log("find 5:" + newTree.find(8));
