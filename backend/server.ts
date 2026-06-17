import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import express, { json } from 'express';
import http from 'node:http';
import nodemailer from 'nodemailer';
import cmsRoutes from './cms/index.js';
import contentRoutes from './content/index.js';
import databaseRoutes from './database/index.js';

const env = dotenv.config();

dotenvExpand.expand(env);

const serverPort = process.env.PORT ?? '3000';
const serverUrl = process.env.SERVER_URL ?? `http://localhost:${serverPort}`;

const allowedOrigins = [
  'http://localhost:4200',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
];

const app = express();
const api = express.Router();

app.use(cookieParser());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);

      return;
    }

    callback(new Error(`Origin not allowed by CORS: ${origin}`));
  },
  credentials: true,
}));

api.use(json());
api.use('/cms', cmsRoutes);
api.use('/content', contentRoutes);
api.use('/database', databaseRoutes);

const BAD_REQUEST = 400;
const CREATED = 201;
const INTERNAL_ERROR = 500;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const getBodyField = (body: unknown, key: string): string => {
  if (body === null || typeof body !== 'object') return '';
  if (!(key in body)) return '';

  const val: unknown = Reflect.get(body, key);

  return typeof val === 'string' ? val.trim() : '';
};

api.post('/contact', async (req, res) => {
  const body: unknown = req.body;
  const name = getBodyField(body, 'name');
  const company = getBodyField(body, 'company');
  const email = getBodyField(body, 'email');
  const phone = getBodyField(body, 'phone');
  const message = getBodyField(body, 'message');

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
          <tr><td><strong>Telefoon</strong></td><td>${phone || '—'}</td></tr>
          <tr><td><strong>Bericht</strong></td><td>${message}</td></tr>
          <tr><td><strong>Ontvangen op</strong></td><td>${new Date().toLocaleString('nl-NL')}</td></tr>
        </table>
      `,
    });

    res.status(CREATED).json({ message: 'Je aanvraag is verzonden. We nemen snel contact op!' });
  }
  catch (error) {
    console.error('Fout bij verzenden e-mail:', error);
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
