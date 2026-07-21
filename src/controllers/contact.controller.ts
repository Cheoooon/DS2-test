import type { Request, Response } from 'express';
import { type Contact } from '../models/contact.model.js';
import * as ContactModel from '../models/contact.model.js';

import { contactSchema } from '../schemas/contact.schema.js';
export const list = async (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  const contacts = await ContactModel.listByUserId(req.session.userId);
  res.render('dashboard', { contacts });
};
export const createForm = (req: Request, res: Response) => {
  res.render('contacts/create');
};
export const create = async (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    req.session.errors = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([k, v]) => [k, (v as string[])[0] ?? ''])
    );
    req.session.formData = req.body;
    return res.redirect('/contacts/create');
  }
  await ContactModel.create(req.session.userId, result.data as Omit<Contact, 'id' | 'user_id'>);
  res.redirect('/contacts');
};

export const editForm = async (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  const contact = await ContactModel.findByIdAndUserId(Number(req.params.id), req.session.userId);
  if (!contact) return res.status(404).send('Contacto no encontrado');
  res.render('contacts/edit', { contact });
};

export const update = async (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    req.session.errors = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([k, v]) => [k, (v as string[])[0] ?? ''])
    );
    req.session.formData = req.body;
    return res.redirect(`/contacts/edit/${req.params.id}`);
  }
  await ContactModel.update(Number(req.params.id), req.session.userId, result.data as Omit<Contact, 'id' | 'user_id'>);
  res.redirect('/contacts');
};

export const remove = async (req: Request, res: Response) => {
  if (!req.session.userId) return res.redirect('/login');
  await ContactModel.remove(Number(req.params.id), req.session.userId);
  res.redirect('/contacts');
};
