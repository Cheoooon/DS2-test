import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as UserModel from '../models/user.model.js';

export const register = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    req.session.errors = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([k, v]) => [k, (v as string[])[0]])
    ) as Record<string, string>;
    req.session.formData = { email: req.body.email };
    return res.redirect('/register');
  }
  const { email, password } = result.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await UserModel.createUser(email, hashedPassword);
    res.redirect('/login');
  } catch (error) {
    const flatErrors = (result as any).error.flatten().fieldErrors;
    req.session.errors = Object.fromEntries(
        Object.entries(flatErrors).map(([k, v]) => [k, (v as string[])[0]])
    ) as Record<string, string>;
    req.session.formData = { email };
    return res.redirect('/register');
  }
};

export const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    req.session.errors = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([k, v]) => [k, (v as string[])[0]])
    ) as Record<string, string>;
    req.session.formData = { email: req.body.email };
    return res.redirect('/login');
  }
  const { email, password } = result.data;
  const user = await UserModel.findByEmail(email);
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.id;
    res.redirect('/dashboard');
  } else {
    const flatErrors = (result as any).error.flatten().fieldErrors;
    req.session.errors = Object.fromEntries(
        Object.entries(flatErrors).map(([k, v]) => [k, (v as string[])[0]])
    ) as Record<string, string>;
    req.session.formData = { email };
    return res.redirect('/login');
  }
};


export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
