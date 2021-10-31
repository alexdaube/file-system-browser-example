import React, { useEffect, useState } from 'react';
import { FileNode, FileType } from '../../domain/types';
import FileSystemService from '../../services/FileSystemService';
import { DirectoryTreeItem } from '../tree/DirectoryTreeItem';
import { FileTreeItem } from '../tree/FileTreeItem';
import { Box } from '@mui/material';

export default function App(): JSX.Element {
  const [directory, setDirectory] = useState<FileNode[]>([]);

  useEffect(() => {
    (async () => {
      const rootDirectoryNodes = await FileSystemService.get('.');
      setDirectory(rootDirectoryNodes);
    })();
  }, []);

  return (
    <Box sx={{ border: '1px solid #f5f5f5', borderRadius: '4px ' }}>
      {directory.map((fileNode) =>
        fileNode.type === FileType.DIRECTORY ? (
          <DirectoryTreeItem key={fileNode.path} node={fileNode} />
        ) : (
          <FileTreeItem key={fileNode.path} node={fileNode} />
        ),
      )}
    </Box>
  );
}
