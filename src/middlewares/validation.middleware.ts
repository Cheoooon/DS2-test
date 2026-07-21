import { type Request, type Response, type NextFunction } from 'express';
import { type ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      req.session.errors = result.error.issues;
      return res.redirect('back');
    }
    req.body = result.data;
    next();
  };
};
