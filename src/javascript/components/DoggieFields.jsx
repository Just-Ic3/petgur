var React = require('react')

var DoggieFields = React.createClass({
  render: function() {
    return(
      <div>
        <h1>Doggie Info:</h1>
        <label>Name</label>
        <input type = "text" ref = "name"
          defaultValue = {this.props.fieldValues.doggieName}/>

        <label>Race</label>
        <input type = "text" ref = "race"
          defaultValue = {this.props.fieldValues.doggieRace}/>

        <label>Sex</label>
        <input type = "text" ref = "sex"
          defaultValue = {this.props.fieldValues.doggieSex}/>

        <label>Age</label>
        <input type = "text" ref = "age"
          defaultValue = {this.props.fieldValues.doggieAge}/>

        <ul className="form-fields">
          <li className="form-footer">
            <button className="btn -default pull-left" onClick={this.props.previousStep}>Back</button>
            <button className="btn -primary pull-right" onClick={this.saveAndContinue}>Save & Continue</button>
          </li>
        </ul>
      </div>
    )
  },

  saveAndContinue: function(e) {
    e.preventDefault()

    var data = {
      doggieName : this.refs.name.getDOMNode().value,
      doggieRace : this.refs.race.getDOMNode().value,
      doggieAge : this.refs.age.getDOMNode().value,
      doggieSex : this.refs.sex.getDOMNode().value
    }

    this.props.saveValues(data)
    this.props.nextStep()
  }
})

module.exports = DoggieFields
