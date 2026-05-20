import { Router } from 'express';
import { connection } from './connection.js';

const internalServerErrorStatus = 500;
const router = Router();

router.get('/test', async (_req, res) => {
  try {
    const db = await connection;
    const [rows] = await db.query('SELECT 1 AS connection_ok;');

    res.json({
      message: 'Database connection succeeded.',
      rows,
    });
  }
  catch (error) {
    console.error('Database connection failed.');
    console.error(error);

    res.status(internalServerErrorStatus).json({
      message: 'Database connection failed.',
    });
  }
});

export default router;
