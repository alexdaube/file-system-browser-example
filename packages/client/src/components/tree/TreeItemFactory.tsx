import React from 'react';
import DirectoryNode from '../../domain/DirectoryNode';
import FileNode from '../../domain/FileNode';
import { FileTreeItem } from './FileTreeItem';
import { DirectoryTreeItem } from './DirectoryTreeItem';

interface TreeItemFactoryProps {
  node: FileNode<any> | DirectoryNode<any>;
  style?: React.CSSProperties;
}

export function TreeItemFactory({
  node,
  style,
}: TreeItemFactoryProps): JSX.Element | null {
  // if (node instanceof FileNode) {
  //   return <FileTreeItem node={node} style={style} />;
  // }
  //
  // if (node instanceof DirectoryNode) {
  //   return <DirectoryTreeItem node={node} style={style} />;
  // }

  return null;
}
