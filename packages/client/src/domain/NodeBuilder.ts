import ITreeNode from './ITreeNode';

export default abstract class NodeBuilder<T, N extends ITreeNode<T, N>> {
  private nestingLevel = 0;
  private isOpened?: boolean;
  private isLeaf?: boolean;
  private item: T | undefined;
  private contentLoaded = false;

  public for(item: T) {
    this.item = item;

    return this;
  }

  public withNestingLevel(nestingLevel: number) {
    this.nestingLevel = nestingLevel;

    return this;
  }

  public withChildren() {
    this.isLeaf = false;
    return this;
  }

  public opened() {
    this.isOpened = true;
    return this;
  }

  public closed() {
    this.isOpened = false;
    return this;
  }

  public withChildrenLoaded() {
    this.contentLoaded = true;
    return this;
  }

  public build(): N {
    const node = this.from(
      this.item || this.default(),
      this.nestingLevel,
      this.contentLoaded || false,
    );

    node.opened = this.isOpened || false;
    if (this.isLeaf !== undefined) {
      node.isLeaf = this.isLeaf;
    }

    return node;
  }

  protected abstract from(
    item: T,
    nestingLevel: number,
    contentLoaded: boolean | undefined,
  ): N;

  protected abstract default(): T;
}
