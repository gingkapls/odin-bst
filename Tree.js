const Node = require('./Node');

const Tree = (arr) => {
  const isSorted = (arr) => {
    for (let i = 0; i < arr.length - 1; ++i) {
      if (arr.at(i) > arr.at(i + 1)) return false;
    }
    return true;
  };

  const buildTree = (list, start = 0, end = list.length) => {
    if (start >= end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = Node(list.at(mid));

    root.left = buildTree(list, start, mid);
    root.right = buildTree(list, mid + 1, end);

    return root;
  };

  const prettyPrint = (node = tree, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  const insertNode = (val, root = tree) => {
    if (root.right === null && root.data < val) {
      root.right = Node(val);
      return;
    }

    if (root.left === null && root.data > val) {
      root.left = Node(val);
      return;
    }

    if (root.data < val) {
      return insertNode(val, root.right);
    }

    if (root.data > val) {
      return insertNode(val, root.left);
    }

    return false;
  };

  const deleteNode = (root, val) => {
    if (root == null) return root;

    // Our node must be in the left subtree
    if (root.data > val) {
      root.left = deleteNode(root.left, val);
      return root;
    }

    // Our node must be in the right subtree
    if (root.data < val) {
      root.right = deleteNode(root.right, val);
      return root;
    }

    if (root.left === null) {
      root = root.right;
      return root;
    }

    if (root.right === null) {
      root = root.left;
      return root;
    }

    // Our node has children :')
    let succParent = root;
    let succ = root.right;

    while (succ.left !== null) {
      succParent = succ;
      succ = succ.left;
    }

    // They're not their children anymore :(
    root.data = succ.data;
    if (succParent.left === succ) {
      succParent.left = succ.right;
    } else {
      succParent.right = succ.right;
    }

    return root;
  };

  const find = (value, root = tree) => {
    if (root?.data === value || root === null) return root;

    // Value must be in left subtree
    if (root.data > value) {
      return find(value, root.left);
    }

    // Value must be in right subtree;
    if (root.data < value) {
      return find(value, root.right);
    }
  };

  const levelOrder = (callback = null) => {
    const res = [];

    if (callback === null) {
      callback = (node) => res.push(node);
    }

    const q = [tree];
    while (q.length !== 0) {
      const root = q.shift();
      callback(root);
      if (root.left !== null) q.push(root.left);
      if (root.right !== null) q.push(root.right);
    }

    if (res.length !== 0) return res;
  };

  const levelOrderRec = (callback = null, queue = [tree], res = []) => {
    if (queue.length === 0) return;

    if (callback === null) {
      callback = (root) => res.push(root);
    }

    const root = queue.shift();

    if (root.left !== null) queue.push(root.left);
    if (root.right !== null) queue.push(root.right);

    callback(root);
    levelOrderRec(callback, queue, res);
    if (res.length !== 0) return res;
  };

  const inOrder = (callback = null, root = tree, res = []) => {
    if (root === null) return;
    if (callback === null) callback = (root) => res.push(root);

    inOrder(callback, root.left, res);
    callback(root);
    inOrder(callback, root.right, res);

    if (res.length !== 0) return res;
  };

  const preOrder = (callback = null, root = tree, res = []) => {
    if (root === null) return;
    if (callback === null) callback = (node) => res.push(node);

    callback(root);
    inOrder(callback, root.left, res);
    inOrder(callback, root.right, res);

    if (res.length !== 0) return res;
  };

  const postOrder = (callback = null, root = tree, res = []) => {
    if (root === null) return;
    if (callback === null) callback = (node) => res.push(node);

    inOrder(callback, root.left, res);
    inOrder(callback, root.right, res);
    callback(root);

    if (res.length !== 0) return res;
  };
  
  const height = (node = tree) => {
    // Reached a leaf node
    if (node.right === null && node.left === null) return 0;

    const leftHeight = 1 + height(node.left);
    const rightHeight = 1 + height(node.right);
    
    return Math.max(leftHeight, rightHeight);
  }
  
  const depth = (node = tree, root = tree) => {
    if (node === root) return 0;
    let d = 0;
    
    // node is in the right subtree
    if (root.data < node.data) {
      d = 1 + depth(node, root.right);
    }
    
    // node is in left subtree
    if (root.data > node.data) {
      d = 1 + depth(node, root.left);
    }
    
    return d;
    
  }

  const list = isSorted(arr)
    ? [...new Set(arr)]
    : [...new Set(arr.toSorted((a, b) => a - b))];

  const tree = buildTree(list);

  return {
    prettyPrint,
    insertNode,
    deleteNode,
    find,
    levelOrder,
    levelOrderRec,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    get list() {
      return list;
    },
  };
};

module.exports = Tree;
