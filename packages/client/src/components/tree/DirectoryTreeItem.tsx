import React from 'react';
import { TreeItemRoot } from './TreeItemRoot';
import FolderIcon from '@mui/icons-material/Folder';
import { FileNode } from '../../domain/types';

interface DirectoryTreeItemProps {
  node: FileNode;
  onExpand: (node: FileNode) => void;
}

export function DirectoryTreeItem({
  node,
  onExpand,
}: DirectoryTreeItemProps): JSX.Element {
  return (
    <TreeItemRoot
      level={node.level}
      icon={<FolderIcon sx={{ fill: 'blue' }} />}
      canExpand
      onExpand={() => onExpand(node)}
    >
      {node.name}
    </TreeItemRoot>
  );
}
