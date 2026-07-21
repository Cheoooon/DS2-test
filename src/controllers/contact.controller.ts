import type { Request, Response } from 'express';
import * as ContactModel from '../models/contact.model.js';

export const list = (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  const contacts = ContactModel.listByUserId(req.session.userId);
  res.render('dashboard', { contacts });
};

export const createForm = (req: Request, res: Response) => {
  res.render('contacts/create');
};

export const create = (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  ContactModel.create(req.session.userId, req.body);
  res.redirect('/contacts');
};

export const editForm = (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  const contact = ContactModel.findByIdAndUserId(Number(req.params.id), req.session.userId);
  if (!contact) return res.status(404).send('Contacto no encontrado');
  res.render('contacts/edit', { contact });
};

export const update = (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  ContactModel.update(Number(req.params.id), req.session.userId, req.body);
  res.redirect('/contacts');
};

export const remove = (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  ContactModel.remove(Number(req.params.id), req.session.userId);
  res.redirect('/contacts');
};
