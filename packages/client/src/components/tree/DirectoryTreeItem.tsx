import React from 'react';
import { TreeItemRoot } from './TreeItemRoot';
import FolderIcon from '@mui/icons-material/Folder';
import { FileNode } from '../../domain/types';

interface DirectoryTreeItemProps {
  node: FileNode;
}

export function DirectoryTreeItem({
  node,
}: DirectoryTreeItemProps): JSX.Element {
  return (
    <TreeItemRoot icon={<FolderIcon sx={{ fill: 'blue' }} />} canExpand>
      {node.name}
    </TreeItemRoot>
  );
}
