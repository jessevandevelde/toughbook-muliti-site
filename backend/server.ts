import { connection } from './database/connection.js';

const testDatabaseConnection = async (): Promise<void> => {
  try {
    const db = await connection;
    const [rows] = await db.query('SELECT 1 AS connection_ok;');

    console.warn('Database connection succeeded.');
    console.warn(rows);

    await db.end();
  }
  catch (error) {
    console.error('Database connection failed.');
    console.error(error);
    process.exitCode = 1;
  }
};

void testDatabaseConnection();
