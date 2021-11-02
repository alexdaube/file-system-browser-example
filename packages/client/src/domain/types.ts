export enum FileType {
  DIRECTORY = 'directory',
  FILE = 'file',
}

export interface FileNode {
  name: string;
  path: string;
  type: FileType;
  nestingLevel: number;
  loaded?: boolean;
  opened?: boolean;
}
