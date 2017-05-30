var React = require('react')

var Match = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Match</h2>
        <ul>
          <li><b>Doggie:</b> {this.props.fieldValues.doggieName}</li>
          <li><b>Sex:</b> {this.props.fieldValues.doggieSex}</li>
          <li><b>Race:</b> {this.props.fieldValues.doggieRace}</li>
          <li><b>Picture:</b> </li>
          <li><b>Name:</b> {this.props.fieldValues.name}</li>
          <li><b>Email:</b> {this.props.fieldValues.email}</li>
        </ul>



        <ul className="form-fields">
          <li className="form-footer">
            <button className="btn -default pull-left" onClick={this.props.previousStep}>Trash</button>
            <button className="btn -primary pull-right" onClick={this.props.submitRegistration}>Keep</button>
          </li>
        </ul>
      </div>
    )
  }
})

module.exports = Match
