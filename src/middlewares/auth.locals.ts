import type { Request, Response, NextFunction } from 'express';

export const authLocals = (req: Request, res: Response, next: NextFunction) => {
  res.locals.isAuthenticated = !!req.session.userId;
  res.locals.errors = req.session.errors;
  delete req.session.errors;
  next();
};
