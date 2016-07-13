/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


 var Emailaddresses = require('machinepack-emailaddresses');
 var Passwords = require('machinepack-passwords');
 var EmailService = require('../services/EmailService');
 var UtilsService = require('../services/UtilsService');
 var ServerConstants = require('../constants/ServerConstants');

 module.exports = {

   signup: function(req, res) {

     if (_.isUndefined(req.param('email'))) {
      return res.errorMessage('An email address is required!');
    }

    if (_.isUndefined(req.param('password'))) {
      return res.errorMessage('A password is required!');
    }

    if (req.param('password').length < 6) {
      return res.errorMessage('Password must be at least 6 characters!');
    }

    Emailaddresses.validate({
      string: req.param('email'),
    }).exec({
      // An unexpected error occurred.
      error: function(err) {
        return res.serverError(err);
      },
      // The provided string is not an email address.
      invalid: function() {
        return res.errorMessage('Doesn\'t look like an email address to me!');
      },
      // OK.
      success: function() {
        Passwords.encryptPassword({
          password: req.param('password'),
        }).exec({

          error: function(err) {
            return res.serverError(err);
          },

          success: function(result) {

            var options = {};

            options.accountActivationCode = UtilsService.getRandomCode(5);

            options.email = req.param('email');
            options.firstName = req.param('firstName');
            options.lastName = req.param('lastName');
            options.password = result;
            
            User.create(options).exec(function(err, createdUser) {
              if (err) {
                console.log('the error is: ', err.invalidAttributes);

                // Check for duplicate email address
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {

                  // return res.send(409, 'Email address is already taken by another user, please try again.');
                  return res.alreadyInUse(err);
                }


                return res.negotiate(err);
              }

              // Log the user in
              req.session.userId = createdUser.id;
              
              EmailService.sendEmail(createdUser, ServerConstants.TEMPLATE_MAIL.CONFIRMATION);

              return res.json(createdUser.toJSON());
            });
          }
        });
      }
    });

  },

  resendEmailConfirmation: function(req, res) {

    if (_.isUndefined(req.param('email'))) {
      return res.errorMessage('Ooops, an error occurred');
    }

    User.findOne({
      email: req.param('email')
    }, function foundUser(err, _user) {
      if (err) return res.negotiate(err);
      if (!_user) return res.errorMessage('There is no user with this email');

      EmailService.sendEmail(_user, ServerConstants.TEMPLATE_MAIL.CONFIRMATION);

      return res.json(_user.toJSON());

    });
  },


  activateAccount: function(req, res) {

    var userId = req.param('userId');
    var accountActivationCode = req.param('accountActivationCode');

    User.update({
      User_id: userId,
      accountActivationCode: accountActivationCode
    }, {
      isEmailConfirmed: true
    }, function(err, updatedUser) {

      if (err) return res.negotiate(err);
      if (updatedUser.length === 0) {
        console.log('No user found: problem with userId and/or accountActivationCode.');
        //Error page
        return res.notFound();
      }

      console.log("updatedUser");
      console.log(updatedUser);

      return res.view('homepage');
    });

  },

  login: function(req, res) {
    console.log("login");

    if (_.isUndefined(req.param('email'))) {
      return res.errorMessage('An email address is required!');
    }

    if (_.isUndefined(req.param('password'))) {
      return res.errorMessage('A password is required!');
    }

    User.findOne({
      email: req.param('email')
    }, function foundUser(err, createdUser) {
      if (err) return res.negotiate(err);
      if (!createdUser) return res.errorMessage('There is no user with this email');

      Passwords.checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: createdUser.password
      }).exec({

        error: function(err) {
          console.error(err);
          console.log(err);
          return res.negotiate(err);
        },

        incorrect: function() {
          return res.errorMessage('Your password is incorrect');
        },

        success: function() {

          req.session.userId = createdUser.User_id;

          return res.json(createdUser);

        }
      });
    });
  },

  logout: function(req, res) {
    console.log("logout");

    if (!req.session.userId){
      console.log('No session.');
      return res.redirect('/');
    }

    User.findOne(req.session.userId, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) {
        console.log('Session refers to a user who no longer exists.');
        return res.redirect('/');
      }

      // log the user-agent out.
      req.session.userId = null;

      return res.redirect('/');
    });

  }
};

