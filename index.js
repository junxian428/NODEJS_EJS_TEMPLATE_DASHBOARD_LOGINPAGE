const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



// Serve static files from the "public" directory
app.use(express.static('public'));



// Your route configuration will go here
const userModel = require('./models/user');

passport.use(new LocalStrategy((username, password, done) => {
  const user = userModel.findUserByUsername(username);
  if (!user || user.password !== password) {
    return done(null, false, { message: 'Incorrect username or password' });
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = userModel.findUserById(id);
  done(null, user);
});

const authRoutes = require('./routes/auth');

app.use('/', authRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
