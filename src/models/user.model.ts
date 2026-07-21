import db from '../config/database.js';

export interface User {
  id: number;
  email: string;
  password: string;
}

export const createUser = (email: string, password: string) => {
  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
  return stmt.run(email, password);
};

export const findByEmail = (email: string): User | undefined => {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email) as User | undefined;
};
