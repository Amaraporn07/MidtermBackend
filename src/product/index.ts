import { Router } from 'express';
import { dbPromise } from '../db/index.js';

const router = Router();

// GET all products
router.get('/', async (_req, res) => {
  try {
    const db = await dbPromise;
    const products = await db.all('SELECT * FROM Product');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// CREATE product
router.post('/', async (req, res) => {
  try {
    const { id, name, price, stock, description, categoryId } = req.body;
    const db = await dbPromise;

    await db.run(
      `INSERT INTO Product
       (ProductID, Name, Price, Stock, Description, CategoryID)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, price, stock, description, categoryId]
    );

    res.status(201).json({ message: 'Product created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create product' });
  }
});

export default router;