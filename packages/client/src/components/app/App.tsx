import React, { useCallback, useEffect, useState } from 'react';
import { FileNode, FileType } from '../../domain/types';
import FileSystemService from '../../services/FileSystemService';
import { TreeView } from '../tree/TreeView';
import { io } from 'socket.io-client';

function replaceInsertAt<T>(arr: T[], index: number, newItems: T[]): T[] {
  const nextItem = index + 1;
  const isLastItem = nextItem >= arr.length;

  console.log(arr.length, nextItem, isLastItem);
  console.log(arr.slice(0, index));
  console.log(newItems);
  console.log(isLastItem ? [] : arr.slice(index + 1));
  return [
    ...arr.slice(0, index),
    ...newItems,
    ...(isLastItem ? [] : arr.slice(nextItem)),
  ];
}

export default function App(): JSX.Element {
  const [directory, setDirectory] = useState<FileNode[]>([]);

  useEffect(() => {
    (async () => {
      const rootDirectoryNodes = await FileSystemService.listDirectory({
        path: '',
        type: FileType.DIRECTORY,
        name: 'root',
        level: 0,
        isLoaded: false,
      });
      setDirectory(rootDirectoryNodes);
    })();
  }, []);

  useEffect(() => {
    const socket = io();
    socket.on('directory change', (dir) => {
      console.log(dir);
    });
  });

  const handleNodeExpand = useCallback(
    async (node: FileNode, index: number) => {
      if (node.isLoaded) {
        setDirectory(
          replaceInsertAt(directory, index, [
            { ...node, isExpanded: !node.isExpanded },
          ]),
        );
      }

      const directoryNodes = await FileSystemService.listDirectory(node);
      console.log(index);

      setDirectory(replaceInsertAt(directory, index, directoryNodes));
    },
    [directory],
  );

  return <TreeView directory={directory} onExpandNode={handleNodeExpand} />;
}
