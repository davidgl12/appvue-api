const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const fs = require('fs');
const router = express.Router()

const { PORT, mongoUri } = require('./config');

const listaPendientesRoutes = require('./controladores/listaPendientes');

app
    .use(cors())
    .use(morgan('tiny'))
    .use(bodyParser.json())
    .use(session({
        secret: 'secretote',
        resave: true,
        saveUninitialized: true,
        cookie: { httpOnly: false },
    }))
    .use(passport.initialize())
    .use(passport.session())

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log('Conexión exitosa');
    })
    .catch((err) => console.log(err));

app.use('/api/listaPendientes', listaPendientesRoutes);

// Incluir controladores
fs.readdirSync('controladores').forEach(function (archivo) {
    if(archivo.substr(-3) == '.js' && archivo !== 'listaPendientes.js') {
        const ruta = require('./controladores/'+archivo);
        ruta.controller(app);
    }
})

function inicioSesion(req, res, next) {
    console.log({req})
    console.log(req.isAuthenticated);
    const isAuthenticated = req.isAuthenticated;
    if (req.isAuthenticated)
        return next();
    else {
        // res.redirect('http://localhost:8080');
        console.log('Error. Autenticación fallida');
        res.status(403).send({ success: false, msg: 'No autorizado' });
    }
}

router.get('/usuario_actual', inicioSesion, function(req, res) {
    if (req.user) { res.send({ usuario_actual: req.user }) }
    else { res.status(403).send({ success: false, msg: 'No autorizado' }) }
});

router.get('/logout', function(req, res) {
    req.logout();
    res.send();
});

app.use('/api', router);
app.listen(PORT, () => console.log((`App listening at http://localhost:${PORT}`)));

