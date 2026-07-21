import { initDb } from './config/database.js';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import { authLocals } from './middlewares/auth.locals.js';
import contactRoutes from './routes/contact.routes.js';
import { isAuthenticated } from './middlewares/auth.middleware.js';
import session from 'express-session';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',

  resave: false,
  saveUninitialized: false,
}));
await initDb();
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'handlebars');
app.use(authLocals);
app.set('views', path.join(__dirname, 'views'));
app.use(authRoutes);
app.use(contactRoutes);
app.get('/dashboard', isAuthenticated, (req, res) => res.redirect('/contacts'));

app.get('/', (req, res) => {
  res.send('MVC Initialized');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
