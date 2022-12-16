const Usuario = require('../modelos/Usuario');

const passport = require('passport');
const LocalStrategy = require('passport-local');

module.exports.controller = (app) => {
  // Estrategia local
  passport.use(new LocalStrategy({
        usernameField: 'email',    
        passwordField: 'contrasenia'
    },(username, password, done) => {
    Usuario.obtenerUsuarioporEmail(username, (err, usuario) => {
      console.log('Mátenme por favor: ', {err});
      console.log('Mátenme por favor: ', {usuario});
      if (err) { return done(err); }
      else if (!usuario) { return done(null, false); }
      else {
        console.log({password});
        console.log(usuario.contrasenia);
        Usuario.compararContrasenia(password, usuario.contrasenia, (error, coincide) => {
        console.log({usuario});
        if (coincide) {
            console.log('EEEEHH');
            console.log({done});
            return done(null, usuario);
          } else {
            return done(null, false);
          }
        });
        return true;
      }
    });
  }));
  // Registrar un usuario
  app.post('/usuarios/registro', (req, res) => {
    const email = req.body.email;
    const contrasenia = req.body.contrasenia;
    const nuevoUsuario = new Usuario({
      email,
      contrasenia,
    });

    Usuario.crearUsuario(nuevoUsuario, (error, usuario) => {
      if (error) {
        console.error(error);
        res.status(422).json({
          mensaje: 'Algo salió mal de nuestra parte, por favor intentelo después de unos minutos'
        });
      }
      else
        res.send({ usuario });
    });
  });

  app.post('/usuarios/login', passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    console.log({req})
    // res.redirect('http://localhost:8080/Principal');
    if (req.user) { res.send({ usuario_actual: req.user }) }
  });

  passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
  });

  passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
      done(err, usuario);
    });
  });
}