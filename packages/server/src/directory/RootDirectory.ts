import { lstatSync } from 'fs';
import { join, isAbsolute } from 'path';
import { Dree, ScanOptions, scanAsync } from 'dree';

class RootDirectory {
  public rootDirectoryPath = '';

  public init(paths: string[], defaultRootDirectory: string): void {
    this.rootDirectoryPath = this.buildRootDirectoryPath(
      this.extractValidDirectoryPaths(paths),
      defaultRootDirectory,
    );
  }
  public async getDirectoryInfo(directory: string): Promise<Dree> {
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

  private buildRootDirectoryPath = (
    paths: string[],
    defaultRootDirectory: string,
  ): string => {
    const absolutePath =
      paths.find((argument: string) => isAbsolute(argument)) ??
      defaultRootDirectory;
    const relativePaths = paths.filter(
      (argument: string) => !isAbsolute(argument),
    );

    return join(absolutePath, ...relativePaths);
  };

  private extractValidDirectoryPaths = (paths: string[]): string[] => {
    return paths
      .slice(2, paths.length)
      .filter((argument: string) => this.isDirectory(argument));
  };

  private isDirectory = (path): boolean => {
    try {
      const stat = lstatSync(path);
      return stat.isDirectory();
    } catch (e) {
      return false;
    }
  };
}

export default new RootDirectory();
