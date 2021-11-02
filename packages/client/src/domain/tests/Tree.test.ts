import ITreeNodeFixture from '../fixtures/ITreeNodeFixture';
import TreeFixture from '../fixtures/TreeFixture';
import { AnyNode } from '../ITreeNode';

describe('Tree', () => {
  const openedNode = ITreeNodeFixture.with({
    opened: true,
  });
  const childrenNode = ITreeNodeFixture.with({
    nestingLevel: openedNode.nestingLevel + 1,
  });
  const closedNode = ITreeNodeFixture.with({
    opened: false,
  });
  const rootNode = ITreeNodeFixture.with({});

  describe('given root nodes', () => {
    shouldMatchVisibility({
      nodes: [openedNode, closedNode, rootNode],
      expectedVisibleNodes: [openedNode, closedNode, rootNode],
    });
  });

  describe('given opened node with sub nodes', () => {
    shouldMatchVisibility({
      nodes: [openedNode, childrenNode, closedNode],
      expectedVisibleNodes: [openedNode, childrenNode, closedNode],
    });
  });

  describe('given closed nodes with sub nodes', () => {
    shouldMatchVisibility({
      nodes: [closedNode, childrenNode, openedNode],
      expectedVisibleNodes: [closedNode, openedNode],
    });
  });

  describe('given opened node in a closed one', () => {
    const openedSubItemNode = ITreeNodeFixture.with({
      nestingLevel: closedNode.nestingLevel + 1,
      opened: true,
    });

    const nestingSubItemNode = ITreeNodeFixture.with({
      nestingLevel: openedSubItemNode.nestingLevel + 1,
    });

    shouldMatchVisibility({
      nodes: [closedNode, openedSubItemNode, nestingSubItemNode],
      expectedVisibleNodes: [closedNode],
    });
  });

  it('can open a node to set all its direct children visible', () => {
    const tree = TreeFixture.with([openedNode, closedNode]);

    const updatedTree = tree.open(closedNode);

    const updatedClosedFolder = updatedTree.findNode(closedNode.id);
    expect(updatedClosedFolder.opened).toBeTruthy();
  });

  it('can close a node to set all its children hidden', () => {
    const tree = TreeFixture.with([openedNode, closedNode]);

    const updatedTree = tree.close(openedNode);

    const updatedOpenedFolder = updatedTree.findNode(openedNode.id);
    expect(updatedOpenedFolder.opened).toBeFalsy();
  });

  describe('given the tree was update', () => {
    it('can update its lookupTable', () => {
      const tree = TreeFixture.with([openedNode]).updateNodes({
        nodes: [openedNode, childrenNode],
      });

      const updatedTree = tree.updateLookupTable();

      expect(updatedTree.lookupTable.size).toEqual(2);
    });
  });

  it('can find a node given an item', () => {
    const item = {
      id: '3247',
    };
    const node = ITreeNodeFixture.for(item);

    const tree = TreeFixture.with([openedNode, node]);

    expect(tree.nodeFor(item)).toEqual(node);
  });

  describe('given a node', () => {
    let tree: TreeFixture;

    beforeEach(() => {
      tree = TreeFixture.with([closedNode, openedNode, childrenNode]);
    });

    it('can get the parent of it', () => {
      expect(tree.parentOf(childrenNode)).toEqual(openedNode);
    });

    it('can update every children of it', () => {
      const updatedTree = tree.updateEveryChildrenWith(
        openedNode,
        (node: ITreeNodeFixture) => node.close(),
      );

      expect(updatedTree.nodes).toEqual([
        closedNode,
        openedNode,
        childrenNode.close(),
      ]);
    });
  });

  function shouldMatchVisibility({
    nodes,
    expectedVisibleNodes,
  }: {
    nodes: AnyNode<any>[];
    expectedVisibleNodes: AnyNode<any>[];
  }) {
    it('should match visibility', () => {
      const tree = TreeFixture.with(nodes);

      expect(tree.visibleNodes()).toEqual(expectedVisibleNodes);
    });
  }
});
