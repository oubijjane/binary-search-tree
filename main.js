let newTree = new Tree();
newTree.tree([1, 7, 4, 23, 8, 9, 4, 3]);

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
let node = new Node();
node.data = 7;
node.left = 4;
node.right = 9;
console.log("balancing result: " + newTree.reBalence());
prettyPrint(newTree.root);

console.log("find 5:" + newTree.find(8));

let node2 = new Node();
node2.data = 100;
node2.left = 5;
node2.right = 10;
import { Tree,Node } from "./bts.js";