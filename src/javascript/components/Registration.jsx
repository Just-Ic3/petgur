
var React = require('react')
var Start = require('./Start')
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
      step: 0
    }
  },

  render: function() {

    const currStep = this.state.step;

    let stepMark = null;

    if (currStep > 0 && currStep < 5) {
        stepMark = <span className="progress-step">Step {this.state.step}</span>;
    } else {
        stepMark = <p></p>
    }

    return (
      <main>
        {stepMark}
        {this.showStep()}
      </main>
    )
  },

  showStep: function() {
    switch(this.state.step) {
      case 0:
        return <Start fieldValues={fieldValues}
          nextStep={this.nextStep} saveValues={this.saveValues}/>
      case 1:
        return <AccountFields fieldValues={fieldValues}
          nextStep={this.nextStep} previousStep={this.previousStep}
          saveValues={this.saveValues}/>
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

  nextStep: function(step = 1) {
    this.setState({
      step : this.state.step + step
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
