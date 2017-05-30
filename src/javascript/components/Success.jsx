var React = require('react')

var Success = React.createClass({


  render: function() {
    return (
      <div>
        <h2>Success!</h2>
        <button className="btn -primary" onClick={this.findMatch}>Find Match</button>
      </div>
    )
  },

  findMatch: function(e) {
      e.preventDefault()
      this.props.nextStep()
  }
})

module.exports = Success
