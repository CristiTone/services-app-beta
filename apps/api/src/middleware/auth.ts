/**
 * JWT authentication middleware placeholder.
 * In production: verify Bearer token, attach user to c.get('user').
 */
import type { Context, Next } from 'hono';

export async function authMiddleware(c: Context, next: Next) {
  const auth = c.req.header('Authorization');
  if (!auth?.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
  // TODO: verify JWT with JWT_SECRET, decode payload, set c.set('userId', payload.sub)
  await next();
}
