


var React = require('react'),
ReactDOM = require('react-dom'),
SignUpForm = require('./components/SignUpForm.react'),
HeaderModal = require('./components/HeaderModal.react'),
SignUpConfirmation = require('./components/SignUpConfirmation.react'),

UserAccountStore = require('./stores/UserAccountStore'),
AppDispatcher = require('./dispatcher/AppDispatcher');


console.log("hello");

var InnerModal = React.createClass({

  getInitialState: function () {
    return {
      isMailSent: false
    };
  },

  componentDidMount: function () {
    UserAccountStore.addChangeListener(this.onTweetChange);
  },

  componentWillUnmount: function () {
    UserAccountStore.removeChangeListener(this.onTweetChange);
  },

  onTweetChange: function () {
    console.log("onTweetChange");
    this.setState({
      isMailSent: true
    });
  },


  render: function() {
    var title;
    if (this.state.isMailSent){
      title = 'Last step';

    }
    else{
      title = 'Sign up';
    }

    return (
     <div className="modal-dialog">
     <div className="modal-content">
     <div className="modal-body">
     <div className="row">
     <HeaderModal title={title}/>
     <div className="col-md-8">
     <ContentModal isMailSent={this.state.isMailSent}/>
     </div>
     </div>
     </div>
     </div>
     </div>
     );
  }

      }); //InnerModal


var ContentModal = React.createClass({

  render: function() {
    var title;
    if (this.props.isMailSent){
      return (
       <SignUpConfirmation email='ee'/>
       );
    }
    else{
      return (
       <SignUpForm url='/user/signup'/>
       );
    }          
  }

      }); //ContentModal


ReactDOM.render(
  <InnerModal/>,
  document.getElementById('signUpModal')
  );


