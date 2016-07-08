var React = require('react');


var SignUpForm = React.createClass({
  
  getInitialState: function () {
    return {
      errorMessage: ''
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var firstName = this.refs.firstName.value.trim();
    var lastName = this.refs.lastName.value.trim();
    var password = this.refs.password.value.trim();
    var email = this.refs.email.value.trim();
    this.onUserSigningUp({
      firstName:firstName,
      lastName:lastName,
      password:password,
      email:email
    })
    return false;
  },

  onUserSigningUp: function(user) {
    console.log(user);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data) {
        console.log("2");
        console.log(data);
        UserAccountActionCreator.didSignUp();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err);
        console.error(xhr);
        this.displayError(xhr.responseText);
      }.bind(this)
    });
  },

  alreadyHaveAnAccount:function(e) {
    e.preventDefault();
    console.log("alreadyHaveAnAccount");
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
      <p className="errorMessage">{this.state.errorMessage}</p>
      <form className="signUpForm" onSubmit={this.handleSubmit} role="form">
                <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="sr-only" htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" id="firstName" ref="firstName" placeholder="First Name"/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="sr-only" htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" id="lastName" ref="lastName" placeholder="Last Name"/>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="sr-only" htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" ref="email" placeholder="Email"/>
                      </div>
                      
                      <div className="form-group">
                        <label className="sr-only" htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" ref="password" placeholder="Password"/>
                      </div>
                      <div className="form-group">
                        <label className="sr-only" htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" ref="confirmPassword" placeholder="Confirm Password"/>
                      </div>

          <button type="submit" value="Submit">Create account</button>
      </form>
      <button className="buttonBottomModal" onClick={this.alreadyHaveAnAccount}>Already have an account?</button>
      </div>
    );
  }

}); 

module.exports = SignUpForm;


