/**
 * Marketplace API - Bun + Hono
 * Serves web and mobile clients; CORS enabled for both.
 */
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { servicesRoutes } from './routes/services';
import { usersRoutes } from './routes/users';
import { bookingsRoutes } from './routes/bookings';
import { authMiddleware } from './middleware/auth';

const app = new Hono();

app.use('*', logger());
const allowedOrigins: (string | RegExp)[] = [
  'http://localhost:4321',
  'http://localhost:8080',
  /^https?:\/\/localhost/,
];
if (process.env.CORS_ORIGIN) {
  allowedOrigins.push(...process.env.CORS_ORIGIN.split(',').map((o) => o.trim()));
}

app.use(
  '*',
  cors({
    origin: allowedOrigins,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

// Health
app.get('/health', (c) => c.json({ ok: true }));

// Public routes
app.route('/api/services', servicesRoutes);
app.route('/api/users', usersRoutes);

// Protected routes (JWT placeholder - validate in real implementation)
app.route('/api/bookings', authMiddleware, bookingsRoutes);

const port = Number(process.env.PORT) || 3000;
console.log(`API listening on http://localhost:${port}`);
export default {
  port,
  fetch: app.fetch,
};
