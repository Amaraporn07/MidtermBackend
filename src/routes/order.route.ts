import { Router } from 'express';
import { dbPromise } from '../db/index.js';

const router = Router();

// GET all orders
router.get('/', async (_req, res) => {
  try {
    const db = await dbPromise;
    const orders = await db.all('SELECT * FROM Orders');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// CREATE order
router.post('/', async (req, res) => {
  try {
    const { totalAmount, status, paymentMethod, customerId } = req.body;
    const db = await dbPromise;

    await db.run(
      `INSERT INTO Orders (TotalAmount, Status, PaymentMethod, CustomerID)
       VALUES (?, ?, ?, ?)`,
      [totalAmount, status, paymentMethod, customerId]
    );

    res.status(201).json({ message: 'Order created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

export default router;
