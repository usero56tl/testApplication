var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var user = null;



function setUser(newUser) {
  user = newUser;
}

function emitChange() {
  UserAccountStore.emit('change');
}

var UserAccountStore = assign({}, EventEmitter.prototype, {

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

function handleAction(action) {
  console.log("UserAccountStore: handleAction");
  if (action.type === 'signing_up') {
    setUser(action.user);
    emitChange();
  }
}

UserAccountStore.dispatchToken = AppDispatcher.register(handleAction);

module.exports = UserAccountStore;


