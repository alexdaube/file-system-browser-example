import { Socket } from 'socket.io';

export class SocketRepository {
  public sockets: Socket[] = [];

  public add(socket: Socket): number {
    return this.sockets.push(socket);
  }

  public removeAt(index): void {
    this.sockets.splice(index - 1, 1);
  }
}
