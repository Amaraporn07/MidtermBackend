import { Router } from 'express';
import { dbPromise } from '../db/index.js';

const router = Router();

// GET all suppliers
router.get('/', async (_req, res) => {
  try {
    const db = await dbPromise;
    const suppliers = await db.all('SELECT * FROM Supplier');
    res.json(suppliers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch suppliers' });
  }
});

// CREATE supplier
router.post('/', async (req, res) => {
  try {
    const { name, contact, address, email, phone } = req.body;
    const db = await dbPromise;

    await db.run(
      `INSERT INTO Supplier (Name, Contact, Address, Email, Phone)
       VALUES (?, ?, ?, ?, ?)`,
      [name, contact, address, email, phone]
    );

    res.status(201).json({ message: 'Supplier created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create supplier' });
  }
});

export default router;
