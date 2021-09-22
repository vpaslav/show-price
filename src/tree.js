/**
 * Main purpose of this class is to structure incoming data into a tree, like,
 *
 * env
 *   |_ service 1
 *          |_ instanceId 1: key: name, value: price
 *          |_ instanceId 2: key: name, value: price
 *   |_ service 2
 *          |_ instanceId 3: key: name, value: price
 *          |_ instanceId 4: key: name, value: price
 *
 * Then summarize them and print to a terminal, by a path pattern.
 * Path pattern determines which tree parts to display:
 * - '*' means - display only root nodes
 * - '*.*' means - display root nodes and level 1 children, etc
 */
class TreeNode {
  /**
   * Takes a key and a parent node to build a tree. If parent is null then it's
   * considered a root node
   *
   * @param {string} key node key
   * @param {TreeNode} parent  TreeNode parent instance
   */
  constructor(key, parent=null) {
    this.key = key;
    this.path = parent ? `${parent.path}.${key}` : '';
    this.value = null;
    this.children = [];
  }
  /**
   * Verify if node has children
   *
   * @return {boolean} true if node has no children
   */
  isLeaf() {
    return this.children.length <= 0;
  }
  /**
   * Looks for a node's child with a specified key
   *
   * @param {string} key a child's key string.
   * @return {TreeNode} instance of a found child
   */
  getChild(key) {
    return this.children.find((node) => node.key === key);
  }
  /**
   * Add a child to this node's children
   *
   * @param {string} key child's key
   * @return {TreeNode} added child
   */
  addChild(key) {
    const ind = this.children.push(new TreeNode(key, this));
    return this.children[ind - 1];
  }
  /**
   * Add child node by a specified path if none is found otherwise do nothing
   *
   * @param {string} path address of a node in a tree. Example: 'env', 'env.service'
   * @return {TreeNode} added node
   */
  addNodesByPath(path) {
    let node = this;
    path.split('.').forEach((key) => {
      const child = node.getChild(key);
      if (!child) node = node.addChild(key);
      else node = child;
    });
    return node;
  }
  /**
   * Recursively iterates over a tree and calculate price of each node
   *
   * @param {TreeNode} node a root node of a tree
   * @return {number} recursively returns a number
   */
  static summarizePrice(node) {
    if (node.isLeaf()) return Number(node.value);
    for (const child of node.children) {
      node.value += TreeNode.summarizePrice(child);
    }
    return Number(node.value);
  }
  /**
   * Recursively iterates over a tree limited by a specified path regexp
   * and prints node's price to a console
   *
   * @param {TreeNode} node should be a root node
   * @param {RegExp} pathRegexp a path regexp, like '^\*.*\$'
   */
  static displayPrice(node, pathRegexp) {
    if (node.path.match(pathRegexp)) {
      console.log(`${node.path} = ${node.value}`);
    }
    for (const child of node.children) {
      TreeNode.displayPrice(child, pathRegexp);
    }
  }
  /**
   * Mainly wrapper around a TreeNode.displayPrice, just converts pathPattern string
   * into correct regexp
   *
   * @param {TreeNode} node should be a root node
   * @param {string} pathPattern a string like, '*' or '*.*' or '*.*.*'
   */
  static processPath(node, pathPattern) {
    pathPattern = pathPattern.replaceAll('.', '\\.');
    pathPattern = pathPattern.replaceAll('*', '[^.]+');
    TreeNode.displayPrice(node, new RegExp(`^\.${pathPattern}$`, 'gi'));
  }
}

export {TreeNode};
