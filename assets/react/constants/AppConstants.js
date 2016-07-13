

var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    
    DID_SIGN_UP: null,
    WILL_SIGN_UP: null,
    WILL_LOG_IN: null,
    DID_FORGET_PASSWORD: null,
    DID_SEND_EMAIL_PASSWORD: null,
    DID_RESEND_EMAIL_PASSWORD: null,
    DID_RESEND_EMAIL_CONFIRMATION_ACCOUNT:null


  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
