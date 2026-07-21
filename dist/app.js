import express from 'express';
import authRoutes from './routes/auth.routes.js';
import { isAuthenticated } from './middlewares/auth.middleware.js';
import session from 'express-session';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
}));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(authRoutes);
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { userId: req.session.userId });
});
app.get('/', (req, res) => {
    res.send('MVC Initialized');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map