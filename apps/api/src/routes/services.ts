import { Hono } from 'hono';
import { prisma } from '../db';
import { createServiceSchema } from '@marketplace/shared/validation';

export const servicesRoutes = new Hono();

servicesRoutes.get('/', async (c) => {
  const page = Number(c.req.query('page')) || 1;
  const pageSize = Math.min(Number(c.req.query('pageSize')) || 20, 100);
  const skip = (page - 1) * pageSize;
  const [data, total] = await Promise.all([
    prisma.service.findMany({
      skip,
      take: pageSize,
      include: { provider: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.service.count(),
  ]);
  return c.json({ data, total, page, pageSize });
});

servicesRoutes.get('/:id', async (c) => {
  const id = c.req.param('id');
  const service = await prisma.service.findUnique({
    where: { id },
    include: { provider: { select: { id: true, name: true, email: true } } },
  });
  if (!service) return c.json({ message: 'Service not found' }, 404);
  return c.json(service);
});

// Create service (would be protected in production)
servicesRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = createServiceSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ message: 'Validation error', errors: parsed.error.flatten() }, 400);
  }
  const providerId = (body as { providerId?: string }).providerId ?? 'demo-provider-id';
  const service = await prisma.service.create({
    data: { ...parsed.data, providerId },
  });
  return c.json(service, 201);
});
