import type { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  interface SessionData {
    userId: number;
    errors?: Record<string, string>;
    formData?: Record<string, unknown>;
  }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
};
