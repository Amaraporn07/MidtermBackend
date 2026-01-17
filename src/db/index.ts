import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// เปิด connection (ใช้ร่วมกันทั้งโปรเจกต์)
export const dbPromise = open({
  filename: 'app.db',
  driver: sqlite3.Database,
});

// init database + schema
export const initDb = async () => {
  const db = await dbPromise;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Customer (
      CustomerID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT,
      Email TEXT,
      Phone TEXT,
      Address TEXT,
      RegisterDate DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Category (
      CategoryID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT,
      Description TEXT,
      Status TEXT,
      CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Supplier (
      SupplierID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT,
      Contact TEXT,
      Address TEXT,
      Email TEXT,
      Phone TEXT
    );

    CREATE TABLE IF NOT EXISTS Product (
      ProductID TEXT PRIMARY KEY,
      Name TEXT,
      Price REAL,
      Stock INTEGER,
      Description TEXT,
      CategoryID INTEGER
    );

    CREATE TABLE IF NOT EXISTS Orders (
      OrderID INTEGER PRIMARY KEY AUTOINCREMENT,
      OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
      TotalAmount REAL,
      Status TEXT,
      PaymentMethod TEXT,
      CustomerID INTEGER
    );
  `);

  console.log('SQLite DB initialized');
};
