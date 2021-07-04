require('dotenv').config();
const path = require('path');
const express  = require('express');
const {dbConnection} = require('./database/config')
const cors = require('cors');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

const app = express();

// Cors
app.use(cors());

// Passport 
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use('facebook-token',new FacebookTokenStrategy({
    clientID:process.env.FACEBOOK_APP_ID,
    clientSecret:process.env.FACEBOOK_APP_SECRET,
    fbGraphVersion:'v3.0'
},
function(accessToken, refreshToken, profile, done) {
  let user = {
      'email': profile.emails[0].value,
      'name' : profile.displayName,
      'picture':profile.photos[0].value
    //   'id'   : profile.id,
    //   'token': accessToken
  }
  // You can perform any necessary actions with your user at this point,
  // e.g. internal verification against a users table,
  // creating new user entries, etc.

  return done(null, user,{message:'Token inválido.'}); // the user object we just made gets passed to the route's controller as `req.user`
}));

// Lectura y parseo de body
app.use(express.json({limit:'25mb'}));
app.use(express.urlencoded({limit:'25mb',extended:true}))


// Rutas
app.use('/api/usuarios',require('./routes/usuarios.router'));
app.use('/api/hospitales',require('./routes/hospitales.router'));
app.use('/api/medicos',require('./routes/medicos.router'));
app.use('/api/login',require('./routes/auth.router'));
app.use('/api/todo',require('./routes/busquedas.router'));
app.use('/api/uploads',require('./routes/uploads.router'));

// Coneccion de base de datos y levantamiento del servidor
dbConnection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Servidor corriendo '+process.env.PORT);

        // Directorio Publico
        app.use(express.static('public'));
        app.get('*', (req, res) => {
            res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
        });
    });
}).catch((e)=>{
    console.log(e)
})