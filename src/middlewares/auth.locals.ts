import type { Request, Response, NextFunction } from 'express';

export const authLocals = (req: Request, res: Response, next: NextFunction) => {
  res.locals.isAuthenticated = !!req.session.userId;
  next();
};
