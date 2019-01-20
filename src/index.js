const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');

// Initializations
const app = express();
require('./database');

//Settings
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('port',process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/',require('./routes/index'));
require('./routes/index');

//starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on Port', app.get('port'));
});
