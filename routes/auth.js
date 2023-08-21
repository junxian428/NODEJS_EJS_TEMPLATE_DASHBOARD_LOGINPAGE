const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();


const db = require('./db');




const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

router.get('/logout', (req, res) => {
  req.session.destroy(() => { // Destroy the session
    res.redirect('/login');
  });
});


router.get('/logview', (req, res) => {
  res.render('logview');

});


// Define your route
router.get('/', isAuthenticated, async (req, res) => {
  // If the user is authenticated, redirect to dashboard
  const message = 'No real time data from PLC';
  var database = "data";
 
  //console.log('All users:', users);
 
   // Perform a sample query
   const query = 'SELECT * FROM PLC';
   const PLC = await db.query(query);
   //console.log('All address:', PLC);
 
     database =  JSON.stringify(PLC);
     var database_json;
     database_json = JSON.parse(database);

  res.render('dashboard', { message, database_json,  websocketUrl: process.env.WEBSOCKET_URL });
});


router.get('/dashboard', isAuthenticated,async (req, res) => {
  const message = 'No real time data from PLC';
  var database = "data";
 
  //console.log('All users:', users);
 
   // Perform a sample query
   const query = 'SELECT * FROM PLC';
   const PLC = await db.query(query);
   //console.log('All address:', PLC);
 
     database =  JSON.stringify(PLC);
     var database_json;
     database_json = JSON.parse(database);

     
  res.render('dashboard', { message, database_json,  websocketUrl: process.env.WEBSOCKET_URL });

});

module.exports = router;
