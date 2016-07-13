var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var user = null;
var didSignUp = false;
var willSignUp = false;
var willLogIn = false;
var didForgetPassword = false;
var didSendEmailPassword = false;
var didResendEmailConfirmationAccount = false;

var Constants = require('../constants/AppConstants');
var ActionTypes = Constants.ActionTypes;

function initBoolean() {
  didSignUp = false;
  willSignUp = false;
  willLogIn = false;
  didForgetPassword = false;
  didSendEmailPassword = false;
  didResendEmailConfirmationAccount = false;
}

function setUser(newUser) {
  user = newUser;
}

function setDidSignUp(_didSignUp) {
  didSignUp = _didSignUp;
}

function setWillSignUp(_willSignUp) {
  willSignUp = _willSignUp;
}

function setWillLogIn(_willLogIn) {
  willLogIn = _willLogIn;
}

function setDidSendEmailPassword(_didSendEmailPassword) {
  didSendEmailPassword = _didSendEmailPassword;
}

function setDidForgetPassword(_didForgetPassword) {
  didForgetPassword = _didForgetPassword;
}

function setDidResendEmailConfirmationAccount(_didResendEmailConfirmationAccount) {
  didResendEmailConfirmationAccount = _didResendEmailConfirmationAccount;
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

  getUserAccount: function () {
    return {
      user:user,
      didSignUp:didSignUp,
      willSignUp:willSignUp,
      willLogIn:willLogIn,
      didForgetPassword:didForgetPassword,
      didSendEmailPassword: didSendEmailPassword,
      didResendEmailConfirmationAccount: didResendEmailConfirmationAccount
    };
  }
});


UserAccountStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.DID_SIGN_UP:
      setUser(action.user);
      initBoolean();
      setDidSignUp(true);
      UserAccountStore.emitChange();
    break;

    case ActionTypes.WILL_SIGN_UP:
      initBoolean();
      setWillSignUp(true);
      UserAccountStore.emitChange();
    break;

    case ActionTypes.WILL_LOG_IN:
      initBoolean();
      setWillLogIn(true);
      UserAccountStore.emitChange();
    break;

    case ActionTypes.DID_FORGET_PASSWORD:
      initBoolean();
      setDidForgetPassword(true);
      UserAccountStore.emitChange();
    break;

    case ActionTypes.DID_SEND_EMAIL_PASSWORD:
      setUser(action.user);
      initBoolean();
      setDidSendEmailPassword(true);
      UserAccountStore.emitChange();
    break;

    case ActionTypes.DID_RESEND_EMAIL_CONFIRMATION_ACCOUNT:
      setUser(action.user);
      initBoolean();
      setDidResendEmailConfirmationAccount(true);
      setDidSignUp(true);
      UserAccountStore.emitChange();
    break;

    

    default:
      // do nothing
  }

});

module.exports = UserAccountStore;


