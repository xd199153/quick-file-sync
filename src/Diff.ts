import { FileDirHashTree } from "./FileTree";
interface DiffAction {
  action: "del";
  obj: FileDirHashTree;
}
const diffArray = (tree1: FileDirHashTree[], tree2: FileDirHashTree[]) => {
  const actions: DiffAction[] = [];
  tree1.forEach((x) => {
    const y = tree2.find((y) => x.type === x.type && x.path === y.path);
    if (y) {
      if (x.hash !== y.hash) {
        actions.push(...diffTree(x, y));
      } else {
      }
    } else {
      actions.push({
        action: "del",
        obj: {
          ...x,
          children: [],
        },
      });
    }
  });
  return actions;
};

export const diffTree = (tree1: FileDirHashTree, tree2: FileDirHashTree) => {
  if (tree1.hash === tree2.hash) {
    return [];
  }
  const a = diffArray(tree1.children, tree2.children);
  const b = diffArray(tree2.children, tree1.children);
  return [...a, ...b];
};
