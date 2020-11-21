const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// load admin
const Admin = require('../models/Admin');


const { forwardAuthenticated } = require('../config/auth');


// adminLogin Page
router.get('/adminlogin', forwardAuthenticated, (req, res) => res.render('adminlogin'));


// adminLogin
router.post('/adminlogin', (req, res, next) => {
 const { email, password} = req.body;
   let errors = [];
  if(email == process.env.adminaccount)
    {
      if(password == process.env.adminpassword)
        {
          res.redirect('/productadmin');
        }
      else{
errors.push({ msg: 'Wrong password' });
        res.redirect('/admin/adminlogin');
      }
    }
  else
    {

errors.push({ msg: 'No Account' });
      res.redirect('/admin/adminlogin');
      
    }
});

module.exports = router;
