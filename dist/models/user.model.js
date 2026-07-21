import db from '../config/database.js';
export const createUser = (email, password) => {
    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    return stmt.run(email, password);
};
export const findByEmail = (email) => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
};
//# sourceMappingURL=user.model.js.map