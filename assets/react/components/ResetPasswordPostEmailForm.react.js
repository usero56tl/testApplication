var React = require('react');
var UserAccountActionCreator = require('../actions/UserAccountActionCreator');


var Form = React.createClass({
  
  getInitialState: function () {
    return {
      errorMessage: ''
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var password = this.refs.password.value.trim();
    var url = window.location.href;
    var urlArray = url.split('/');
    this.onUserResettingPassword({
      password:password,
      token: urlArray[urlArray.length - 1],
      forgotPasswordId: urlArray[urlArray.length - 2]
    })
    return false;
  },

  onUserResettingPassword: function(data) {
    console.log(data);
    
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: data,
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

  displayError: function(errorMessage){
    this.setState({
      errorMessage: errorMessage
    });
  },

  render: function() {
    return (
      <div>
      <p className="message-error-modal">{this.state.errorMessage}</p>
      <p className="message-content-modal">Choose a new password for your Caption account.</p>
      <p className="message-content-modal">A strong password is a combination of letters, digits and signs.</p>
      <p className="message-content-modal">It must be at least 8 characters long.</p>
      <form className="signUpForm" onSubmit={this.handleSubmit} role="form">
                
                       <div className="form-group">
                        <label className="sr-only" htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" ref="password" placeholder="Password"/>
                      </div>
                      <div className="form-group">
                        <label className="sr-only" htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" ref="confirmPassword" placeholder="Confirm Password"/>
                      </div>
                      

          <button type="submit" value="Submit">RESET MY PASSWORD</button>
      </form>
      </div>
    );
  }

}); 

module.exports = Form;


