export{}
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport')
const db = require('./database-configs')
const User = require('../models/User')

/* Defines the users are authenticated using a local strategy. */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,    
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback: true
}, function(request:any, accessToken:any, refreshToken:any, profile:any, done:Function) {
    let details = {
        provider: profile.provider,
        googleID: profile.id,
        email: profile.email,
        picture: profile.photos[0].value
    }
    const user = new User(details)
    let query = User.find({googleID: profile.id}).select('-_id -bookmarks -firstLogIn -lastLoggedIn -__v')
    query.exec((error:any, result:any) => {
        if(error) 
            done(error, null)
        if(result.length === 0)
            user.save()
            .then((res:any) => {
                return done(null, res[0])
            })
            .catch((err:any) => {
                return done(err, null)
            })
        else 
            return done(null, result[0])
    })
}));

/* Serializes user to a session */
passport.serializeUser((user:any, done:any) => {
    switch(user.provider) {
        case "google":
            done(null, {googleID: user.googleID});
            break;
    }
})

/* Finds user with the given ID. Stores it to req.user */
passport.deserializeUser((user:any, done:any) => { 
    let query = User.findOne(user).select('-_id -bookmarks -firstLogIn -lastLoggedIn -__v');
    query.exec((error:any, result:any) => {
        if(error)
            done(error, null);
        else
            done(null, result);
    })
})

export default passport;