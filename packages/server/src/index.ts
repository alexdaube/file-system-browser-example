import express from 'express';
import cors from 'cors';
import {
  PORT,
  CLIENT_PATH,
  CLIENT_ENTRY_POINT,
  ROOT_DIRECTORY,
} from './configs';
import Directory from './directory/RootDirectory';
import routes from './routes/index';

const app = express();
app.use(cors());
app.use(express.static(CLIENT_PATH));

app.use(routes);

app.get('*', (req, res) => {
  res.sendFile(CLIENT_ENTRY_POINT);
});

Directory.init(process.argv, ROOT_DIRECTORY);

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
  console.log(`Opening files at ROOT: ${Directory.rootDirectoryPath}`);
});
