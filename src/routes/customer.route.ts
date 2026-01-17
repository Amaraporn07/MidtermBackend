import { Router } from 'express';
import { dbPromise } from '../db/index.js';

const router = Router();

// GET all customers
router.get('/', async (_req, res) => {
  try {
    const db = await dbPromise;
    const customers = await db.all('SELECT * FROM Customer');
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
});

// CREATE customer
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const db = await dbPromise;

    await db.run(
      `INSERT INTO Customer (Name, Email, Phone, Address)
       VALUES (?, ?, ?, ?)`,
      [name, email, phone, address]
    );

    res.status(201).json({ message: 'Customer created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create customer' });
  }
});

export default router;

