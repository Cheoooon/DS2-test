import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const emptyToUndefined = z.preprocess((val) => (val === "" ? undefined : val), z.string().optional());

export const contactSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  alias: emptyToUndefined.nullable(),
  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().email("Formato de correo inválido").optional().nullable()
  ),
  phone: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().refine((val) => {
      const phoneNumber = parsePhoneNumberFromString(val, 'CL');
      return phoneNumber?.isValid();
    }, "Número de teléfono inválido").optional().nullable()
  ),
});

export type ContactInput = z.infer<typeof contactSchema>;
