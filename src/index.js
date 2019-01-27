const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');//dependencia de autenticadiones para node
const session = require('express-session');//dependencia de sesiones para node y middleware
const flash = require('connect-flash');//dependencia para mandar mensajes entre paginas

// Initializations  (requerimientos)
const app = express();
require('./database');
require('./passport/local-auth');

//Settings
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('port',process.env.PORT || 3000);

// middlewares (EL ORDEN DE COMO SE USAN ES IMPORTANTE)
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretsession',    //aqui es donde colocamos como una clave dificil de descifrar
    resave: false,    //toda este objeto es la configuracion de una sesion estandar//
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());//inicio passpor como middleware
app.use(passport.session());//

app.use((req,res,next) => {
    app.locals.signupMessage = req.flash('signupMessage');//Aqui creo una variable global que guardara el mensaje que se llame signupMessage proveniente de un login
    next();
});

//Routes
app.use('/',require('./routes/index'));
require('./routes/index');

//starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on Port', app.get('port'));
});
