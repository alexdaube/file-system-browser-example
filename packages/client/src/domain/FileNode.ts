import ITreeNode, { TreeNode } from './ITreeNode';

type DirectoryFile = {
  //
};

class FileNode<T> extends ITreeNode<DirectoryFile, FileNode<T>> {
  public update(node: TreeNode<DirectoryFile>): FileNode<T> {
    return new FileNode(node);
  }

  protected getInitialState(): Partial<FileNode<T>> {
    return {};
  }
}

export default FileNode;
