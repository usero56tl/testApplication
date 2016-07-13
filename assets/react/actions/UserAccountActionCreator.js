var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/AppConstants');

var ActionTypes = Constants.ActionTypes;


module.exports = {
	didSignUp: function (user) {
		var action = {
			type: ActionTypes.DID_SIGN_UP,
			user: user
		};

		AppDispatcher.dispatch(action);
	},

	willSignUp: function () {
		var action = {
			type: ActionTypes.WILL_SIGN_UP
		};
		AppDispatcher.dispatch(action);
	},

	willLogIn: function () {
		var action = {
			type: ActionTypes.WILL_LOG_IN
		};
		AppDispatcher.dispatch(action);
	},

	didForgetPassword: function () {
		var action = {
			type: ActionTypes.DID_FORGET_PASSWORD
		};
		AppDispatcher.dispatch(action);
	},

	didSendEmailPassword: function (user) {
		var action = {
			type: ActionTypes.DID_SEND_EMAIL_PASSWORD,
			user: user
		};
		AppDispatcher.dispatch(action);
	},

	didResendEmailConfirmationAccount: function (user) {
		var action = {
			type: ActionTypes.DID_RESEND_EMAIL_CONFIRMATION_ACCOUNT,
			user: user
		};
		AppDispatcher.dispatch(action);
	},


};
