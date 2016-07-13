var React = require('react'),
ReactDOM = require('react-dom'),

HeaderModal = require('./components/HeaderModal.react'),
ResetPasswordPostEmailForm = require('./components/ResetPasswordPostEmailForm.react'),
NavigationLogo = require('./components/NavigationLogo.react'),

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
    console.log("onTweetChange");
    this.setState(UserAccountStore.getUserAccount());
  },


  render: function() {
    var title = 'Reset Password';

    return (
      <div>
      <NavigationLogo/>
     <div className="modal-dialog">
     <div className="modal-content">
     <div className="modal-body">
     <div className="row">
     <HeaderModal title={title}/>
     <div className="col-md-8">
      <ResetPasswordPostEmailForm url='/user/changePassword'/>
     </div>
     </div>
     </div>
     </div>
     </div>
     </div>
     );
  }

}); 




ReactDOM.render(
  <InnerModal/>,
  document.getElementById('resetPasswordModal')
  );



