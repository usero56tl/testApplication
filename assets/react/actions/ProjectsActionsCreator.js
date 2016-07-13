var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/AppConstants');

var ActionTypes = Constants.ActionTypes;




module.exports = {
	didForgetPassword: function () {
		var action = {
			type: ActionTypes.DID_FORGET_PASSWORD
		};
		AppDispatcher.dispatch(action);
	},
};
