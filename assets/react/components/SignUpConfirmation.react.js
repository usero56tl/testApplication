var React = require('react');


var SignUpConfirmation = React.createClass({

  handleResendEmail: function() {
    console.log("handleResendEmail");
  },


  render: function() {
    return (
      <div>
      <p className="message-content-modal">We emailed a confirmation link to {this.props.email}. Please click the link in that email to activate your account.</p>
      <p className="message-content-modal">Make sure to check your spam box in case it got filtered.</p>
      <button onClick={this.handleResendEmail}>RE-SEND EMAIL</button>
      </div>
      );
  }

}); 


module.exports = SignUpConfirmation;
