import type { Request, Response, NextFunction } from 'express';
declare module 'express-session' {
    interface SessionData {
        userId: number;
    }
}
export declare const isAuthenticated: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map