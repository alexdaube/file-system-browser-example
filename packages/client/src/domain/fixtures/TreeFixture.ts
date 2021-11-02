import { AnyNode } from '../ITreeNode';
import Tree from '../Tree';

export default class TreeFixture extends Tree<TreeFixture> {
  public static with(nodes: AnyNode<any>[]) {
    return new TreeFixture(nodes).updateLookupTable();
  }

  public findNode(nodeId: string): AnyNode<any> {
    const index = this.lookupTable.get(nodeId)!;

    return this.nodes[index];
  }

  public updateNodes({
    nodes,
  }: {
    nodes: AnyNode<any>[];
    selectionTable?: Map<string, number>;
  }): TreeFixture {
    return new TreeFixture(nodes, this.lookupTable);
  }
}
