import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { servicesRoutes } from './routes/services';
import { usersRoutes } from './routes/users';
import { bookingsRoutes } from './routes/bookings';
import { authMiddleware } from './middleware/auth';

const app = new Hono();

app.use('*', logger());

const staticOrigins = ['http://localhost:4321', 'http://localhost:8080'];
if (process.env.CORS_ORIGIN) {
  staticOrigins.push(...process.env.CORS_ORIGIN.split(',').map((o) => o.trim()));
}

app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin) return null;
      if (/^https?:\/\/localhost/.test(origin)) return origin;
      return staticOrigins.includes(origin) ? origin : null;
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.onError((err, c) => {
  console.error(err);
  const origin = c.req.header('origin') ?? '';
  if (origin) c.header('Access-Control-Allow-Origin', origin);
  c.header('Vary', 'Origin');
  return c.json({ message: 'Internal server error' }, 500);
});

app.get('/health', (c) => c.json({ ok: true }));

app.route('/api/services', servicesRoutes);
app.route('/api/users', usersRoutes);

app.use('/api/bookings/*', authMiddleware);
app.route('/api/bookings', bookingsRoutes);

export { app };
