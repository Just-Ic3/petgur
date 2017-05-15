
var React = require('react')
var AccountFields = require('./AccountFields')
var ContactFields = require('./ContactFields')
var DoggieFields = require('./DoggieFields')
var Confirmation = require('./Confirmation')
var Success = require('./Success')

var fieldValues = {
  //Account Fields
  name : null,
  email : null,
  password : null,
  //Contact Fields
  telephone : null,
  address : {
    addressline : null,
    city : null,
    state : null,
    country : null
  },
  //Doggie Fields
  doggieName : null,
  doggieRace : null,
  doggieSex : null,
  doggieAge : null,
  doggiePic : null
}

var Registration = React.createClass({
  getInitialState: function() {
    return {
      step: 1
    }
  },

  render: function() {
    var style =  {
      width : (this.state.step / 4 * 100) + '%'
    }

    return (
      <main>
        <span className="progress-step">Step {this.state.step}</span>
        <progress className="progress" style={style}></progress>
        {this.showStep()}
      </main>
    )
  },

  showStep: function() {
    switch(this.state.step) {
      case 1:
        return <AccountFields fieldValues={fieldValues}
          nextStep={this.nextStep} saveValues={this.saveValues}/>
      case 2:
        return <ContactFields fieldValues={fieldValues}
          nextStep={this.nextStep} previousStep={this.previousStep}
          saveValues={this.saveValues}/>
      case 3:
        return <DoggieFields fieldValues={fieldValues}
          nextStep={this.nextStep} previousStep={this.previousStep}
          saveValues={this.saveValues}/>
      case 4:
        return <Confirmation fieldValues={fieldValues}
          previousStep={this.previousStep} submitRegistration={this.submitRegistration}/>
      case 5:
        return <Success fieldValues={fieldValues}/>
    }
  },

  saveValues: function(fields) {
    return function() {
      fieldValues = Object.assign({}, fieldValues, fields)
    }()
  },

  nextStep: function() {
    this.setState({
      step : this.state.step + 1
    })
  },

  previousStep: function() {
    this.setState({
      step : this.state.step - 1
    })
  },

  submitRegistration: function() {
    //TODO
    this.nextStep()
  }
})

module.exports = Registration
