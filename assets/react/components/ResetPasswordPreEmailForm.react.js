var React = require('react');
var UserAccountActionCreator = require('../actions/UserAccountActionCreator');


var LogInForm = React.createClass({
  
  getInitialState: function () {
    return {
      errorMessage: ''
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var email = this.refs.email.value.trim();
    this.onUserResettingPassword({
      email:email
    })
    return false;
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
        UserAccountActionCreator.didSendEmailPassword(user);
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
      <p className="message-content-modal">We will send you an email with a secure link.</p>
      <form className="signUpForm" onSubmit={this.handleSubmit} role="form">
                
                      <div className="form-group">
                        <label className="sr-only" htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" ref="email" placeholder="Email"/>
                      </div>
                      

          <button type="submit" value="Submit">RESET MY PASSWORD</button>
      </form>
      </div>
    );
  }

}); 

module.exports = LogInForm;


