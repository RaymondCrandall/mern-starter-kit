import chalk from 'chalk';
import express from 'express';
import path from 'path';
import open from 'open'; // eslint-disable-line import/no-extraneous-dependencies
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import compileSass from 'express-compile-sass';
import createBookRouter from '../src/routes/bookRoutes';
import createAdminRouter from '../src/routes/adminRoutes';
import createAuthRouter from '../src/routes/authRoutes';
import passportConfig from '../src/config/passport';

const debug = require('debug')('app:srcServer');


/* ENVIRONMENT CONSTANTS */
const port = process.env.PORT || 3000;
const app = express();


/* APP USE & SET */
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'library',
  saveUninitialized: true,
  resave: true,
}));
app.use(compileSass({
  root: path.resolve(__dirname, '../src/public/'),
  sourceMap: true, // Includes Base64 encoded source maps in output css
  sourceComments: true, // Includes source comments in output css
  watchFiles: true, // Watches sass files and updates mtime on main files for each change
  logToConsole: false, // If true, will log to console.error on errors
}));

// Setting up our paths to src/public folder and paths to installed node_modules
app.use(express.static(path.join(__dirname, '/../src/public/')));
app.use('/css', express.static(path.join(__dirname, '/../node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, '/../node_modules/@fortawesome/fontawesome-free/css')));
app.use('/webfonts', express.static(path.join(__dirname, '/../node_modules/@fortawesome/fontawesome-free/webfonts')));
app.use('/js', express.static(path.join(__dirname, '/../node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/../node_modules/jquery/dist')));

// Setting our views path to src/views and view engine file type
app.set('views', path.join(__dirname, '/../src/views/'));
app.set('view engine', 'ejs');

// Configure our user session, user database, and user athentication
passportConfig(app);


/* APP UNIVERSAL VARIABLES */
const nav = [ // site navigation
  { link: '/books', title: 'Books' },
  { link: '/articles', title: 'Articles' },
  { link: '/videos', title: 'Videos' },
];


/* APP ROUTERS */
const adminRouter = createAdminRouter();
const authRouter = createAuthRouter(nav);
const bookRouter = createBookRouter(nav);

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/books', bookRouter);


/* APP GET */
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Team Library',
    nav,
  });
});


/* APP LISTEN */
app.listen(port, (err) => {
  if (err) {
    debug(chalk.red(err));
  } else {
    open(`http://localhost:${port}`);
  }
});
