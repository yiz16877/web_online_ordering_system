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

// admin Register Page
router.get('/adminregister', forwardAuthenticated, (req, res) => res.render('adminregister'));

// admin Register
router.post('/adminregister', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  
  $.validator.addMethod("pwcheck", function (password) {
    return /[\@\#\$\%\^\&\*\(\)\_\+\!]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[A-Z]/.test(password)
 });

  if (errors.length > 0) {
    res.render('adminregister', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    Admin.findOne({ email: email }).then(admin => {
      if (admin) {
        errors.push({ msg: 'Email already exists' });
        res.render('adminregister', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newAdmin = new Admin({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin
              .save()
              .then(admin => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/admin/adminlogin');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});



module.exports = router;
