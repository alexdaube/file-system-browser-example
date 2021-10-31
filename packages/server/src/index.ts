import express from 'express';
import cors from 'cors';
import { join } from 'path';
const clientPath = '../../client/build';

const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.static(join(__dirname, clientPath)));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, clientPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
});
