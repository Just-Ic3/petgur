var React        = require('react')
var Start = require('./components/Start')

window.onload = function() {
  React.render(
    <Start />,
    document.getElementById('registration-form')
  )
}
