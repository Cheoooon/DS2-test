export interface User {
    id: number;
    email: string;
    password: string;
}
export declare const createUser: (email: string, password: string) => import("better-sqlite3").RunResult;
export declare const findByEmail: (email: string) => User | undefined;
//# sourceMappingURL=user.model.d.ts.map