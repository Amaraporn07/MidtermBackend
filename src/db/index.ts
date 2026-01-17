import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const dbPromise = open({
  filename: 'app.db',
  driver: sqlite3.Database,
});

export const initDb = async () => {
  const db = await dbPromise;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Product (
      ProductID TEXT PRIMARY KEY,
      Name TEXT,
      Price REAL,
      Stock INTEGER,
      Description TEXT,
      CategoryID INTEGER
    );
  `);

  console.log('SQLite DB initialized');
};
