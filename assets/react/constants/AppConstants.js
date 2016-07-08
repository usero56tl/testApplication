

var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    
    DID_SIGN_UP: null


  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
