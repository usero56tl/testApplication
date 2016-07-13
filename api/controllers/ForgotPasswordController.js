/**
 * ForgotPasswordController
 *
 * @description :: Server-side logic for managing Forgotpasswords
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var UtilsService = require('../services/UtilsService');
 var Emailaddresses = require('machinepack-emailaddresses');
 var EmailService = require('../services/EmailService');
 var ServerConstants = require('../constants/ServerConstants');
 var Passwords = require('machinepack-passwords');


 module.exports = {

 	create: function(req, res){
 		console.log("ForgotPassword create");

 		if (_.isUndefined(req.param('email'))) {
 			return res.errorMessage('An email address is required!');
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

      	User.findOne({
      		email: req.param('email')
      	}, function foundUser(err, _user) {
      		if (err) return res.negotiate(err);
      		if (!_user) return res.errorMessage('There is no user with this email');

      		var options = {};

      		console.log(_user);

      		options.token = UtilsService.getRandomCode(100);
      		options.User_id = _user.User_id;

      		ForgotPassword.create(options).exec(function(err, createdForgotPassword) {
      			if (err) {
      				console.log('the error is: ', err.invalidAttributes);
      				return res.negotiate(err);
      			}

      			EmailService.sendEmail(_user, ServerConstants.TEMPLATE_MAIL.RESET_PASSWORD, createdForgotPassword);

      			return res.json(createdForgotPassword.toJSON());
      		});

      	});

      }
  });

 	},


 	changePassword:function(req, res){
 		console.log("ForgotPassword changePassword");

 		var token = req.param('token');
 		var forgotPasswordId = req.param('forgotPasswordId');
 		var password = req.param('password');

 		if (_.isUndefined(req.param('password'))) {
 			return res.errorMessage('A password is required!');
 		}

 		if (req.param('password').length < 8) {
 			return res.errorMessage('Password must be at least 8 characters!');
 		}

 		ForgotPassword.findOne({
 			token: token,
 			ForgotPassword_id: forgotPasswordId
 		}, function(err, forgotPassword) {

 			if (err) return res.negotiate(err);
 			if (!forgotPassword) {
 				console.log('No user found: problem with userId and/or accountActivationCode.');
 				return res.errorMessage("An error occured");
 			}

 			console.log("forgotPassword");
 			console.log(forgotPassword);

 			var userId = forgotPassword.User_id;

 			Passwords.encryptPassword({
 				password: password
 			}).exec({

 				error: function(err) {
 					return res.serverError(err);
 				},

 				success: function(result) {

 					User.update({
 						User_id: userId
 					}, {
 						password: result
 					}, function(err, updatedUser) {

 						if (err) return res.negotiate(err);
 						if (updatedUser.length === 0) {
 							console.log('No user found: problem with userId and/or accountActivationCode.');
 							return res.notFound();
 						}

 						console.log("updatedUser");
 						console.log(updatedUser.User_id);

 						req.session.userId = userId;

 						return res.json(updatedUser);
 					});

 				}

 			});


 		});





 		

 		
 	}
 	
 };

