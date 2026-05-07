import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { servicesRoutes } from './routes/services';
import { usersRoutes } from './routes/users';
import { bookingsRoutes } from './routes/bookings';
import { authMiddleware } from './middleware/auth';

const app = new Hono();

app.use('*', logger());

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// WARNING: CORS IS WIDE OPEN — ALL ORIGINS ARE ALLOWED
// THIS IS A TEMPORARY DEVELOPMENT SHORTCUT AND MUST BE REPLACED BEFORE GO-LIVE.
//
// What needs to happen before production:
//   1. Restore origin allowlist: localhost + the production web domain (e.g.
//      https://my-marketplace.netlify.app or your custom domain).
//   2. Populate CORS_ORIGIN in the production environment with any additional
//      origins that should be allowed (comma-separated).
//   3. Remove the wildcard `origin: '*'` below and bring back the
//      origin callback that was here before.
//
// Leaving CORS wide open in production allows ANY website to make
// credentialed requests to this API on behalf of your logged-in users,
// which is a serious security vulnerability.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use(
  '*',
  cors({
    origin: '*',
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
