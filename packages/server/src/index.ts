import {
  PORT,
  CLIENT_PATH,
  CLIENT_ENTRY_POINT,
  ROOT_DIRECTORY,
} from './configs';
import routes from './routes/index';
import RootDirectory from './directory/RootDirectory';
import { watch } from 'chokidar';
import express = require('express');
import cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(CLIENT_PATH));
app.use(routes);

app.get('*', (req, res) => {
  res.sendFile(CLIENT_ENTRY_POINT);
});

RootDirectory.init(process.argv, ROOT_DIRECTORY);

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
  console.log(`Opening files at ROOT: ${RootDirectory.rootDirectoryPath}`);

  // Initialize watcher.
  const watcher = watch(RootDirectory.rootDirectoryPath, {
    ignored: /(^|[\\/\\])\../, // ignore dotfiles
    persistent: true,
  });

  // Something to use when events are received.
  const log = console.log.bind(console);
  // Add event listeners.
  watcher
    .on('add', (path) => log(`File ${path} has been added`))
    .on('change', (path) => log(`File ${path} has been changed`))
    .on('unlink', (path) => log(`File ${path} has been removed`))

    // // More possible events.
    // watcher
    //   .on('addDir', (path) => log(`Directory ${path} has been added`))
    //   .on('unlinkDir', (path) => log(`Directory ${path} has been removed`))
    //   .on('error', (error) => log(`Watcher error: ${error}`))
    //   .on('ready', () => log('Initial scan complete. Ready for changes'))
    .on('raw', (event, path, details) => {
      // internal
      log('Raw event info:', event, path, details);
    });
});
