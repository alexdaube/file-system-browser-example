import FileNode from './FileNode';
import DirectoryNode from './DirectoryNode';
import Tree from './Tree';

export type FileSystemTreeNode = FileNode<any> | DirectoryNode<any>;

class FileSystemTree extends Tree<FileSystemTree> {
  protected updateNodes({
    nodes,
  }: {
    nodes: FileSystemTreeNode[];
  }): FileSystemTree {
    return new FileSystemTree(nodes, this.lookupTable);
  }
}

export default FileSystemTree;
