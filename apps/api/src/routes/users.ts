import { Hono } from 'hono';
import { prisma } from '../db';
import { createUserSchema } from '@marketplace/shared/validation';

export const usersRoutes = new Hono();

usersRoutes.get('/', async (c) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  return c.json(users);
});

usersRoutes.get('/:id', async (c) => {
  const id = c.req.param('id');
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  if (!user) return c.json({ message: 'User not found' }, 404);
  return c.json(user);
});

usersRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ message: 'Validation error', errors: parsed.error.flatten() }, 400);
  }
  const user = await prisma.user.create({
    data: parsed.data,
  });
  return c.json(user, 201);
});
