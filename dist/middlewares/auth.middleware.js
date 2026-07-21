export const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/login');
};
//# sourceMappingURL=auth.middleware.js.map