import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import express, { json } from 'express';
import http from 'node:http';
import cmsRoutes from './cms/index.js';
import contactRoutes from './contact/index.js';
import contentRoutes from './content/index.js';
import databaseRoutes from './database/index.js';

const env = dotenv.config();

dotenvExpand.expand(env);

const serverPort = process.env.PORT ?? '3000';
const serverUrl = process.env.SERVER_URL ?? `http://localhost:${serverPort}`;

const allowedOrigins = [
  'http://localhost',
  'http://127.0.0.1',
  'http://localhost:80',
  'http://127.0.0.1:80',
  'http://localhost:4200',
  'http://localhost:8000',
  'http://localhost:8080',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:8080',
  'http://localhost:3000',
  'http://localhost:8000',
  'http://127.0.0.1:5501',
  'file://', // For local file:// protocol
];

const app = express();
const api = express.Router();

app.use(cookieParser());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }
    const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    if (isLocalhost || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`Origin not allowed by CORS: ${origin}`));
  },
  credentials: true,
}));

const BAD_REQUEST = 400;
const CREATED = 201;
const INTERNAL_ERROR = 500;

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST ?? 'localhost',
  port: parseInt(process.env.MAIL_PORT ?? '1025'),
  secure: process.env.MAIL_SECURE === 'true',
  ...(process.env.MAIL_USER && process.env.MAIL_PASS
    ? { auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS } }
    : {}),
});

const getField = (body: unknown, key: string): string => {
  if (body === null || typeof body !== 'object') return '';
  if (!(key in body)) return '';
  const val: unknown = Reflect.get(body, key);
  return typeof val === 'string' ? val.trim() : '';
};

api.use(json());
api.use('/cms', cmsRoutes);
api.use('/contact', contactRoutes);
api.use('/content', contentRoutes);
api.use('/database', databaseRoutes);

api.post('/contact', async (req, res) => {
  const body: unknown = req.body;
  const name    = getField(body, 'name');
  const company = getField(body, 'company');
  const email   = getField(body, 'email');
  const message = getField(body, 'message');

  if (!name || !email || !message) {
    res.status(BAD_REQUEST).json({ error: 'Naam, e-mail en bericht zijn verplicht.' });
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Toughbook Website" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: `Nieuwe offerteaanvraag van ${name}`,
      html: `
        <h2>Nieuwe offerteaanvraag</h2>
        <table cellpadding="8" style="border-collapse:collapse;">
          <tr><td><strong>Naam</strong></td><td>${name}</td></tr>
          <tr><td><strong>Bedrijf</strong></td><td>${company || '—'}</td></tr>
          <tr><td><strong>E-mail</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td><strong>Bericht</strong></td><td>${message}</td></tr>
          <tr><td><strong>Ontvangen op</strong></td><td>${new Date().toLocaleString('nl-NL')}</td></tr>
        </table>
      `,
    });
    res.status(CREATED).json({ message: 'Je aanvraag is verzonden. We nemen snel contact op!' });
  }
  catch (error) {
    console.error('Mail verzenden mislukt:', error);
    res.status(INTERNAL_ERROR).json({ error: 'Verzenden mislukt. Probeer het later opnieuw.' });
  }
});

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
