var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/AppConstants');

var ActionTypes = Constants.ActionTypes;


function signingUp(user) {
	console.log("UserAccountActionCreators: signingUp");
	var action = {
		type: 'signing_up',
		user: user
	};

	AppDispatcher.dispatch(action);

}

module.exports = {
	signingUp: signingUp
};
