var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
var User = require('../../models/user.js');
const nodemailer = require('nodemailer');
require('dotenv').config()

const bcrypt = require("bcryptjs");

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne(
      {$or:[{"email" : req.body.email}]}).then(user => {
      // Check if user exists
      if (!user) {
        return res.json({ status: "error", msg: "Email not found" });
      }
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                status: "success",
                token: "Bearer " + token,
                msg: "SUCCESS"
              });
            }
          );
        } else {
          return res.json({ status: "error", msg: "Password incorrect" });
        }
      });
    });
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.json({ status: "error", msg: "Email already exists" });
    } else {
      const token = crypto.randomBytes(20).toString('hex');
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        resetPasswordToken: token
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({status: "SUCCESS", user}))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/resetpassword", (req, res) => {
    User.findOne(
        {$or:[{"email" : req.body.email}]}).then(user => {
        // Check if user exists
            if (!user) {
                return res.json({ status: "error", msg: "Email not found" });
            }
            // Check password
            bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.confirmPassword, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user.save();
                    });
                });
                return res.json({ status: "success" });
            } else {
                return res.json({ status: "error", msg: "Password incorrect" });
            }
        });
    });
});

router.post("/getbyresetpasswordtoken", (req, res) => {
  User.findOne(
      {$or:[{"resetPasswordToken" : req.body.token}]}).then(user => {
      // Check if user exists
          if (!user) {
              return res.json({ status: "failed", msg: "user not found" });
          }
            return res.json({ status: "success", user });
    });
});

router.post("/updatepassword", (req, res) => {
  User.findOne(
      {$or:[{"resetPasswordToken" : req.body.token}]}).then(user => {
        // Check if user exists
        console.log(user);
          if (!user) {
              return res.json({ status: "failed", msg: "user not found" });
          }
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                user
                  .save()
                  .then(user => res.json({status: "success", user}));
            });
        });
    });
});

router.post("/forgotpassword", (req, res) => {
  User.findOne(
    {$or:[{"email" : req.body.email}]}).then(user => {
    // Check if user exists
      if (!user) {
        return res.json({ status: "error", msg: "Email not found" });
      }
      else {
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.save();
        res.json({ status: "success", token: token , user: user});
      }
  });
});
module.exports = router;