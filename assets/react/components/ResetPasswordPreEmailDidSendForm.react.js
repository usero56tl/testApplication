var React = require('react');
var UserAccountActionCreator = require('../actions/UserAccountActionCreator');


var LogInForm = React.createClass({
  
  getInitialState: function () {
    return {
      errorMessage: ''
    };
  },

  onUserResettingPassword: function(user) {
    console.log(user);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data) {
        console.log("2");
        console.log(data);

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
    return (
      <div>
      <p className="message-error-modal">{this.state.errorMessage}</p>
      <p className="message-content-modal">We sent you a new email with a link to reset your password at {this.props.email}.</p>
      <p className="message-content-modal">Make sure to check your spam box in case it got filtered.</p>
      <p className="message-content-modal">If you still have not received it, please contact support@captionapp.co.</p>
      </div>
    );
  }

}); 

module.exports = LogInForm;


