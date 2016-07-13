var React = require('react');

var HeaderModal = React.createClass({

	render: function() {
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
			<div className="container-fluid">
			<div className="navbar-header">
			<a className="navbar-brand" href="/">
			<img className="image-logo" alt="Caption" src="/images/logo-fresq-full.png"/>
			</a>
			</div>
			</div>
			</nav>
			);
	}

}); 

module.exports = HeaderModal;
