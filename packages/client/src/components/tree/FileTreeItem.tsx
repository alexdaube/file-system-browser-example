import React from 'react';
import { FileNode } from '../../domain/types';
import { TreeItemRoot } from './TreeItemRoot';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

interface FileTreeItemProps {
  node: FileNode;
}

export function FileTreeItem({ node }: FileTreeItemProps): JSX.Element {
  return (
    <TreeItemRoot icon={<TextSnippetIcon sx={{ fill: 'grey' }} />} canExpand>
      {node.name}
    </TreeItemRoot>
  );
}
