import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1),
  alias: z.string().optional().nullable().or(z.literal("")),
  email: z.string().email().optional().nullable().or(z.literal("")),
  phone: z.string().optional().nullable().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
