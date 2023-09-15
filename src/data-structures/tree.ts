import { Nodee } from "./node";

class Tree {
  public root?: Nodee | null;

  constructor() {
    this.root = null;
  }

  traverseBF(fn: (node: Nodee) => void) {
    const arr = [this.root];

    while (arr.length) {
      const node = arr.shift();
      arr.push(...node!.children);

      fn(node!);
    }
  }

  traverseDF(fn: (node: Nodee) => void) {
    return;
  }
}

const _tree = new Tree();
