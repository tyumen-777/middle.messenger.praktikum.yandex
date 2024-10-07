import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

app.listen(3000);
