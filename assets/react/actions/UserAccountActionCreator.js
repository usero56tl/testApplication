var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/AppConstants');

var ActionTypes = Constants.ActionTypes;




module.exports = {
	didSignUp: function (user) {
		console.log("UserAccountActionCreators: didSignUp");
		var action = {
			type: ActionTypes.DID_SIGN_UP,
			user: user
		};

		AppDispatcher.dispatch(action);

	}
};
