const mongoose = require('mongoose'); //Dependencia de la BD de mongo con MOongose
const bcrypt = require('bcrypt-nodejs'); //Dependencia para encriptar las contraseñanas
const { Schema } = mongoose; //Importando el modelo Schema el cual es el encargado de crear la tabla en BD

//Definiendo el modelo de la base de datos Users
const userSchema = new Schema ({
    email:String,
    password:String
});

//Definiendo metodo para encriptar la contraseña
userSchema.methods.encryptPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //Este metodo recibe la contraseña y retorna la encripta 10 veces
};

//metodo para validar la contraseña
userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password , this.password);//devuelve un bool si la contraseña es igual o diferente
}


//Exportando el modelo a los demás modulos , para poder ser accedidas
module.exports = mongoose.model('users',userSchema);