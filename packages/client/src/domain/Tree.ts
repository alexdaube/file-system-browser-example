import { AnyNode } from './ITreeNode';

type Node = AnyNode<any>;
type TableType = Map<string, number>;

export default abstract class Tree<T extends Tree<T>> {
  public constructor(
    public nodes: Node[],
    public lookupTable: TableType = new Map<string, number>(),
  ) {}

  public isEmpty() {
    return this.nodes.length === 0;
  }

  public open(node: Node): T {
    const nodeIndex = this.findNodeIndex(node);
    const updatedNode = this.nodes[nodeIndex].open();

    return this.updateNode(updatedNode);
  }

  public close(node: Node): T {
    const nodeIndex = this.findNodeIndex(node);
    const updatedNode = this.nodes[nodeIndex].close();

    return this.updateNode(updatedNode);
  }

  public resetNode(node: Node): T {
    const nodeIndex = this.findNodeIndex(node);
    const updatedNodes = this.nodes.slice();

    updatedNodes[nodeIndex] = updatedNodes[nodeIndex].reset();

    this.forEachChildrenOf(node, (childrenNode, index: number) => {
      updatedNodes[index] = updatedNodes[index].reset();
    });

    return this.updateNodes({
      nodes: updatedNodes,
    });
  }

  public visibleNodes(): Node[] {
    const visibleNodes = new Map<string, Node>(); // <id, Node>
    const lastNodeForNestingLevel = new Map<number, Node>(); // <nestingLevel, Node>

    for (const currentNode of this.nodes) {
      if (
        Tree.shouldNodeBeVisible(
          currentNode,
          lastNodeForNestingLevel,
          visibleNodes,
        )
      ) {
        visibleNodes.set(currentNode.id, currentNode);
      }

      lastNodeForNestingLevel.set(currentNode.nestingLevel, currentNode);
    }

    return Array.from(visibleNodes.values());
  }

  public parentOf(node: Node): Node | undefined {
    const index = this.findNodeIndex(node);

    for (let i = index; i >= 0; --i) {
      const currentNode = this.nodes[i];
      if (currentNode.nestingLevel < node.nestingLevel) {
        return currentNode;
      }
    }

    return undefined;
  }

  public findNodeWhere(callback: (node: Node) => boolean): Node | undefined {
    return this.nodes.find(callback);
  }

  public addChildrenTo(node: Node, nodes: Node[]): T {
    const index = this.findNodeIndex(node);
    const updatedNodes = this.nodes.slice();
    updatedNodes.splice(index + 1, 0, ...nodes);

    return this.updateNodes({ nodes: updatedNodes }).updateLookupTable();
  }

  public updateEveryChildrenWith(
    node: Node,
    callback: (children: Node) => Node,
  ): T {
    const index = this.findNodeIndex(node);
    const updatedNodes = this.nodes.slice();

    for (let i = index + 1; i < this.nodes.length; ++i) {
      const currentNode = this.nodes[i];

      if (currentNode.nestingLevel <= node.nestingLevel) {
        break;
      }

      updatedNodes[i] = callback(currentNode);
    }

    return this.updateNodes({ nodes: updatedNodes });
  }

  public updateNodeWith(node: Node, callback: (node: Node) => Node): T {
    const updatedNode = callback(this.getNodeCurrentState(node));

    return this.updateNode(updatedNode);
  }

  public nodeFor(item: any): Node | undefined {
    return this.nodes.find((node: Node) => node.isNodeFor(item));
  }

  public updateNode(updatedNode: Node): T {
    const nodeIndex = this.findNodeIndex(updatedNode);
    const updatedNodes = this.nodes.slice();

    updatedNodes[nodeIndex] = updatedNode;

    return this.updateNodes({ nodes: updatedNodes });
  }

  public getNodeCurrentState(node: Node): Node {
    return this.nodes[this.findNodeIndex(node)];
  }

  public updateLookupTable(): T {
    this.nodes.forEach((node: Node, index: number) => {
      this.lookupTable.set(node.id, index);
    });

    return this as unknown as T;
  }

  protected findNodeIndex(node: Node): number {
    return this.lookupTable.get(node.id)!;
  }

  protected abstract updateNodes({ nodes }: { nodes: Node[] }): T;

  private forEachChildrenOf(
    node: Node,
    callback: (node: Node, index: number) => void,
  ) {
    const initialIndex = this.findNodeIndex(node);

    for (let i = initialIndex + 1; i < this.nodes.length; ++i) {
      const currentNode = this.nodes[i];

      if (currentNode.nestingLevel <= node.nestingLevel) {
        break;
      }

      callback(currentNode, i);
    }
  }

  private static shouldNodeBeVisible(
    currentNode: Node,
    lastNodeForNestingLevel: Map<number, Node>,
    visibleNodes: Map<string, Node>,
  ) {
    const parentNestingLevel = currentNode.nestingLevel - 1;
    const parentNode = lastNodeForNestingLevel.get(parentNestingLevel);

    if (!parentNode) {
      return true;
    }

    return !!visibleNodes.get(parentNode.id) && parentNode.opened;
  }
}
