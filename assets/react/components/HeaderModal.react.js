var React = require('react');

var HeaderModal = React.createClass({

	render: function() {
		return (
			<div className="col-md-4">
			<p className="titleModal">{this.props.title}</p>
			</div>
			);
	}

}); 

module.exports = HeaderModal;
