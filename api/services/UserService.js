/**
 * UserService
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


 var ServerConstants = require('../constants/ServerConstants');

 module.exports = {

 	getAccountActivationUrl: function(user) {
 		var text = ServerConstants.URL.WEBSITE + ServerConstants.URL.ACCOUNT_ACTIVATION + user.User_id + "/" + user.accountActivationCode;
 		return text;
 	},

 	getResetPasswordUrl: function(forgotPassword) {
 		var text = ServerConstants.URL.WEBSITE + ServerConstants.URL.RESET_PASSWORD + forgotPassword.ForgotPassword_id + "/" + forgotPassword.token;
 		return text;
 	},



 };