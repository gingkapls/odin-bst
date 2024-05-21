const Tree = require('./Tree');

const randomArr = (n) => Array.from({length: n}, () => Math.trunc(Math.random() * 100));


const tree = Tree(randomArr(100));
console.log(`is balanced: ${tree.isBalanced()}`);
console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());

tree.insertNode(101);
tree.insertNode(102);
tree.insertNode(105);
tree.insertNode(109);
tree.insertNode(104);
tree.insertNode(129);
tree.insertNode(111);

console.log(tree.isBalanced());
tree.balance();
console.log(tree.isBalanced());


console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());


