var React = require('react'),
ReactDOM = require('react-dom'),
SignUpForm = require('./components/SignUpForm.react'),
LogInForm = require('./components/LogInForm.react'),
ResetPasswordPreEmailForm = require('./components/ResetPasswordPreEmailForm.react'),
ResetPasswordPreEmailDidSendForm = require('./components/ResetPasswordPreEmailDidSendForm.react'),
HeaderModal = require('./components/HeaderModal.react'),

SignUpConfirmation = require('./components/SignUpConfirmation.react'),

UserAccountStore = require('./stores/UserAccountStore'),
AppDispatcher = require('./dispatcher/AppDispatcher'),
UserAccountActionCreator = require('./actions/UserAccountActionCreator');

/*************************************************************
SIGN UP
*************************************************************/


var InnerModal = React.createClass({

  getInitialState: function () {
    return UserAccountStore.getUserAccount();
  },

  componentDidMount: function () {
    UserAccountStore.addChangeListener(this.onTweetChange);
  },

  componentWillUnmount: function () {
    UserAccountStore.removeChangeListener(this.onTweetChange);
  },

  onTweetChange: function () {
    this.setState(UserAccountStore.getUserAccount());
  },


  render: function() {
    var title;
    if (this.state.didSignUp){
      title = 'Last step';
    }
    else if (this.state.willSignUp){
      title = 'Sign up';
    }
    else if(this.state.willLogIn){
      title = 'Log in';
    }
    else if(this.state.didForgetPassword){
      title = 'Reset Password';
    }
    else if(this.state.didSendEmailPassword){
      title = 'Reset Password';
    }

    return (
     <div className="modal-dialog">
     <div className="modal-content">
     <div className="modal-body">
     <div className="row">
     <HeaderModal title={title}/>
     <div className="col-md-8">
     <ContentModal didResendEmailConfirmationAccount={this.state.didResendEmailConfirmationAccount} didSignUp={this.state.didSignUp} didSendEmailPassword={this.state.didSendEmailPassword} didForgetPassword={this.state.didForgetPassword} willLogIn={this.state.willLogIn} willSignUp={this.state.willSignUp} user={this.state.user} />
     </div>
     </div>
     </div>
     </div>
     </div>
     );
  }

}); 


var ContentModal = React.createClass({

  render: function() {

    if (this.props.didSignUp){
      return (
       <SignUpConfirmation didResendEmailConfirmationAccount={this.props.didResendEmailConfirmationAccount} url='/user/resendEmailConfirmation' email={this.props.user.email}/>
       );
    }
    else if (this.props.willSignUp){
      return (
       <SignUpForm url='/user/signup'/>
       );
    }
    else if(this.props.willLogIn){
      return (
        <LogInForm url='/user/login'/>
       );
    }
    else if(this.props.didForgetPassword){
      return (
        <ResetPasswordPreEmailForm url='/user/resetpasswordpre'/>
       );
    }
    else if(this.props.didSendEmailPassword){
      return (
        <ResetPasswordPreEmailDidSendForm email={this.props.user.email} url='/user/resetpasswordpre'/>
       );
    }
    else{
      return <div>Error</div>
    }          
  }

}); 


ReactDOM.render(
  <InnerModal/>,
  document.getElementById('signUpModal')
  );

/*************************************************************
MENU
*************************************************************/

var MenuContent = React.createClass({

  clickOnLogIn:function() {
    console.log("clickOnLogIn");
    UserAccountActionCreator.willLogIn();
  },

  clickOnSignUp:function() {
    console.log("clickOnSignUp");
    UserAccountActionCreator.willSignUp();
  },

  render: function() {
    return (
      <span>
      <a href="#simplify">FEATURES</a>|
      <a onClick={this.clickOnLogIn} data-toggle="modal" data-target="#signUpModal" >LOG IN</a>|
      <a onClick={this.clickOnSignUp} type="button" data-toggle="modal" data-target="#signUpModal" className="selected">Sign up</a>
      </span>
      );

  }

}); 

ReactDOM.render(
  <MenuContent/>,
  document.getElementById('menuRight')
  );



