/**
 * Zod schemas for validation - shared between API (request validation)
 * and clients (form validation, type inference).
 */
import { z } from 'zod';

export const userRoleSchema = z.enum(['customer', 'provider']);
export type UserRoleSchema = z.infer<typeof userRoleSchema>;

export const bookingStatusSchema = z.enum([
  'pending',
  'confirmed',
  'completed',
  'cancelled',
]);
export type BookingStatusSchema = z.infer<typeof bookingStatusSchema>;

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(200),
  role: userRoleSchema.default('customer'),
});

export const createServiceSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  price: z.number().positive(),
});

export const createBookingSchema = z.object({
  serviceId: z.string().uuid(),
  date: z.string().datetime(),
});

export const updateBookingSchema = z.object({
  status: bookingStatusSchema,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
