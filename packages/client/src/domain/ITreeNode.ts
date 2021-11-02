export type AnyNode<T extends ITreeNode<any, T>> = T;

export interface TreeNode<T> {
  id: string;
  name?: string;
  nestingLevel: number;
  opened: boolean;
  isLeaf: boolean;
  loaded: boolean;
}

export default abstract class ITreeNode<T, P extends ITreeNode<T, P>>
  implements TreeNode<T>
{
  public id: string;
  public name?: string;
  public nestingLevel: number;
  public opened: boolean;
  public isLeaf: boolean;
  public loaded: boolean;

  protected constructor({
    id,
    name,
    nestingLevel,
    opened,
    isLeaf,
    loaded,
  }: TreeNode<T>) {
    this.id = id;
    this.name = name;
    this.nestingLevel = nestingLevel;
    this.opened = opened;
    this.isLeaf = isLeaf;
    this.loaded = loaded || false;
  }

  public get displayName(): string {
    return this.name || '';
  }

  public hasLoadedChildren() {
    return this.loaded;
  }

  public completeChildrenLoading() {
    return this.update({ ...this, loaded: true });
  }

  public open() {
    return this.update({ ...this, opened: true });
  }

  public close() {
    return this.update({ ...this, opened: false });
  }

  public isNodeFor(item: TreeNode<T>): boolean {
    return this.id === item.id;
  }

  public abstract update(node: TreeNode<T>): P;

  public reset(): P {
    return this.update({
      ...this,
      opened: false,
    });
  }
}
