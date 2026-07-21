import { type Request, type Response, type NextFunction } from 'express';
import { type ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      });
      req.session.errors = errors;
      req.session.formData = req.body;
      return res.redirect('back');
    }
    req.body = result.data;
    next();
  };
};
