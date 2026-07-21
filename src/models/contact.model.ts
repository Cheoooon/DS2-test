import db from '../config/database.js';

export interface Contact {
  id: number;
  user_id: number;
  name: string;
  alias: string | null;
  email: string | null;
  phone: string | null;
}

export const create = (userId: number, contact: Omit<Contact, 'id' | 'user_id'>) => {
  const stmt = db.prepare('INSERT INTO contacts (user_id, name, alias, email, phone) VALUES (?, ?, ?, ?, ?)');
  return stmt.run(userId, contact.name, contact.alias, contact.email, contact.phone);
};

export const listByUserId = (userId: number): Contact[] => {
  const stmt = db.prepare('SELECT * FROM contacts WHERE user_id = ?');
  return stmt.all(userId) as Contact[];
};

export const findByIdAndUserId = (id: number, userId: number): Contact | undefined => {
  const stmt = db.prepare('SELECT * FROM contacts WHERE id = ? AND user_id = ?');
  return stmt.get(id, userId) as Contact | undefined;
};

export const update = (id: number, userId: number, contact: Omit<Contact, 'id' | 'user_id'>) => {
  const stmt = db.prepare('UPDATE contacts SET name = ?, alias = ?, email = ?, phone = ? WHERE id = ? AND user_id = ?');
  return stmt.run(contact.name, contact.alias, contact.email, contact.phone, id, userId);
};

export const remove = (id: number, userId: number) => {
  const stmt = db.prepare('DELETE FROM contacts WHERE id = ? AND user_id = ?');
  return stmt.run(id, userId);
};
