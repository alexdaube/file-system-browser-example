import {
  PORT,
  CLIENT_PATH,
  CLIENT_ENTRY_POINT,
  ROOT_DIRECTORY,
} from './configs';
import routes from './routes/index';
import RootDirectory from './directory/RootDirectory';
import express = require('express');
import cors = require('cors');
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SocketRepository } from './sockets/SocketRepository';
import { FileWatcher } from './FileWatcher';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.static(CLIENT_PATH));
app.use(routes);

app.get('*', (req, res) => {
  res.sendFile(CLIENT_ENTRY_POINT);
});

RootDirectory.init(process.argv, ROOT_DIRECTORY);
const socketRepository = new SocketRepository();
const fileWatcher = new FileWatcher(socketRepository);

io.on('connection', (socket) => {
  const index = socketRepository.add(socket);

  socket.on('disconnect', () => {
    socketRepository.removeAt(index);
  });
});

fileWatcher.watch(RootDirectory.rootDirectoryPath);

server.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
  console.log(`Opening files at ROOT: ${RootDirectory.rootDirectoryPath}`);
});
