
var React = require('react')

var LoginFields = React.createClass({
  render: function() {
    return(
      <div>

        <label>Email</label>
        <input type = "email" ref = "email"
          defaultValue = {this.props.fieldValues.email}/>

        <label>Password</label>
        <input type = "password" ref = "password"
          defaultValue = {this.props.fieldValues.password}/>

        <button className="btn -primary pull-right" onClick = {this.saveAndContinue}>Login</button>
      </div>
    )
  },

  saveAndContinue: function(e) {
    e.preventDefault()

    var data = {
      password : this.refs.password.getDOMNode().value,
      email : this.refs.email.getDOMNode().value
    }

    this.props.saveValues(data)
  }
})

module.exports = LoginFields
