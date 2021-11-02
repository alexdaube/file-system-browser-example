import React from 'react';
import { FileNode } from '../../domain/types';
import { TreeItemRoot } from './TreeItemRoot';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

interface FileTreeItemProps {
  node: FileNode;
  style?: React.CSSProperties;
}

export function FileTreeItem({ node, style }: FileTreeItemProps): JSX.Element {
  return (
    <TreeItemRoot
      style={style}
      level={node.nestingLevel}
      icon={<TextSnippetIcon sx={{ fill: 'grey' }} />}
    >
      {node.name}
    </TreeItemRoot>
  );
}
