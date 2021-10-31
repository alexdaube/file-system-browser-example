import { FileNode } from '../domain/types';
import FileNodeAssembler from '../assembler/FileNodeAssembler';

class FileSystemService {
  public async get(directory: string, rootLevel = 0): Promise<FileNode[]> {
    const response = await fetch(`/api/directory?dir=${directory}`, {
      method: 'GET',
    });

    const jsonResponse = await response.json();

    return FileNodeAssembler.toDomainAsList(jsonResponse, rootLevel);
  }

  // public async getDirectoryChildrenNode(node: FileNode) {
  //   //
  // }
}

export default new FileSystemService();
