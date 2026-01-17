import { Router } from 'express';
import { dbPromise } from '../db/index.js';

const router = Router();

// GET all categories
router.get('/', async (_req, res) => {
  try {
    const db = await dbPromise;
    const categories = await db.all('SELECT * FROM Category');
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

// CREATE category
router.post('/', async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const db = await dbPromise;

    await db.run(
      `INSERT INTO Category (Name, Description, Status)
       VALUES (?, ?, ?)`,
      [name, description, status]
    );

    res.status(201).json({ message: 'Category created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create category' });
  }
});

export default router;
