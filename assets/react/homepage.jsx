var React = require('react'),
ReactDOM = require('react-dom'),

HeaderModal = require('./components/HeaderModal.react'),

ProjectsStore = require('./stores/ProjectsStore'),
AppDispatcher = require('./dispatcher/AppDispatcher'),
ProjectsActionsCreator = require('./actions/ProjectsActionsCreator');

/*************************************************************
SIGN UP
*************************************************************/


var MyProjects = React.createClass({

  getInitialState: function () {
    return ProjectsStore.getProjects();
  },

  componentDidMount: function () {
    ProjectsStore.addChangeListener(this.onTweetChange);
  },

  componentWillUnmount: function () {
    ProjectsStore.removeChangeListener(this.onTweetChange);
  },

  onTweetChange: function () {
    this.setState(ProjectsStore.getProjects());
  },


  render: function() {
    var title = 'Last step';

    return (
     <div className="modal-dialog">
     <div className="modal-content">
     <div className="modal-body">
     <div className="row">
     <HeaderModal title={title}/>
     <div className="col-md-8">
     </div>
     </div>
     </div>
     </div>
     </div>
     );
  }

}); 




ReactDOM.render(
  <MyProjects/>,
  document.getElementById('myProjects')
  );



