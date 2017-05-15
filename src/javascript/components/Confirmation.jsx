var React = require('react')

var Confirmation = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Confirm Registration</h2>
        <ul>
          <li><b>Name:</b> {this.props.fieldValues.name}</li>
          <li><b>Email:</b> {this.props.fieldValues.email}</li>
          <li><b>Doggie:</b> {this.props.fieldValues.doggieName}</li>
          <li><b>Sex:</b> {this.props.fieldValues.doggieSex}</li>
          <li><b>Race:</b> {this.props.fieldValues.doggieRace}</li>
        </ul>
        <ul className="form-fields">
          <li className="form-footer">
            <button className="btn -default pull-left" onClick={this.props.previousStep}>Back</button>
            <button className="btn -primary pull-right" onClick={this.props.submitRegistration}>Submit Registration</button>
          </li>
        </ul>
      </div>
    )
  }
})

module.exports = Confirmation
