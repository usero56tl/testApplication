var React = require('react');

var StaticErrorContainer = React.createClass({

	render: function() {
		return (
			

			 <div className="background section">
    <div className="container">
      <div className="row">
      <div className="col-xs-6 vcenter">
        <img src="/images/licorne-for-error.png" className="img-responsive"></img>
      </div>
    <div className="col-xs-2 vcenter">
        <p className="p-mini-404">{this.props.title}</p>
      </div>
    <div className="col-xs-4 vcenter">
        <h3 className="h3-404">OOPS !</h3>
        <p className="p-404">You don’t want to be here…</p>
      </div>
    </div>
  </div>
</div>
			);
	}

}); 

module.exports = StaticErrorContainer;
