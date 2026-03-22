import { Hono } from 'hono';
import { prisma } from '../db';
import { createBookingSchema } from '@marketplace/shared/validation';

export const bookingsRoutes = new Hono();

bookingsRoutes.get('/', async (c) => {
  const bookings = await prisma.booking.findMany({
    include: {
      service: true,
      customer: { select: { id: true, name: true, email: true } },
    },
    orderBy: { date: 'desc' },
  });
  return c.json(bookings);
});

bookingsRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = createBookingSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ message: 'Validation error', errors: parsed.error.flatten() }, 400);
  }
  const customerId = 'demo-customer-id'; // TODO: from JWT c.get('userId')
  const booking = await prisma.booking.create({
    data: {
      serviceId: parsed.data.serviceId,
      date: new Date(parsed.data.date),
      status: 'pending',
      customerId,
    },
    include: { service: true, customer: true },
  });
  return c.json(booking, 201);
});
