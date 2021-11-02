import React from 'react';
import { Box } from '@mui/material';
import { FileNode, FileType } from '../../domain/types';
import { DirectoryTreeItem } from './DirectoryTreeItem';
import { FileTreeItem } from './FileTreeItem';
import AutoSizer from 'react-virtualized-auto-sizer';
import TreeComponent from './TreeComponent';
import ITreeNode from '../../domain/ITreeNode';
import Tree from '../../domain/Tree';
import { TreeItemFactory } from './TreeItemFactory';

interface TreeViewProps {
  tree: Tree<any>;
  directory: FileNode[];
  onExpandNode: (node: FileNode, index: number) => void;
}

export function TreeView({
  tree,
  directory,
  onExpandNode,
}: TreeViewProps): JSX.Element {
  return (
    <Box sx={{ border: '1px solid #f5f5f5', borderRadius: '4px ' }}>
      <AutoSizer>
        {({ height, width }) => (
          <TreeComponent
            tree={tree}
            height={height}
            width={width}
            onScroll={() => undefined}
            renderNodes={({ node, key, style }) => (
              <TreeItemFactory key={key} node={node} style={style} />
            )}
          />
        )}
      </AutoSizer>

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
