import { FileNode, FileType } from '../domain/types';

interface FileNodeDTO {
  name: string;
  path: string;
  type: string;
  children?: FileNodeDTO[];
}

class FileNodeAssembler {
  public toDomain(dto: FileNodeDTO, level: number): FileNode {
    return {
      name: dto.name,
      path: dto.path,
      type: dto.type as FileType,
      loaded: !!dto.children || dto.type !== FileType.DIRECTORY,
      opened: false,
      nestingLevel: level,
    };
  }

  public toDomainAsList(dto: FileNodeDTO, rootLevel: number): FileNode[] {
    const fileNodes: FileNode[] = [this.toDomain(dto, rootLevel)];

    if (dto.children) {
      dto.children.forEach((childDTO) => {
        fileNodes.push(this.toDomain(childDTO, rootLevel + 1));
      });
    }

    return fileNodes;
  }
}

export default new FileNodeAssembler();
