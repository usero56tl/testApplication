var React = require('react');


var SignUpConfirmation = React.createClass({

  handleResendEmail: function(e) {
    e.preventDefault();
    
    return false;
  },


  render: function() {
    return (
      <div>
      <p className="messageModal">We emailed a confirmation link to {this.props.email}. Please click the link in that email to activate your account.</p>
      <p className="messageModal">Make sure to check your spam box in case it got filtered.</p>
      <button>RE-SEND EMAIL</button>
      </div>
      );
  }

}); 


module.exports = SignUpConfirmation;
