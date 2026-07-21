import db from '../config/database.js';
export const create = (userId, contact) => {
    const stmt = db.prepare('INSERT INTO contacts (user_id, name, alias, email, phone) VALUES (?, ?, ?, ?, ?)');
    return stmt.run(userId, contact.name, contact.alias, contact.email, contact.phone);
};
export const listByUserId = (userId) => {
    const stmt = db.prepare('SELECT * FROM contacts WHERE user_id = ?');
    return stmt.all(userId);
};
export const findByIdAndUserId = (id, userId) => {
    const stmt = db.prepare('SELECT * FROM contacts WHERE id = ? AND user_id = ?');
    return stmt.get(id, userId);
};
export const update = (id, userId, contact) => {
    const stmt = db.prepare('UPDATE contacts SET name = ?, alias = ?, email = ?, phone = ? WHERE id = ? AND user_id = ?');
    return stmt.run(contact.name, contact.alias, contact.email, contact.phone, id, userId);
};
export const remove = (id, userId) => {
    const stmt = db.prepare('DELETE FROM contacts WHERE id = ? AND user_id = ?');
    return stmt.run(id, userId);
};
//# sourceMappingURL=contact.model.js.map