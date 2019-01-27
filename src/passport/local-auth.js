const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user');//importando el modelo al passport y darlo a una constante

passport.serializeUser( (user,done) =>{//esta funcion serializara la autentificacion del usuario a trave de su ID para evitar autenticar el usuario en cada una de las diferentes paginas del sitio
    done(null,user.id);         //todo este archivo se guarda en el navegador
});

passport.deserializeUser( async (id,done) =>{//esta funcion deserializa el ID pasado por una página anterior , (el serializeUser) y busca en BD para ver si es real y vuelve a retornar el usuario 
    const user = await User.findById(id);//esta funcion justo a serialize es un ciclo para cumplir con la seguridad de autenticación
    done(null,user);
});


passport.use('local-signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async (req,email,password,done)=>{  //defino async por que dentro de esta funcion habra otros metodos asincronos
    //validaciones
    const user = await User.findOne({email: email})//buscando si hay un solo correo que coincida con el que se esta recibiendo
    if(user){
        return done(null,false,req.flash('signupMessage','El email ya existe'));//retornando un mensaje con una variable de nombre 'signupMessage'
    } else {
        //creacion
        const newUser = new User();//instanciando el objeto User del modelo
        newUser.email = email;//Definiendo los datos que recibo y guardandolos en el objeto
        newUser.password = newUser.encryptPassword(password);//De igual forma
        await newUser.save();//metodo asincrono que puede tardar un tiempo (no depende de NODE),el metodo await espera a que la promesa se cumpla para continuar con el codigo
        done(null,newUser);//aqui retorno la respuesta , luego del registro(null se refiere a un posible error , y el usuario)
    }
    
}));


passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,email,password,done) => {
    
    const user = await User.findOne({email:email});//buscando si hay un solo correo que coincida con el que se esta recibiendo
    if(!user) {
        return done(null,false,req.flash('signinMessage','el usuario no existe'))//retornando un mensaje con una variable de nombre 'signinMessage'
    }
    if(!user.comparePassword(password)){//comparando si la contraseña es igual con la de bd
        return done(null,false,req.flash('signinMessage','contraseña incorrecta'))
    }
    done(null,user);

}));