import type { Request, Response } from 'express';
import * as ContactModel from '../models/contact.model.js';

export const list = async (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  const contacts = await ContactModel.listByUserId(req.session.userId);
  res.render('dashboard', { contacts });
};

export const createForm = (req: Request, res: Response) => {
  const errors = req.session.errors;
  const formData = req.session.formData;
  delete req.session.errors;
  delete req.session.formData;
  res.render('contacts/create', { errors, formData });
};

export const create = async (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  await ContactModel.create(req.session.userId, req.body);
  res.redirect('/contacts');
};

export const editForm = async (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  const errors = req.session.errors;
  const formData = req.session.formData;
  delete req.session.errors;
  delete req.session.formData;
  const contact = await ContactModel.findByIdAndUserId(Number(req.params.id), req.session.userId);
  if (!contact) return res.status(404).send('Contacto no encontrado');
  res.render('contacts/edit', { contact, errors, formData: formData || contact });
};

export const update = async (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  console.log('Updating contact:', req.params.id, req.body);
  await ContactModel.update(Number(req.params.id), req.session.userId, req.body);
  res.redirect('/contacts');
};

export const remove = async (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  await ContactModel.remove(Number(req.params.id), req.session.userId);
  res.redirect('/contacts');
};
