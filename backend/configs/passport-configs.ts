export{}
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const db = require('./database-configs')
const User = require('../models/User')

/* Defines the users are authenticated using a local strategy. */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,    
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback: true
}, async function(request:any, accessToken:any, refreshToken:any, profile:any, done:Function) {
    let user= {
        name: profile._json.given_name,
        provider: profile.provider,
        googleID: profile.id,
        email: profile._json.email,
        picture: profile.photos[0].value
    }

    User.findOrCreate(user, (error:Error, result:Array<any>) => {
        if(error)
            return done(error, null)
        return done(null, result);
    })
}));

/* Serializes user to a session */
passport.serializeUser((user:any, done:any) => {
    done(null, user._id);
})

/* Finds user with the given ID. Stores it to req.user */
passport.deserializeUser((id:any, done:any) => { 
    let query = User.findOne({_id: id}).select('-picture -bookmarks -firstLogIn -lastLoggedIn -__v');
    query.exec((error:any, result:any) => {
        if(error)
            done(error, null);
        else
            done(null, result);
    })
})

export default passport;