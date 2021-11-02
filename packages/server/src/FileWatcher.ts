import { SocketRepository } from './sockets/SocketRepository';
import { watch } from 'chokidar';

const IGNORE_DOT_FILES = /(^|[\\/\\])\../;

export class FileWatcher {
  private readonly socketRepository: SocketRepository;

  constructor(socketRepository: SocketRepository) {
    this.socketRepository = socketRepository;
  }

  public watch(path: string): void {
    const watcher = watch(path, {
      ignored: IGNORE_DOT_FILES,
      ignoreInitial: true,
      persistent: true,
      alwaysStat: true,
    });

    watcher.on('all', (event, affectedPath, stats) => {
      this.socketRepository.sockets.forEach((socket) => {
        socket.emit('directory change', { event, path: affectedPath, stats });
      });
    });
  }
}
