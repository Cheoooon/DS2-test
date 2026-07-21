import { dbPromise } from '../config/database.js';

export interface User {
  id: number;
  email: string;
  password: string;
}

export const createUser = async (email: string, password: string) => {
  const db = await dbPromise;
  return await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
};

export const findByEmail = async (email: string): Promise<User | undefined> => {
  const db = await dbPromise;
  return await db.get<User>('SELECT * FROM users WHERE email = ?', [email]);
};
