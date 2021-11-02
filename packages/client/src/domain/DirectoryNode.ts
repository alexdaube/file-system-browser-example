import ITreeNode, { TreeNode } from './ITreeNode';

type Directory = {
  //
};

class DirectoryNode<T> extends ITreeNode<Directory, DirectoryNode<T>> {
  public update(node: TreeNode<Directory>): DirectoryNode<T> {
    return new DirectoryNode(node);
  }

  protected getInitialState(): Partial<DirectoryNode<T>> {
    return {};
  }
}

export default DirectoryNode;
