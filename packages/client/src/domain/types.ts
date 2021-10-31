export enum FileType {
  DIRECTORY = 'directory',
  FILE = 'file',
}

export interface FileNode {
  name: string;
  path: string;
  type: FileType;
  level: number;
  isLoaded?: boolean;
  isExpanded?: boolean;
}
