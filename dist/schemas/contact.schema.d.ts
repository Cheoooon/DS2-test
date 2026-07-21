import { z } from 'zod';
export declare const contactSchema: z.ZodObject<{
    name: z.ZodString;
    alias: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    email: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    phone: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
}, z.core.$strip>;
export type ContactInput = z.infer<typeof contactSchema>;
//# sourceMappingURL=contact.schema.d.ts.map