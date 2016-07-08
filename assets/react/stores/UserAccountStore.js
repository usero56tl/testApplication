var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var user = null;
var didSignUp = false;
var willSignUp = false;
var willLogIn = false;

var Constants = require('../constants/AppConstants');
var ActionTypes = Constants.ActionTypes;

function setUser(newUser) {
  user = newUser;
}

function setDidSignUp(_didSignUp) {
  didSignUp = _didSignUp;
}

var UserAccountStore = assign({}, EventEmitter.prototype, {
  
  emitChange: function() {
    UserAccountStore.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  getUser: function () {
    return user;
  }
});


UserAccountStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.DID_SIGN_UP:
      console.log('set app section in app store')
      setUser(action.user);
      setDidSignUp(true);
      UserAccountStore.emitChange();
    break;

    default:
      // do nothing
  }

});

module.exports = UserAccountStore;


