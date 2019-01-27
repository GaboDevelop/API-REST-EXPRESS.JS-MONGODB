const mongoose = require('mongoose');
const { mongodb } = require('./keys');


mongoose.connect(mongodb.URI,{useNewUrlParser:true})
    .then(db => console.log('Databe is connected'))//promesa que avisa cuando se conecta
    .catch(err => console.error(err));
