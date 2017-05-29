
var React = require('react')
var LoginFields = require('./LoginFields')
var Confirmation = require('./Confirmation')
var Success = require('./Success')

var fieldValues = {
  //Account Fields
  email : null,
  password : null
}

var Start = React.createClass({

  onHomeClick: function(evt) {
      this.setState({
          
      })
  }

  render: function() {
    return (
      <div>

        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
              <div class="navbar-header">
                {/*<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar">a</span>
                  <span class="icon-bar">b</span>
                  <span class="icon-bar">c</span>
                </button> */}
                <a class="navbar-brand" {this.onHomeClick}>PETGUR</a>
              </div>
              <div id="navbar" class="navbar-collapse collapse">
                <form class="navbar-form navbar-right">
                    <div>
                    {<LoginFields fieldValues={fieldValues}
                      saveValues={this.saveValues}/>}
                    </div>
                  <a class="btn btn-success" href="#signin">Sign In</a>
                  <a class="btn btn-success" href="#signup">Sign Up</a>
                </form>
              </div>
            </div>
          </nav>

          <div class="jumbotron">
            <div class="container">
              <h1>Bienvenido a Petgur</h1>
              <p>Petgur es el sitio que une mascotas. A traves de los diversos perfiles que encontraras en la pagina, podras hallarle a tu querida mascota su pareja ideal. Inserta mas texto aqui porque este nomas no btw.</p>
              <p><a class="btn btn-primary btn-lg" href="#signup">Aver si es cierto... &raquo;</a></p>
            </div>
          </div>

          <div class="container">


            <hr />

            <footer>
              <p>&copy; Petgur, 2017</p>
            </footer>
          </div>
      </div>
    )
  },

  saveValues: function(fields) {
    return function() {
      fieldValues = Object.assign({}, fieldValues, fields)
    }()
  },

  submitStart: function() {
    //TODO
  }
})

module.exports = Start
