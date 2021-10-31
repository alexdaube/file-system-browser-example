import React from 'react';
import { FileNode } from '../../domain/types';
import { TreeItemRoot } from './TreeItemRoot';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

interface FileTreeItemProps {
  node: FileNode;
}

export function FileTreeItem({ node }: FileTreeItemProps): JSX.Element {
  return (
    <TreeItemRoot
      level={node.level}
      icon={<TextSnippetIcon sx={{ fill: 'grey' }} />}
    >
      {node.name}
    </TreeItemRoot>
  );
}
