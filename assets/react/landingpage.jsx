var React = require('react'),
ReactDOM = require('react-dom');

var $ = require ('jquery');


/*************************************************************
*************************************************************/


var ContactForm = React.createClass({

  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  saveContactInfo:function (data) {
    $.ajax({
      url: "/saveContactInfo",
      dataType: 'json',
      type: 'POST',
      data:data,
      success: function(result) {
        //YOUR CODE GOES HERE
      },
      error: function(xhr, status, err) {
        //YOUR CODE GOES HERE
      }
    });
  },

  render: function() {

    //YOUR CODE GOES HERE

    return (
     <div className="jumbotron"></div>
     );
  }

}); 




ReactDOM.render(
  <ContactForm/>,
  document.getElementById('containerHome')
  );



