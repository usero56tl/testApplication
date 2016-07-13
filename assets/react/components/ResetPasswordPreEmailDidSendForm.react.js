var React = require('react');
var UserAccountActionCreator = require('../actions/UserAccountActionCreator');


var LogInForm = React.createClass({
  
  getInitialState: function () {
    return {
      errorMessage: ''
    };
  },

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
        UserAccountActionCreator.didResendEmailPassword(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err);
        console.error(xhr);
        this.displayError(xhr.responseText);
      }.bind(this)
    });
  },

  displayError: function(errorMessage){
    this.setState({
      errorMessage: errorMessage
    });
  },

  render: function() {
    var message;
    var message2;
    console.log("didResendEmailPassword");
    console.log(this.props.didResendEmailPassword);
   if (this.props.didResendEmailPassword){
      message = "We sent you a new email with a link to reset your password at " + this.props.email + ".";
      message2 = "Make sure to check your spam box in case it got filtered.";

    }
    else{
      message = "We sent you a email with a link to reset your password at " + this.props.email + ".";
      message2 = "If you have not received it, please click on the button below to retry.";
    }

    if (this.props.didResendEmailPassword){
        return (
      <div>
       <p className="message-error-modal">{this.state.errorMessage}</p>
      <p className="message-content-modal">{message}</p>
      <p className="message-content-modal">{message2}</p>
      <p className="message-content-modal">If you still have not received it, please contact support@captionapp.co.</p>
      </div>
      );
    }

    else{
      return (
      <div>
       <p className="message-error-modal">{this.state.errorMessage}</p>
      <p className="message-content-modal">{message}</p>
      <p className="message-content-modal">{message2}</p>
      <button onClick={this.handleResendEmail}>RE-SEND EMAIL</button>
      </div>
      );
    }

  }

}); 

module.exports = LogInForm;


