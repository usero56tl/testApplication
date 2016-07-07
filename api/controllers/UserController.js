/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var Emailaddresses = require('machinepack-emailaddresses');
var Passwords = require('machinepack-passwords');
var UserAccountActionCreator = require('../../assets/react/actions/UserAccountActionCreator');


module.exports = {
	

	signup: function(req, res) {


     console.log('hello signup');

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

            options.email = req.param('email');
            options.firstName = req.param('firstName');
            options.lastName = req.param('lastName');
            options.encryptedPassword = result;
            
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

              UserAccountActionCreator.signingUp(createdUser);
              
              return res.json({
                username: createdUser.username
              });
            });
          }
        });
      }
    });

  },
};

