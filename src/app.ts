import express from 'express';
import { initDb } from './db/index.js';

import customerRoutes from './routes/customer.route.js';
import productRoutes from './routes/product.route.js';
import categoryRoutes from './routes/category.route.js';
import supplierRoutes from './routes/supplier.route.js';
import orderRoutes from './routes/order.route.js';

const app = express();
app.use(express.json());

initDb();

app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/orders', orderRoutes);

export default app;
