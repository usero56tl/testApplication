var React = require('react'),
ReactDOM = require('react-dom'),
StaticErrorContainer = require('./components/StaticErrorContainer.react'),
NavigationLogo = require('./components/NavigationLogo.react');

/*************************************************************
SIGN UP
*************************************************************/

var SectionError = React.createClass({

  render: function() {
    return (
    	<div>
    		<NavigationLogo/>
        	<StaticErrorContainer title="404: Page not found"/>
        </div>
     );
  }
}); 



ReactDOM.render(
  <SectionError/>,
  document.getElementById('divContainer')
  );
