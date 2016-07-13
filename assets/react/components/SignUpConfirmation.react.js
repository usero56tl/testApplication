var React = require('react');
var UserAccountActionCreator = require('../actions/UserAccountActionCreator');


var SignUpConfirmation = React.createClass({

  handleResendEmail: function() {
    var email = this.props.email;
    this.onResendingEmail({
      email:email
    })
  },

  onResendingEmail: function(data) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        console.log("2");
        console.log(data);
        UserAccountActionCreator.didResendEmailConfirmationAccount(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err);
        console.error(xhr);
        this.displayError(xhr.responseText);
      }.bind(this)
    });
  },


  render: function() {
    var message;
    var message2;
    console.log(this.props.didResendEmailConfirmationAccount);
    console.log("this.props.didResendEmailConfirmationAccount");
    if (this.props.didResendEmailConfirmationAccount){
      message = "We sent you a new confirmation email at " + this.props.email + ". Make sure to check your spam box in case it got filtered.";
      message2 = "If you still have not received it, please contact us at support@captionapp.co";
    }
    else{
      message = "We emailed a confirmation link to " + this.props.email + ". Please click the link in that email to activate your account.";
      message2 = "Make sure to check your spam box in case it got filtered.";
    }
    return (
      <div>
      <p className="message-content-modal">{message}</p>
      <p className="message-content-modal">{message2}</p>
      <button onClick={this.handleResendEmail}>RE-SEND EMAIL</button>
      </div>
      );
  }

}); 


module.exports = SignUpConfirmation;
