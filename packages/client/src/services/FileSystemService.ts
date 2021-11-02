import { FileNode } from '../domain/types';
import FileNodeAssembler from '../assembler/FileNodeAssembler';

class FileSystemService {
  public async listDirectory(node: FileNode): Promise<FileNode[]> {
    const response = await fetch(`/api/directory?dir=${node.path}`, {
      method: 'GET',
    });

    const jsonResponse = await response.json();

    return FileNodeAssembler.toDomainAsList(jsonResponse, node.nestingLevel);
  }
}

export default new FileSystemService();
