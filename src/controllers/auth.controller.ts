import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as UserModel from '../models/user.model.js';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await UserModel.createUser(email, hashedPassword);
    res.redirect('/login');
  } catch (error) {
    res.status(400).send('Error registrando usuario');
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findByEmail(email);
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.id;
    res.redirect('/dashboard');
  } else {
    res.status(401).send('Credenciales inválidas');
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
