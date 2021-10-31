import React from 'react';
import { Box } from '@mui/material';
import { FileNode, FileType } from '../../domain/types';
import { DirectoryTreeItem } from './DirectoryTreeItem';
import { FileTreeItem } from './FileTreeItem';

interface TreeViewProps {
  directory: FileNode[];
  onExpandNode: (node: FileNode, index: number) => void;
}

export function TreeView({
  directory,
  onExpandNode,
}: TreeViewProps): JSX.Element {
  return (
    <Box sx={{ border: '1px solid #f5f5f5', borderRadius: '4px ' }}>
      {directory.map((node, index) =>
        node.type === FileType.DIRECTORY ? (
          <DirectoryTreeItem
            key={node.path}
            node={node}
            onExpand={() => {
              onExpandNode(node, index);
            }}
          />
        ) : (
          <FileTreeItem key={node.path} node={node} />
        ),
      )}
    </Box>
  );
}
