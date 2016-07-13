/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	home: function(req, res) {

 		if (!req.session.userId) {
 			return res.view('landingpage', {
 				me: null,
 				noMenu: true
 			});
 		}

 		User.findOne(req.session.userId, function(err, user) {
 			if (err) {
 				return res.negotiate(err);
 			}

 			if (!user) {
 				sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
 				return res.view('homepage', {
 					me: null
 				});
 			}

 			return res.view('homepage', {
 				me: {
 					
 				},
 				showAddTutorialButton: true
 			});
 		});

 	},

 	resetPassword:function(req, res) {

 		var token = req.param('token');
 		var forgotPasswordId = req.param('forgotPasswordId');

 		ForgotPassword.findOne({
 			token: token,
 			ForgotPassword_id: forgotPasswordId
 		}, function(err, forgotPassword) {

 			if (err) return res.negotiate(err);
 			if (!forgotPassword) {
 				console.log('No user found: problem with userId and/or accountActivationCode.');
 				return res.notFoundView();
 			}

 			console.log("forgotPassword");
 			console.log(forgotPassword);

 			return res.view('resetPassword', {
 				me: null,
 				onlyLogo: true
 			});

 		});

 	}
 }