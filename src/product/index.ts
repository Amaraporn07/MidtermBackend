import { Router } from 'express';
import { dbPromise } from '../db/index.js';

const router = Router();

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

router.get('/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const product = await db.get(
      'SELECT * FROM Product WHERE ProductID = ?',
      [req.params.id]
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

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

router.put('/:id', async (req, res) => {
  try {
    const { name, price, stock, description, categoryId } = req.body;
    const db = await dbPromise;

    const result = await db.run(
      `UPDATE Product
       SET Name = ?, Price = ?, Stock = ?, Description = ?, CategoryID = ?
       WHERE ProductID = ?`,
      [name, price, stock, description, categoryId, req.params.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const db = await dbPromise;

    const result = await db.run(
      'DELETE FROM Product WHERE ProductID = ?',
      [req.params.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

export default router;
