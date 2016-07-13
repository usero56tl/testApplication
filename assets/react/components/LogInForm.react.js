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
    var password = this.refs.password.value.trim();
    var email = this.refs.email.value.trim();
    this.onUserLoggingIn({
      password:password,
      email:email
    })
    return false;
  },

  onUserLoggingIn: function(user) {
    console.log(user);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data) {
        console.log("2");
        console.log(data);
        window.location = "http://localhost:1337/"
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err);
        console.error(xhr);
        this.displayError(xhr.responseText);
      }.bind(this)
    });
  },

  didForgetYourPassword:function(e) {
    e.preventDefault();
    UserAccountActionCreator.didForgetPassword();
    return false;
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
      <form className="signUpForm" onSubmit={this.handleSubmit} role="form">
                
                      <div className="form-group">
                        <label className="sr-only" htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" ref="email" placeholder="Email"/>
                      </div>
                      
                      <div className="form-group">
                        <label className="sr-only" htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" ref="password" placeholder="Password"/>
                      </div>

          <button type="submit" value="Submit">CONNECT</button>
      </form>
      <button className="buttonBottomModal" onClick={this.didForgetYourPassword}>Forgot your password?</button>
      </div>
    );
  }

}); 

module.exports = LogInForm;


