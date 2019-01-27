const router = require('express').Router();


const passport = require('passport');


router.get('/', (req,res,next) =>{
    res.render('index');
});

router.get('/signup',(req,res,next)=>{
    res.render('signup');
});


router.post('/signup',passport.authenticate('local-signup',{
    successRedirect: '/profile', //redireccion en caso de exito de login
    failureRedirect: '/signup', //redireccion en caso fallido de login
    passReqToCallback: true //pasar el req pasados por el cliente 
}));  //aqui estoy autenticando llamando al metodo signup de localauth



router.get('/signin', (req, res, next) => {
    res.render('signin');
  });
  
  
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}));

router.get('/profile', (req,res,next) => {
    res.render('profile');
});

module.exports = router;