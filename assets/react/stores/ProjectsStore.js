var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var projects = [];

var Constants = require('../constants/AppConstants');
var ActionTypes = Constants.ActionTypes;


function setProjects(_projects) {
  projects = _projects;
}



var ProjectsStore = assign({}, EventEmitter.prototype, {
  
  emitChange: function() {
    UserAccountStore.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  getProjects: function () {
    return {
      
    };
  }
});


ProjectsStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.DID_SIGN_UP:
      console.log('set app section in app store')
      
      ProjectsStore.emitChange();
    break;

    

    default:
      // do nothing
  }

});

module.exports = ProjectsStore;


