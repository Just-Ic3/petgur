
var React = require('react')

var Start = React.createClass({
  render: function() {
    return(
      <div>
        <h1>Login</h1>

        <label>Email</label>
        <input type = "email" ref = "email"
          defaultValue = {this.props.fieldValues.email}/>

          <label>Password</label>
          <input type = "password" ref = "password"
            defaultValue = {this.props.fieldValues.password}/>

            <ul className="form-fields">
              <li className="form-footer">
                <button className="btn -default pull-left" onClick={this.register}>Sign Up</button>
                <button className="btn -primary pull-right" onClick={this.login}>Sign In</button>
              </li>
            </ul>
      </div>
    )
  },

  register: function(e) {
    e.preventDefault()

    var data = {
      password : this.refs.password.getDOMNode().value,
      email : this.refs.email.getDOMNode().value
    }

    this.props.saveValues(data)
    this.props.nextStep()
},

  login: function(e) {
    e.preventDefault()

    var data = {
      password : this.refs.password.getDOMNode().value,
      email : this.refs.email.getDOMNode().value
    }

    this.props.saveValues(data)
    this.props.nextStep(5)
  }
})

module.exports = Start
