import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import express, { json } from 'express';
import http from 'node:http';
import cmsRoutes from './cms/index.js';
import contentRoutes from './content/index.js';
import databaseRoutes from './database/index.js';

const env = dotenv.config();

dotenvExpand.expand(env);

const serverPort = process.env.PORT ?? '3000';
const serverUrl = process.env.SERVER_URL ?? `http://localhost:${serverPort}`;
const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:4200';

const app = express();
const api = express.Router();

app.use(cookieParser());

app.use(cors({
  origin: clientUrl,
  credentials: true,
}));

api.use(json());
api.use('/cms', cmsRoutes);
api.use('/content', contentRoutes);
api.use('/database', databaseRoutes);

app.use('/api', api);

app.get('/', (_req, res) => {
  res.json({
    message: 'Backend template is running.',
  });
});

/* eslint-disable-next-line @typescript-eslint/strict-void-return */
const server = http.createServer(app);

server.listen(serverPort, () => {
  console.warn(`Server draait op ${serverUrl}`);
});
