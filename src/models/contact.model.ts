import { dbPromise } from '../config/database.js';

export interface Contact {
  id: number;
  user_id: number;
  name: string;
  alias: string | null;
  email: string | null;
  phone: string | null;
}

export const create = async (userId: number, contact: Omit<Contact, 'id' | 'user_id'>) => {
  const db = await dbPromise;
  return await db.run('INSERT INTO contacts (user_id, name, alias, email, phone) VALUES (?, ?, ?, ?, ?)', [userId, contact.name, contact.alias, contact.email, contact.phone]);
};

export const listByUserId = async (userId: number): Promise<Contact[]> => {
  const db = await dbPromise;
  return await db.all<Contact[]>('SELECT * FROM contacts WHERE user_id = ?', [userId]);
};

export const findByIdAndUserId = async (id: number, userId: number): Promise<Contact | undefined> => {
  const db = await dbPromise;
  return await db.get<Contact>('SELECT * FROM contacts WHERE id = ? AND user_id = ?', [id, userId]);
};

export const update = async (id: number, userId: number, contact: Omit<Contact, 'id' | 'user_id'>) => {
  const db = await dbPromise;
  return await db.run('UPDATE contacts SET name = ?, alias = ?, email = ?, phone = ? WHERE id = ? AND user_id = ?', [contact.name, contact.alias, contact.email, contact.phone, id, userId]);
};

export const remove = async (id: number, userId: number) => {
  const db = await dbPromise;
  return await db.run('DELETE FROM contacts WHERE id = ? AND user_id = ?', [id, userId]);
};
