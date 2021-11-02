import { v4 as uuid } from 'uuid';
import ITreeNode, { TreeNode } from '../ITreeNode';

export default class ITreeNodeFixture extends ITreeNode<any, ITreeNodeFixture> {
  public static with(config: Partial<TreeNode<any>>) {
    return new ITreeNodeFixture({
      id: uuid(),
      name: '',
      nestingLevel: 0,
      opened: false,
      isLeaf: false,
      loaded: false,
      ...config,
    });
  }

  public static for(item: any) {
    return ITreeNodeFixture.with({
      id: item.id,
    });
  }

  public isNodeFor(item: any): boolean {
    return item.id === this.id;
  }

  public update(node: TreeNode<any>): ITreeNodeFixture {
    return new ITreeNodeFixture(node);
  }

  protected getInitialState(): Partial<ITreeNodeFixture> {
    return {};
  }
}
