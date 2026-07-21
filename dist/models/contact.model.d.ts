export interface Contact {
    id: number;
    user_id: number;
    name: string;
    alias: string | null;
    email: string | null;
    phone: string | null;
}
export declare const create: (userId: number, contact: Omit<Contact, 'id' | 'user_id'>) => import("better-sqlite3").RunResult;
export declare const listByUserId: (userId: number) => Contact[];
export declare const findByIdAndUserId: (id: number, userId: number) => Contact | undefined;
export declare const update: (id: number, userId: number, contact: Omit<Contact, 'id' | 'user_id'>) => import("better-sqlite3").RunResult;
export declare const remove: (id: number, userId: number) => import("better-sqlite3").RunResult;
//# sourceMappingURL=contact.model.d.ts.map