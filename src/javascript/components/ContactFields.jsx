var React = require('react')

var ContactFields = React.createClass({
  render: function() {
    return(
      <div>
        <h1>Contact Info:</h1>
        <label>Telephone</label>
        <input type = "text" ref = "telephone"
          defaultValue = {this.props.fieldValues.telephone}/>

        <label>Address</label>
        <input type = "text" ref = "addressline"
          defaultValue = {this.props.fieldValues.address.addressline}/>

        <label>City</label>
        <input type = "text" ref = "city"
          defaultValue = {this.props.fieldValues.address.city}/>

        <label>State</label>
        <input type = "text" ref = "state"
          defaultValue = {this.props.fieldValues.address.state}/>

        <label>Country</label>
        <input type = "text" ref = "country"
          defaultValue = {this.props.fieldValues.address.country}/>

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
      telephone : this.refs.telephone.getDOMNode().value,
      address : {
        addressline : this.refs.addressline.getDOMNode().value,
        city : this.refs.city.getDOMNode().value,
        state : this.refs.state.getDOMNode().value,
        country : this.refs.country.getDOMNode().value
      }
    }

    this.props.saveValues(data)
    this.props.nextStep()
  }
})

module.exports = ContactFields
