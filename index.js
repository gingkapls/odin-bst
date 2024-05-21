const Tree = require('./Tree');

const tree = Tree([1, 4, 5, 3, 2, 7, 8, 9, 12, 14, 15, 16, 17, 18, 19]); // 10, 11, 13, 14]);
tree.insertNode(20);
tree.insertNode(21);
tree.insertNode(33);
tree.insertNode(83);
tree.insertNode(23);
tree.insertNode(53);
tree.insertNode(13);
tree.insertNode(133);
tree.insertNode(93);
tree.insertNode(233);


tree.deleteNode(4);
tree.deleteNode(14);
tree.deleteNode(15);
tree.deleteNode(17);
tree.deleteNode(18);


console.log(tree.list);
tree.prettyPrint();
