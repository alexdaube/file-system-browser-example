import { Dree, scanAsync, ScanOptions } from 'dree';

export class DirectoryService {
  public async getDirectoryInfoFromPath(directory: string): Promise<Dree> {
    const options: ScanOptions = {
      stat: false,
      normalize: true,
      followLinks: true,
      size: true,
      hash: true,
      depth: 1,
    };

    return new Promise((resolve, reject) => {
      scanAsync(directory, options)
        .then((tree) => {
          resolve(tree);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
