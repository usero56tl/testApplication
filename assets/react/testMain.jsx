var React = require('react');
var ReactDOM = require('react-dom');

console.log("hello");

var InnerModal = React.createClass({

  getInitialState: function () {
    return {
      isMailSent: false
    };
  },

  onTweetChange: function () {
    console.log("onTweetChange");
    this.setState({
      isMailSent: true
    });
  },


  render: function() {
    var title;
    return (
     <div className="modal-dialog">
     <div className="modal-content">
     <div className="modal-body">
     <div className="row">
     <div className="col-md-8">
     <p>ds</p>
     </div>
     </div>
     </div>
     </div>
     </div>
     );

  }

}); 




ReactDOM.render(<InnerModal/>, document.getElementById('signUpModal'));
