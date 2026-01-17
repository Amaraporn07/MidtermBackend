import express from 'express';
import { initDb } from './db/index.js';

import productRoutes from './product/index.js';

const app = express();
app.use(express.json());

initDb();

app.use('/api/products', productRoutes);

export default app;
